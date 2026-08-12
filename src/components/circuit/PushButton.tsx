import React from "react";
import { CircuitComponent } from "../../types/circuit";

interface PushButtonProps {
  component: CircuitComponent;
  pressed: boolean;
  onPress?: () => void;
}

export const PushButton: React.FC<PushButtonProps> = ({
  component,
  pressed,
  onPress,
}) => {
  const { width = 80, height = 90 } = component;
  const isStart = component.id.includes("start");

  const buttonColor = isStart ? "#22c55e" : "#ef4444";
  const hoverColor = isStart ? "#16a34a" : "#dc2626";

  return (
    <g
      transform={`translate(${component.position.x}, ${component.position.y})`}
      className="cursor-pointer group"
      onClick={onPress}
    >
      {/* Industrial Push Button Base Housing */}
      <rect
        width={width}
        height={height}
        rx={8}
        fill="#1e293b"
        stroke="#475569"
        strokeWidth={2}
        className="drop-shadow-md"
      />

      {/* Label */}
      <text
        x={width / 2}
        y={16}
        textAnchor="middle"
        fontSize={10}
        fontWeight="bold"
        fill="#f8fafc"
        className="font-mono tracking-wider"
      >
        {component.label}
      </text>

      {/* Outer Bezel */}
      <circle
        cx={width / 2}
        cy={52}
        r={22}
        fill="#0f172a"
        stroke="#334155"
        strokeWidth={2}
      />

      {/* Spring Loaded Actuator Button Head */}
      <circle
        cx={width / 2}
        cy={52}
        r={pressed ? 16 : 18}
        fill={pressed ? hoverColor : buttonColor}
        stroke="#ffffff"
        strokeWidth={pressed ? 1 : 2}
        className="transition-all duration-150 group-hover:brightness-110 drop-shadow"
      />

      {/* Contact Type Tag (NO / NC) */}
      <text
        x={width / 2}
        y={56}
        textAnchor="middle"
        fontSize={10}
        fontWeight="bold"
        fill="#ffffff"
        className="font-mono select-none pointer-events-none"
      >
        {isStart ? "NO" : "NC"}
      </text>
    </g>
  );
};
