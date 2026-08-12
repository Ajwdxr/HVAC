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
  const { width = 95, height = 115 } = component;
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

      {/* Top Header Title Banner */}
      <path
        d={`M 0 8 A 8 8 0 0 1 8 0 L ${width - 8} 0 A 8 8 0 0 1 ${width} 8 L ${width} 22 L 0 22 Z`}
        fill="#0f172a"
      />
      <text
        x={width / 2}
        y={15}
        textAnchor="middle"
        fontSize={10}
        fontWeight="bold"
        fill="#38bdf8"
        className="font-mono tracking-wider"
      >
        {component.label}
      </text>
      <line x1={0} y1={22} x2={width} y2={22} stroke="#334155" strokeWidth={1} />

      {/* Outer Bezel Ring */}
      <circle
        cx={width / 2}
        cy={70}
        r={20}
        fill="#0f172a"
        stroke="#334155"
        strokeWidth={2}
      />

      {/* Spring Loaded Actuator Button Head */}
      <circle
        cx={width / 2}
        cy={70}
        r={pressed ? 15 : 17}
        fill={pressed ? hoverColor : buttonColor}
        stroke="#ffffff"
        strokeWidth={pressed ? 1 : 2}
        className="transition-all duration-150 group-hover:brightness-110 drop-shadow"
      />

      {/* Contact Type Label inside button head */}
      <text
        x={width / 2}
        y={73.5}
        textAnchor="middle"
        fontSize={9}
        fontWeight="bold"
        fill="#ffffff"
        className="font-mono select-none pointer-events-none"
      >
        {isStart ? "NO" : "NC"}
      </text>
    </g>
  );
};
