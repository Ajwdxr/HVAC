import React from "react";
import { CircuitComponent } from "../../types/circuit";

interface MotorProps {
  component: CircuitComponent;
  running: boolean;
  mode: "STOPPED" | "STAR" | "DELTA" | "FAULT";
  speed: number;
}

export const Motor: React.FC<MotorProps> = ({
  component,
  running,
  mode,
  speed,
}) => {
  const { width = 170, height = 185 } = component;
  const cx = width / 2;
  const cy = 105;
  const radius = 38;

  // Rotation animation duration based on speed
  const animDuration = speed > 0 ? `${(100 / speed) * 0.8}s` : "0s";

  const getStatusColor = () => {
    if (mode === "FAULT") return "#ef4444";
    if (mode === "STAR") return "#eab308";
    if (mode === "DELTA") return "#3b82f6";
    return "#64748b";
  };

  return (
    <g transform={`translate(${component.position.x}, ${component.position.y})`}>
      {/* Outer Industrial Housing Frame */}
      <rect
        width={width}
        height={height}
        rx={10}
        fill="#0f172a"
        stroke="#334155"
        strokeWidth={2}
        className="drop-shadow-lg"
      />

      {/* Top Header Title Banner */}
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
        {component.label}
      </text>
      <line x1={0} y1={24} x2={width} y2={24} stroke="#334155" strokeWidth={1} />

      {/* Motor Stator Housing Ring */}
      <circle
        cx={cx}
        cy={cy}
        r={radius + 5}
        fill="#1e293b"
        stroke={getStatusColor()}
        strokeWidth={3}
        className="transition-colors duration-300"
      />

      {/* Rotating Rotor Graphic */}
      <g
        transform={`translate(${cx}, ${cy})`}
        className={running ? "animate-spin" : ""}
        style={{ animationDuration: animDuration }}
      >
        <circle r={radius} fill="#334155" stroke="#475569" strokeWidth={2} />

        {/* Fan Blade Winding Lines */}
        <line x1={-radius + 6} y1={0} x2={radius - 6} y2={0} stroke="#94a3b8" strokeWidth={3} />
        <line x1={0} y1={-radius + 6} x2={0} y2={radius - 6} stroke="#94a3b8" strokeWidth={3} />
        <line x1={-22} y1={-22} x2={22} y2={22} stroke="#64748b" strokeWidth={2} />
        <line x1={-22} y1={22} x2={22} y2={-22} stroke="#64748b" strokeWidth={2} />

        {/* Center Shaft Nut */}
        <circle r={9} fill="#f1f5f9" stroke="#0f172a" strokeWidth={2} />
        <circle r={3.5} fill="#0f172a" />
      </g>

      {/* Mode Badge (STAR / DELTA / STOPPED) */}
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

      {/* Speed Footer Text */}
      <text
        x={width / 2}
        y={150}
        textAnchor="middle"
        fontSize={10}
        fill="#94a3b8"
        className="font-mono font-bold"
      >
        {running ? `${Math.round(speed * 14.5)} RPM` : "MOTOR STOPPED"}
      </text>
    </g>
  );
};
