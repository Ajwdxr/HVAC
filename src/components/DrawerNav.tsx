import React from 'react';
import { ScreenView, StudentProfile } from '../types';

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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 flex">
      <aside className="bg-[#0f172a] text-slate-100 w-80 max-w-[85vw] h-full shadow-2xl flex flex-col p-5 animate-in slide-in-from-left duration-300 border-r border-[#334155]">
        {/* Header User Profile Info */}
        <div className="flex flex-col p-4 mb-4 bg-slate-900/90 rounded-2xl border border-[#334155] relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-blue-600/30 text-blue-400 border-2 border-blue-500 flex items-center justify-center font-bold text-lg">
              SD
            </div>
            <div>
              <h4 className="font-bold text-[15px] text-white leading-tight">
                Simulasi Star-Delta
              </h4>
              <p className="text-[12px] text-slate-400 font-mono">TVET Electrical Lab</p>
            </div>
          </div>
          <span className="font-mono text-[11px] text-blue-300 font-bold bg-blue-500/20 px-3 py-1 rounded-full w-fit border border-blue-500/30">
            SIMULATOR 3-PHASE
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
          <button
            onClick={() => {
              onNavigate('star-delta');
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3.5 bg-blue-600 text-white rounded-xl font-mono text-[14px] font-bold shadow-lg shadow-blue-600/30 text-left"
          >
            <span className="material-symbols-outlined text-[22px]">electric_bolt</span>
            <span>Simulasi Star-Delta Starter</span>
          </button>

          <hr className="my-3 border-slate-800" />

          <button
            onClick={() => {
              alert("Prinsip Operasi: Fasa Bintang (Star) mengurangkan arus permulaan motor. Selepas pemasa 5s tamat, kontaktor bertukar ke Fasa Delta secara automatik.");
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl transition-all text-left font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">description</span>
            <span className="text-[14px]">Panduan Pengguna</span>
          </button>

          <button
            onClick={() => {
              alert("Tetapan Makmal: Kelajuan Pemprosesan [1x], Interlock Keselamatan [Aktif].");
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl transition-all text-left font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="text-[14px]">Tetapan Simulasi</span>
          </button>
        </nav>

        <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
          Star-Delta Simulator v2.5
        </div>
      </aside>

      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
