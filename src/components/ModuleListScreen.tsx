import React from 'react';
import { ScreenView, ModuleItem } from '../types';

interface ModuleListScreenProps {
  modules: ModuleItem[];
  onNavigate: (screen: ScreenView) => void;
}

export const ModuleListScreen: React.FC<ModuleListScreenProps> = ({
  modules,
  onNavigate,
}) => {
  return (
    <div className="pt-24 pb-28 px-4 md:px-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header Section with Overall Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="font-mono-tech text-[12px] text-[#006876] font-bold uppercase tracking-widest mb-1">
            PROGRES SEMASA
          </p>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#191c21] leading-tight font-sans">
            Latihan Teknikal HVAC
          </h2>
        </div>

        <div className="bg-[#f2f3fc] p-4 rounded-xl border border-[#c2c6d4] flex items-center gap-4 w-fit">
          <div className="w-12 h-12 rounded-full border-4 border-[#003f87] border-t-[#c2c6d4] flex items-center justify-center bg-white shadow-sm">
            <span className="font-mono-tech text-[#003f87] font-bold text-[14px]">57%</span>
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#424752] uppercase">Tahap Keseluruhan</div>
            <div className="text-[14px] font-semibold text-[#191c21]">4/7 Modul Selesai</div>
          </div>
        </div>
      </div>

      {/* Modules List Grid */}
      <div className="grid grid-cols-1 gap-6">
        {modules.map((mod) => {
          const isCompleted = mod.progress === 100;
          const isActive = mod.status === 'active';

          return (
            <div
              key={mod.id}
              className={`bg-white border rounded-2xl overflow-hidden transition-all hover:shadow-md ${
                isActive
                  ? 'border-2 border-[#003f87] shadow-lg relative'
                  : 'border-[#c2c6d4]'
              }`}
            >
              {/* Card Top Strip */}
              <div
                className={`p-3 px-5 flex justify-between items-center text-white ${
                  isActive ? 'bg-[#003f87]' : isCompleted ? 'bg-[#003f87]' : 'bg-[#424752]'
                }`}
              >
                <span className="font-mono-tech text-[12px] tracking-wider font-semibold">
                  {mod.moduleNumber}
                </span>

                {isCompleted && (
                  <span className="bg-[#58e6ff] text-[#006573] px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight">
                    Selesai
                  </span>
                )}

                {isActive && (
                  <div className="flex items-center gap-2">
                    <span className="bg-[#006876] text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase">
                      Sedang Berjalan
                    </span>
                    <span className="animate-pulse bg-[#ba1a1a] text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                      Aktif
                    </span>
                  </div>
                )}

                {!isCompleted && !isActive && (
                  <div className="flex items-center gap-1 bg-[#e1e2ea] text-[#424752] px-2.5 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    <span className="text-[10px] font-bold uppercase">Terkunci</span>
                  </div>
                )}
              </div>

              {/* Card Content Body */}
              <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${
                    isActive
                      ? 'bg-[#0056b3] text-[#bbd0ff]'
                      : isCompleted
                      ? 'bg-[#e7e8f0] text-[#003f87]'
                      : 'bg-[#e1e2ea] text-[#727784]'
                  }`}
                >
                  <span className="material-symbols-outlined text-4xl">
                    {mod.icon || 'ac_unit'}
                  </span>
                </div>

                <div className="flex-grow space-y-2">
                  <h3 className="text-[20px] font-bold text-[#191c21]">{mod.title}</h3>
                  <p className="text-[15px] text-[#424752] leading-relaxed max-w-2xl">
                    {mod.description}
                  </p>

                  <div className="space-y-1 pt-1 max-w-md">
                    <div className="flex justify-between text-[11px] font-bold text-[#424752] uppercase">
                      <span>
                        {mod.prerequisite ? `Prasyarat: ${mod.prerequisite}` : 'Kemajuan Pembelajaran'}
                      </span>
                      <span className="text-[#003f87] font-mono-tech">{mod.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e7e8f0] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted ? 'bg-[#003f87]' : isActive ? 'bg-[#006876]' : 'bg-[#727784]'
                        }`}
                        style={{ width: `${mod.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col justify-end gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => onNavigate(mod.targetScreen || 'simulation')}
                    className={`w-full sm:w-auto flex items-center justify-center h-12 px-6 rounded-xl font-bold transition-all active:scale-95 cursor-pointer shadow-sm ${
                      isCompleted || isActive
                        ? 'bg-[#003f87] text-white hover:bg-[#0056b3]'
                        : 'bg-[#003f87] text-white hover:bg-[#0056b3]'
                    }`}
                  >
                    {isCompleted ? 'Ulangkaji' : isActive ? 'Teruskan' : 'Mula'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivational Feedback Banner */}
      <div className="mt-8 p-6 md:p-8 rounded-3xl bg-[#58e6ff]/20 text-[#006573] flex flex-col md:flex-row items-center gap-6 border border-[#006876]">
        <div className="w-28 h-28 flex-shrink-0 relative">
          <div className="absolute inset-0 bg-[#006876] rounded-full animate-ping opacity-20" />
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-QmZ4sMwE1PhUkjZ3IjuCGVucuTVD7CvzjSdZGKvbdH1FjribT09L_lJ5gkF8u9b7CLKOhjTNijXvqOlYyoQuaRt2Ap4HPTXSE1h5gJb_cN5f7HVBJhZgNP1D-BgmFtTvK038gmaaIAfNUjC7PUwSD3cVUO4qfv4TFM0BiNGADrgQhqmUyHj4E4N0P-LkLIVyA_l5RhLhRF9BAzH2fQUN5ObXj1s1iS5pIfshU5GycQnIZJa_VkN_zODjBbJOEalSojQEJ798kYo"
            alt="Technician Goggles"
            className="w-full h-full object-cover rounded-full border-4 border-[#006573] shadow-md relative z-10"
          />
        </div>

        <div className="text-center md:text-left">
          <h4 className="text-[22px] font-bold text-[#191c21] mb-1">Hampir Ke Sasarannya!</h4>
          <p className="text-[16px] text-[#424752] mb-4 max-w-xl">
            Anda telah menyelesaikan 3 modul dalam masa 2 hari. Teruskan usaha untuk mendapatkan Sijil Kompetensi HVAC Tahap 1.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#006876]/30 shadow-sm">
              <span className="material-symbols-outlined text-[18px] text-[#003f87]">emoji_events</span>
              <span className="text-[13px] font-bold text-[#191c21]">Top 10% Pelajar</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#006876]/30 shadow-sm">
              <span className="material-symbols-outlined text-[18px] text-[#006876]">schedule</span>
              <span className="text-[13px] font-bold text-[#191c21]">12 Jam Latihan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
