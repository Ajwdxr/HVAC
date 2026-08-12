import React from "react";
import { SimulatorState, ValidationResult } from "../../types/circuit";
import { formatTime } from "../../lib/circuit-utils";

interface StatusPanelProps {
  state: SimulatorState;
  validation: ValidationResult;
  score: number;
  onStart: () => void;
  onStop: () => void;
  onToggleMcb: () => void;
  onTripOverload: () => void;
  onResetOverload: () => void;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({
  state,
  validation,
  score,
  onStart,
  onStop,
  onToggleMcb,
  onTripOverload,
  onResetOverload,
}) => {
  const isSim = state.mode === "SIMULATION";

  return (
    <div className="bg-[#0f172a] border border-[#334155] rounded-xl p-4 text-slate-100 flex flex-col gap-4 shadow-xl">
      {/* Title & Mode Status Header */}
      <div className="flex items-center justify-between border-b border-slate-700 pb-3">
        <div>
          <h3 className="font-bold text-sm text-slate-200 tracking-wide font-mono">
            STATUS SIMULATOR STAR-DELTA
          </h3>
          <p className="text-xs text-slate-400">
            {state.mode === "DESIGN"
              ? "Mod Reka Bentuk — Sambung Wayar"
              : "Mod Simulasi Operasi"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 text-xs font-bold font-mono rounded-full ${
              state.mode === "DESIGN"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            }`}
          >
            {state.mode} MODE
          </span>
          <span className="bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-mono font-bold px-2.5 py-1 rounded-full">
            SCORE: {score}
          </span>
        </div>
      </div>

      {/* Connection Status LED Indicator Light */}
      <div
        className={`p-2.5 rounded-lg border flex items-center justify-between font-mono text-xs font-bold transition-all ${
          validation.valid
            ? "bg-emerald-950/60 text-emerald-300 border-emerald-500/60 shadow-lg shadow-emerald-950/50"
            : "bg-slate-900 text-amber-400 border-slate-800"
        }`}
      >
        <div className="flex items-center gap-2.5">
          {/* Animated LED Light */}
          <div className="relative flex items-center justify-center w-3.5 h-3.5">
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                validation.valid ? "bg-emerald-400 animate-ping" : "bg-amber-400/50"
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                validation.valid
                  ? "bg-emerald-400 shadow-[0_0_8px_#22c55e]"
                  : "bg-amber-500"
              }`}
            ></span>
          </div>
          <span>
            {validation.valid
              ? "LED SAMBUNGAN: BETUL & MENYALA 🟢"
              : "LED SAMBUNGAN: CHK CONNECTIONS 🔴"}
          </span>
        </div>
        <span className="text-[11px] opacity-80">
          {validation.satisfiedCount}/{validation.totalRulesCount} OK
        </span>
      </div>

      {/* Machine State Display */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* Machine Status */}
        <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
          <span className="text-[10px] text-slate-400 font-mono block">STAT KENDALIAN</span>
          <span
            className={`text-sm font-bold font-mono block mt-0.5 ${
              state.machine === "FAULT"
                ? "text-red-400 animate-pulse"
                : state.machine === "DELTA"
                ? "text-blue-400"
                : state.machine === "STAR"
                ? "text-yellow-400"
                : "text-slate-300"
            }`}
          >
            {state.machine}
          </span>
        </div>

        {/* Timer State */}
        <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
          <span className="text-[10px] text-slate-400 font-mono block">PEMASA (TIMER)</span>
          <span className="text-sm font-bold font-mono text-slate-200 block mt-0.5">
            {formatTime(state.timer.elapsed)} / {formatTime(state.timer.duration)}
          </span>
        </div>

        {/* Motor Speed */}
        <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
          <span className="text-[10px] text-slate-400 font-mono block">KELAJUAN MOTOR</span>
          <span className="text-sm font-bold font-mono text-emerald-400 block mt-0.5">
            {state.motor.running ? `${Math.round(state.motor.speed * 14.5)} RPM` : "0 RPM"}
          </span>
        </div>

        {/* Circuit Completion */}
        <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
          <span className="text-[10px] text-slate-400 font-mono block">KELENGKAPAN LITAR</span>
          <span
            className={`text-sm font-bold font-mono block mt-0.5 ${
              validation.valid ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {validation.completion}% ({validation.satisfiedCount}/{validation.totalRulesCount})
          </span>
        </div>
      </div>

      {/* Contactor Telemetry Grid */}
      <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
        <span className="text-[11px] font-bold text-slate-400 font-mono block mb-2">
          STATUS KONTAKTOR & LAMPU
        </span>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs font-mono">
          <div className={`p-1.5 rounded border ${state.contactors.KM1 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50" : "bg-slate-800 text-slate-400 border-slate-700"}`}>
            KM1 (MAIN) <br /> <b>{state.contactors.KM1 ? "ON" : "OFF"}</b>
          </div>
          <div className={`p-1.5 rounded border ${state.contactors.KM2 ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50" : "bg-slate-800 text-slate-400 border-slate-700"}`}>
            KM2 (STAR) <br /> <b>{state.contactors.KM2 ? "ON" : "OFF"}</b>
          </div>
          <div className={`p-1.5 rounded border ${state.contactors.KM3 ? "bg-blue-500/20 text-blue-400 border-blue-500/50" : "bg-slate-800 text-slate-400 border-slate-700"}`}>
            KM3 (DELTA) <br /> <b>{state.contactors.KM3 ? "ON" : "OFF"}</b>
          </div>
          <div className={`p-1.5 rounded border ${state.lamps.power ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50" : "bg-slate-800 text-slate-400 border-slate-700"}`}>
            LP: POWER <br /> <b>{state.lamps.power ? "ON" : "OFF"}</b>
          </div>
          <div className={`p-1.5 rounded border ${state.lamps.star ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50" : "bg-slate-800 text-slate-400 border-slate-700"}`}>
            LP: STAR <br /> <b>{state.lamps.star ? "ON" : "OFF"}</b>
          </div>
          <div className={`p-1.5 rounded border ${state.lamps.delta ? "bg-blue-500/20 text-blue-400 border-blue-500/50" : "bg-slate-800 text-slate-400 border-slate-700"}`}>
            LP: DELTA <br /> <b>{state.lamps.delta ? "ON" : "OFF"}</b>
          </div>
        </div>
      </div>

      {/* Fault Alert Message */}
      {state.faultMessage && (
        <div className="bg-red-950/80 border border-red-500 text-red-200 p-3 rounded-lg text-xs font-mono flex items-center justify-between">
          <span>{state.faultMessage}</span>
          <button
            onClick={onResetOverload}
            className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-bold transition"
          >
            RESET
          </button>
        </div>
      )}

      {/* Simulation Controls (Active in Simulation Mode) */}
      {isSim && (
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800">
          <button
            onClick={onToggleMcb}
            className={`px-3 py-2 text-xs font-bold font-mono rounded-lg border transition ${
              state.mcb
                ? "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500"
                : "bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600"
            }`}
          >
            MCB 3P: {state.mcb ? "ON (415V)" : "OFF"}
          </button>

          <button
            onClick={onStart}
            disabled={!state.mcb || state.overload}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-mono font-bold text-xs px-4 py-2 rounded-lg transition shadow flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
            START (NO)
          </button>

          <button
            onClick={onStop}
            className="bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs px-4 py-2 rounded-lg transition shadow flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">stop</span>
            STOP (NC)
          </button>

          <button
            onClick={state.overload ? onResetOverload : onTripOverload}
            className={`font-mono text-xs font-bold px-3 py-2 rounded-lg border transition ${
              state.overload
                ? "bg-amber-600 text-white border-amber-500 hover:bg-amber-500"
                : "bg-slate-800 text-amber-400 border-amber-500/40 hover:bg-slate-700"
            }`}
          >
            {state.overload ? "RESET OVERLOAD" : "TRIP OVERLOAD"}
          </button>
        </div>
      )}
    </div>
  );
};
