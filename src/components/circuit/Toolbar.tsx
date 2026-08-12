import React from "react";
import { ApplicationMode } from "../../types/circuit";

interface ToolbarProps {
  mode: ApplicationMode;
  isValid: boolean;
  selectedWireId: string | null;
  speedMultiplier: number;
  onSetMode: (mode: ApplicationMode) => void;
  onAutoConnect?: () => void;
  onReset: () => void;
  onDeleteSelectedWire: () => void;
  onRequestHint: () => void;
  onSetSpeed: (speed: number) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  mode,
  isValid,
  selectedWireId,
  speedMultiplier,
  onSetMode,
  onAutoConnect,
  onReset,
  onDeleteSelectedWire,
  onRequestHint,
  onSetSpeed,
}) => {
  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-lg select-none">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center bg-[#0f172a] p-1 rounded-lg border border-slate-700">
        <button
          onClick={() => onSetMode("DESIGN")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold font-mono transition ${
            mode === "DESIGN"
              ? "bg-amber-500 text-slate-950 shadow"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">edit_note</span>
          DESIGN MODE
        </button>

        <button
          onClick={() => onSetMode("SIMULATION")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold font-mono transition ${
            mode === "SIMULATION"
              ? "bg-emerald-500 text-slate-950 shadow"
              : isValid
              ? "bg-slate-800 text-emerald-400 hover:bg-slate-700"
              : "bg-slate-800/80 text-amber-300 hover:bg-slate-700"
          }`}
          title={
            !isValid
              ? "Tekan untuk menyambung litar automatik & terus uji Simulasi"
              : "Masuk Mod Simulasi"
          }
        >
          <span className="material-symbols-outlined text-[16px]">precision_manufacturing</span>
          SIMULATION MODE {!isValid && "🔒"}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Auto-Connect Wires Button for Instant Simulation */}
        <button
          onClick={onAutoConnect}
          className="flex items-center gap-1 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition shadow-sm"
          title="Sambung semua wayar litar secara automatik 100%"
        >
          <span className="material-symbols-outlined text-[16px]">bolt</span>
          AUTO-WIRE (SAMBUNG 100%)
        </button>

        {/* Reset Wires */}
        <button
          onClick={onReset}
          className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          RESET LITAR
        </button>

        {/* Delete Selected Wire */}
        <button
          onClick={onDeleteSelectedWire}
          disabled={!selectedWireId}
          className="flex items-center gap-1 bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/60 disabled:opacity-40 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition"
        >
          <span className="material-symbols-outlined text-[16px]">delete</span>
          PADAM WAYAR
        </button>

        {/* Hint Request */}
        <button
          onClick={onRequestHint}
          className="flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition"
        >
          <span className="material-symbols-outlined text-[16px]">lightbulb</span>
          PETUNJUK (HINT)
        </button>
      </div>

      {/* Speed Controls (0.5x, 1x, 2x, 5x) */}
      <div className="flex items-center gap-1.5 bg-[#0f172a] px-2 py-1 rounded-lg border border-slate-700">
        <span className="text-[10px] text-slate-400 font-mono font-bold uppercase pr-1">
          SPEED:
        </span>
        {[0.5, 1, 2, 5].map((spd) => (
          <button
            key={spd}
            onClick={() => onSetSpeed(spd)}
            className={`px-2 py-0.5 text-xs font-bold font-mono rounded transition ${
              speedMultiplier === spd
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {spd}x
          </button>
        ))}
      </div>
    </div>
  );
};
