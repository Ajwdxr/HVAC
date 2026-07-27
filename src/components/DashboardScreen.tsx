import React from 'react';
import { ScreenView, StudentProfile, ModuleItem, Announcement } from '../types';

interface DashboardScreenProps {
  student: StudentProfile;
  modules: ModuleItem[];
  announcements: Announcement[];
  onNavigate: (screen: ScreenView) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  student,
  modules,
  announcements,
  onNavigate,
}) => {
  return (
    <div className="pt-24 pb-28 px-4 md:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[#424752] text-[12px] font-bold uppercase tracking-widest">
            Selamat Kembali
          </p>
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#191c21] leading-tight font-sans">
            Selamat Datang, {student.name.split(' ')[0]}
          </h2>
        </div>
        <div className="flex items-center gap-3 bg-[#f2f3fc] px-4 py-2.5 rounded-xl border border-[#c2c6d4] w-fit">
          <span className="material-symbols-outlined text-[#006876] fill-icon text-[20px]">
            calendar_today
          </span>
          <span className="font-mono-tech text-[14px] font-medium text-[#191c21]">
            18 OKTOBER 2023
          </span>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Progress & Continue Learning Banner (8 Cols) */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {/* Kemajuan Kursus Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#c2c6d4] technical-card-shadow flex flex-col sm:flex-row items-center gap-8">
            <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
              <div
                className="w-full h-full rounded-full flex items-center justify-center transition-all duration-1000 shadow-inner"
                style={{
                  background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(#003f87 ${student.overallProgress}%, #ededf6 0)`
                }}
              >
                <span className="text-[24px] font-bold text-[#003f87]">
                  {student.overallProgress}%
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h3 className="text-[20px] font-bold text-[#191c21]">Kemajuan Kursus</h3>
              <p className="text-[15px] text-[#424752] leading-relaxed">
                Hebat! Anda telah menyelesaikan {student.completedModules} daripada {student.totalModules} modul teknikal. Teruskan usaha untuk mencapai pensijilan penuh.
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-2">
                <span className="bg-[#58e6ff]/30 text-[#006573] px-3 py-1 rounded-full text-[12px] font-bold border border-[#58e6ff]">
                  13 SELESAI
                </span>
                <span className="bg-[#e7e8f0] text-[#424752] px-3 py-1 rounded-full text-[12px] font-bold">
                  7 BERBAKI
                </span>
              </div>
            </div>
          </div>

          {/* Teruskan Pembelajaran Banner */}
          <div className="relative overflow-hidden rounded-2xl border border-[#c2c6d4] technical-card-shadow bg-[#003f87] text-white min-h-[220px] group shadow-lg">
            <div className="absolute inset-0 opacity-20 group-hover:scale-105 transition-transform duration-700">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5Sj7mUnCAf3VfA5criLwSo81zU4nh7RgMkT_ivQKGQE5SD7yaAY6HQI_JBEGF0kGv-TBJVev3RKA8vm9AZ2NN1g8ksFTis3tZUHpIUkYOYWnrshkx7UVq0g8FWI7Io3qldI_JV-pdm4IDUpgG8j4nIh6X34TYXK2ba2XIKUZpEcYzzDWtqEZUpGOyj6E8PjJ3dwGvaMr4Bf64HyXoWCnOw1oi66XKOSkMQ-NOX5HGUtGofT_KZW4O2UD6DliRfQc5wIpYobmOffg')`
                }}
              />
            </div>
            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
              <div>
                <span className="font-mono-tech text-[12px] bg-white/20 px-3 py-1 rounded-md backdrop-blur-sm uppercase font-semibold">
                  SEDANG BERLANGSUNG
                </span>
                <h3 className="text-[28px] font-bold mt-3">Litar Elektrik Asas</h3>
                <p className="text-[#bbd0ff] max-w-md mt-2 text-[15px]">
                  Kuasai konsep pendawaian terminal dan analisis litar kawalan penyejukan.
                </p>
              </div>
              <button
                onClick={() => onNavigate('wiring')}
                className="mt-6 bg-white text-[#003f87] hover:bg-[#d7e2ff] px-6 py-3 rounded-xl font-bold flex items-center gap-2 self-start transition-all active:scale-95 shadow-md cursor-pointer"
              >
                <span>Teruskan Pembelajaran</span>
                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
              </button>
            </div>
          </div>
        </div>

        {/* Announcements & Badges Sidebar (4 Cols) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Pengumuman Pengajar */}
          <div className="bg-white rounded-2xl border border-[#c2c6d4] flex flex-col overflow-hidden technical-card-shadow">
            <div className="bg-[#003f87] px-5 py-3.5">
              <h3 className="text-white font-bold text-[18px] flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px]">campaign</span>
                <span>Pengumuman</span>
              </h3>
            </div>
            <div className="p-5 space-y-4">
              {announcements.map((ann) => (
                <div key={ann.id} className="border-l-4 border-[#006876] pl-3 py-1">
                  <p className="font-mono-tech text-[11px] text-[#006876] uppercase font-bold">
                    {ann.author} • {ann.timeAgo}
                  </p>
                  <p className="text-[15px] font-bold text-[#191c21] mt-0.5">{ann.title}</p>
                  <p className="text-[13px] text-[#424752] mt-0.5 leading-snug">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lencana Pencapaian */}
          <div className="bg-[#ededf6] p-5 rounded-2xl border border-[#c2c6d4] flex flex-col gap-4">
            <h3 className="text-[18px] font-bold text-[#191c21]">Lencana Pencapaian</h3>
            <div className="grid grid-cols-3 gap-3">
              <div
                title="Pakar Pendawaian"
                onClick={() => alert("Lencana: Pakar Pendawaian (Diselesaikan pada Modul 04)")}
                className="aspect-square bg-white rounded-xl border border-[#c2c6d4] flex items-center justify-center cursor-pointer hover:border-[#003f87] transition-all group shadow-sm"
              >
                <span className="material-symbols-outlined text-3xl text-[#003f87] fill-icon group-hover:scale-110 transition-transform">
                  electric_bolt
                </span>
              </div>
              <div
                title="Diagnostik Tepat"
                onClick={() => alert("Lencana: Diagnostik Tepat (Ujian Multimeter Sempurna)")}
                className="aspect-square bg-white rounded-xl border border-[#c2c6d4] flex items-center justify-center cursor-pointer hover:border-[#006876] transition-all group shadow-sm"
              >
                <span className="material-symbols-outlined text-3xl text-[#006876] fill-icon group-hover:scale-110 transition-transform">
                  precision_manufacturing
                </span>
              </div>
              <div
                title="Terkunci: Pakar Termodinamik"
                className="aspect-square bg-white/60 rounded-xl border border-[#c2c6d4] flex items-center justify-center opacity-40 grayscale cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-3xl text-[#727784]">
                  thermostat
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('modules')}
              className="text-[#003f87] font-bold text-[13px] hover:underline self-end"
            >
              Lihat Semua Lencana
            </button>
          </div>
        </div>
      </div>

      {/* Available Modules Grid */}
      <section className="space-y-4 pt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-[22px] font-bold text-[#191c21]">Modul Tersedia</h3>
          <button
            onClick={() => onNavigate('modules')}
            className="text-[#003f87] font-bold text-[14px] flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Lihat Katalog</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-[#c2c6d4] overflow-hidden group hover:shadow-lg transition-all border-b-4 border-b-[#006876]">
            <div className="h-40 overflow-hidden relative bg-[#e7e8f0]">
              <img
                src={modules[0].imageUrl}
                alt={modules[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold text-[#003f87] shadow-sm">
                TAHAP: ASAS
              </div>
            </div>
            <div className="p-5 space-y-3">
              <h4 className="text-[18px] font-bold text-[#191c21] leading-tight">
                {modules[0].title}
              </h4>
              <div className="flex items-center gap-4 text-[#424752] text-[13px]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">timer</span> 45 min
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span> 5 Topik
                </span>
              </div>
              <button
                onClick={() => onNavigate('simulation')}
                className="w-full border-2 border-[#003f87] text-[#003f87] font-bold py-2 rounded-xl hover:bg-[#003f87] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Buka Modul</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-[#c2c6d4] overflow-hidden group hover:shadow-lg transition-all border-b-4 border-b-[#003f87]">
            <div className="h-40 overflow-hidden relative bg-[#e7e8f0]">
              <img
                src={modules[1].imageUrl}
                alt={modules[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold text-[#003f87] shadow-sm">
                TAHAP: PERTENGAHAN
              </div>
            </div>
            <div className="p-5 space-y-3">
              <h4 className="text-[18px] font-bold text-[#191c21] leading-tight">
                {modules[1].title}
              </h4>
              <div className="flex items-center gap-4 text-[#424752] text-[13px]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">timer</span> 60 min
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span> 8 Topik
                </span>
              </div>
              <button
                onClick={() => onNavigate('simulation')}
                className="w-full border-2 border-[#003f87] text-[#003f87] font-bold py-2 rounded-xl hover:bg-[#003f87] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Buka Modul</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </button>
            </div>
          </div>

          {/* Card 3 (Locked State or Troubleshooting Access) */}
          <div className="bg-white rounded-2xl border border-[#c2c6d4] overflow-hidden group hover:shadow-lg transition-all border-b-4 border-b-[#003f87]">
            <div className="h-40 overflow-hidden relative bg-[#e7e8f0]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg46kN5d2Bvd9-Gi3NrmPcO6Ec7LqraREx624-ZtoxTqZ7dCK95RlXvKiwsD1_lr5rk7Z2lXToh50KHyAgBJypF8dKNCkExEWKClfDIo9qHrfUg30N8H9VCeOhJStL5caXkoTG1OMt6TOn0sEf2BIPrM3JI8P0ahF-PIZIyU2a1mey2oI3tT6BXIN5atOuOWeeMvCesASKJIB0socqMibxt1F1D4XASs13D_d1ezsnoeEq3i6qGKPouZfwme2uMc69LU4RY--YXdE"
                alt="Troubleshooting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold text-[#ba1a1a] shadow-sm">
                TAHAP: DIAGNOSTIK
              </div>
            </div>
            <div className="p-5 space-y-3">
              <h4 className="text-[18px] font-bold text-[#191c21] leading-tight">
                Sistem Kawalan & Troubleshooting
              </h4>
              <div className="flex items-center gap-4 text-[#424752] text-[13px]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">timer</span> 90 min
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">build</span> Multimeter
                </span>
              </div>
              <button
                onClick={() => onNavigate('troubleshooting')}
                className="w-full border-2 border-[#003f87] text-[#003f87] font-bold py-2 rounded-xl hover:bg-[#003f87] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Buka Multimeter</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
