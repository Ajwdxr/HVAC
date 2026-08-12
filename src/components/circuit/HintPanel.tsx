import React from "react";
import { Hint } from "../../types/circuit";

interface HintPanelProps {
  hint: Hint | null;
  onClose: () => void;
}

export const HintPanel: React.FC<HintPanelProps> = ({ hint, onClose }) => {
  if (!hint) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border-2 border-amber-500/80 rounded-2xl max-w-md w-full p-5 shadow-2xl animate-in zoom-in-95 duration-200 text-slate-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header Icon & Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-amber-500/20 text-amber-400 p-2.5 rounded-xl border border-amber-500/40">
            <span className="material-symbols-outlined text-[24px]">lightbulb</span>
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 block uppercase">
              PETUNJUK TAHAP {hint.level} DEKAD
            </span>
            <h3 className="font-bold text-base text-white leading-snug">
              {hint.title}
            </h3>
          </div>
        </div>

        {/* Hint Message */}
        <p className="text-sm text-slate-300 leading-relaxed mb-4 bg-slate-900/60 p-3 rounded-lg border border-slate-800 font-sans">
          {hint.message}
        </p>

        {/* Score Penalty Info */}
        <div className="flex items-center justify-between text-xs font-mono text-amber-400/90 bg-amber-950/30 p-2.5 rounded-lg border border-amber-500/20">
          <span>⚠ Penalti skor petunjuk: -5 Markah</span>
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-1.5 rounded-lg font-bold transition"
          >
            Faham & Teruskan
          </button>
        </div>
      </div>
    </div>
  );
};
