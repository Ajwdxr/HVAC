import React from "react";
import { CircuitComponent } from "../../types/circuit";

interface MotorProps {
  component: CircuitComponent;
  running: boolean;
  mode: "STOPPED" | "STAR" | "DELTA" | "FAULT";
  speed: number;
  viewMode?: "REAL" | "VECTOR";
}

export const Motor: React.FC<MotorProps> = ({
  component,
  running,
  mode,
  speed,
  viewMode = "REAL",
}) => {
  const { width = 170, height = 185 } = component;
  const cx = width / 2;
  const cy = 112;
  const radius = 38;

  const animDuration = speed > 0 ? `${(100 / speed) * 0.8}s` : "0s";

  const getStatusColor = () => {
    if (mode === "FAULT") return "#ef4444";
    if (mode === "STAR") return "#eab308";
    if (mode === "DELTA") return "#3b82f6";
    return "#64748b";
  };

  if (viewMode === "VECTOR") {
    return (
      <g transform={`translate(${component.position.x}, ${component.position.y})`}>
        <rect
          width={width}
          height={height}
          rx={10}
          fill="#0f172a"
          stroke="#334155"
          strokeWidth={2}
          className="drop-shadow-lg"
        />

        <path
          d={`M 0 10 A 10 10 0 0 1 10 0 L ${width - 10} 0 A 10 10 0 0 1 ${width} 10 L ${width} 24 L 0 24 Z`}
          fill="#1e293b"
        />
        <text
          x={width / 2}
          y={16}
          textAnchor="middle"
          fontSize={11}
          fontWeight="bold"
          fill="#38bdf8"
          className="font-mono uppercase tracking-wider"
        >
          {component.label || component.name}
        </text>
        <line x1={0} y1={24} x2={width} y2={24} stroke="#334155" strokeWidth={1} />

        <circle
          cx={cx}
          cy={cy}
          r={radius + 5}
          fill="#1e293b"
          stroke={getStatusColor()}
          strokeWidth={3}
          className="transition-colors duration-300"
        />

        <g
          transform={`translate(${cx}, ${cy})`}
          className={running ? "animate-spin" : ""}
          style={{ animationDuration: animDuration }}
        >
          <circle r={radius} fill="#334155" stroke="#475569" strokeWidth={2} />
          <line x1={-radius + 6} y1={0} x2={radius - 6} y2={0} stroke="#94a3b8" strokeWidth={3} />
          <line x1={0} y1={-radius + 6} x2={0} y2={radius - 6} stroke="#94a3b8" strokeWidth={3} />
          <line x1={-22} y1={-22} x2={22} y2={22} stroke="#64748b" strokeWidth={2} />
          <line x1={-22} y1={22} x2={22} y2={-22} stroke="#64748b" strokeWidth={2} />
          <circle r={9} fill="#f1f5f9" stroke="#0f172a" strokeWidth={2} />
          <circle r={3.5} fill="#0f172a" />
        </g>

        <rect
          x={cx - 35}
          y={cy - 11}
          width={70}
          height={22}
          rx={5}
          fill={getStatusColor()}
          className="opacity-90"
        />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontSize={10}
          fontWeight="bold"
          fill="#ffffff"
          className="font-mono tracking-wider"
        >
          {mode}
        </text>

        <text
          x={width / 2}
          y={172}
          textAnchor="middle"
          fontSize={10}
          fill="#94a3b8"
          className="font-mono font-bold"
        >
          {running ? `${Math.round(speed * 14.5)} RPM` : "MOTOR STOPPED"}
        </text>
      </g>
    );
  }

  // Ultra-Realistic Industrial 3-Phase AC Induction Motor Render
  return (
    <g transform={`translate(${component.position.x}, ${component.position.y})`}>
      <defs>
        <radialGradient id={`motorBodyGrad-${component.id}`} cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#385170" />
          <stop offset="60%" stopColor="#1e2a38" />
          <stop offset="100%" stopColor="#0f1722" />
        </radialGradient>
        <linearGradient id={`finGrad-${component.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <radialGradient id={`shaftGrad-${component.id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#475569" />
        </radialGradient>
      </defs>

      {/* Main Base Plate & Enclosure Box */}
      <rect
        width={width}
        height={height}
        rx={12}
        fill="#0b1019"
        stroke={getStatusColor()}
        strokeWidth={running ? 2.5 : 1.5}
        className="drop-shadow-2xl transition-all duration-300"
      />

      {/* Top Header Title */}
      <rect x={6} y={6} width={width - 12} height={22} rx={5} fill="#06090f" stroke="#1e293b" strokeWidth={1} />
      <text
        x={width / 2}
        y={21}
        textAnchor="middle"
        fontSize={10.5}
        fontWeight="900"
        fill="#38bdf8"
        className="font-mono tracking-wider uppercase"
      >
        {component.label || component.name}
      </text>

      {/* Cast Iron Stator Cooling Ribs / Fins Background */}
      {[-32, -24, -16, -8, 0, 8, 16, 24, 32].map((yOffset, i) => (
        <rect
          key={`fin-${i}`}
          x={cx - radius - 10}
          y={cy + yOffset - 3}
          width={(radius + 10) * 2}
          height={4}
          rx={2}
          fill={`url(#finGrad-${component.id})`}
          opacity={0.7}
        />
      ))}

      {/* Top Metallic Terminal Box (Where U1, V1, W1, U2, V2, W2 studs are located) */}
      <rect x={20} y={32} width={width - 40} height={28} rx={4} fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
      <text x={25} y={43} fontSize={7} fontWeight="bold" fill="#f59e0b" className="font-mono">
        TOP TERMINALS (U1 V1 W1 / W2 U2 V2)
      </text>

      {/* Terminal Stud Screws inside Top Box */}
      {[30, 85, 140].map((xPos, idx) => (
        <g key={`term-top-${idx}`} transform={`translate(${xPos}, 48)`}>
          <circle cx={0} cy={0} r={4.5} fill="#fbbf24" stroke="#92400e" strokeWidth={0.8} />
          <circle cx={0} cy={0} r={1.5} fill="#451a03" />
        </g>
      ))}

      {/* Circular Stator Outer Shell */}
      <circle
        cx={cx}
        cy={cy}
        r={radius + 6}
        fill={`url(#motorBodyGrad-${component.id})`}
        stroke={getStatusColor()}
        strokeWidth={3}
        className="transition-colors duration-300 drop-shadow-md"
      />

      {/* Rotating Rotor Shaft & Fan Blades Assembly */}
      <g
        transform={`translate(${cx}, ${cy})`}
        className={running ? "animate-spin" : ""}
        style={{ animationDuration: animDuration }}
      >
        <circle r={radius} fill="#111827" stroke="#374151" strokeWidth={2} />

        {/* 6 Curved Fan Blades */}
        {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
          <g key={`blade-${idx}`} transform={`rotate(${angle})`}>
            <path
              d="M 0 0 C 10 -15, 25 -20, 32 -10 C 25 -5, 12 0, 0 0 Z"
              fill="#94a3b8"
              stroke="#475569"
              strokeWidth={0.8}
              opacity={0.85}
            />
          </g>
        ))}

        {/* Center Metal Shaft Pin & Drive Key */}
        <circle r={11} fill={`url(#shaftGrad-${component.id})`} stroke="#1e293b" strokeWidth={1.5} />
        <rect x={-2} y={-8} width={4} height={16} fill="#0f172a" rx={1} />
        <circle r={3.5} fill="#0f172a" />
      </g>

      {/* Status Mode Badge */}
      <rect
        x={cx - 38}
        y={cy - 12}
        width={76}
        height={24}
        rx={6}
        fill={getStatusColor()}
        className="drop-shadow-md opacity-95 transition-colors duration-300"
      />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight="900"
        fill="#ffffff"
        className="font-mono tracking-wider"
      >
        {mode}
      </text>

      {/* Speed Footer Text */}
      <rect x={20} y={height - 24} width={width - 40} height={16} rx={4} fill="#070a0f" />
      <text
        x={width / 2}
        y={height - 12}
        textAnchor="middle"
        fontSize={9.5}
        fill={running ? "#4ade80" : "#94a3b8"}
        className="font-mono font-bold"
      >
        {running ? `${Math.round(speed * 14.5)} RPM (3-PHASE)` : "MOTOR STOPPED"}
      </text>
    </g>
  );
};

