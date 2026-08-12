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
  const { width = 150, height = 160 } = component;
  const cx = width / 2;
  const cy = height / 2 + 10;
  const radius = 42;

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
      {/* Outer Industrial Enclosure Frame */}
      <rect
        width={width}
        height={height}
        rx={10}
        fill="#0f172a"
        stroke="#334155"
        strokeWidth={2}
        className="drop-shadow-lg"
      />

      {/* Header Title */}
      <text
        x={width / 2}
        y={16}
        textAnchor="middle"
        fontSize={11}
        fontWeight="bold"
        fill="#f8fafc"
        className="font-mono uppercase tracking-wider"
      >
        {component.label}
      </text>

      {/* Motor Circular Stator Housing */}
      <circle
        cx={cx}
        cy={cy}
        r={radius + 6}
        fill="#1e293b"
        stroke={getStatusColor()}
        strokeWidth={3}
        className="transition-colors duration-300"
      />

      {/* Rotating Rotor Graphic */}
      <g
        transform={`translate(${cx}, ${cy})`}
        className={running ? "animate-spin" : ""}
        style={{
          animationDuration: animDuration,
        }}
      >
        <circle r={radius} fill="#334155" stroke="#475569" strokeWidth={2} />

        {/* Rotor Fan Blades / Winding Lines */}
        <line x1={-radius + 8} y1={0} x2={radius - 8} y2={0} stroke="#94a3b8" strokeWidth={3} />
        <line x1={0} y1={-radius + 8} x2={0} y2={radius - 8} stroke="#94a3b8" strokeWidth={3} />
        <line x1={-25} y1={-25} x2={25} y2={25} stroke="#64748b" strokeWidth={2} />
        <line x1={-25} y1={25} x2={25} y2={-25} stroke="#64748b" strokeWidth={2} />

        {/* Center Shaft Nut */}
        <circle r={10} fill="#f1f5f9" stroke="#0f172a" strokeWidth={2} />
        <circle r={4} fill="#0f172a" />
      </g>

      {/* Mode Badge (STAR / DELTA / STOPPED) */}
      <rect
        x={cx - 35}
        y={cy - 12}
        width={70}
        height={24}
        rx={6}
        fill={getStatusColor()}
        className="opacity-90"
      />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight="bold"
        fill="#ffffff"
        className="font-mono tracking-wider"
      >
        {mode}
      </text>

      {/* Speed & Status Text Footer */}
      <text
        x={width / 2}
        y={height - 8}
        textAnchor="middle"
        fontSize={10}
        fill="#94a3b8"
        className="font-mono"
      >
        {running ? `${Math.round(speed * 14.5)} RPM (${mode})` : "MOTOR STOPPED"}
      </text>
    </g>
  );
};
