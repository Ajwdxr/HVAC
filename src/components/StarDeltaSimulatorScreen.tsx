import React, { useState } from "react";
import { useCircuitStore } from "../stores/circuit-store";
import { CircuitCanvas } from "./circuit/CircuitCanvas";
import { StatusPanel } from "./circuit/StatusPanel";
import { Toolbar } from "./circuit/Toolbar";
import { HintPanel } from "./circuit/HintPanel";
import { DrawerNav } from "./DrawerNav";
import { initialStudent } from "../data";
import { ScreenView } from "../types";

interface StarDeltaSimulatorScreenProps {
  onNavigate: (screen: ScreenView) => void;
}

export const StarDeltaSimulatorScreen: React.FC<StarDeltaSimulatorScreenProps> = ({
  onNavigate,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    components,
    wires,
    selectedWireId,
    simulatorState,
    validationResult,
    score,
    activeHint,
    setSelectedWireId,
    updateComponentPosition,
    addWire,
    removeWire,
    clearAllWires,
    dispatchAction,
    setMode,
    requestNextHint,
    setActiveHint,
    setSpeedMultiplier,
  } = useCircuitStore();

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 p-3 sm:p-6 flex flex-col gap-6 font-sans">
      {/* Top Header Navigation Bar */}
      <header className="flex flex-wrap items-center justify-between gap-4 bg-[#0f172a] border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          {/* Side Menu Drawer Toggle Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center"
            title="Buka Menu Tepi"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">electric_bolt</span>
          </div>

          <div>
            <span className="text-[10px] font-mono font-bold text-blue-400 block tracking-widest uppercase">
              SIMULASI INTERAKTIF TVET LITAR KAWALAN & KUASA
            </span>
            <h1 className="text-base sm:text-lg font-bold text-white leading-tight font-mono">
              Penghidup Motor Bintang-Delta (Star-Delta Starter Simulator)
            </h1>
          </div>
        </div>

        {/* Quick Info Badges */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-500/10 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-xl text-xs font-mono font-bold">
            SKOR: {score} / 100
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-xl text-xs font-mono font-bold">
            {validationResult.completion}% SIAP
          </div>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        {/* Left Side 3 Columns: Main SVG Canvas & Toolbar */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <Toolbar
            mode={simulatorState.mode}
            isValid={validationResult.valid}
            selectedWireId={selectedWireId}
            speedMultiplier={simulatorState.speedMultiplier}
            onSetMode={setMode}
            onReset={clearAllWires}
            onDeleteSelectedWire={() => {
              if (selectedWireId) removeWire(selectedWireId);
            }}
            onRequestHint={requestNextHint}
            onSetSpeed={setSpeedMultiplier}
          />

          <CircuitCanvas
            components={components}
            wires={wires}
            state={simulatorState}
            selectedWireId={selectedWireId}
            highlightedTerminals={activeHint?.highlightTerminals}
            onAddWire={addWire}
            onSelectWire={setSelectedWireId}
            onDeleteWire={removeWire}
            onUpdateComponentPosition={updateComponentPosition}
            onPushStart={() => dispatchAction({ type: "START" })}
            onPushStop={() => dispatchAction({ type: "STOP" })}
          />
        </div>

        {/* Right Side 1 Column: Telemetry & Educational Guidance Panel */}
        <div className="flex flex-col gap-4">
          <StatusPanel
            state={simulatorState}
            validation={validationResult}
            score={score}
            onStart={() => dispatchAction({ type: "START" })}
            onStop={() => dispatchAction({ type: "STOP" })}
            onToggleMcb={() => dispatchAction({ type: "TOGGLE_MCB" })}
            onTripOverload={() => dispatchAction({ type: "TRIP_OVERLOAD" })}
            onResetOverload={() => dispatchAction({ type: "RESET_OVERLOAD" })}
          />

          {/* Educational Principles Card */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 text-xs font-sans text-slate-300 flex flex-col gap-2.5 shadow-lg">
            <h4 className="font-mono font-bold text-amber-400 text-xs tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">school</span>
              PRINSIP OPERASI BINTANG-DELTA
            </h4>
            <p className="leading-relaxed">
              Penghidup Bintang-Delta digunakan untuk mengurangkan <b>arus permulaan (starting current)</b> motor 3-fasa sehingga 1/3 daripada nilai Direct-On-Line (DOL).
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400 font-mono text-[11px]">
              <li><b>Fasa Star (Bintang):</b> KM1 & KM2 beroperasi, voltan fasa VL / √3 (240V).</li>
              <li><b>Masa Pemasa (Timer):</b> Membilang 5 saat sebelum pertukaran.</li>
              <li><b>Transition Delay:</b> KM2 dilepaskan dahulu sebelum KM3 dihidupkan (saling kunci / interlock).</li>
              <li><b>Fasa Delta:</b> KM1 & KM3 beroperasi, voltan fasa penuh VL (415V).</li>
            </ol>
          </div>
        </div>
      </main>

      {/* Hint Modal Overlay */}
      <HintPanel hint={activeHint} onClose={() => setActiveHint(null)} />

      {/* Side Menu Drawer (Single Module Focused) */}
      <DrawerNav
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        student={initialStudent}
        onNavigate={onNavigate}
      />
    </div>
  );
};
