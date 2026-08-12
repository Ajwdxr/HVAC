import React from "react";

interface NeoXControlLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const NeoXControlLogo: React.FC<NeoXControlLogoProps> = ({
  size = "md",
  className = "",
}) => {
  const dimensions =
    size === "sm" ? "w-8 h-8" : size === "lg" ? "w-16 h-16" : "w-11 h-11";

  return (
    <div
      className={`relative ${dimensions} bg-[#0c0d12] rounded-xl border-2 border-gradient flex items-center justify-center shadow-lg shadow-amber-500/20 overflow-hidden select-none ${className}`}
      style={{
        borderImage: "linear-gradient(135deg, #e2e8f0 40%, #f59e0b 100%) 1",
      }}
    >
      {/* Background Circuit Traces Graphic */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full p-1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rounded Metallic Outer Border */}
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="18"
          stroke="url(#silver-gold-grad)"
          strokeWidth="4"
        />

        {/* Top Text "NEO" with Power Icon */}
        <text
          x="20"
          y="36"
          fill="#ffffff"
          fontSize="22"
          fontWeight="900"
          fontFamily="monospace"
        >
          NE
        </text>
        {/* Power Icon in Gold */}
        <circle cx="70" cy="28" r="10" stroke="#f59e0b" strokeWidth="4" fill="none" />
        <line x1="70" y1="18" x2="70" y2="28" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />

        {/* Central Bold Gold "X" */}
        <path
          d="M 38 46 L 62 64 M 62 46 L 38 64"
          stroke="#f59e0b"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Circuit Trace Lines Left & Right */}
        <path d="M 8 52 L 24 52 L 30 58 L 34 58" stroke="#f59e0b" strokeWidth="2.5" />
        <circle cx="8" cy="52" r="2.5" fill="#f59e0b" />

        <path d="M 92 52 L 76 52 L 70 58 L 66 58" stroke="#f59e0b" strokeWidth="2.5" />
        <circle cx="92" cy="52" r="2.5" fill="#f59e0b" />

        {/* Bottom Text "CONTROL" */}
        <text
          x="12"
          y="84"
          fill="#ffffff"
          fontSize="17"
          fontWeight="900"
          letterSpacing="1"
          fontFamily="sans-serif"
        >
          CONTROL
        </text>

        {/* Color Gradient Definitions */}
        <defs>
          <linearGradient id="silver-gold-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="60%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
