import React from "react";
import { CircuitComponent } from "../../types/circuit";
import { formatTime } from "../../lib/circuit-utils";

interface TimerProps {
  component: CircuitComponent;
  elapsed: number;
  duration: number;
  running: boolean;
  viewMode?: "REAL" | "VECTOR";
}

export const Timer: React.FC<TimerProps> = ({
  component,
  elapsed,
  duration,
  running,
  viewMode = "REAL",
}) => {
  const { width = 130, height = 145 } = component;
  const progressPercent = Math.min(100, (elapsed / duration) * 100);
  const remainingMs = Math.max(0, duration - elapsed);
  // Dial rotation angle (0 to 270 deg)
  const dialAngle = (progressPercent / 100) * 270 - 135;

  if (viewMode === "VECTOR") {
    return (
      <g transform={`translate(${component.position.x}, ${component.position.y})`}>
        <rect
          width={width}
          height={height}
          rx={8}
          fill="#1e293b"
          stroke={running ? "#3b82f6" : "#475569"}
          strokeWidth={2}
          className="transition-colors duration-300 drop-shadow-md"
        />

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
          {component.label || component.name}
        </text>
        <line x1={0} y1={24} x2={width} y2={24} stroke="#334155" strokeWidth={1} />

        <circle
          cx={width / 2}
          cy={78}
          r={22}
          fill="#0f172a"
          stroke="#334155"
          strokeWidth={2}
        />

        <circle
          cx={width / 2}
          cy={78}
          r={22}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={3}
          strokeDasharray={`${(progressPercent / 100) * 138}, 138`}
          transform={`rotate(-90 ${width / 2} 78)`}
          className="transition-all duration-100"
        />

        <text
          x={width / 2}
          y={82}
          textAnchor="middle"
          fontSize={11}
          fontWeight="bold"
          fill={running ? "#60a5fa" : "#f1f5f9"}
          className="font-mono"
        >
          {formatTime(remainingMs)}
        </text>
      </g>
    );
  }

  // Ultra-Realistic Industrial DIN-Rail Timer Relay Render
  return (
    <g transform={`translate(${component.position.x}, ${component.position.y})`}>
      <defs>
        <linearGradient id={`timerBody-${component.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#090d16" />
        </linearGradient>
        <radialGradient id={`knobGrad-${component.id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#475569" />
        </radialGradient>
      </defs>

      {/* Main Outer Casing */}
      <rect
        width={width}
        height={height}
        rx={10}
        fill={`url(#timerBody-${component.id})`}
        stroke={running ? "#3b82f6" : "#475569"}
        strokeWidth={running ? 2.5 : 1.5}
        className="drop-shadow-2xl transition-all duration-300"
      />

      {/* Header Plate */}
      <rect x={6} y={6} width={width - 12} height={22} rx={5} fill="#0d111a" stroke="#1e293b" strokeWidth={1} />
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

      {/* Specification Text */}
      <text x={12} y={38} fontSize={7} fill="#64748b" fontWeight="bold" className="font-mono">
        STAR-DELTA TIMER (0-10s)
      </text>

      {/* Terminal Screw Lugs Top (A1 & A2) */}
      <g transform="translate(25, 38)">
        <circle cx={0} cy={0} r={4.5} fill="#cbd5e1" stroke="#334155" strokeWidth={0.8} />
        <line x1={-3} y1={0} x2={3} y2={0} stroke="#0f172a" strokeWidth={1.2} />
      </g>
      <g transform="translate(105, 38)">
        <circle cx={0} cy={0} r={4.5} fill="#cbd5e1" stroke="#334155" strokeWidth={0.8} />
        <line x1={-3} y1={0} x2={3} y2={0} stroke="#0f172a" strokeWidth={1.2} />
      </g>

      {/* Analog Rotary Dial Bezel */}
      <circle cx={width / 2} cy={80} r={28} fill="#0f172a" stroke="#334155" strokeWidth={2} />
      
      {/* Dial Tick Marks (0s, 2s, 4s, 6s, 8s, 10s) */}
      {[0, 2, 4, 6, 8, 10].map((tVal, idx) => {
        const tickAngle = (tVal / 10) * 270 - 135;
        const rad = (tickAngle * Math.PI) / 180;
        const x1 = width / 2 + Math.cos(rad) * 23;
        const y1 = 80 + Math.sin(rad) * 23;
        const x2 = width / 2 + Math.cos(rad) * 27;
        const y2 = 80 + Math.sin(rad) * 27;
        return (
          <line key={`tick-${idx}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth={1.5} />
        );
      })}

      {/* Physical Rotating Pointer Knob */}
      <g transform={`translate(${width / 2}, 80) rotate(${dialAngle})`}>
        <circle r={18} fill={`url(#knobGrad-${component.id})`} stroke="#1e293b" strokeWidth={1.5} />
        {/* Red Pointer Indicator Needle */}
        <rect x={-2} y={-16} width={4} height={12} rx={1} fill="#ef4444" />
        <circle r={4} fill="#0f172a" />
      </g>

      {/* Running Power & Mode LEDs */}
      <g transform="translate(16, 75)">
        <circle cx={0} cy={0} r={4} fill={running ? "#3b82f6" : "#334155"} className={running ? "animate-pulse" : ""} />
        <text x={7} y={3} fontSize={6.5} fill="#94a3b8" fontWeight="bold" className="font-mono">
          RUN
        </text>
      </g>
      <g transform="translate(16, 88)">
        <circle cx={0} cy={0} r={4} fill={running ? "#eab308" : "#334155"} />
        <text x={7} y={3} fontSize={6.5} fill="#94a3b8" fontWeight="bold" className="font-mono">
          STAR
        </text>
      </g>

      {/* Bottom Terminal Screws (15 COM, 16 NC, 18 NO) */}
      {[25, 65, 105].map((xPos, idx) => (
        <g key={`bot-timer-screw-${idx}`} transform={`translate(${xPos}, 125)`}>
          <circle cx={0} cy={0} r={4.5} fill="#cbd5e1" stroke="#334155" strokeWidth={0.8} />
          <line x1={-3} y1={0} x2={3} y2={0} stroke="#0f172a" strokeWidth={1.2} />
        </g>
      ))}

      {/* Countdown Digital Badge */}
      <rect x={width / 2 - 28} y={108} width={56} height={14} rx={3} fill="#070a0f" stroke="#1e293b" />
      <text
        x={width / 2}
        y={119}
        textAnchor="middle"
        fontSize={9}
        fontWeight="bold"
        fill={running ? "#60a5fa" : "#94a3b8"}
        className="font-mono"
      >
        {formatTime(remainingMs)}
      </text>
    </g>
  );
};

