import React, { useState } from 'react';
import { ScreenView } from '../types';

interface SimulationScreenProps {
  onNavigate: (screen: ScreenView) => void;
}

interface ComponentDetail {
  id: string;
  title: string;
  status: string;
  desc: string;
  icon: string;
  voltage: string;
  current: string;
}

export const SimulationScreen: React.FC<SimulationScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'schematic' | 'system'>('schematic');
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<ComponentDetail | null>({
    id: 'compressor',
    title: 'Pemampat (Compressor)',
    status: 'AKTIF & BERFUNGSI',
    desc: 'Jantung sistem yang mengepam bahan pendingin melalui kitaran penyejukan. Ia memampatkan gas tekanan rendah kepada gas tekanan tinggi.',
    icon: 'settings_input_component',
    voltage: '240V AC',
    current: '4.2A',
  });

  const componentsData: Record<string, ComponentDetail> = {
    thermostat: {
      id: 'thermostat',
      title: 'Termostat (T-STAT)',
      status: 'TERSAMBUNG',
      desc: 'Mengawal suhu dengan memutuskan atau menyambungkan litar berdasarkan setpoint yang ditetapkan.',
      icon: 'thermostat',
      voltage: '240V AC',
      current: '0.1A',
    },
    capacitor: {
      id: 'capacitor',
      title: 'Kapasitor (CAP)',
      status: 'MEMUASKAN',
      desc: 'Menyediakan tork permulaan tambahan dan mengekalkan tork larian motor pemampat.',
      icon: 'battery_charging_full',
      voltage: '370V AC',
      current: '1.2A',
    },
    compressor: {
      id: 'compressor',
      title: 'Pemampat (Compressor)',
      status: 'AKTIF & BERFUNGSI',
      desc: 'Jantung sistem yang mengepam bahan pendingin melalui kitaran penyejukan. Ia memampatkan gas tekanan rendah kepada gas tekanan tinggi.',
      icon: 'settings_input_component',
      voltage: '240V AC',
      current: '4.2A',
    }
  };

  return (
    <div className="pt-20 pb-28 min-h-screen bg-[#f9f9ff] flex flex-col justify-between animate-in fade-in duration-300">
      {/* Top Segmented Tab Controls */}
      <div className="px-4 md:px-8 py-3 max-w-2xl mx-auto w-full">
        <div className="bg-[#e7e8f0] rounded-xl p-1 flex border border-[#c2c6d4] shadow-sm">
          <button
            onClick={() => setActiveTab('schematic')}
            className={`flex-1 py-2.5 text-[14px] font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'schematic'
                ? 'bg-[#003f87] text-white shadow'
                : 'text-[#424752] hover:text-[#003f87]'
            }`}
          >
            Litar Skematik
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`flex-1 py-2.5 text-[14px] font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'system'
                ? 'bg-[#003f87] text-white shadow'
                : 'text-[#424752] hover:text-[#003f87]'
            }`}
          >
            Sistem Sebenar
          </button>
        </div>
      </div>

      {/* Main Simulation Workspace Canvas */}
      <div className="flex-1 px-4 md:px-8 py-2 flex items-center justify-center relative">
        <div className="w-full max-w-3xl bg-white rounded-2xl border border-[#c2c6d4] shadow-md relative overflow-hidden flex flex-col min-h-[380px] md:min-h-[440px]">
          {/* Header Strip */}
          <div className="p-4 border-b border-[#c2c6d4] bg-[#f2f3fc] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#006876] animate-ping" />
              <span className="font-mono-tech text-[13px] font-bold text-[#424752] uppercase tracking-wider">
                RAJAH LITAR: UNIT PENYEJUKAN
              </span>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-[11px] font-bold tracking-wide border border-green-300">
              NORMAL
            </span>
          </div>

          {activeTab === 'schematic' ? (
            /* Schematic Diagram View */
            <div className="flex-1 relative p-6 md:p-10 flex items-center justify-center bg-white">
              <svg className="w-full h-full max-h-[320px]" viewBox="0 0 400 240">
                {/* Background Grid */}
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f9" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Animated Flow Wires */}
                <path
                  d="M 50 120 L 100 120"
                  fill="none"
                  stroke={isPlaying ? '#003f87' : '#727784'}
                  strokeWidth="3"
                  strokeDasharray={isPlaying ? '6,3' : 'none'}
                  className={isPlaying ? 'animate-[dash_1s_linear_infinite]' : ''}
                />
                <path
                  d="M 150 120 L 250 120"
                  fill="none"
                  stroke={isPlaying ? '#003f87' : '#727784'}
                  strokeWidth="3"
                  strokeDasharray={isPlaying ? '6,3' : 'none'}
                  className={isPlaying ? 'animate-[dash_1s_linear_infinite]' : ''}
                />
                <path
                  d="M 300 120 L 350 120"
                  fill="none"
                  stroke={isPlaying ? '#003f87' : '#727784'}
                  strokeWidth="3"
                  strokeDasharray={isPlaying ? '6,3' : 'none'}
                  className={isPlaying ? 'animate-[dash_1s_linear_infinite]' : ''}
                />

                {/* Component 1: Thermostat */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedComponent(componentsData.thermostat)}
                >
                  <rect
                    x="100"
                    y="95"
                    width="50"
                    height="50"
                    rx="8"
                    fill={selectedComponent?.id === 'thermostat' ? '#d7e2ff' : 'white'}
                    stroke="#003f87"
                    strokeWidth="2.5"
                    className="group-hover:fill-[#d7e2ff] transition-colors"
                  />
                  <text
                    x="125"
                    y="126"
                    textAnchor="middle"
                    className="material-symbols-outlined fill-[#003f87]"
                    style={{ fontSize: '26px' }}
                  >
                    thermostat
                  </text>
                  <text
                    x="125"
                    y="162"
                    textAnchor="middle"
                    className="font-mono-tech text-[11px] font-bold fill-[#424752]"
                  >
                    T-STAT
                  </text>
                </g>

                {/* Component 2: Compressor (Pulsing Center piece) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedComponent(componentsData.compressor)}
                >
                  <rect
                    x="175"
                    y="45"
                    width="50"
                    height="50"
                    rx="25"
                    fill="#d7e2ff"
                    stroke="#003f87"
                    strokeWidth="3"
                    className={`transition-all ${isPlaying ? 'pulse-glow' : ''} ${
                      selectedComponent?.id === 'compressor' ? 'stroke-[#0056b3] stroke-[4]' : ''
                    }`}
                  />
                  <text
                    x="200"
                    y="78"
                    textAnchor="middle"
                    className="material-symbols-outlined fill-[#003f87]"
                    style={{ fontSize: '28px' }}
                  >
                    settings_input_component
                  </text>
                  <text
                    x="200"
                    y="110"
                    textAnchor="middle"
                    className="font-mono-tech text-[11px] font-bold fill-[#003f87]"
                  >
                    COMP
                  </text>
                </g>

                {/* Component 3: Capacitor */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedComponent(componentsData.capacitor)}
                >
                  <circle
                    cx="275"
                    cy="120"
                    r="25"
                    fill={selectedComponent?.id === 'capacitor' ? '#d7e2ff' : 'white'}
                    stroke="#003f87"
                    strokeWidth="2.5"
                    className="group-hover:fill-[#d7e2ff] transition-colors"
                  />
                  <text
                    x="275"
                    y="128"
                    textAnchor="middle"
                    className="material-symbols-outlined fill-[#003f87]"
                    style={{ fontSize: '26px' }}
                  >
                    battery_charging_full
                  </text>
                  <text
                    x="275"
                    y="162"
                    textAnchor="middle"
                    className="font-mono-tech text-[11px] font-bold fill-[#424752]"
                  >
                    CAP
                  </text>
                </g>
              </svg>
            </div>
          ) : (
            /* Real System Render View */
            <div className="flex-1 relative overflow-hidden bg-[#191c21] min-h-[320px]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiqoGS7pJh7VQzJrXdtxPMS9hvUzStCED270UfVMhn5SK0yF8dgMyOepCbLeuBjxmafjwdUV7TSyXA_UEBpIr1uvzzxXn0Ae_lQmBbjjaPNqIJTfhu5vPaecZTGcXba2yjpPfXMju44s62Z-27RB_pkYDo006uikjHIl-r7enJPecpffHhk5G5x61skN_bD2TVsKtpek1rr7cIR0vXkGlWiQ4B6GGsQY-E4dK2pnt8TK4jU7E7_tZdcDb2nBAHiegc212SIupAH2k"
                alt="Industrial HVAC Compressor"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex items-end p-6">
                <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/20 text-white max-w-lg">
                  <p className="font-mono-tech text-[11px] text-[#58e6ff] font-bold uppercase">Pandangan Realistik 3D</p>
                  <h4 className="text-[18px] font-bold mt-1">Unit Pemampat Industri HVAC</h4>
                  <p className="text-[13px] text-gray-300 mt-1">
                    Menampilkan sambungan tiub kuprum, injap pengembangan, dan terminal elektrik modular.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Component Details Card Popup (Interactive) */}
      {selectedComponent && (
        <div className="px-4 md:px-8 py-2 max-w-2xl mx-auto w-full animate-in slide-in-from-bottom duration-300">
          <div className="bg-white border-l-4 border-l-[#003f87] border border-[#c2c6d4] rounded-2xl shadow-xl p-5 relative">
            <button
              onClick={() => setSelectedComponent(null)}
              className="absolute top-3 right-3 p-1 rounded-full text-[#727784] hover:bg-[#e7e8f0]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-11 h-11 rounded-xl bg-[#d7e2ff] flex items-center justify-center text-[#003f87]">
                <span className="material-symbols-outlined text-[28px]">{selectedComponent.icon}</span>
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#003f87]">{selectedComponent.title}</h3>
                <p className="font-mono-tech text-[10px] text-[#006876] font-bold uppercase tracking-wider">
                  STATUS: {selectedComponent.status}
                </p>
              </div>
            </div>

            <p className="text-[14px] text-[#424752] leading-relaxed mb-4">
              {selectedComponent.desc}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#c2c6d4]">
              <div className="bg-[#f2f3fc] p-2.5 rounded-xl border border-[#c2c6d4]">
                <p className="text-[10px] text-[#727784] font-bold uppercase">VOLTAN</p>
                <p className="font-mono-tech text-[15px] font-bold text-[#003f87]">{selectedComponent.voltage}</p>
              </div>
              <div className="bg-[#f2f3fc] p-2.5 rounded-xl border border-[#c2c6d4]">
                <p className="text-[10px] text-[#727784] font-bold uppercase">ARUS</p>
                <p className="font-mono-tech text-[15px] font-bold text-[#003f87]">{selectedComponent.current}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simulation Playback Bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-[#2e3037] text-white h-[64px] px-6 flex items-center justify-between shadow-2xl border-t border-[#424752]">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedComponent(componentsData.thermostat)}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
            title="Komponen Sebelumnya"
          >
            <span className="material-symbols-outlined text-[24px]">skip_previous</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg active:scale-90 transition-all cursor-pointer ${
              isPlaying ? 'bg-[#ba1a1a] text-white' : 'bg-[#0056b3] text-white'
            }`}
            title={isPlaying ? 'Hentikan Simulasi' : 'Mula Simulasi'}
          >
            <span className="material-symbols-outlined text-[28px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedComponent(componentsData.capacitor)}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
            title="Komponen Seterusnya"
          >
            <span className="material-symbols-outlined text-[24px]">skip_next</span>
          </button>
        </div>
      </div>
    </div>
  );
};
