import React from "react";
import { ScreenView, StudentProfile } from "../types";
import { NeoXControlLogo } from "./NeoXControlLogo";

interface DrawerNavProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onNavigate: (screen: ScreenView) => void;
}

export const DrawerNav: React.FC<DrawerNavProps> = ({
  isOpen,
  onClose,
  student,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md transition-opacity duration-300 flex">
      <aside className="bg-[#0b0c10] text-slate-100 w-80 max-w-[85vw] h-full shadow-2xl flex flex-col p-5 animate-in slide-in-from-left duration-300 border-r border-[#f59e0b]/30">
        {/* Header NEO X CONTROL Profile Info */}
        <div className="flex flex-col p-4 mb-4 bg-[#12141c] rounded-2xl border border-[#f59e0b]/40 relative shadow-lg shadow-amber-500/5">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="flex items-center gap-3.5 mb-3">
            <NeoXControlLogo size="md" />
            <div>
              <h4 className="font-black text-[16px] text-white leading-tight font-mono tracking-wider">
                NEO <span className="text-amber-500">X</span> CONTROL
              </h4>
              <p className="text-[11px] text-slate-400 font-mono">
                Circuit Simulator v2.5
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] text-amber-300 font-bold bg-amber-500/20 px-3 py-1 rounded-full w-fit border border-amber-500/40 tracking-wider">
            OFFICIAL LAB ENGINE
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
          <button
            onClick={() => {
              onNavigate("star-delta");
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl font-mono text-[14px] font-black shadow-lg shadow-amber-500/20 text-left"
          >
            <span className="material-symbols-outlined text-[22px]">electric_bolt</span>
            <span>SIMULATOR STAR-DELTA</span>
          </button>

          <hr className="my-3 border-slate-800" />

          <button
            onClick={() => {
              alert(
                "Sistem NEO X CONTROL: Fasa Star (Bintang) mengurangkan arus lonjakan motor. Selepas pemasa 5 saat tamat, jujukan pertukaran ke Fasa Delta akan dihidupkan."
              );
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 text-slate-300 hover:bg-slate-900 rounded-xl transition-all text-left font-medium"
          >
            <span className="material-symbols-outlined text-[20px] text-amber-400">
              description
            </span>
            <span className="text-[14px]">Panduan Kendalian</span>
          </button>

          <button
            onClick={() => {
              alert("Tetapan Sistem: Kelajuan Pemprosesan [1x], Safety Interlock [Diaktifkan].");
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 text-slate-300 hover:bg-slate-900 rounded-xl transition-all text-left font-medium"
          >
            <span className="material-symbols-outlined text-[20px] text-amber-400">
              settings
            </span>
            <span className="text-[14px]">Tetapan NEO X</span>
          </button>
        </nav>

        <div className="pt-4 border-t border-slate-800 text-center text-[11px] text-amber-500/80 font-mono tracking-wider">
          POWERED BY NEO X CONTROL SYSTEM
        </div>
      </aside>

      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
