import React, { useState } from 'react';
import { ScreenView } from '../types';

interface TroubleshootingScreenProps {
  onNavigate: (screen: ScreenView) => void;
}

export const TroubleshootingScreen: React.FC<TroubleshootingScreenProps> = ({ onNavigate }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<'fius' | 'kapasitor' | 'pemampat' | 'termostat'>('termostat');
  const [voltageReadout, setVoltageReadout] = useState('0.00V');
  const [diagnosisChoice, setDiagnosisChoice] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [checkState, setCheckState] = useState({
    fuse: true,
    cap: true,
    stat: true,
  });

  const handleSelectHotspot = (id: 'fius' | 'kapasitor' | 'pemampat' | 'termostat') => {
    setSelectedHotspot(id);
    if (id === 'kapasitor' || id === 'fius') {
      setVoltageReadout('239.8V');
    } else {
      setVoltageReadout('0.00V');
    }
  };

  const handleSubmitDiagnosis = () => {
    if (!diagnosisChoice) {
      alert('Sila pilih diagnosis daripada senarai sebelum menghantar.');
      return;
    }
    if (diagnosisChoice === 'termostat') {
      setShowSuccessModal(true);
    } else {
      alert('Diagnosis tidak tepat. Sila semak semula bacaan multimeter pada Termostat.');
    }
  };

  const handleReset = () => {
    setSelectedHotspot('termostat');
    setVoltageReadout('0.00V');
    setDiagnosisChoice('');
  };

  return (
    <div className="pt-20 pb-28 min-h-screen bg-[#f9f9ff] flex flex-col animate-in fade-in duration-300">
      {/* Main Split Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Interactive Simulation Area (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Scenario Banner */}
          <div className="bg-[#2e3037] text-white p-4 md:p-5 rounded-2xl shadow-md border-l-4 border-l-[#006876] flex items-start gap-3">
            <span className="material-symbols-outlined text-[#58e6ff] text-[24px]">error</span>
            <div>
              <h2 className="text-[16px] md:text-[18px] font-bold leading-tight">
                Senario: Litar Terbuka / Kerosakan Komponen
              </h2>
              <p className="text-[#c2c6d4] text-[13px] mt-1">
                Penyaman udara dihidupkan, tetapi pemampat (compressor) tidak beroperasi.
              </p>
            </div>
          </div>

          {/* Interactive Schematic Diagram */}
          <div className="bg-white rounded-2xl border border-[#c2c6d4] shadow-md p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[320px]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg46kN5d2Bvd9-Gi3NrmPcO6Ec7LqraREx624-ZtoxTqZ7dCK95RlXvKiwsD1_lr5rk7Z2lXToh50KHyAgBJypF8dKNCkExEWKClfDIo9qHrfUg30N8H9VCeOhJStL5caXkoTG1OMt6TOn0sEf2BIPrM3JI8P0ahF-PIZIyU2a1mey2oI3tT6BXIN5atOuOWeeMvCesASKJIB0socqMibxt1F1D4XASs13D_d1ezsnoeEq3i6qGKPouZfwme2uMc69LU4RY--YXdE"
              alt="Troubleshooting Schematic"
              className="w-full h-auto max-h-[260px] object-contain rounded-xl opacity-90"
            />

            {/* Hotspot Buttons */}
            <div className="absolute inset-0 p-6 pointer-events-none flex items-center justify-center">
              <div className="relative w-full h-full max-w-lg">
                {/* Hotspot 1: Fuse */}
                <button
                  onClick={() => handleSelectHotspot('fius')}
                  className={`absolute top-[20%] left-[18%] pointer-events-auto p-2 group cursor-pointer ${
                    selectedHotspot === 'fius' ? 'scale-125' : ''
                  }`}
                  title="Uji Fius Utama"
                >
                  <div className="w-5 h-5 bg-[#006876] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    {selectedHotspot === 'fius' && <div className="w-2 h-2 bg-white rounded-full animate-ping" />}
                  </div>
                  <span className="bg-[#2e3037] text-white text-[10px] px-2 py-0.5 rounded font-mono-tech block mt-1 shadow">
                    FIUS
                  </span>
                </button>

                {/* Hotspot 2: Capacitor */}
                <button
                  onClick={() => handleSelectHotspot('kapasitor')}
                  className={`absolute top-[48%] left-[45%] pointer-events-auto p-2 group cursor-pointer ${
                    selectedHotspot === 'kapasitor' ? 'scale-125' : ''
                  }`}
                  title="Uji Kapasitor"
                >
                  <div className="w-5 h-5 bg-[#006876] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    {selectedHotspot === 'kapasitor' && <div className="w-2 h-2 bg-white rounded-full animate-ping" />}
                  </div>
                  <span className="bg-[#2e3037] text-white text-[10px] px-2 py-0.5 rounded font-mono-tech block mt-1 shadow">
                    KAPASITOR
                  </span>
                </button>

                {/* Hotspot 3: Thermostat */}
                <button
                  onClick={() => handleSelectHotspot('termostat')}
                  className={`absolute top-[18%] right-[22%] pointer-events-auto p-2 group cursor-pointer ${
                    selectedHotspot === 'termostat' ? 'scale-125' : ''
                  }`}
                  title="Uji Termostat"
                >
                  <div className="w-5 h-5 bg-[#ba1a1a] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    {selectedHotspot === 'termostat' && <div className="w-2 h-2 bg-white rounded-full animate-ping" />}
                  </div>
                  <span className="bg-[#2e3037] text-white text-[10px] px-2 py-0.5 rounded font-mono-tech block mt-1 shadow">
                    TERMOSTAT
                  </span>
                </button>

                {/* Hotspot 4: Compressor */}
                <button
                  onClick={() => handleSelectHotspot('pemampat')}
                  className={`absolute bottom-[22%] right-[28%] pointer-events-auto p-2 group cursor-pointer ${
                    selectedHotspot === 'pemampat' ? 'scale-125' : ''
                  }`}
                  title="Uji Pemampat"
                >
                  <div className="w-5 h-5 bg-[#003f87] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    {selectedHotspot === 'pemampat' && <div className="w-2 h-2 bg-white rounded-full animate-ping" />}
                  </div>
                  <span className="bg-[#2e3037] text-white text-[10px] px-2 py-0.5 rounded font-mono-tech block mt-1 shadow">
                    PEMAMPAT
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Virtual Digital Multimeter */}
          <div className="voltmeter-bg p-5 rounded-2xl shadow-xl border border-[#424752] flex flex-col gap-3 text-white">
            <div className="flex justify-between items-center border-b border-[#424752] pb-2">
              <span className="text-[11px] font-mono-tech text-[#c2c6d4] font-bold">
                MULTIMETER DIGITAL (VOLT)
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#58e6ff] uppercase font-bold">PROBE AKTIF</span>
                <div className="w-2.5 h-2.5 rounded-full bg-[#58e6ff] shadow-[0_0_8px_#58e6ff]" />
              </div>
            </div>

            <div className="bg-black/50 h-16 rounded-xl flex items-center justify-center border border-[#424752] shadow-inner">
              <span
                className={`font-mono-tech text-3xl font-bold tracking-widest ${
                  voltageReadout === '0.00V' ? 'text-[#ba1a1a]' : 'text-[#44d8f1]'
                }`}
              >
                {voltageReadout}
              </span>
            </div>

            <div className="flex justify-between items-center text-[11px] font-mono-tech text-[#c2c6d4]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#ba1a1a] rounded-sm" /> L1 (Hot)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#727784] rounded-sm" /> N (Neutral)
              </span>
            </div>
            <div className="text-[12px] text-[#c2c6d4] italic">
              Kuar diletakkan pada: <strong className="text-white capitalize">{selectedHotspot}</strong>
            </div>
          </div>
        </div>

        {/* Right Inspection & Diagnosis Panel (5 Cols) */}
        <aside className="lg:col-span-5 bg-white border border-[#c2c6d4] rounded-2xl p-6 shadow-md flex flex-col space-y-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#003f87]">fact_check</span>
            <h3 className="text-[20px] font-bold text-[#003f87]">Log Pemeriksaan</h3>
          </div>

          <div className="bg-[#f2f3fc] p-4 rounded-xl border border-[#c2c6d4]">
            <p className="text-[12px] font-bold text-[#003f87] uppercase tracking-wider mb-1">
              ARAHAN SEMASA:
            </p>
            <p className="text-[14px] text-[#424752] leading-relaxed">
              Sila jalankan ujian diagnostik pada komponen berikut untuk mengenalpasti punca kegagalan pemampat.
            </p>
          </div>

          {/* Checklist items */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3.5 bg-[#f9f9ff] hover:bg-[#e7e8f0] transition-colors rounded-xl border border-[#c2c6d4] cursor-pointer">
              <input
                type="checkbox"
                checked={checkState.fuse}
                onChange={(e) => setCheckState({ ...checkState, fuse: e.target.checked })}
                className="w-5 h-5 rounded border-[#727784] text-[#003f87] focus:ring-[#003f87]"
              />
              <div className="flex-1">
                <span className="text-[14px] font-semibold text-[#191c21] block">Periksa Fius Utama</span>
                <span className="text-[12px] text-[#424752]">Status: Normal (Kontinuiti ada)</span>
              </div>
              <span className="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
            </label>

            <label className="flex items-center gap-3 p-3.5 bg-[#f9f9ff] hover:bg-[#e7e8f0] transition-colors rounded-xl border border-[#c2c6d4] cursor-pointer">
              <input
                type="checkbox"
                checked={checkState.cap}
                onChange={(e) => setCheckState({ ...checkState, cap: e.target.checked })}
                className="w-5 h-5 rounded border-[#727784] text-[#003f87] focus:ring-[#003f87]"
              />
              <div className="flex-1">
                <span className="text-[14px] font-semibold text-[#191c21] block">Uji Voltan Kapasitor</span>
                <span className="text-[12px] text-[#424752]">Status: Memuaskan (240V dikesan)</span>
              </div>
              <span className="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
            </label>

            <label className="flex items-center gap-3 p-3.5 bg-white border-2 border-[#003f87] rounded-xl cursor-pointer shadow-sm">
              <input
                type="checkbox"
                checked={checkState.stat}
                onChange={(e) => setCheckState({ ...checkState, stat: e.target.checked })}
                className="w-5 h-5 rounded border-[#727784] text-[#003f87] focus:ring-[#003f87]"
              />
              <div className="flex-1">
                <span className="text-[14px] font-bold text-[#003f87] block">Periksa Termostat</span>
                <span className="text-[12px] text-[#ba1a1a] font-semibold">
                  Status: Sesentuh Terbuka (0V Ke Pemampat)
                </span>
              </div>
              <span className="material-symbols-outlined text-[#ba1a1a] text-[22px] fill-icon">report</span>
            </label>
          </div>

          <hr className="border-[#c2c6d4]" />

          {/* Diagnosis Dropdown */}
          <div className="space-y-2">
            <label className="text-[12px] font-bold uppercase tracking-wider text-[#424752] block">
              PILIH KOMPONEN ROSAK
            </label>
            <select
              value={diagnosisChoice}
              onChange={(e) => setDiagnosisChoice(e.target.value)}
              className="w-full bg-[#f2f3fc] border border-[#c2c6d4] rounded-xl p-3 text-[15px] font-medium text-[#191c21] focus:border-[#003f87] focus:ring-1 focus:ring-[#003f87] outline-none"
            >
              <option value="">-- Sila Pilih --</option>
              <option value="fius">Fius Terbakar</option>
              <option value="kapasitor">Kapasitor Lemah</option>
              <option value="termostat">Termostat Rosak (Litar Terbuka)</option>
              <option value="pemampat">Gegelung Pemampat Terbakar</option>
            </select>
          </div>

          {/* Bottom Controls */}
          <div className="pt-2 flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 h-12 bg-white border border-[#727784] text-[#191c21] rounded-xl font-bold hover:bg-[#e7e8f0] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">restart_alt</span>
              <span>Reset</span>
            </button>

            <button
              onClick={handleSubmitDiagnosis}
              className="flex-[2] h-12 bg-[#003f87] text-white rounded-xl font-bold hover:bg-[#0056b3] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] fill-icon">send</span>
              <span>Hantar Diagnosis</span>
            </button>
          </div>
        </aside>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white max-w-sm w-full rounded-3xl p-8 text-center shadow-2xl scale-100 border border-[#c2c6d4]">
            <div className="w-20 h-20 bg-[#58e6ff] text-[#006573] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h4 className="text-[22px] font-bold text-[#003f87] mb-2">Diagnosis Tepat!</h4>
            <p className="text-[14px] text-[#424752] mb-8 leading-relaxed">
              Anda telah mengenalpasti kerosakan pada Termostat. Pengetahuan teknikal anda sangat cemerlang.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                onNavigate('wiring');
              }}
              className="w-full bg-[#003f87] hover:bg-[#0056b3] text-white h-12 rounded-full font-bold cursor-pointer transition-colors shadow-md"
            >
              Teruskan ke Latihan Pendawaian
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
