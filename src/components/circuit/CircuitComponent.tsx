import React from "react";
import { CircuitComponent as ICircuitComponent, SimulatorState, Wire } from "../../types/circuit";
import { Terminal } from "./Terminal";
import { Motor } from "./Motor";
import { Contactor } from "./Contactor";
import { Timer } from "./Timer";
import { PushButton } from "./PushButton";
import { Lamp } from "./Lamp";

interface CircuitComponentProps {
  component: ICircuitComponent;
  state: SimulatorState;
  wires: Wire[];
  highlightedTerminals?: string[];
  onTerminalPointerDown: (e: React.PointerEvent, terminalId: string) => void;
  onTerminalPointerUp: (e: React.PointerEvent, terminalId: string) => void;
  onComponentPointerDown?: (e: React.PointerEvent, componentId: string) => void;
  onPushStart?: () => void;
  onPushStop?: () => void;
}

export const CircuitComponent: React.FC<CircuitComponentProps> = ({
  component,
  state,
  wires,
  highlightedTerminals = [],
  onTerminalPointerDown,
  onTerminalPointerUp,
  onComponentPointerDown,
  onPushStart,
  onPushStop,
}) => {
  // Render specialized graphic component based on component type
  const renderGraphic = () => {
    const viewMode = state.viewMode || "REAL";

    switch (component.type) {
      case "MOTOR":
        return (
          <Motor
            component={component}
            running={state.motor.running}
            mode={state.motor.mode}
            speed={state.motor.speed}
            viewMode={viewMode}
          />
        );

      case "CONTACTOR": {
        const isKm1 = component.id === "km1";
        const isKm2 = component.id === "km2";
        const isKm3 = component.id === "km3";

        const energized =
          (isKm1 && state.contactors.KM1) ||
          (isKm2 && state.contactors.KM2) ||
          (isKm3 && state.contactors.KM3);

        return <Contactor component={component} energized={energized} viewMode={viewMode} />;
      }

      case "TIMER":
        return (
          <Timer
            component={component}
            elapsed={state.timer.elapsed}
            duration={state.timer.duration}
            running={state.timer.running}
            viewMode={viewMode}
          />
        );

      case "PUSH_BUTTON": {
        const isStart = component.id.includes("start");
        const isPressed = isStart ? state.startButton : state.stopButton;
        return (
          <PushButton
            component={component}
            pressed={isPressed}
            onPress={isStart ? onPushStart : onPushStop}
            viewMode={viewMode}
          />
        );
      }

      case "LED":
      case "LAMP": {
        let isLit = false;
        if (component.id.includes("power")) isLit = state.lamps.power;
        if (component.id.includes("star")) isLit = state.lamps.star;
        if (component.id.includes("delta")) isLit = state.lamps.delta;
        if (component.id.includes("fault")) isLit = state.lamps.fault;

        return <Lamp component={component} lit={isLit} viewMode={viewMode} />;
      }

      case "MCB": {
        const { width = 120, height = 150 } = component;
        if (viewMode === "VECTOR") {
          return (
            <g transform={`translate(${component.position.x}, ${component.position.y})`}>
              <rect
                width={width}
                height={height}
                rx={8}
                fill="#1e293b"
                stroke={state.mcb ? "#22c55e" : "#475569"}
                strokeWidth={2}
                className="drop-shadow-md"
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
                className="font-mono tracking-wide"
              >
                {component.label || component.name}
              </text>
              <line x1={0} y1={24} x2={width} y2={24} stroke="#334155" strokeWidth={1} />
              <rect
                x={width / 2 - 15}
                y={65}
                width={30}
                height={45}
                rx={4}
                fill="#0f172a"
                stroke="#334155"
              />
              <rect
                x={width / 2 - 10}
                y={state.mcb ? 69 : 87}
                width={20}
                height={20}
                rx={3}
                fill={state.mcb ? "#22c55e" : "#ef4444"}
                className="transition-all duration-200"
              />
              <text
                x={width / 2}
                y={state.mcb ? 82 : 100}
                textAnchor="middle"
                fontSize={8}
                fontWeight="bold"
                fill="#ffffff"
                className="font-mono"
              >
                {state.mcb ? "ON" : "OFF"}
              </text>
            </g>
          );
        }

        // Photorealistic 3-Pole DIN Rail MCB Render
        return (
          <g transform={`translate(${component.position.x}, ${component.position.y})`}>
            <defs>
              <linearGradient id={`mcbGrad-${component.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Main Outer DIN-Rail Casing */}
            <rect
              width={width}
              height={height}
              rx={10}
              fill={`url(#mcbGrad-${component.id})`}
              stroke={state.mcb ? "#22c55e" : "#64748b"}
              strokeWidth={state.mcb ? 2.5 : 1.5}
              className="drop-shadow-2xl transition-all duration-300"
            />

            {/* Top Brand Header */}
            <rect x={6} y={6} width={width - 12} height={22} rx={4} fill="#0d111a" stroke="#1e293b" />
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

            <text x={10} y={38} fontSize={7} fill="#94a3b8" fontWeight="bold" className="font-mono">
              3P MCB C16 400V~
            </text>

            {/* Top Slotted Terminal Screws L1, L2, L3 */}
            {[25, 60, 95].map((xPos, idx) => (
              <g key={`mcb-top-screw-${idx}`} transform={`translate(${xPos}, 45)`}>
                <rect x={-7} y={-6} width={14} height={12} rx={2} fill="#0f172a" stroke="#334155" />
                <circle cx={0} cy={0} r={4.5} fill="#cbd5e1" stroke="#334155" strokeWidth={0.8} />
                <line x1={-3} y1={0} x2={3} y2={0} stroke="#0f172a" strokeWidth={1.2} />
              </g>
            ))}

            {/* Bottom Slotted Terminal Screws L1, L2, L3 */}
            {[25, 60, 95].map((xPos, idx) => (
              <g key={`mcb-bot-screw-${idx}`} transform={`translate(${xPos}, 130)`}>
                <rect x={-7} y={-6} width={14} height={12} rx={2} fill="#0f172a" stroke="#334155" />
                <circle cx={0} cy={0} r={4.5} fill="#cbd5e1" stroke="#334155" strokeWidth={0.8} />
                <line x1={-3} y1={0} x2={3} y2={0} stroke="#0f172a" strokeWidth={1.2} />
              </g>
            ))}

            {/* Toggle Switch Lever Housing Channel */}
            <rect x={width / 2 - 20} y={58} width={40} height={58} rx={5} fill="#090d16" stroke="#334155" strokeWidth={1.5} />

            {/* Physical 3-Pole Toggle Lever (Switches Up/Down) */}
            <g transform={`translate(${width / 2 - 15}, ${state.mcb ? 62 : 88})`} className="transition-all duration-200">
              <rect
                width={30}
                height={26}
                rx={4}
                fill={state.mcb ? "#16a34a" : "#dc2626"}
                stroke="#ffffff"
                strokeWidth={1.5}
                className="drop-shadow-md"
              />
              <line x1={4} y1={13} x2={26} y2={13} stroke="#ffffff" strokeWidth={2} opacity={0.6} />
              <text x={15} y={17} textAnchor="middle" fontSize={9} fontWeight="900" fill="#ffffff" className="font-mono">
                {state.mcb ? "I" : "O"}
              </text>
            </g>

            {/* Mechanical Status Flag Window */}
            <rect x={10} y={64} width={12} height={10} rx={2} fill={state.mcb ? "#ef4444" : "#22c55e"} stroke="#000000" strokeWidth={1} />
            <text x={16} y={72} textAnchor="middle" fontSize={6} fontWeight="bold" fill="#ffffff" className="font-mono">
              {state.mcb ? "ON" : "OFF"}
            </text>
          </g>
        );
      }

      case "OVERLOAD": {
        const { width = 140, height = 150 } = component;
        if (viewMode === "VECTOR") {
          return (
            <g transform={`translate(${component.position.x}, ${component.position.y})`}>
              <rect
                width={width}
                height={height}
                rx={8}
                fill="#1e293b"
                stroke={state.overload ? "#ef4444" : "#475569"}
                strokeWidth={2}
                className="drop-shadow-md"
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
                className="font-mono tracking-wide"
              >
                {component.label || component.name}
              </text>
              <line x1={0} y1={24} x2={width} y2={24} stroke="#334155" strokeWidth={1} />

              <circle cx={35} cy={75} r={14} fill="#0f172a" stroke="#334155" />
              <text x={35} y={79} textAnchor="middle" fontSize={9} fill="#f59e0b" fontWeight="bold">
                AMP
              </text>

              <rect x={70} y={65} width={48} height={42} rx={4} fill="#0f172a" stroke="#334155" />
              <text x={94} y={89} textAnchor="middle" fontSize={9} fill="#94a3b8" fontWeight="bold">
                95-96 NC
              </text>
            </g>
          );
        }

        // Photorealistic Thermal Overload Relay (OLR / GBL) Render
        return (
          <g transform={`translate(${component.position.x}, ${component.position.y})`}>
            <defs>
              <linearGradient id={`olrGrad-${component.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#252e3d" />
                <stop offset="50%" stopColor="#171e29" />
                <stop offset="100%" stopColor="#0b0f17" />
              </linearGradient>
            </defs>

            <rect
              width={width}
              height={height}
              rx={10}
              fill={`url(#olrGrad-${component.id})`}
              stroke={state.overload ? "#ef4444" : "#475569"}
              strokeWidth={state.overload ? 2.5 : 1.5}
              className="drop-shadow-2xl transition-all duration-300"
            />

            <rect x={6} y={6} width={width - 12} height={22} rx={4} fill="#0d111a" stroke="#1e293b" />
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

            {/* Top Terminals 1/L1, 3/L2, 5/L3 */}
            {[22, 55, 88].map((xPos, idx) => (
              <g key={`olr-top-screw-${idx}`} transform={`translate(${xPos}, 45)`}>
                <rect x={-7} y={-6} width={14} height={12} rx={2} fill="#0f172a" stroke="#334155" />
                <circle cx={0} cy={0} r={4.5} fill="#cbd5e1" stroke="#334155" strokeWidth={0.8} />
                <line x1={-3} y1={0} x2={3} y2={0} stroke="#0f172a" strokeWidth={1.2} />
              </g>
            ))}

            {/* Bottom Terminals 2/T1, 4/T2, 6/T3 */}
            {[22, 55, 88].map((xPos, idx) => (
              <g key={`olr-bot-screw-${idx}`} transform={`translate(${xPos}, 130)`}>
                <rect x={-7} y={-6} width={14} height={12} rx={2} fill="#0f172a" stroke="#334155" />
                <circle cx={0} cy={0} r={4.5} fill="#cbd5e1" stroke="#334155" strokeWidth={0.8} />
                <line x1={-3} y1={0} x2={3} y2={0} stroke="#0f172a" strokeWidth={1.2} />
              </g>
            ))}

            {/* Auxiliary 95-96 NC & 97-98 NO Terminals Right */}
            <g transform="translate(118, 45)">
              <circle cx={0} cy={0} r={4} fill="#cbd5e1" stroke="#334155" strokeWidth={0.8} />
              <line x1={-2.5} y1={0} x2={2.5} y2={0} stroke="#0f172a" strokeWidth={1} />
            </g>
            <g transform="translate(118, 110)">
              <circle cx={0} cy={0} r={4} fill="#cbd5e1" stroke="#334155" strokeWidth={0.8} />
              <line x1={-2.5} y1={0} x2={2.5} y2={0} stroke="#0f172a" strokeWidth={1} />
            </g>

            {/* Amp Current Adjustment Rotary Dial */}
            <g transform="translate(32, 85)">
              <circle cx={0} cy={0} r={18} fill="#090d16" stroke="#f59e0b" strokeWidth={1.5} />
              <circle cx={0} cy={0} r={12} fill="#cbd5e1" stroke="#334155" />
              <line x1={-6} y1={-6} x2={6} y2={6} stroke="#0f172a" strokeWidth={2} />
              <text x={0} y={-21} textAnchor="middle" fontSize={7} fill="#f59e0b" fontWeight="bold" className="font-mono">
                SET (12-18A)
              </text>
            </g>

            {/* Manual STOP (RED) and RESET (BLUE) Push Buttons */}
            <g transform="translate(72, 75)">
              <circle cx={0} cy={0} r={7} fill="#ef4444" stroke="#ffffff" strokeWidth={1} />
              <text x={0} y={13} textAnchor="middle" fontSize={6} fill="#f87171" fontWeight="bold" className="font-mono">
                TEST
              </text>
            </g>
            <g transform="translate(94, 75)">
              <circle cx={0} cy={0} r={7} fill="#3b82f6" stroke="#ffffff" strokeWidth={1} />
              <text x={0} y={13} textAnchor="middle" fontSize={6} fill="#60a5fa" fontWeight="bold" className="font-mono">
                RESET
              </text>
            </g>

            {/* Overload Tripped Indicator Status */}
            <rect
              x={64}
              y={98}
              width={42}
              height={14}
              rx={3}
              fill={state.overload ? "#7f1d1d" : "#090d16"}
              stroke={state.overload ? "#ef4444" : "#334155"}
            />
            <text
              x={85}
              y={108}
              textAnchor="middle"
              fontSize={7}
              fontWeight="900"
              fill={state.overload ? "#f87171" : "#475569"}
              className="font-mono tracking-wider"
            >
              {state.overload ? "TRIPPED" : "OK"}
            </text>
          </g>
        );
      }

      case "POWER_SOURCE": {
        const { width = 190, height = 75 } = component;
        if (viewMode === "VECTOR") {
          return (
            <g transform={`translate(${component.position.x}, ${component.position.y})`}>
              <rect
                width={width}
                height={height}
                rx={8}
                fill="#0f172a"
                stroke="#3b82f6"
                strokeWidth={2}
                className="drop-shadow-md"
              />
              <path
                d={`M 0 8 A 8 8 0 0 1 8 0 L ${width - 8} 0 A 8 8 0 0 1 ${width} 8 L ${width} 22 L 0 22 Z`}
                fill="#1e293b"
              />
              <text
                x={width / 2}
                y={15}
                textAnchor="middle"
                fontSize={10}
                fontWeight="bold"
                fill="#93c5fd"
                className="font-mono tracking-wide uppercase"
              >
                {component.label || component.name}
              </text>
              <line x1={0} y1={22} x2={width} y2={22} stroke="#3b82f6" strokeWidth={1} opacity={0.5} />
            </g>
          );
        }

        // Photorealistic 3-Phase Main Power Supply Isolator Unit
        return (
          <g transform={`translate(${component.position.x}, ${component.position.y})`}>
            <defs>
              <linearGradient id={`pwrGrad-${component.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="60%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#070a0f" />
              </linearGradient>
            </defs>

            <rect
              width={width}
              height={height}
              rx={10}
              fill={`url(#pwrGrad-${component.id})`}
              stroke="#3b82f6"
              strokeWidth={2}
              className="drop-shadow-2xl"
            />

            {/* Header Title */}
            <rect x={6} y={5} width={width - 12} height={18} rx={4} fill="#070a0f" stroke="#1e293b" />
            <text
              x={width / 2}
              y={17}
              textAnchor="middle"
              fontSize={9.5}
              fontWeight="900"
              fill="#93c5fd"
              className="font-mono tracking-wider uppercase"
            >
              {component.label || component.name} (3-PHASE 415V / 240V AC)
            </text>

            {/* Phase Terminal Screw Blocks (L1, L2, L3, N) */}
            {[25, 70, 115, 160].map((xPos, idx) => (
              <g key={`pwr-screw-${idx}`} transform={`translate(${xPos}, 48)`}>
                <rect x={-8} y={-7} width={16} height={14} rx={3} fill="#090d16" stroke="#3b82f6" strokeWidth={1} />
                <circle cx={0} cy={0} r={5} fill="#fbbf24" stroke="#78350f" strokeWidth={0.8} />
                <line x1={-3} y1={0} x2={3} y2={0} stroke="#451a03" strokeWidth={1.2} />
              </g>
            ))}

            {/* Digital Voltmeter Status Badge */}
            <rect x={width - 48} y={26} width={42} height={14} rx={3} fill="#000000" stroke="#3b82f6" />
            <text x={width - 27} y={36} textAnchor="middle" fontSize={7.5} fontWeight="900" fill="#22c55e" className="font-mono">
              415V AC
            </text>
          </g>
        );
      }

      default:
        return null;
    }
  };

  const isDesign = state.mode === "DESIGN";

  return (
    <g
      className={`circuit-component-group ${
        isDesign ? "cursor-grab active:cursor-grabbing" : ""
      }`}
      onPointerDown={(e) => {
        if (isDesign && typeof onComponentPointerDown === "function") {
          onComponentPointerDown(e, component.id);
        }
      }}
    >
      {/* Component Main Graphic */}
      {renderGraphic()}

      {/* Render Component Terminals */}
      {component.terminals.map((term) => {
        const isConnected = wires.some(
          (w) => w.from === term.id || w.to === term.id
        );
        const isHighlighted = highlightedTerminals.includes(term.id);

        return (
          <Terminal
            key={term.id}
            terminal={term}
            componentX={component.position.x}
            componentY={component.position.y}
            isConnected={isConnected}
            isHighlighted={isHighlighted}
            onTerminalPointerDown={onTerminalPointerDown}
            onTerminalPointerUp={onTerminalPointerUp}
          />
        );
      })}
    </g>
  );
};
