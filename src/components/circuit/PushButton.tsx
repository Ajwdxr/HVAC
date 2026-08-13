import React from "react";
import { CircuitComponent } from "../../types/circuit";

interface PushButtonProps {
  component: CircuitComponent;
  pressed: boolean;
  onPress?: () => void;
  viewMode?: "REAL" | "VECTOR";
}

export const PushButton: React.FC<PushButtonProps> = ({
  component,
  pressed,
  onPress,
  viewMode = "REAL",
}) => {
  const { width = 95, height = 115 } = component;
  const isStart = component.id.includes("start");

  const buttonColor = isStart ? "#22c55e" : "#ef4444";
  const hoverColor = isStart ? "#16a34a" : "#dc2626";

  if (viewMode === "VECTOR") {
    return (
      <g
        transform={`translate(${component.position.x}, ${component.position.y})`}
        className="cursor-pointer group"
        onClick={onPress}
      >
        <rect
          width={width}
          height={height}
          rx={8}
          fill="#1e293b"
          stroke="#475569"
          strokeWidth={2}
          className="drop-shadow-md"
        />

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
          {component.label || component.name}
        </text>
        <line x1={0} y1={22} x2={width} y2={22} stroke="#334155" strokeWidth={1} />

        <circle
          cx={width / 2}
          cy={70}
          r={20}
          fill="#0f172a"
          stroke="#334155"
          strokeWidth={2}
        />

        <circle
          cx={width / 2}
          cy={70}
          r={pressed ? 15 : 17}
          fill={pressed ? hoverColor : buttonColor}
          stroke="#ffffff"
          strokeWidth={pressed ? 1 : 2}
          className="transition-all duration-150 group-hover:brightness-110 drop-shadow"
        />

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
  }

  // Ultra-Realistic Industrial Push Button Station Box
  return (
    <g
      transform={`translate(${component.position.x}, ${component.position.y})`}
      className="cursor-pointer group"
      onClick={onPress}
    >
      <defs>
        <radialGradient id={`btnBezel-${component.id}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
        <radialGradient id={`btnCap-${component.id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={isStart ? "#86efac" : "#fca5a5"} />
          <stop offset="50%" stopColor={buttonColor} />
          <stop offset="100%" stopColor={isStart ? "#14532d" : "#7f1d1d"} />
        </radialGradient>
      </defs>

      {/* Industrial Yellow/Dark Heavy Enclosure */}
      <rect
        width={width}
        height={height}
        rx={10}
        fill="#1e2430"
        stroke={isStart ? "#22c55e" : "#ef4444"}
        strokeWidth={1.5}
        className="drop-shadow-2xl transition-all duration-200"
      />

      {/* Top Screw Terminals (IN Contact) */}
      <g transform={`translate(${width / 2}, 38)`}>
        <circle cx={0} cy={0} r={4.5} fill="#cbd5e1" stroke="#334155" strokeWidth={0.8} />
        <line x1={-3} y1={0} x2={3} y2={0} stroke="#0f172a" strokeWidth={1.2} />
      </g>

      {/* Bottom Screw Terminals (OUT Contact) */}
      <g transform={`translate(${width / 2}, 100)`}>
        <circle cx={0} cy={0} r={4.5} fill="#cbd5e1" stroke="#334155" strokeWidth={0.8} />
        <line x1={-3} y1={0} x2={3} y2={0} stroke="#0f172a" strokeWidth={1.2} />
      </g>

      {/* Chrome Bezel Ring */}
      <circle cx={width / 2} cy={70} r={23} fill={`url(#btnBezel-${component.id})`} stroke="#1e293b" strokeWidth={1.5} />
      <circle cx={width / 2} cy={70} r={19} fill="#0d111a" stroke="#334155" strokeWidth={1} />

      {/* Tactile Button Head (Compresses on press) */}
      <circle
        cx={width / 2}
        cy={70}
        r={pressed ? 14 : 17}
        fill={`url(#btnCap-${component.id})`}
        stroke="#ffffff"
        strokeWidth={pressed ? 0.8 : 1.5}
        className="transition-all duration-150 group-hover:brightness-110 drop-shadow-md"
      />

      {/* Button Type Text Label */}
      <text
        x={width / 2}
        y={ pressed ? 73 : 73.5 }
        textAnchor="middle"
        fontSize={10}
        fontWeight="900"
        fill="#ffffff"
        className="font-mono select-none pointer-events-none tracking-wider"
      >
        {isStart ? "START" : "STOP"}
      </text>

      {/* Component Title Banner Top */}
      <rect x={6} y={6} width={width - 12} height={18} rx={4} fill="#0d111a" stroke="#1e293b" />
      <text
        x={width / 2}
        y={18}
        textAnchor="middle"
        fontSize={9}
        fontWeight="900"
        fill={isStart ? "#4ade80" : "#f87171"}
        className="font-mono tracking-wider"
      >
        {component.label || component.name}
      </text>
    </g>
  );
};

