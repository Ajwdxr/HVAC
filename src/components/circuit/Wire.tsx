import React from "react";
import { Wire as IWire, CircuitComponent } from "../../types/circuit";
import {
  getTerminalAbsolutePosition,
  generateWirePath,
} from "../../lib/circuit-utils";

interface WireProps {
  wire: IWire;
  components: CircuitComponent[];
  isSelected: boolean;
  onSelect: (wireId: string) => void;
  onDelete: (wireId: string) => void;
}

export const Wire: React.FC<WireProps> = ({
  wire,
  components,
  isSelected,
  onSelect,
  onDelete,
}) => {
  // Locate source and destination terminals
  let p1 = { x: 0, y: 0 };
  let p2 = { x: 0, y: 0 };

  for (const comp of components) {
    for (const term of comp.terminals) {
      if (term.id === wire.from) {
        p1 = getTerminalAbsolutePosition(comp, term);
      }
      if (term.id === wire.to) {
        p2 = getTerminalAbsolutePosition(comp, term);
      }
    }
  }

  const d = generateWirePath(p1, p2);
  const midX = (p1.x + p2.x) / 2;
  const midY = (p1.y + p2.y) / 2;

  const wireColor = wire.color || (wire.active ? "#22c55e" : "#94a3b8");

  return (
    <g
      className="wire-group cursor-pointer select-none group"
      onClick={(e) => {
        e.stopPropagation();
        onSelect(wire.id);
      }}
    >
      {/* Background Wide Touch/Click Hit Area */}
      <path
        d={d}
        fill="none"
        stroke="transparent"
        strokeWidth={16}
        className="cursor-pointer"
      />

      {/* Main Wire Outer Shadow / Selection Glow */}
      <path
        d={d}
        fill="none"
        stroke={isSelected ? "#3b82f6" : "#00000033"}
        strokeWidth={isSelected ? 7 : 5}
        strokeLinecap="round"
      />

      {/* Main Wire Core */}
      <path
        d={d}
        fill="none"
        stroke={wireColor}
        strokeWidth={3}
        strokeLinecap="round"
        className="transition-colors duration-300"
      />

      {/* Active Current Animated Dash Effect when energized */}
      {wire.active && (
        <path
          d={d}
          fill="none"
          stroke="#ffffff"
          strokeWidth={2}
          strokeDasharray="6,6"
          strokeLinecap="round"
          className="animate-wire-flow"
        />
      )}

      {/* Wire Delete Icon on Hover or Selection */}
      {(isSelected || wire.valid === false) && (
        <g
          transform={`translate(${midX}, ${midY})`}
          className="cursor-pointer transition-transform hover:scale-125"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(wire.id);
          }}
        >
          <circle r={10} fill="#ef4444" stroke="#ffffff" strokeWidth={1.5} />
          <text
            x={0}
            y={3.5}
            textAnchor="middle"
            fill="#ffffff"
            fontSize={11}
            fontWeight="bold"
          >
            ✕
          </text>
        </g>
      )}
    </g>
  );
};
