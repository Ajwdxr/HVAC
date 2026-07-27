import React from 'react';
import { ScreenView, StudentProfile } from '../types';

interface HeaderNavProps {
  currentScreen: ScreenView;
  student: StudentProfile;
  onOpenDrawer: () => void;
  onNavigate: (screen: ScreenView) => void;
  subtitle?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScreen,
  student,
  onOpenDrawer,
  onNavigate,
  subtitle
}) => {
  return (
    <header className="flex justify-between items-center w-full px-6 h-[72px] bg-[#f9f9ff] border-b border-[#c2c6d4] fixed top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenDrawer}
          className="p-2 hover:bg-[#e7e8f0] transition-colors rounded-lg text-[#003f87] flex items-center justify-center"
          title="Buka Menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>
        <div>
          <h1 
            onClick={() => onNavigate('dashboard')}
            className="font-semibold text-[20px] md:text-[24px] text-[#003f87] cursor-pointer font-sans leading-tight"
          >
            HVAC Interactive Lab
          </h1>
          {subtitle && (
            <p className="text-[12px] text-[#424752] font-mono-tech hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {currentScreen !== 'login' && (
          <div className="hidden lg:flex items-center gap-2 bg-[#f2f3fc] px-3 py-1.5 rounded-full border border-[#c2c6d4]">
            <span className="w-2 h-2 rounded-full bg-[#006876] animate-pulse"></span>
            <span className="text-[12px] font-mono-tech text-[#003f87] font-semibold uppercase">
              ID: {student.id}
            </span>
          </div>
        )}

        <button 
          onClick={() => alert("Tiada pemberitahuan baharu pada masa ini.")}
          className="p-2 hover:bg-[#e7e8f0] transition-colors rounded-full text-[#003f87] relative flex items-center justify-center"
          title="Pemberitahuan"
        >
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
        </button>

        {currentScreen !== 'login' && (
          <button 
            onClick={onOpenDrawer}
            className="w-10 h-10 rounded-full bg-[#0056b3] flex items-center justify-center text-[#bbd0ff] font-bold border-2 border-white shadow-sm overflow-hidden hover:opacity-90 transition-opacity"
            title={student.name}
          >
            {student.avatar ? (
              <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
            ) : (
              <span>A</span>
            )}
          </button>
        )}
      </div>
    </header>
  );
};
