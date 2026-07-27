import React from 'react';
import { ScreenView } from '../types';

interface BottomNavProps {
  currentScreen: ScreenView;
  onNavigate: (screen: ScreenView) => void;
  onOpenDrawer: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  onOpenDrawer,
}) => {
  if (currentScreen === 'login') return null;

  const isDashboardActive = currentScreen === 'dashboard';
  const isModulesActive = currentScreen === 'modules';
  const isSimActive = currentScreen === 'simulation' || currentScreen === 'wiring';
  const isTroubleActive = currentScreen === 'troubleshooting';

  return (
    <>
      {/* Mobile Bottom Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center h-[56px] pb-safe bg-[#ededf6] border-t border-[#c2c6d4] shadow-lg md:hidden">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-full transition-all ${
            isDashboardActive
              ? 'bg-[#58e6ff] text-[#006573] font-bold scale-95'
              : 'text-[#424752] hover:text-[#003f87]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px] fill-icon">dashboard</span>
          <span className="text-[11px] font-semibold">Dashboard</span>
        </button>

        <button
          onClick={() => onNavigate('modules')}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-full transition-all ${
            isModulesActive
              ? 'bg-[#58e6ff] text-[#006573] font-bold scale-95'
              : 'text-[#424752] hover:text-[#003f87]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">menu_book</span>
          <span className="text-[11px] font-semibold">Modul</span>
        </button>

        <button
          onClick={() => onNavigate('simulation')}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-full transition-all ${
            isSimActive
              ? 'bg-[#58e6ff] text-[#006573] font-bold scale-95'
              : 'text-[#424752] hover:text-[#003f87]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
          <span className="text-[11px] font-semibold">Simulasi</span>
        </button>

        <button
          onClick={() => onNavigate('troubleshooting')}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-full transition-all ${
            isTroubleActive
              ? 'bg-[#58e6ff] text-[#006573] font-bold scale-95'
              : 'text-[#424752] hover:text-[#003f87]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">insights</span>
          <span className="text-[11px] font-semibold">Kemajuan</span>
        </button>

        <button
          onClick={onOpenDrawer}
          className="flex flex-col items-center justify-center text-[#424752] hover:text-[#003f87] transition-colors px-2 py-1"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
          <span className="text-[11px] font-semibold">Menu</span>
        </button>
      </nav>

      {/* Desktop Sidebar Quick Controls */}
      <aside className="hidden md:flex fixed left-0 top-[72px] bottom-0 w-16 bg-[#f9f9ff] border-r border-[#c2c6d4] flex-col items-center py-6 gap-6 z-30">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`p-3 rounded-xl transition-all ${
            isDashboardActive
              ? 'bg-[#0056b3] text-white shadow-md'
              : 'text-[#424752] hover:bg-[#e7e8f0]'
          }`}
          title="Dashboard"
        >
          <span className="material-symbols-outlined fill-icon">dashboard</span>
        </button>

        <button
          onClick={() => onNavigate('modules')}
          className={`p-3 rounded-xl transition-all ${
            isModulesActive
              ? 'bg-[#0056b3] text-white shadow-md'
              : 'text-[#424752] hover:bg-[#e7e8f0]'
          }`}
          title="Senarai Modul"
        >
          <span className="material-symbols-outlined">menu_book</span>
        </button>

        <button
          onClick={() => onNavigate('simulation')}
          className={`p-3 rounded-xl transition-all ${
            isSimActive
              ? 'bg-[#0056b3] text-white shadow-md'
              : 'text-[#424752] hover:bg-[#e7e8f0]'
          }`}
          title="Simulasi Litar & Sistem"
        >
          <span className="material-symbols-outlined">precision_manufacturing</span>
        </button>

        <button
          onClick={() => onNavigate('troubleshooting')}
          className={`p-3 rounded-xl transition-all ${
            isTroubleActive
              ? 'bg-[#0056b3] text-white shadow-md'
              : 'text-[#424752] hover:bg-[#e7e8f0]'
          }`}
          title="Troubleshooting & Multimeter"
        >
          <span className="material-symbols-outlined">insights</span>
        </button>

        <button
          onClick={() => onNavigate('wiring')}
          className={`p-3 rounded-xl transition-all ${
            currentScreen === 'wiring'
              ? 'bg-[#0056b3] text-white shadow-md'
              : 'text-[#424752] hover:bg-[#e7e8f0]'
          }`}
          title="Latihan Pendawaian"
        >
          <span className="material-symbols-outlined">bolt</span>
        </button>

        <div className="mt-auto mb-2">
          <button
            onClick={() => onNavigate('login')}
            className="p-3 rounded-xl text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
            title="Log Keluar"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
