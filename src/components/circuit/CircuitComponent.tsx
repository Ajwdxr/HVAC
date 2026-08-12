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
  onPushStart,
  onPushStop,
}) => {
  // Render specialized graphic component based on component type
  const renderGraphic = () => {
    switch (component.type) {
      case "MOTOR":
        return (
          <Motor
            component={component}
            running={state.motor.running}
            mode={state.motor.mode}
            speed={state.motor.speed}
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

        return <Contactor component={component} energized={energized} />;
      }

      case "TIMER":
        return (
          <Timer
            component={component}
            elapsed={state.timer.elapsed}
            duration={state.timer.duration}
            running={state.timer.running}
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
          />
        );
      }

      case "LAMP": {
        let isLit = false;
        if (component.id.includes("power")) isLit = state.lamps.power;
        if (component.id.includes("star")) isLit = state.lamps.star;
        if (component.id.includes("delta")) isLit = state.lamps.delta;
        if (component.id.includes("fault")) isLit = state.lamps.fault;

        return <Lamp component={component} lit={isLit} />;
      }

      case "MCB": {
        const { width = 110, height = 120 } = component;
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
            <text
              x={width / 2}
              y={18}
              textAnchor="middle"
              fontSize={11}
              fontWeight="bold"
              fill="#f8fafc"
              className="font-mono tracking-wide"
            >
              {component.label}
            </text>
            {/* Toggle Lever Handle */}
            <rect
              x={width / 2 - 15}
              y={38}
              width={30}
              height={45}
              rx={4}
              fill="#0f172a"
              stroke="#334155"
            />
            <rect
              x={width / 2 - 10}
              y={state.mcb ? 42 : 60}
              width={20}
              height={20}
              rx={3}
              fill={state.mcb ? "#22c55e" : "#ef4444"}
              className="transition-all duration-200"
            />
            <text
              x={width / 2}
              y={state.mcb ? 55 : 73}
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

      case "OVERLOAD": {
        const { width = 130, height = 120 } = component;
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
            <text
              x={width / 2 - 10}
              y={18}
              textAnchor="middle"
              fontSize={11}
              fontWeight="bold"
              fill="#f8fafc"
              className="font-mono tracking-wide"
            >
              {component.label}
            </text>
            <circle cx={35} cy={55} r={14} fill="#0f172a" stroke="#334155" />
            <text x={35} y={59} textAnchor="middle" fontSize={9} fill="#f59e0b" fontWeight="bold">
              AMP
            </text>
            {/* OLR Auxiliary 95-96 Contacts */}
            <rect x={70} y={35} width={45} height={40} rx={4} fill="#0f172a" stroke="#334155" />
            <text x={92} y={58} textAnchor="middle" fontSize={9} fill="#94a3b8" fontWeight="bold">
              95-96 NC
            </text>
          </g>
        );
      }

      case "POWER_SOURCE": {
        const { width = 170, height = 60 } = component;
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
            <text
              x={width / 2}
              y={16}
              textAnchor="middle"
              fontSize={10}
              fontWeight="bold"
              fill="#93c5fd"
              className="font-mono tracking-wide uppercase"
            >
              {component.label}
            </text>
          </g>
        );
      }

      default:
        return null;
    }
  };

  return (
    <g className="circuit-component-group">
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
            onPointerDown={onTerminalPointerDown}
            onPointerUp={onTerminalPointerUp}
          />
        );
      })}
    </g>
  );
};
