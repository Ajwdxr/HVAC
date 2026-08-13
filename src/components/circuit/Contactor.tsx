import React from "react";
import { CircuitComponent } from "../../types/circuit";

interface ContactorProps {
  component: CircuitComponent;
  energized: boolean;
  viewMode?: "REAL" | "VECTOR";
}

export const Contactor: React.FC<ContactorProps> = ({ component, energized, viewMode = "REAL" }) => {
  const { width = 140, height = 150 } = component;

  if (viewMode === "VECTOR") {
    return (
      <g transform={`translate(${component.position.x}, ${component.position.y})`}>
        {/* Simple Vector Casing */}
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

        {/* Coil Status Indicator */}
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

        {/* Center Plunger Window */}
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

        {[22, 55, 88].map((xPos, idx) => (
          <g key={idx} transform={`translate(${xPos - 5}, 65)`}>
            <circle cx={0} cy={5} r={3} fill="#94a3b8" />
            <circle cx={0} cy={35} r={3} fill="#94a3b8" />
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
  }

  // Ultra-Realistic Photorealistic Industrial Contactor Render
  return (
    <g transform={`translate(${component.position.x}, ${component.position.y})`}>
      <defs>
        {/* Metal Screw Gradient */}
        <radialGradient id={`screwGrad-${component.id}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
        {/* Contactor Plastic Body Gradient */}
        <linearGradient id={`bodyGrad-${component.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2c3545" />
          <stop offset="50%" stopColor="#1e2430" />
          <stop offset="100%" stopColor="#111622" />
        </linearGradient>
        {/* Plunger Window Inset Shadow */}
        <linearGradient id={`plungerGrad-${component.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#090d16" />
          <stop offset="100%" stopColor="#182234" />
        </linearGradient>
        {/* Glow Filter for Energized Coil */}
        <filter id={`glow-${component.id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main 3D DIN-Rail Contactor Casing */}
      <rect
        width={width}
        height={height}
        rx={10}
        fill={`url(#bodyGrad-${component.id})`}
        stroke={energized ? "#22c55e" : "#475569"}
        strokeWidth={energized ? 2.5 : 1.5}
        className="drop-shadow-2xl transition-all duration-300"
      />

      {/* Metallic Top and Bottom Bevel Highlights */}
      <line x1={4} y1={2} x2={width - 4} y2={2} stroke="#64748b" strokeWidth={1} opacity={0.6} />
      <line x1={4} y1={height - 2} x2={width - 4} y2={height - 2} stroke="#0f172a" strokeWidth={1.5} />

      {/* Top Header Plate (Brand & Component Label) */}
      <rect x={6} y={6} width={width - 12} height={24} rx={5} fill="#0d111a" stroke="#2a3447" strokeWidth={1} />
      <text
        x={(width - 12) / 2 + 6}
        y={22}
        textAnchor="middle"
        fontSize={11}
        fontWeight="900"
        fill="#38bdf8"
        className="font-mono tracking-wider"
      >
        {component.label || component.name}
      </text>

      {/* Schneider TeSys Style Specification Text */}
      <text x={12} y={40} fontSize={7} fill="#64748b" fontWeight="bold" className="font-mono">
        TeSys LC1D18
      </text>
      <text x={12} y={48} fontSize={6.5} fill="#475569" className="font-mono">
        Ui: 690V  Ith: 32A
      </text>

      {/* Slotted Screw Terminal Blocks (Top 1/L1, 3/L2, 5/L3) */}
      {[22, 55, 88].map((xPos, idx) => (
        <g key={`top-screw-${idx}`} transform={`translate(${xPos}, 38)`}>
          <rect x={-9} y={-8} width={18} height={16} rx={3} fill="#0f172a" stroke="#334155" strokeWidth={1} />
          <circle cx={0} cy={0} r={6} fill={`url(#screwGrad-${component.id})`} stroke="#1e293b" strokeWidth={0.8} />
          {/* Screw Slot Line */}
          <line x1={-4} y1={-2} x2={4} y2={2} stroke="#0f172a" strokeWidth={1.5} strokeLinecap="round" />
        </g>
      ))}

      {/* Slotted Screw Terminal Blocks (Bottom 2/T1, 4/T2, 6/T3) */}
      {[22, 55, 88].map((xPos, idx) => (
        <g key={`bot-screw-${idx}`} transform={`translate(${xPos}, 132)`}>
          <rect x={-9} y={-8} width={18} height={16} rx={3} fill="#0f172a" stroke="#334155" strokeWidth={1} />
          <circle cx={0} cy={0} r={6} fill={`url(#screwGrad-${component.id})`} stroke="#1e293b" strokeWidth={0.8} />
          <line x1={-4} y1={2} x2={4} y2={-2} stroke="#0f172a" strokeWidth={1.5} strokeLinecap="round" />
        </g>
      ))}

      {/* A1 / A2 Coil Terminals (Right Lugs) */}
      <g transform="translate(118, 45)">
        <rect x={-8} y={-6} width={16} height={12} rx={2} fill="#0f172a" stroke="#334155" />
        <circle cx={0} cy={0} r={4.5} fill={`url(#screwGrad-${component.id})`} />
        <line x1={-3} y1={0} x2={3} y2={0} stroke="#0f172a" strokeWidth={1.2} />
      </g>
      <g transform="translate(118, 110)">
        <rect x={-8} y={-6} width={16} height={12} rx={2} fill="#0f172a" stroke="#334155" />
        <circle cx={0} cy={0} r={4.5} fill={`url(#screwGrad-${component.id})`} />
        <line x1={-3} y1={0} x2={3} y2={0} stroke="#0f172a" strokeWidth={1.2} />
      </g>

      {/* Central Mechanical Plunger Armature Window */}
      <rect
        x={12}
        y={54}
        width={width - 48}
        height={66}
        rx={6}
        fill={`url(#plungerGrad-${component.id})`}
        stroke="#334155"
        strokeWidth={1.5}
      />

      {/* Internal Physical Plunger Mechanism (Pushes down when energized) */}
      <g transform={`translate(${16}, ${energized ? 62 : 56})`} className="transition-all duration-200">
        <rect
          width={width - 56}
          height={50}
          rx={4}
          fill={energized ? "#1e3a8a" : "#1e293b"}
          stroke={energized ? "#3b82f6" : "#475569"}
          strokeWidth={1.5}
        />
        {/* Armature Center Indicator Block */}
        <rect
          x={(width - 56) / 2 - 14}
          y={14}
          width={28}
          height={22}
          rx={3}
          fill={energized ? "#f97316" : "#64748b"}
          stroke={energized ? "#fdba74" : "#475569"}
          strokeWidth={1}
          className="transition-colors duration-200"
        />
        <text
          x={(width - 56) / 2}
          y={29}
          textAnchor="middle"
          fontSize={9}
          fontWeight="900"
          fill="#ffffff"
          className="font-mono tracking-wider"
        >
          {energized ? "PULLED" : "READY"}
        </text>
      </g>

      {/* Coil Energized Status LED Light (Right Side) */}
      <g transform={`translate(${width - 18}, 75)`}>
        <circle cx={0} cy={0} r={8} fill="#0d111a" stroke="#334155" strokeWidth={1} />
        <circle
          cx={0}
          cy={0}
          r={5}
          fill={energized ? "#22c55e" : "#334155"}
          stroke={energized ? "#86efac" : "#64748b"}
          strokeWidth={1.5}
          filter={energized ? `url(#glow-${component.id})` : undefined}
          className={energized ? "animate-pulse" : ""}
        />
        <text x={0} y={16} textAnchor="middle" fontSize={7} fill={energized ? "#4ade80" : "#64748b"} fontWeight="bold">
          COIL
        </text>
      </g>

      {/* Bottom Status Banner */}
      <rect
        x={12}
        y={124}
        width={width - 48}
        height={16}
        rx={3}
        fill={energized ? "#15803d" : "#1e293b"}
        className="transition-colors duration-300"
      />
      <text
        x={(width - 24) / 2}
        y={136}
        textAnchor="middle"
        fontSize={9}
        fontWeight="bold"
        fill={energized ? "#ffffff" : "#94a3b8"}
        className="font-mono tracking-widest uppercase"
      >
        {energized ? "● ENERGIZED (ON)" : "○ DE-ENERGIZED"}
      </text>
    </g>
  );
};

