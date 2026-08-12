import React from "react";
import { Terminal as ITerminal } from "../../types/circuit";

interface TerminalProps {
  terminal: ITerminal;
  componentX: number;
  componentY: number;
  isConnected: boolean;
  isHighlighted?: boolean;
  onTerminalPointerDown?: (e: React.PointerEvent, terminalId: string) => void;
  onTerminalPointerUp?: (e: React.PointerEvent, terminalId: string) => void;
}

export const Terminal: React.FC<TerminalProps> = ({
  terminal,
  componentX,
  componentY,
  isConnected,
  isHighlighted,
  onTerminalPointerDown,
  onTerminalPointerUp,
}) => {
  const absX = componentX + terminal.x;
  const absY = componentY + terminal.y;

  const getTerminalColor = () => {
    if (isHighlighted) return "#f59e0b"; // Yellow glow for hint
    if (terminal.polarity === "L1") return "#ef4444"; // Red
    if (terminal.polarity === "L2") return "#eab308"; // Yellow
    if (terminal.polarity === "L3") return "#3b82f6"; // Blue
    if (terminal.polarity === "N") return "#06b6d4";  // Neutral Cyan
    if (terminal.type === "COIL") return "#a855f7";   // Purple
    return "#64748b"; // Slate
  };

  const strokeColor = getTerminalColor();

  // Determine text offset: top terminals show text above screw, bottom terminals show text below screw
  const textYOffset = terminal.y < 60 ? -10 : 15;

  return (
    <g
      className="terminal-group cursor-pointer select-none group"
      transform={`translate(${absX}, ${absY})`}
      onPointerDown={(e) => {
        e.stopPropagation();
        if (typeof onTerminalPointerDown === "function") {
          onTerminalPointerDown(e, terminal.id);
        }
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        if (typeof onTerminalPointerUp === "function") {
          onTerminalPointerUp(e, terminal.id);
        }
      }}
    >
      {/* Outer Magnetic Ring (Hover expansion) */}
      <circle
        r={14}
        fill="transparent"
        className="group-hover:fill-blue-500/20 transition-all"
      />

      {/* Terminal Screw Head Base */}
      <circle
        r={7}
        fill="#1e293b"
        stroke={strokeColor}
        strokeWidth={2}
        className={`${
          isHighlighted ? "animate-ping" : ""
        } transition-all duration-200 group-hover:scale-125`}
      />

      {/* Center Screw Cross/Slot */}
      <circle r={3} fill={isConnected ? strokeColor : "#94a3b8"} />
      <line x1={-2} y1={0} x2={2} y2={0} stroke="#0f172a" strokeWidth={1} />

      {/* Terminal Text Label */}
      <text
        x={0}
        y={textYOffset}
        textAnchor="middle"
        fontSize={10}
        fontWeight="bold"
        fill="#e2e8f0"
        className="pointer-events-none drop-shadow-md font-mono"
      >
        {terminal.name}
      </text>
    </g>
  );
};
