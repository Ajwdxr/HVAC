import React, { useState, useRef, useEffect } from 'react';
import { ScreenView } from '../types';

interface WiringExerciseScreenProps {
  onNavigate: (screen: ScreenView) => void;
}

type WireColor = 'red' | 'blue' | 'green';

interface WireConnection {
  id: string;
  from: string;
  to: string;
  color: WireColor;
  pathD: string;
}

export const WiringExerciseScreen: React.FC<WiringExerciseScreenProps> = ({ onNavigate }) => {
  const [selectedColor, setSelectedColor] = useState<WireColor>('red');
  const [activeTerminal, setActiveTerminal] = useState<string | null>(null);
  const [connections, setConnections] = useState<WireConnection[]>([]);
  const [resultModal, setResultModal] = useState<{ open: boolean; success: boolean } | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Helper to calculate coordinates relative to canvas
  const getTerminalCoords = (termId: string) => {
    const el = document.getElementById(`term-${termId}`);
    const canvas = canvasRef.current;
    if (!el || !canvas) return { x: 0, y: 0 };

    const elRect = el.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    return {
      x: elRect.left + elRect.width / 2 - canvasRect.left,
      y: elRect.top + elRect.height / 2 - canvasRect.top,
    };
  };

  const handleTerminalClick = (termId: string) => {
    if (!activeTerminal) {
      setActiveTerminal(termId);
    } else {
      if (activeTerminal === termId) {
        setActiveTerminal(null);
        return;
      }

      // Create new connection
      const startPos = getTerminalCoords(activeTerminal);
      const endPos = getTerminalCoords(termId);
      const midX = (startPos.x + endPos.x) / 2;
      const pathD = `M ${startPos.x} ${startPos.y} C ${midX} ${startPos.y}, ${midX} ${endPos.y}, ${endPos.x} ${endPos.y}`;

      const newConn: WireConnection = {
        id: `${activeTerminal}-${termId}-${Date.now()}`,
        from: activeTerminal,
        to: termId,
        color: selectedColor,
        pathD,
      };

      setConnections((prev) => [...prev, newConn]);
      setActiveTerminal(null);
    }
  };

  // Redraw path curves on window resize
  useEffect(() => {
    const handleResize = () => {
      setConnections((prev) =>
        prev.map((conn) => {
          const startPos = getTerminalCoords(conn.from);
          const endPos = getTerminalCoords(conn.to);
          const midX = (startPos.x + endPos.x) / 2;
          return {
            ...conn,
            pathD: `M ${startPos.x} ${startPos.y} C ${midX} ${startPos.y}, ${midX} ${endPos.y}, ${endPos.x} ${endPos.y}`,
          };
        })
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCheckAnswer = () => {
    if (connections.length < 3) {
      setResultModal({ open: true, success: false });
      return;
    }

    // Check correct matching
    const hasLC = connections.some(
      (c) => ((c.from === 'L' && c.to === 'C') || (c.from === 'C' && c.to === 'L')) && c.color === 'red'
    );
    const hasNR = connections.some(
      (c) => ((c.from === 'N' && c.to === 'R') || (c.from === 'R' && c.to === 'N')) && c.color === 'blue'
    );
    const hasES = connections.some(
      (c) => ((c.from === 'E' && c.to === 'S') || (c.from === 'S' && c.to === 'E')) && c.color === 'green'
    );

    const isSuccess = hasLC && hasNR && hasES;
    setResultModal({ open: true, success: isSuccess });
  };

  const handleClearAll = () => {
    setConnections([]);
    setActiveTerminal(null);
  };

  const handleShowHint = () => {
    alert(
      "PETUNJUK:\n1. Wayar Merah (Live) sambung dari 'L' ke Terminal 'C' (Common).\n2. Wayar Biru (Neutral) sambung dari 'N' ke Terminal 'R' (Run).\n3. Wayar Hijau/Kuning (Bumi) sambung dari 'E' ke Terminal 'S' (Start/Earth)."
    );
  };

  return (
    <div className="pt-20 pb-28 min-h-screen bg-[#f9f9ff] flex flex-col animate-in fade-in duration-300">
      {/* Safety Banner */}
      <div className="bg-[#ffdad6] text-[#93000a] px-6 py-3 flex items-center justify-center gap-3 animate-pulse border-b border-[#ffdad6]">
        <span className="material-symbols-outlined text-[22px] fill-icon">warning</span>
        <p className="font-bold tracking-wide text-[14px]">
          AMARAN KESELAMATAN: Sila pastikan bekalan kuasa diputuskan sebelum memulakan pendawaian.
        </p>
      </div>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Wiring Canvas (8 Cols) */}
        <section
          ref={canvasRef}
          className="lg:col-span-8 relative wire-canvas bg-[#f2f3fc] p-6 md:p-10 rounded-2xl border border-[#c2c6d4] shadow-md min-h-[420px] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="grid grid-cols-2 gap-16 md:gap-32 w-full max-w-3xl p-8 md:p-12 bg-white/70 border border-[#c2c6d4] rounded-2xl shadow-sm backdrop-blur-sm relative z-10">
            {/* Source Terminals */}
            <div className="space-y-8">
              <h3 className="text-[18px] font-bold text-[#424752] text-center mb-6">Punca Bekalan</h3>
              <div className="flex flex-col gap-6 items-center">
                {/* L Terminal */}
                <div className="flex items-center gap-4">
                  <span className="font-mono-tech text-[15px] font-bold w-6 text-right">L</span>
                  <button
                    id="term-L"
                    onClick={() => handleTerminalClick('L')}
                    className={`w-12 h-12 bg-[#424752] rounded-full border-4 border-[#c2c6d4] transition-all flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 ${
                      activeTerminal === 'L' ? 'ring-4 ring-[#003f87] scale-110' : ''
                    }`}
                  >
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  </button>
                  <span className="text-[#727784] text-[12px] italic">Live</span>
                </div>

                {/* N Terminal */}
                <div className="flex items-center gap-4">
                  <span className="font-mono-tech text-[15px] font-bold w-6 text-right">N</span>
                  <button
                    id="term-N"
                    onClick={() => handleTerminalClick('N')}
                    className={`w-12 h-12 bg-[#424752] rounded-full border-4 border-[#c2c6d4] transition-all flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 ${
                      activeTerminal === 'N' ? 'ring-4 ring-[#003f87] scale-110' : ''
                    }`}
                  >
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  </button>
                  <span className="text-[#727784] text-[12px] italic">Neutral</span>
                </div>

                {/* E Terminal */}
                <div className="flex items-center gap-4">
                  <span className="font-mono-tech text-[15px] font-bold w-6 text-right">E</span>
                  <button
                    id="term-E"
                    onClick={() => handleTerminalClick('E')}
                    className={`w-12 h-12 bg-[#424752] rounded-full border-4 border-[#c2c6d4] transition-all flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 ${
                      activeTerminal === 'E' ? 'ring-4 ring-[#003f87] scale-110' : ''
                    }`}
                  >
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  </button>
                  <span className="text-[#727784] text-[12px] italic">Earth</span>
                </div>
              </div>
            </div>

            {/* Compressor Terminals */}
            <div className="space-y-8">
              <h3 className="text-[18px] font-bold text-[#424752] text-center mb-6">Pemampat</h3>
              <div className="flex flex-col gap-6 items-center">
                {/* C Terminal */}
                <div className="flex items-center gap-4">
                  <span className="text-[#727784] text-[12px] italic">Common</span>
                  <button
                    id="term-C"
                    onClick={() => handleTerminalClick('C')}
                    className={`w-12 h-12 bg-[#424752] rounded-full border-4 border-[#c2c6d4] transition-all flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 ${
                      activeTerminal === 'C' ? 'ring-4 ring-[#003f87] scale-110' : ''
                    }`}
                  >
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  </button>
                  <span className="font-mono-tech text-[15px] font-bold w-6 text-left">C</span>
                </div>

                {/* R Terminal */}
                <div className="flex items-center gap-4">
                  <span className="text-[#727784] text-[12px] italic">Run</span>
                  <button
                    id="term-R"
                    onClick={() => handleTerminalClick('R')}
                    className={`w-12 h-12 bg-[#424752] rounded-full border-4 border-[#c2c6d4] transition-all flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 ${
                      activeTerminal === 'R' ? 'ring-4 ring-[#003f87] scale-110' : ''
                    }`}
                  >
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  </button>
                  <span className="font-mono-tech text-[15px] font-bold w-6 text-left">R</span>
                </div>

                {/* S Terminal */}
                <div className="flex items-center gap-4">
                  <span className="text-[#727784] text-[12px] italic">Start</span>
                  <button
                    id="term-S"
                    onClick={() => handleTerminalClick('S')}
                    className={`w-12 h-12 bg-[#424752] rounded-full border-4 border-[#c2c6d4] transition-all flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 ${
                      activeTerminal === 'S' ? 'ring-4 ring-[#003f87] scale-110' : ''
                    }`}
                  >
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  </button>
                  <span className="font-mono-tech text-[15px] font-bold w-6 text-left">S</span>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Overlay for Wires */}
          <svg className="absolute inset-0 pointer-events-none w-full h-full z-20">
            {connections.map((conn) => {
              const mainStroke = conn.color === 'red' ? '#dc2626' : conn.color === 'blue' ? '#2563eb' : '#22c55e';
              return (
                <g key={conn.id}>
                  <path
                    d={conn.pathD}
                    stroke={mainStroke}
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}
                  />
                  {conn.color === 'green' && (
                    <path
                      d={conn.pathD}
                      stroke="#facc15"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray="12,12"
                      strokeLinecap="round"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </section>

        {/* Right Toolbox & Controls (4 Cols) */}
        <aside className="lg:col-span-4 bg-white border border-[#c2c6d4] rounded-2xl p-6 shadow-md flex flex-col space-y-6">
          <div>
            <h2 className="text-[20px] font-bold text-[#003f87] flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined">construction</span>
              <span>Kotak Alatan</span>
            </h2>
            <p className="text-[13px] text-[#424752] italic">Pilih warna wayar untuk mula menyambung:</p>

            {/* Wire Type Selectors */}
            <div className="space-y-3 mt-4">
              <button
                onClick={() => setSelectedColor('red')}
                className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedColor === 'red'
                    ? 'border-[#003f87] bg-[#f2f3fc] shadow-sm'
                    : 'border-[#c2c6d4] hover:bg-[#e7e8f0]'
                }`}
              >
                <div className="w-8 h-8 bg-red-600 rounded-full border-2 border-white shadow-sm flex-shrink-0" />
                <div className="text-left">
                  <p className="font-bold text-[#191c21] text-[15px] leading-tight">Wayar Merah</p>
                  <p className="text-[12px] text-[#424752]">Live / Fasa</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedColor('blue')}
                className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedColor === 'blue'
                    ? 'border-[#003f87] bg-[#f2f3fc] shadow-sm'
                    : 'border-[#c2c6d4] hover:bg-[#e7e8f0]'
                }`}
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-sm flex-shrink-0" />
                <div className="text-left">
                  <p className="font-bold text-[#191c21] text-[15px] leading-tight">Wayar Biru</p>
                  <p className="text-[12px] text-[#424752]">Neutral</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedColor('green')}
                className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedColor === 'green'
                    ? 'border-[#003f87] bg-[#f2f3fc] shadow-sm'
                    : 'border-[#c2c6d4] hover:bg-[#e7e8f0]'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-tr from-green-500 via-yellow-400 to-green-500 rounded-full border-2 border-white shadow-sm flex-shrink-0" />
                <div className="text-left">
                  <p className="font-bold text-[#191c21] text-[15px] leading-tight">Wayar Hijau/Kuning</p>
                  <p className="text-[12px] text-[#424752]">Bumi (Earth)</p>
                </div>
              </button>
            </div>
          </div>

          {/* Task Instructions */}
          <div className="bg-[#f2f3fc] p-4 rounded-xl border border-[#c2c6d4] space-y-1">
            <h4 className="font-bold text-[12px] text-[#006876] uppercase tracking-wider">TUGASAN</h4>
            <p className="text-[13px] text-[#424752] leading-relaxed">
              Sambungkan bekalan kuasa ke unit pemampat mengikut kod warna yang betul untuk memastikan sistem berfungsi dengan selamat.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleCheckAnswer}
              className="w-full bg-[#003f87] hover:bg-[#0056b3] text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer text-[16px]"
            >
              <span className="material-symbols-outlined text-[20px] fill-icon">verified</span>
              <span>Semak Jawapan</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleClearAll}
                className="bg-[#e7e8f0] text-[#424752] py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-1.5 hover:bg-[#ffdad6] hover:text-[#ba1a1a] transition-all text-[13px] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
                <span>Padam Semua</span>
              </button>

              <button
                onClick={handleShowHint}
                className="bg-[#006876] text-white py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-all text-[13px] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] fill-icon">lightbulb</span>
                <span>Petunjuk</span>
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Result Modal */}
      {resultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white max-w-sm w-full rounded-3xl p-8 text-center shadow-2xl border border-[#c2c6d4]">
            <div
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg ${
                resultModal.success ? 'bg-green-500 text-white' : 'bg-[#ba1a1a] text-white'
              }`}
            >
              <span className="material-symbols-outlined text-4xl">
                {resultModal.success ? 'check_circle' : 'error'}
              </span>
            </div>

            <h2 className="text-[22px] font-bold text-[#191c21] mb-2">
              {resultModal.success ? 'Tahniah!' : 'Cuba Lagi'}
            </h2>

            <p className="text-[14px] text-[#424752] mb-8 leading-relaxed">
              {resultModal.success
                ? 'Pendawaian anda adalah betul dan selamat. Sistem sedia untuk diuji dalam makmal.'
                : 'Terdapat ralat atau sambungan tidak lengkap. Sila semak kod warna dan sambungan terminal L-C, N-R, E-S.'}
            </p>

            <button
              onClick={() => {
                setResultModal(null);
                if (resultModal.success) {
                  onNavigate('dashboard');
                }
              }}
              className="w-full bg-[#003f87] hover:bg-[#0056b3] text-white py-3 rounded-full font-bold transition-colors cursor-pointer shadow-md"
            >
              {resultModal.success ? 'Kembali ke Dashboard' : 'Cuba Semula'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
