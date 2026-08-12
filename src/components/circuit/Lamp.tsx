import React from "react";
import { CircuitComponent } from "../../types/circuit";

interface LampProps {
  component: CircuitComponent;
  lit: boolean;
}

export const Lamp: React.FC<LampProps> = ({ component, lit }) => {
  const { width = 75, height = 100 } = component;

  const getLampColor = () => {
    if (component.id.includes("power")) return "#22c55e"; // Green
    if (component.id.includes("star")) return "#eab308";  // Yellow
    if (component.id.includes("delta")) return "#3b82f6"; // Blue
    return "#ef4444"; // Fault Red
  };

  const lampColor = getLampColor();

  return (
    <g transform={`translate(${component.position.x}, ${component.position.y})`}>
      {/* Outer Base Casing */}
      <rect
        width={width}
        height={height}
        rx={6}
        fill="#1e293b"
        stroke="#475569"
        strokeWidth={1.5}
        className="drop-shadow"
      />

      {/* Top Header Title Banner */}
      <path
        d={`M 0 6 A 6 6 0 0 1 6 0 L ${width - 6} 0 A 6 6 0 0 1 ${width} 6 L ${width} 20 L 0 20 Z`}
        fill="#0f172a"
      />
      <text
        x={width / 2}
        y={14}
        textAnchor="middle"
        fontSize={9}
        fontWeight="bold"
        fill="#38bdf8"
        className="font-mono uppercase tracking-wider"
      >
        {component.label}
      </text>
      <line x1={0} y1={20} x2={width} y2={20} stroke="#334155" strokeWidth={1} />

      {/* Glow Halo Lens Effect */}
      {lit && (
        <circle
          cx={width / 2}
          cy={62}
          r={18}
          fill={lampColor}
          opacity={0.35}
          className="animate-pulse"
        />
      )}

      {/* Main Glass Lens */}
      <circle
        cx={width / 2}
        cy={62}
        r={13}
        fill={lit ? lampColor : "#334155"}
        stroke={lit ? "#ffffff" : "#64748b"}
        strokeWidth={lit ? 2 : 1}
        className="transition-colors duration-300"
      />

      {/* Internal Filament Highlight */}
      <circle cx={width / 2 - 3} cy={59} r={3.5} fill="#ffffff" opacity={lit ? 0.85 : 0.2} />
    </g>
  );
};
