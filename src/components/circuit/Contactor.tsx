import React from "react";
import { CircuitComponent } from "../../types/circuit";

interface ContactorProps {
  component: CircuitComponent;
  energized: boolean;
}

export const Contactor: React.FC<ContactorProps> = ({ component, energized }) => {
  const { width = 140, height = 150 } = component;

  return (
    <g transform={`translate(${component.position.x}, ${component.position.y})`}>
      {/* Industrial Contactor Main Casing */}
      <rect
        width={width}
        height={height}
        rx={8}
        fill="#1e293b"
        stroke={energized ? "#22c55e" : "#475569"}
        strokeWidth={2}
        className="transition-colors duration-300 drop-shadow-md"
      />

      {/* Top Header Title Banner */}
      <path
        d={`M 0 8 A 8 8 0 0 1 8 0 L ${width - 8} 0 A 8 8 0 0 1 ${width} 8 L ${width} 24 L 0 24 Z`}
        fill="#0f172a"
      />
      <text
        x={width / 2}
        y={16}
        textAnchor="middle"
        fontSize={11}
        fontWeight="bold"
        fill="#38bdf8"
        className="font-mono tracking-wider"
      >
        {component.label}
      </text>
      <line x1={0} y1={24} x2={width} y2={24} stroke="#334155" strokeWidth={1} />

      {/* Coil Energized Status LED Indicator (Right Side) */}
      <g transform={`translate(${width - 18}, 36)`}>
        <circle
          r={5}
          fill={energized ? "#22c55e" : "#334155"}
          stroke={energized ? "#86efac" : "#64748b"}
          strokeWidth={1.5}
          className={energized ? "animate-pulse" : ""}
        />
        <text x={-12} y={3} fontSize={8} fill="#94a3b8" fontWeight="bold">
          COIL
        </text>
      </g>

      {/* Center Mechanical Armature Plunger Window */}
      <rect
        x={15}
        y={60}
        width={width - 55}
        height={50}
        rx={4}
        fill="#0f172a"
        stroke="#334155"
        strokeWidth={1.5}
      />

      {/* 3 Main Power Contact Blades (1/L1-2/T1, 3/L2-4/T2, 5/L3-6/T3) */}
      {[22, 55, 88].map((xPos, idx) => (
        <g key={idx} transform={`translate(${xPos - 5}, 65)`}>
          {/* Top Fixed Terminal Contact Point */}
          <circle cx={0} cy={5} r={3} fill="#94a3b8" />
          {/* Bottom Fixed Terminal Contact Point */}
          <circle cx={0} cy={35} r={3} fill="#94a3b8" />

          {/* Moving Armature Contact Blade */}
          <line
            x1={0}
            y1={5}
            x2={energized ? 0 : 7}
            y2={35}
            stroke={energized ? "#22c55e" : "#e2e8f0"}
            strokeWidth={2.5}
            className="transition-all duration-200"
          />
        </g>
      ))}

      {/* Bottom Status Banner */}
      <rect
        x={15}
        y={118}
        width={width - 55}
        height={18}
        rx={4}
        fill={energized ? "#15803d" : "#334155"}
        className="transition-colors duration-300"
      />
      <text
        x={(width - 25) / 2}
        y={131}
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
