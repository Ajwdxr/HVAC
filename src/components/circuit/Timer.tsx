import React from "react";
import { CircuitComponent } from "../../types/circuit";
import { formatTime } from "../../lib/circuit-utils";

interface TimerProps {
  component: CircuitComponent;
  elapsed: number;
  duration: number;
  running: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  component,
  elapsed,
  duration,
  running,
}) => {
  const { width = 130, height = 145 } = component;
  const progressPercent = Math.min(100, (elapsed / duration) * 100);
  const remainingMs = Math.max(0, duration - elapsed);

  return (
    <g transform={`translate(${component.position.x}, ${component.position.y})`}>
      {/* Timer Industrial Casing */}
      <rect
        width={width}
        height={height}
        rx={8}
        fill="#1e293b"
        stroke={running ? "#3b82f6" : "#475569"}
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

      {/* Circular Analog Countdown Dial */}
      <circle
        cx={width / 2}
        cy={78}
        r={22}
        fill="#0f172a"
        stroke="#334155"
        strokeWidth={2}
      />

      {/* Dial Progress Ring */}
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

      {/* Countdown Text */}
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
};
