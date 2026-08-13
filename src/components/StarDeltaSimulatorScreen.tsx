import React, { useState } from "react";
import { useCircuitStore } from "../stores/circuit-store";
import { CircuitCanvas } from "./circuit/CircuitCanvas";
import { StatusPanel } from "./circuit/StatusPanel";
import { Toolbar } from "./circuit/Toolbar";
import { HintPanel } from "./circuit/HintPanel";
import { DrawerNav } from "./DrawerNav";
import { NeoXControlLogo } from "./NeoXControlLogo";
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
    autoConnectCircuit,
    removeWire,
    clearAllWires,
    dispatchAction,
    setMode,
    requestNextHint,
    setActiveHint,
    setSpeedMultiplier,
  } = useCircuitStore();

  return (
    <div className="min-h-screen bg-[#07080b] text-slate-100 p-3 sm:p-6 flex flex-col gap-6 font-sans">
      {/* Top Header Navigation Bar (NEO X CONTROL Brand Header) */}
      <header className="flex flex-wrap items-center justify-between gap-4 bg-[#0d0e14] border border-[#f59e0b]/30 p-4 rounded-2xl shadow-xl shadow-amber-500/5 relative overflow-hidden">
        {/* Subtle Top Gold Highlight Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-slate-200 via-amber-500 to-slate-200" />

        <div className="flex items-center gap-3.5">
          {/* Side Menu Drawer Toggle Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 transition flex items-center justify-center shadow-sm"
            title="Buka Menu Tepi NEO X CONTROL"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          {/* NEO X CONTROL Logo Badge */}
          <NeoXControlLogo size="md" />

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[14px] sm:text-[16px] font-black tracking-wider text-white font-mono uppercase">
                NEO <span className="text-amber-500 font-extrabold">X</span> CONTROL
              </span>
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">
                SIMULATOR
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Penghidup Motor Bintang-Delta (Star-Delta Starter)
            </p>
          </div>
        </div>

        {/* Quick Info Badges */}
        <div className="flex items-center gap-2">
          {/* LED Connection Indicator Badge */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold border transition-all ${
              validationResult.valid
                ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/60 shadow-[0_0_12px_rgba(34,197,94,0.3)]"
                : "bg-slate-900 text-amber-300 border-amber-500/30"
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                validationResult.valid
                  ? "bg-emerald-400 animate-ping"
                  : "bg-amber-400"
              }`}
            ></span>
            <span>{validationResult.valid ? "LED: BETUL 🟢" : "LED: CHK 🔴"}</span>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-xl text-xs font-mono font-bold">
            SKOR: {score} / 100
          </div>
          <div className="bg-slate-900 border border-slate-700 text-slate-200 px-3 py-1 rounded-xl text-xs font-mono font-bold">
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
            viewMode={simulatorState.viewMode}
            onSetMode={setMode}
            onAutoConnect={autoConnectCircuit}
            onReset={clearAllWires}
            onDeleteSelectedWire={() => {
              if (selectedWireId) removeWire(selectedWireId);
            }}
            onRequestHint={requestNextHint}
            onSetSpeed={setSpeedMultiplier}
            onSetViewMode={(v) => dispatchAction({ type: "SET_VIEW_MODE", viewMode: v })}
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

          {/* NEO X CONTROL Principles Card */}
          <div className="bg-[#0d0e14] border border-[#f59e0b]/30 rounded-xl p-4 text-xs font-sans text-slate-300 flex flex-col gap-2.5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-amber-500 to-slate-200" />
            <h4 className="font-mono font-bold text-amber-400 text-xs tracking-wider flex items-center gap-1.5 uppercase">
              <span className="material-symbols-outlined text-[16px] text-amber-400">tune</span>
              NEO X CONTROL — PRINSIP STAR-DELTA
            </h4>
            <p className="leading-relaxed text-slate-300">
              Sistem kawalan <b>NEO X CONTROL</b> direka khas untuk mengendalikan jujukan permulaan motor 3-fasa bagi mengurangkan arus lonjakan (*inrush current*).
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400 font-mono text-[11px]">
              <li><b>Fasa Star:</b> KM1 & KM2 hidup (voltan fasa 240V).</li>
              <li><b>Pemasa 5s:</b> Pemasa membilang secara automatik.</li>
              <li><b>Safety Delay:</b> Saling kunci mekanikal & elektrikal.</li>
              <li><b>Fasa Delta:</b> KM1 & KM3 hidup (voltan penuh 415V).</li>
            </ol>
          </div>
        </div>
      </main>

      {/* Hint Modal Overlay */}
      <HintPanel hint={activeHint} onClose={() => setActiveHint(null)} />

      {/* Side Menu Drawer (Single Module Focused with NEO X CONTROL Logo) */}
      <DrawerNav
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        student={initialStudent}
        onNavigate={onNavigate}
      />
    </div>
  );
};
