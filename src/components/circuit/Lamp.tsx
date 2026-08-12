import React from "react";
import { CircuitComponent } from "../../types/circuit";

interface LampProps {
  component: CircuitComponent;
  lit: boolean;
}

export const Lamp: React.FC<LampProps> = ({ component, lit }) => {
  const { width = 60, height = 80 } = component;

  const getLampColor = () => {
    if (component.id.includes("power")) return "#22c55e"; // Green
    if (component.id.includes("star")) return "#eab308";  // Yellow
    if (component.id.includes("delta")) return "#3b82f6"; // Blue
    return "#ef4444"; // Fault Red
  };

  const lampColor = getLampColor();

  return (
    <g transform={`translate(${component.position.x}, ${component.position.y})`}>
      {/* Base Casing */}
      <rect
        width={width}
        height={height}
        rx={6}
        fill="#1e293b"
        stroke="#475569"
        strokeWidth={1.5}
        className="drop-shadow"
      />

      {/* Label */}
      <text
        x={width / 2}
        y={15}
        textAnchor="middle"
        fontSize={8}
        fontWeight="bold"
        fill="#cbd5e1"
        className="font-mono uppercase"
      >
        {component.label.replace("LP: ", "")}
      </text>

      {/* Glow Halo Lens Effect */}
      {lit && (
        <circle
          cx={width / 2}
          cy={42}
          r={20}
          fill={lampColor}
          opacity={0.3}
          className="animate-pulse"
        />
      )}

      {/* Main Glass Lens */}
      <circle
        cx={width / 2}
        cy={42}
        r={14}
        fill={lit ? lampColor : "#334155"}
        stroke={lit ? "#ffffff" : "#64748b"}
        strokeWidth={lit ? 2 : 1}
        className="transition-colors duration-300"
      />

      {/* Internal Filament Reflector */}
      <circle cx={width / 2 - 4} cy={38} r={4} fill="#ffffff" opacity={lit ? 0.8 : 0.2} />
    </g>
  );
};
