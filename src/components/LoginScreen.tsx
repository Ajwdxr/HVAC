import React, { useState } from 'react';
import { ScreenView } from '../types';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [studentId, setStudentId] = useState('TVET-9921');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess();
    }, 1000);
  };

  const handlePwaInstall = () => {
    alert("Memulakan pemasangan aplikasi PWA HVAC Interactive Lab...");
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#191c21] flex flex-col justify-between relative overflow-x-hidden">
      {/* Background overlay gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#f9f9ff] via-[#f2f3fc] to-[#d7e2ff] opacity-70 pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero (Desktop) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col justify-center pr-12 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#d7e2ff] text-[#001a40] rounded-full w-fit mb-2 border border-[#c2c6d4]">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="font-mono-tech text-[14px] font-medium">VERSI 2.4.0</span>
            </div>

            <h1 className="font-bold text-[48px] text-[#003f87] leading-tight font-sans">
              Peneraju Teknologi <br />
              <span className="text-[#006876]">Latihan HVAC Virtual</span>
            </h1>

            <p className="text-[18px] text-[#424752] max-w-[520px] mt-2 leading-relaxed">
              Sertai makmal interaktif kami untuk menguasai sistem penyejukan dan penyaman udara dalam persekitaran digital yang selamat.
            </p>

            <div className="mt-8 flex gap-4">
              <div className="bg-[#e7e8f0] p-4 rounded-xl border border-[#c2c6d4] flex items-center space-x-4 shadow-sm">
                <span className="material-symbols-outlined text-[#003f87] text-3xl">precision_manufacturing</span>
                <div>
                  <p className="text-[12px] text-[#424752] uppercase tracking-wider font-semibold">Modul</p>
                  <p className="text-[20px] font-semibold text-[#191c21]">12+ Simulasi</p>
                </div>
              </div>

              <div className="bg-[#e7e8f0] p-4 rounded-xl border border-[#c2c6d4] flex items-center space-x-4 shadow-sm">
                <span className="material-symbols-outlined text-[#006876] text-3xl">shield</span>
                <div>
                  <p className="text-[12px] text-[#424752] uppercase tracking-wider font-semibold">Keselamatan</p>
                  <p className="text-[20px] font-semibold text-[#191c21]">Sijil TVET</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Login Card */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="bg-white w-full max-w-[440px] rounded-2xl p-8 lg:p-10 border border-[#c2c6d4] shadow-xl flex flex-col items-center">
              {/* Stylized Logo */}
              <div className="mb-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#0056b3] rounded-2xl flex items-center justify-center mb-3 shadow-inner relative">
                  <span className="material-symbols-outlined text-[#bbd0ff] text-4xl fill-icon">ac_unit</span>
                  <div className="absolute -top-1 -right-1 bg-[#006876] w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow">
                    <span className="material-symbols-outlined text-white text-[14px]">bolt</span>
                  </div>
                </div>
                <h2 className="text-[26px] font-bold text-[#003f87]">HVAC Lab</h2>
                <p className="text-[12px] font-semibold text-[#424752] tracking-widest uppercase mt-0.5">Pusat Interaktif</p>
              </div>

              <form className="w-full space-y-5" onSubmit={handleSubmit}>
                {/* Student ID Field */}
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-[#424752] px-1 block" htmlFor="student-id">
                    ID Pelajar
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#727784] group-focus-within:text-[#003f87] transition-colors">
                      badge
                    </span>
                    <input
                      id="student-id"
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="Cth: TVET-9921"
                      required
                      className="w-full h-12 pl-12 pr-4 bg-white border border-[#c2c6d4] rounded-xl focus:ring-2 focus:ring-[#003f87] focus:border-[#003f87] outline-none transition-all text-[16px] text-[#191c21]"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[12px] font-semibold text-[#424752]" htmlFor="password">
                      Kata Laluan
                    </label>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); alert("Sila hubungi Pentadbir Lab untuk tetapan semula kata laluan anda."); }}
                      className="text-[12px] font-semibold text-[#003f87] hover:underline"
                    >
                      Lupa Kata Laluan?
                    </a>
                  </div>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#727784] group-focus-within:text-[#003f87] transition-colors">
                      lock
                    </span>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full h-12 pl-12 pr-12 bg-white border border-[#c2c6d4] rounded-xl focus:ring-2 focus:ring-[#003f87] focus:border-[#003f87] outline-none transition-all text-[16px] text-[#191c21]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#727784] hover:text-[#424752]"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#003f87] hover:bg-[#0056b3] text-white font-semibold text-[18px] rounded-xl active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-75 cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <span>Log Masuk</span>
                      <span className="material-symbols-outlined">login</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="w-full flex items-center my-6">
                <div className="flex-grow h-[1px] bg-[#c2c6d4]"></div>
                <span className="px-4 text-[12px] font-semibold text-[#727784]">ATAU</span>
                <div className="flex-grow h-[1px] bg-[#c2c6d4]"></div>
              </div>

              {/* Contact Admin */}
              <div className="w-full text-center">
                <p className="text-[15px] text-[#424752]">
                  Pengguna baru?{' '}
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert("Pendaftaran baharu boleh dilakukan melalui Pentadbir Program TVET."); }}
                    className="text-[#006876] font-bold hover:underline"
                  >
                    Hubungi Pentadbir
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / PWA Banner */}
      <footer className="relative z-10 px-6 py-6 border-t border-[#c2c6d4]/50 bg-white/50 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="flex items-center space-x-6 text-[#424752]">
            <span className="text-[12px] font-semibold">© 2024 HVAC Interactive Lab</span>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Polisi Privasi: Data dikendalikan mengikut standard privasi TVET Malaysia."); }} className="text-[12px] font-semibold hover:text-[#003f87]">
              Polisi Privasi
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Terma Penggunaan: Aplikasi untuk tujuan latihan akademik & simulasi."); }} className="text-[12px] font-semibold hover:text-[#003f87]">
              Terma Penggunaan
            </a>
          </div>

          <button
            onClick={handlePwaInstall}
            className="flex items-center space-x-2 px-4 py-2 bg-[#58e6ff] text-[#006573] rounded-full hover:shadow-md transition-all font-semibold text-[13px] active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] fill-icon">download</span>
            <span>Pasang Aplikasi</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
