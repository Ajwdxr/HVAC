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
  const { width = 110, height = 115 } = component;
  const progressPercent = Math.min(100, (elapsed / duration) * 100);
  const remainingMs = Math.max(0, duration - elapsed);

  return (
    <g transform={`translate(${component.position.x}, ${component.position.y})`}>
      {/* Timer Industrial Housing */}
      <rect
        width={width}
        height={height}
        rx={8}
        fill="#1e293b"
        stroke={running ? "#3b82f6" : "#475569"}
        strokeWidth={2}
        className="transition-colors duration-300 drop-shadow-md"
      />

      {/* Header Label */}
      <text
        x={width / 2}
        y={18}
        textAnchor="middle"
        fontSize={10}
        fontWeight="bold"
        fill="#f8fafc"
        className="font-mono tracking-wider"
      >
        {component.label}
      </text>

      {/* Circular Analog Dial Housing */}
      <circle
        cx={width / 2}
        cy={52}
        r={24}
        fill="#0f172a"
        stroke="#334155"
        strokeWidth={2}
      />

      {/* Dial Progress Ring */}
      <circle
        cx={width / 2}
        cy={52}
        r={24}
        fill="none"
        stroke="#3b82f6"
        strokeWidth={3}
        strokeDasharray={`${(progressPercent / 100) * 150}, 150`}
        transform={`rotate(-90 ${width / 2} 52)`}
        className="transition-all duration-100"
      />

      {/* Countdown Digital Display */}
      <text
        x={width / 2}
        y={56}
        textAnchor="middle"
        fontSize={11}
        fontWeight="bold"
        fill={running ? "#60a5fa" : "#f1f5f9"}
        className="font-mono"
      >
        {formatTime(remainingMs)}
      </text>

      {/* Contact Output Labels (COM-15, NC-16, NO-18) */}
      <g transform={`translate(15, 82)`}>
        <rect width={width - 30} height={20} rx={4} fill="#0f172a" />
        <text
          x={(width - 30) / 2}
          y={14}
          textAnchor="middle"
          fontSize={9}
          fill="#94a3b8"
          className="font-mono"
        >
          COM(15) | NC | NO
        </text>
      </g>
    </g>
  );
};
