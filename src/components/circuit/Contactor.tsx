import React from "react";
import { CircuitComponent } from "../../types/circuit";

interface ContactorProps {
  component: CircuitComponent;
  energized: boolean;
}

export const Contactor: React.FC<ContactorProps> = ({ component, energized }) => {
  const { width = 130, height = 120 } = component;

  return (
    <g transform={`translate(${component.position.x}, ${component.position.y})`}>
      {/* Industrial Contactor Casing */}
      <rect
        width={width}
        height={height}
        rx={8}
        fill="#1e293b"
        stroke={energized ? "#22c55e" : "#475569"}
        strokeWidth={2}
        className="transition-colors duration-300 drop-shadow-md"
      />

      {/* Header Label */}
      <text
        x={width / 2 - 15}
        y={20}
        textAnchor="middle"
        fontSize={11}
        fontWeight="bold"
        fill="#f8fafc"
        className="font-mono tracking-wide"
      >
        {component.label}
      </text>

      {/* Coil Energized Status LED Indicator */}
      <g transform={`translate(${width - 20}, 15)`}>
        <circle
          r={6}
          fill={energized ? "#22c55e" : "#334155"}
          stroke={energized ? "#86efac" : "#64748b"}
          strokeWidth={1.5}
          className={energized ? "animate-pulse" : ""}
        />
        <text x={-14} y={3} fontSize={8} fill="#94a3b8" fontWeight="bold">
          A1-A2
        </text>
      </g>

      {/* Center Plunger Mechanical Window */}
      <rect
        x={20}
        y={35}
        width={width - 55}
        height={45}
        rx={4}
        fill="#0f172a"
        stroke="#334155"
        strokeWidth={1.5}
      />

      {/* 3 Main Contact Blades (1/L1-2/T1, 3/L2-4/T2, 5/L3-6/T3) */}
      {[25, 50, 75].map((xOffset, idx) => (
        <g key={idx} transform={`translate(${xOffset + 5}, 40)`}>
          {/* Top Fixed Terminal Contact Point */}
          <circle cx={0} cy={5} r={3} fill="#94a3b8" />
          {/* Bottom Fixed Terminal Contact Point */}
          <circle cx={0} cy={30} r={3} fill="#94a3b8" />

          {/* Moving Armature Contact Blade */}
          <line
            x1={0}
            y1={5}
            x2={energized ? 0 : 8}
            y2={30}
            stroke={energized ? "#22c55e" : "#e2e8f0"}
            strokeWidth={2.5}
            className="transition-all duration-200"
          />
        </g>
      ))}

      {/* Energized Status Text Banner */}
      <rect
        x={20}
        y={88}
        width={width - 55}
        height={18}
        rx={4}
        fill={energized ? "#15803d" : "#334155"}
        className="transition-colors duration-300"
      />
      <text
        x={(width - 15) / 2}
        y={101}
        textAnchor="middle"
        fontSize={10}
        fontWeight="bold"
        fill="#ffffff"
        className="font-mono tracking-widest uppercase"
      >
        {energized ? "● ON" : "○ OFF"}
      </text>
    </g>
  );
};
