import React from "react";
import { CircuitComponent } from "../../types/circuit";

interface LampProps {
  component: CircuitComponent;
  lit: boolean;
}

export const Lamp: React.FC<LampProps> = ({ component, lit }) => {
  const { width = 80, height = 105 } = component;

  const getLedColor = () => {
    if (component.id.includes("power")) return "#22c55e"; // Green LED
    if (component.id.includes("star")) return "#eab308";  // Yellow LED
    if (component.id.includes("delta")) return "#3b82f6"; // Blue LED
    return "#ef4444"; // Fault Red LED
  };

  const ledColor = getLedColor();

  return (
    <g transform={`translate(${component.position.x}, ${component.position.y})`}>
      {/* Base Casing Frame */}
      <rect
        width={width}
        height={height}
        rx={8}
        fill="#12141c"
        stroke={lit ? ledColor : "#334155"}
        strokeWidth={lit ? 2 : 1.5}
        className="drop-shadow-md transition-colors duration-300"
      />

      {/* Top Header Title Banner */}
      <path
        d={`M 0 8 A 8 8 0 0 1 8 0 L ${width - 8} 0 A 8 8 0 0 1 ${width} 8 L ${width} 24 L 0 24 Z`}
        fill="#0a0b0e"
      />
      <text
        x={width / 2}
        y={16}
        textAnchor="middle"
        fontSize={10}
        fontWeight="bold"
        fill="#f59e0b"
        className="font-mono uppercase tracking-wider"
      >
        {component.label}
      </text>
      <line x1={0} y1={24} x2={width} y2={24} stroke="#334155" strokeWidth={1} />

      {/* Glow Halo Lens Aura Effect */}
      {lit && (
        <circle
          cx={width / 2}
          cy={64}
          r={22}
          fill={ledColor}
          opacity={0.35}
          className="animate-pulse"
        />
      )}

      {/* Outer LED Bezel Ring */}
      <circle
        cx={width / 2}
        cy={64}
        r={16}
        fill="#0a0b0e"
        stroke="#334155"
        strokeWidth={1.5}
      />

      {/* Main Glowing LED Lens Bulb */}
      <circle
        cx={width / 2}
        cy={64}
        r={12}
        fill={lit ? ledColor : "#1e293b"}
        stroke={lit ? "#ffffff" : "#475569"}
        strokeWidth={lit ? 2 : 1}
        className="transition-colors duration-300"
      />

      {/* Internal LED Diode Reflector Highlight */}
      <circle cx={width / 2 - 3} cy={61} r={3.5} fill="#ffffff" opacity={lit ? 0.85 : 0.15} />

      {/* LED Cathode / Anode (+ / -) Markings */}
      <text x={10} y={40} fontSize={8} fill="#94a3b8" fontWeight="bold" className="font-mono">
        +
      </text>
      <text x={10} y={88} fontSize={8} fill="#94a3b8" fontWeight="bold" className="font-mono">
        -
      </text>
    </g>
  );
};
