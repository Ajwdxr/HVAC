import React, { useState, useRef, useCallback } from "react";
import {
  CircuitComponent as ICircuitComponent,
  Wire as IWire,
  SimulatorState,
  DraftWire,
} from "../../types/circuit";
import { CircuitComponent } from "./CircuitComponent";
import { Wire } from "./Wire";
import {
  getTerminalAbsolutePosition,
  generateWirePath,
  getWireColor,
} from "../../lib/circuit-utils";

interface CircuitCanvasProps {
  components: ICircuitComponent[];
  wires: IWire[];
  state: SimulatorState;
  selectedWireId: string | null;
  highlightedTerminals?: string[];
  onAddWire: (fromId: string, toId: string) => void;
  onSelectWire: (wireId: string | null) => void;
  onDeleteWire: (wireId: string) => void;
  onPushStart?: () => void;
  onPushStop?: () => void;
}

export const CircuitCanvas: React.FC<CircuitCanvasProps> = ({
  components,
  wires,
  state,
  selectedWireId,
  highlightedTerminals = [],
  onAddWire,
  onSelectWire,
  onDeleteWire,
  onPushStart,
  onPushStop,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Zoom & Pan state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Active wire drawing state
  const [draftWire, setDraftWire] = useState<DraftWire | null>(null);

  // Convert client pointer coordinates to SVG coordinate space
  const getSvgCoordinates = useCallback(
    (e: React.PointerEvent | PointerEvent) => {
      if (!svgRef.current) return { x: 0, y: 0 };
      const rect = svgRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      return {
        x: (clientX - pan.x) / zoom,
        y: (clientY - pan.y) / zoom,
      };
    },
    [pan, zoom]
  );

  // Terminal Pointer Down: Start wire creation
  const handleTerminalPointerDown = (
    e: React.PointerEvent,
    terminalId: string
  ) => {
    e.stopPropagation();
    const coords = getSvgCoordinates(e);
    setDraftWire({
      fromTerminalId: terminalId,
      currentX: coords.x,
      currentY: coords.y,
    });
  };

  // Terminal Pointer Up: Complete wire creation
  const handleTerminalPointerUp = (
    e: React.PointerEvent,
    terminalId: string
  ) => {
    e.stopPropagation();
    if (draftWire && draftWire.fromTerminalId !== terminalId) {
      onAddWire(draftWire.fromTerminalId, terminalId);
    }
    setDraftWire(null);
  };

  // Canvas Pointer Move
  const handlePointerMove = (e: React.PointerEvent) => {
    if (draftWire) {
      const coords = getSvgCoordinates(e);
      setDraftWire({ ...draftWire, currentX: coords.x, currentY: coords.y });
    } else if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  // Canvas Pointer Up: Cancel draft wire or end pan
  const handlePointerUp = () => {
    if (draftWire) {
      setDraftWire(null);
    }
    if (isPanning) {
      setIsPanning(false);
    }
  };

  // Background Pan Start
  const handleCanvasPointerDown = (e: React.PointerEvent) => {
    // Only pan if clicking on empty background
    if (e.target === svgRef.current || (e.target as HTMLElement).tagName === "rect") {
      onSelectWire(null);
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  // Compute preview curve for draft wire
  const renderDraftWire = () => {
    if (!draftWire) return null;

    let p1 = { x: 0, y: 0 };
    let startTerm;
    for (const comp of components) {
      for (const term of comp.terminals) {
        if (term.id === draftWire.fromTerminalId) {
          p1 = getTerminalAbsolutePosition(comp, term);
          startTerm = term;
        }
      }
    }

    const p2 = { x: draftWire.currentX, y: draftWire.currentY };
    const d = generateWirePath(p1, p2);
    const color = getWireColor(startTerm);

    return (
      <g className="draft-wire-group pointer-events-none">
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeDasharray="6,4"
          className="animate-pulse"
        />
        <circle cx={p2.x} cy={p2.y} r={6} fill={color} stroke="#ffffff" strokeWidth={1.5} />
      </g>
    );
  };

  return (
    <div className="relative w-full h-[640px] md:h-[720px] bg-[#090d16] border border-[#334155] rounded-2xl overflow-hidden shadow-2xl select-none">
      {/* Zoom / Pan Controls Floating Overlay */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#0f172a]/90 backdrop-blur border border-slate-700 p-1.5 rounded-xl shadow-lg">
        <button
          onClick={() => setZoom((z) => Math.min(2, z + 0.15))}
          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center transition"
          title="Zoom In"
        >
          +
        </button>
        <span className="text-xs font-mono font-bold text-slate-300 px-1 min-w-[42px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.15))}
          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center transition"
          title="Zoom Out"
        >
          -
        </button>
        <button
          onClick={() => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center transition ml-1"
          title="Reset View"
        >
          ⟲
        </button>
      </div>

      {/* Main SVG Workspace */}
      <svg
        ref={svgRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handleCanvasPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* SVG Grid Pattern */}
        <defs>
          <pattern
            id="circuit-grid"
            width={30}
            height={30}
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="#1e293b"
              strokeWidth={1}
            />
            <circle cx={0} cy={0} r={1} fill="#334155" />
          </pattern>
        </defs>

        {/* Viewport Transform Container */}
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {/* Background Grid */}
          <rect width={1600} height={1200} fill="url(#circuit-grid)" />

          {/* Connected Wires Layer */}
          <g className="wires-layer">
            {wires.map((wire) => {
              // Determine if electricity flows through wire based on contactor/state machine
              const isKm1Active = state.contactors.KM1;
              const isKm2Active = state.contactors.KM2;
              const isKm3Active = state.contactors.KM3;

              let isWireEnergized = false;

              if (state.machine !== "OFF" && state.machine !== "FAULT" && state.mcb) {
                if (wire.from.includes("L1") || wire.to.includes("L1") ||
                    wire.from.includes("L2") || wire.to.includes("L2") ||
                    wire.from.includes("L3") || wire.to.includes("L3")) {
                  isWireEnergized = true;
                }
                if (wire.from.includes("KM2") || wire.to.includes("KM2")) {
                  isWireEnergized = isKm2Active;
                }
                if (wire.from.includes("KM3") || wire.to.includes("KM3")) {
                  isWireEnergized = isKm3Active;
                }
              }

              const wireWithState = { ...wire, active: isWireEnergized };

              return (
                <Wire
                  key={wire.id}
                  wire={wireWithState}
                  components={components}
                  isSelected={selectedWireId === wire.id}
                  onSelect={onSelectWire}
                  onDelete={onDeleteWire}
                />
              );
            })}
          </g>

          {/* Interactive Components Layer */}
          <g className="components-layer">
            {components.map((comp) => (
              <CircuitComponent
                key={comp.id}
                component={comp}
                state={state}
                wires={wires}
                highlightedTerminals={highlightedTerminals}
                onTerminalPointerDown={handleTerminalPointerDown}
                onTerminalPointerUp={handleTerminalPointerUp}
                onPushStart={onPushStart}
                onPushStop={onPushStop}
              />
            ))}
          </g>

          {/* Draft Wire Creation Layer */}
          {renderDraftWire()}
        </g>
      </svg>
    </div>
  );
};
