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
    <div className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 flex">
      <aside className="bg-[#f9f9ff] w-80 max-w-[85vw] h-full shadow-2xl flex flex-col p-4 animate-in slide-in-from-left duration-300 border-r border-[#c2c6d4]">
        {/* Header User Profile Info */}
        <div className="flex flex-col p-4 mb-4 bg-[#f2f3fc] rounded-xl border border-[#c2c6d4] relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full text-[#727784] hover:bg-[#e7e8f0]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#003f87]"
            />
            <div>
              <h4 className="font-bold text-[16px] text-[#191c21] leading-tight">
                {student.name}
              </h4>
              <p className="text-[12px] text-[#424752]">{student.role}</p>
            </div>
          </div>
          <span className="font-mono-tech text-[11px] text-[#003f87] font-bold bg-[#d7e2ff] px-2.5 py-0.5 rounded-full w-fit">
            ID: {student.id}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
          <button
            onClick={() => {
              onNavigate('dashboard');
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 bg-[#0056b3] text-[#bbd0ff] rounded-xl hover:bg-[#003f87] hover:text-white transition-all text-left font-medium"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[15px]">Dashboard</span>
          </button>

          <button
            onClick={() => {
              onNavigate('modules');
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 text-[#424752] hover:bg-[#e7e8f0] rounded-xl transition-all text-left font-medium"
          >
            <span className="material-symbols-outlined">menu_book</span>
            <span className="text-[15px]">Senarai Modul</span>
          </button>

          <button
            onClick={() => {
              onNavigate('dol-starter');
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 text-[#424752] hover:bg-[#e7e8f0] rounded-xl transition-all text-left font-medium"
          >
            <span className="material-symbols-outlined">power_settings_new</span>
            <span className="text-[15px]">Litar Penghidup DOL</span>
          </button>

          <button
            onClick={() => {
              onNavigate('star-delta');
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 text-[#424752] hover:bg-[#e7e8f0] rounded-xl transition-all text-left font-medium"
          >
            <span className="material-symbols-outlined">electric_bolt</span>
            <span className="text-[15px]">Litar Star-Delta Starter</span>
          </button>

          <button
            onClick={() => {
              onNavigate('simulation');
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 text-[#424752] hover:bg-[#e7e8f0] rounded-xl transition-all text-left font-medium"
          >
            <span className="material-symbols-outlined">precision_manufacturing</span>
            <span className="text-[15px]">Simulasi Litar & Sistem</span>
          </button>

          <button
            onClick={() => {
              onNavigate('troubleshooting');
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 text-[#424752] hover:bg-[#e7e8f0] rounded-xl transition-all text-left font-medium"
          >
            <span className="material-symbols-outlined">insights</span>
            <span className="text-[15px]">Troubleshooting & Multimeter</span>
          </button>

          <button
            onClick={() => {
              onNavigate('wiring');
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 text-[#424752] hover:bg-[#e7e8f0] rounded-xl transition-all text-left font-medium"
          >
            <span className="material-symbols-outlined">bolt</span>
            <span className="text-[15px]">Latihan Pendawaian</span>
          </button>

          <hr className="my-3 border-[#c2c6d4]" />

          <button
            onClick={() => {
              alert("Profil Pelajar: TVET-9921 (Ahmad Bin Zulkifli) - Program Sijil Penyejukan & Penyaman Udara.");
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 text-[#424752] hover:bg-[#e7e8f0] rounded-xl transition-all text-left"
          >
            <span className="material-symbols-outlined">account_circle</span>
            <span className="text-[14px]">Profil Pelajar</span>
          </button>

          <button
            onClick={() => {
              alert("Tetapan Makmal: Audio Kesan Simulasi [Diaktifkan], Kualiti Grafiti 2D/3D [Tinggi].");
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 text-[#424752] hover:bg-[#e7e8f0] rounded-xl transition-all text-left"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-[14px]">Tetapan Makmal</span>
          </button>

          <button
            onClick={() => {
              alert("Log Aktiviti: Terakhir mengakses Modul 03 pada 18 Oktober 2023, 14:30.");
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 text-[#424752] hover:bg-[#e7e8f0] rounded-xl transition-all text-left"
          >
            <span className="material-symbols-outlined">history</span>
            <span className="text-[14px]">Log Aktiviti</span>
          </button>

          <button
            onClick={() => {
              alert("Manual Pengguna HVAC Interactive Lab v2.4.0 dilancarkan.");
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 text-[#424752] hover:bg-[#e7e8f0] rounded-xl transition-all text-left"
          >
            <span className="material-symbols-outlined">description</span>
            <span className="text-[14px]">Manual Pengguna</span>
          </button>

          <button
            onClick={() => {
              alert("Menghantar mesej kepada Pengajar Encik Zulkifli (Lab Coordinator)...");
              onClose();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 text-[#424752] hover:bg-[#e7e8f0] rounded-xl transition-all text-left"
          >
            <span className="material-symbols-outlined">support_agent</span>
            <span className="text-[14px]">Hubungi Pengajar</span>
          </button>
        </nav>

        {/* Logout Button */}
        <button
          onClick={() => {
            onNavigate('login');
            onClose();
          }}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-xl transition-all font-semibold"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Log Keluar</span>
        </button>
      </aside>

      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
