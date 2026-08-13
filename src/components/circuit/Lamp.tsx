import React from "react";
import { CircuitComponent } from "../../types/circuit";

interface LampProps {
  component: CircuitComponent;
  lit: boolean;
  viewMode?: "REAL" | "VECTOR";
}

export const Lamp: React.FC<LampProps> = ({ component, lit, viewMode = "REAL" }) => {
  const { width = 80, height = 105 } = component;

  const getLedColor = () => {
    if (component.id.includes("power")) return "#22c55e"; // Green LED
    if (component.id.includes("star")) return "#eab308";  // Yellow LED
    if (component.id.includes("delta")) return "#3b82f6"; // Blue LED
    return "#ef4444"; // Fault Red LED
  };

  const ledColor = getLedColor();

  if (viewMode === "VECTOR") {
    return (
      <g transform={`translate(${component.position.x}, ${component.position.y})`}>
        <rect
          width={width}
          height={height}
          rx={8}
          fill="#12141c"
          stroke={lit ? ledColor : "#334155"}
          strokeWidth={lit ? 2 : 1.5}
          className="drop-shadow-md transition-colors duration-300"
        />

        <path
          d={`M 0 8 A 8 8 0 0 1 8 0 L ${width - 8} 0 A 8 8 0 0 1 ${width} 8 L ${width} 24 L 0 24 Z`}
          fill="#0a0b0e"
        />
        <text
          x={width / 2}
          y={16}
          textAnchor="middle"
          fontSize={10}
          fontWeight="bold"
          fill="#f59e0b"
          className="font-mono uppercase tracking-wider"
        >
          {component.label || component.name}
        </text>
        <line x1={0} y1={24} x2={width} y2={24} stroke="#334155" strokeWidth={1} />

        {lit && (
          <circle
            cx={width / 2}
            cy={64}
            r={22}
            fill={ledColor}
            opacity={0.35}
            className="animate-pulse"
          />
        )}

        <circle
          cx={width / 2}
          cy={64}
          r={16}
          fill="#0a0b0e"
          stroke="#334155"
          strokeWidth={1.5}
        />

        <circle
          cx={width / 2}
          cy={64}
          r={12}
          fill={lit ? ledColor : "#1e293b"}
          stroke={lit ? "#ffffff" : "#475569"}
          strokeWidth={lit ? 2 : 1}
          className="transition-colors duration-300"
        />

        <circle cx={width / 2 - 3} cy={61} r={3.5} fill="#ffffff" opacity={lit ? 0.85 : 0.15} />

        <text x={10} y={40} fontSize={8} fill="#94a3b8" fontWeight="bold" className="font-mono">
          X1
        </text>
        <text x={10} y={88} fontSize={8} fill="#94a3b8" fontWeight="bold" className="font-mono">
          X2
        </text>
      </g>
    );
  }

  // Ultra-Realistic 22mm Industrial LED Pilot Indicator Render
  return (
    <g transform={`translate(${component.position.x}, ${component.position.y})`}>
      <defs>
        <radialGradient id={`lampBezel-${component.id}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
        <radialGradient id={`lampLens-${component.id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={lit ? "#ffffff" : "#475569"} />
          <stop offset="60%" stopColor={lit ? ledColor : "#1e293b"} />
          <stop offset="100%" stopColor={lit ? ledColor : "#0f172a"} />
        </radialGradient>
        <filter id={`lampGlow-${component.id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main Base Unit Casing */}
      <rect
        width={width}
        height={height}
        rx={10}
        fill="#0b0e14"
        stroke={lit ? ledColor : "#334155"}
        strokeWidth={lit ? 2.5 : 1.5}
        className="drop-shadow-2xl transition-all duration-300"
      />

      {/* Top Header Label */}
      <rect x={5} y={5} width={width - 10} height={18} rx={4} fill="#05070a" stroke="#1e293b" />
      <text
        x={width / 2}
        y={17}
        textAnchor="middle"
        fontSize={9}
        fontWeight="900"
        fill={lit ? ledColor : "#f59e0b"}
        className="font-mono tracking-wider uppercase"
      >
        {component.label || component.name}
      </text>

      {/* Screw Terminals (Top X1, Bottom X2) */}
      <g transform={`translate(${width / 2}, 34)`}>
        <circle cx={0} cy={0} r={4} fill="#cbd5e1" stroke="#334155" strokeWidth={0.8} />
        <line x1={-2.5} y1={0} x2={2.5} y2={0} stroke="#0f172a" strokeWidth={1} />
      </g>
      <g transform={`translate(${width / 2}, 90)`}>
        <circle cx={0} cy={0} r={4} fill="#cbd5e1" stroke="#334155" strokeWidth={0.8} />
        <line x1={-2.5} y1={0} x2={2.5} y2={0} stroke="#0f172a" strokeWidth={1} />
      </g>

      {/* Radiant Lens-Flare Halo Effect when Lit */}
      {lit && (
        <circle
          cx={width / 2}
          cy={62}
          r={26}
          fill={ledColor}
          opacity={0.55}
          filter={`url(#lampGlow-${component.id})`}
          className="animate-pulse"
        />
      )}

      {/* Chrome Bezel Outer Ring */}
      <circle cx={width / 2} cy={62} r={20} fill={`url(#lampBezel-${component.id})`} stroke="#0f172a" strokeWidth={1.5} />
      <circle cx={width / 2} cy={62} r={16} fill="#06090e" stroke="#1e293b" strokeWidth={1} />

      {/* Faceted Fresnel Glass Lens Bulb */}
      <circle
        cx={width / 2}
        cy={62}
        r={14}
        fill={`url(#lampLens-${component.id})`}
        stroke={lit ? "#ffffff" : "#475569"}
        strokeWidth={lit ? 1.5 : 1}
        className="transition-all duration-300 drop-shadow-md"
      />

      {/* Glass Reflection Highlight Curve */}
      <path
        d={`M ${width / 2 - 8} 57 A 9 9 0 0 1 ${width / 2 + 5} 55`}
        fill="none"
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={lit ? 0.9 : 0.3}
      />
    </g>
  );
};

