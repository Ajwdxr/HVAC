import React, { useState } from 'react';
import { ScreenView } from '../types';

interface DolStarterScreenProps {
  onNavigate: (screen: ScreenView) => void;
}

export const DolStarterScreen: React.FC<DolStarterScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'schematic' | 'wiring' | 'principles'>('schematic');

  // Simulation State
  const [fuseOk, setFuseOk] = useState<boolean>(true);
  const [gblTripped, setGblTripped] = useState<boolean>(false);
  const [pb2Pressed, setPb2Pressed] = useState<boolean>(false); // Start NO
  const [pb1Pressed, setPb1Pressed] = useState<boolean>(false); // Stop NC (pressed = open)
  const [isLatched, setIsLatched] = useState<boolean>(false); // Aux contact 'm'

  // Calculated Circuit States
  // Power reaches GBL if fuse is OK
  const powerAtGbl = fuseOk;
  // Power reaches PB1 if fuse OK and GBL not tripped
  const powerAtPb1 = powerAtGbl && !gblTripped;
  // PB1 is NC, so power passes through if not pressed
  const powerAtPb2AndM = powerAtPb1 && !pb1Pressed;

  // Coil M is energized if power passes PB1 AND (PB2 is pressed OR aux contact 'm' is latched)
  const isCoilEnergized = powerAtPb2AndM && (pb2Pressed || isLatched);

  // Latching effect: when coil energizes, 'm' latches ON
  React.useEffect(() => {
    if (isCoilEnergized && !isLatched) {
      setIsLatched(true);
    }
  }, [isCoilEnergized, isLatched]);

  // If power at PB1 is cut off, unlatch
  React.useEffect(() => {
    if (!powerAtPb2AndM && isLatched) {
      setIsLatched(false);
    }
  }, [powerAtPb2AndM, isLatched]);

  // Lamp 1 (LP1) lights up when Coil M is energized
  const isLp1On = isCoilEnergized;

  // Lamp 2 (LP2 - Trip) lights up when GBL is TRIPPED and fuse is OK
  const isLp2On = powerAtGbl && gblTripped;

  // Interactive PB2 Press handler
  const handleStartPressDown = () => {
    setPb2Pressed(true);
  };
  const handleStartPressUp = () => {
    setPb2Pressed(false);
  };

  // Interactive PB1 Press handler
  const handleStopPressDown = () => {
    setPb1Pressed(true);
    setIsLatched(false);
  };
  const handleStopPressUp = () => {
    setPb1Pressed(false);
  };

  const handleResetSimulation = () => {
    setFuseOk(true);
    setGblTripped(false);
    setPb2Pressed(false);
    setPb1Pressed(false);
    setIsLatched(false);
  };

  return (
    <div className="pt-20 pb-28 min-h-screen bg-[#f9f9ff] flex flex-col justify-between animate-in fade-in duration-300">
      {/* Top Header Title Banner */}
      <div className="bg-[#003f87] text-white py-4 px-4 md:px-8 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#58e6ff] text-[#003f87] font-mono-tech text-[10px] font-bold px-2 py-0.5 rounded">
                MODUL 05
              </span>
              <span className="text-[12px] text-[#c2c6d4]">Rajah 4.1 & 4.3</span>
            </div>
            <h1 className="text-[20px] md:text-[22px] font-bold mt-1">
              Litar Kawalan Penghidup Talian Terus (DOL Starter)
            </h1>
          </div>
          <button
            onClick={() => onNavigate('modules')}
            className="self-start md:self-auto bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-[13px] font-bold flex items-center gap-2 cursor-pointer transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Senarai Modul</span>
          </button>
        </div>
      </div>

      {/* Navigation Segmented Tabs */}
      <div className="px-4 md:px-8 py-4 max-w-3xl mx-auto w-full">
        <div className="bg-[#e7e8f0] rounded-xl p-1 flex border border-[#c2c6d4] shadow-sm">
          <button
            onClick={() => setActiveTab('schematic')}
            className={`flex-1 py-2.5 text-[13px] md:text-[14px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'schematic'
                ? 'bg-[#003f87] text-white shadow'
                : 'text-[#424752] hover:text-[#003f87]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">schema</span>
            <span>Rajah Skematik</span>
          </button>
          <button
            onClick={() => setActiveTab('wiring')}
            className={`flex-1 py-2.5 text-[13px] md:text-[14px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'wiring'
                ? 'bg-[#003f87] text-white shadow'
                : 'text-[#424752] hover:text-[#003f87]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">cable</span>
            <span>Litar Pendawaian</span>
          </button>
          <button
            onClick={() => setActiveTab('principles')}
            className={`flex-1 py-2.5 text-[13px] md:text-[14px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'principles'
                ? 'bg-[#003f87] text-white shadow'
                : 'text-[#424752] hover:text-[#003f87]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span>Prinsip Kerja</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SCHEMATIC SIMULATION */}
      {activeTab === 'schematic' && (
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Schematic Diagram View (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-[#c2c6d4] rounded-2xl shadow-md p-4 md:p-6 flex flex-col items-center relative min-h-[480px]">
            <div className="w-full flex justify-between items-center mb-3 pb-2 border-b border-[#c2c6d4]">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${isCoilEnergized ? 'bg-green-500 animate-ping' : isLp2On ? 'bg-red-500 animate-ping' : 'bg-gray-400'}`} />
                <span className="font-mono-tech text-[12px] font-bold text-[#003f87] uppercase tracking-wider">
                  RAJAH 4.1: LITAR SKEMATIK PENGHIDUP TALIAN TERUS
                </span>
              </div>
              <span className={`px-3 py-1 rounded-md text-[11px] font-bold border ${
                isCoilEnergized 
                  ? 'bg-green-100 text-green-800 border-green-300' 
                  : isLp2On 
                    ? 'bg-red-100 text-red-800 border-red-300 animate-pulse' 
                    : 'bg-gray-100 text-gray-700 border-gray-300'
              }`}>
                {isCoilEnergized ? 'MOTOR BERJALAN' : isLp2On ? 'LEBIHAN ARUS (TRIP)' : 'BERHENTI / STANDBY'}
              </span>
            </div>

            {/* SVG Interactive Dynamic Diagram */}
            <div className="w-full relative flex justify-center py-2">
              <svg className="w-full max-w-[500px] h-auto min-h-[380px]" viewBox="0 0 420 400">
                {/* Background Grid */}
                <pattern id="schematicGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f2fb" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#schematicGrid)" />

                {/* Supply Terminals L and N */}
                {/* L Terminal */}
                <circle cx="100" cy="30" r="7" fill="white" stroke="#003f87" strokeWidth="2" />
                <text x="100" y="34" textAnchor="middle" className="font-mono-tech text-[10px] font-bold fill-[#003f87]">L</text>
                <text x="100" y="16" textAnchor="middle" className="font-mono-tech text-[9px] font-bold fill-[#727784]">Punca Hidup</text>

                {/* N Terminal */}
                <circle cx="340" cy="30" r="7" fill="white" stroke="#003f87" strokeWidth="2" />
                <text x="340" y="34" textAnchor="middle" className="font-mono-tech text-[10px] font-bold fill-[#003f87]">N</text>
                <text x="340" y="16" textAnchor="middle" className="font-mono-tech text-[9px] font-bold fill-[#727784]">Punca Neutral</text>

                {/* Main Neutral Rail Wire */}
                <path d="M 340 37 L 340 340 L 100 340" fill="none" stroke="#2563eb" strokeWidth="2.5" />

                {/* Fuse F */}
                <path d="M 100 37 L 100 60" fill="none" stroke={powerAtGbl ? '#dc2626' : '#9ca3af'} strokeWidth="3" />
                <rect x="92" y="60" width="16" height="30" fill={fuseOk ? '#dbeafe' : '#fecdd3'} stroke="#003f87" strokeWidth="2" rx="2" />
                <line x1="100" y1="60" x2="100" y2="90" stroke={fuseOk ? '#dc2626' : '#9ca3af'} strokeWidth="2" strokeDasharray={fuseOk ? 'none' : '3,3'} />
                <text x="75" y="78" className="font-mono-tech text-[11px] font-bold fill-[#003f87]">F</text>
                <path d="M 100 90 L 100 110" fill="none" stroke={powerAtGbl ? '#dc2626' : '#9ca3af'} strokeWidth="3" />

                {/* GBL (Overload Relay Contact) */}
                <circle cx="100" cy="110" r="3" fill="#003f87" />
                <path 
                  d={gblTripped ? "M 100 110 L 125 125" : "M 100 110 L 100 135"} 
                  fill="none" 
                  stroke={gblTripped ? '#e11d48' : '#003f87'} 
                  strokeWidth="3" 
                />
                <circle cx="100" cy="135" r="3" fill="#003f87" />
                <text x="60" y="125" className="font-mono-tech text-[11px] font-bold fill-[#003f87]">GBL</text>

                {/* GBL NO Overload Trip Wire to LP2 */}
                {gblTripped && (
                  <path d="M 100 110 L 260 125 L 260 280" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="4,2" className="animate-[dash_1s_linear_infinite]" />
                )}

                {/* Wire from GBL to PB1 */}
                <path d="M 100 135 L 100 155" fill="none" stroke={powerAtPb1 ? '#dc2626' : '#9ca3af'} strokeWidth="3" />

                {/* PB1 (Stop Pushbutton - NC) */}
                <circle cx="100" cy="155" r="3" fill="#003f87" />
                {/* NC Contact Bar */}
                <line 
                  x1={pb1Pressed ? "82" : "90"} 
                  y1={pb1Pressed ? "160" : "155"} 
                  x2={pb1Pressed ? "118" : "110"} 
                  y2={pb1Pressed ? "160" : "155"} 
                  stroke="#dc2626" 
                  strokeWidth="4" 
                />
                <line x1="100" y1="145" x2="100" y2="155" stroke="#dc2626" strokeWidth="2" />
                <circle cx="100" cy="180" r="3" fill="#003f87" />
                <text x="60" y="172" className="font-mono-tech text-[11px] font-bold fill-[#dc2626]">PB1 (Henti)</text>

                {/* Wire from PB1 to Parallel Branch (PB2 & m) */}
                <path d="M 100 180 L 100 200" fill="none" stroke={powerAtPb2AndM ? '#dc2626' : '#9ca3af'} strokeWidth="3" />

                {/* T-Junctions for Parallel Branch */}
                <circle cx="100" cy="200" r="4" fill="#003f87" />
                <path d="M 100 200 L 50 200 L 50 215" fill="none" stroke={powerAtPb2AndM ? '#dc2626' : '#9ca3af'} strokeWidth="2.5" />
                <path d="M 100 200 L 130 200 L 130 215" fill="none" stroke={powerAtPb2AndM ? '#dc2626' : '#9ca3af'} strokeWidth="2.5" />

                {/* Left Parallel Branch: Aux Contact 'm' (Latching) */}
                <circle cx="50" cy="215" r="3" fill="#003f87" />
                <line 
                  x1="50" y1="215" 
                  x2={isLatched ? "50" : "62"} 
                  y2={isLatched ? "245" : "240"} 
                  stroke={isLatched ? '#16a34a' : '#003f87'} 
                  strokeWidth="3" 
                />
                <circle cx="50" cy="245" r="3" fill="#003f87" />
                <text x="25" y="234" className="font-mono-tech text-[11px] font-bold fill-[#003f87]">m</text>

                {/* Right Parallel Branch: PB2 (Start Pushbutton - NO) */}
                <circle cx="130" cy="215" r="3" fill="#003f87" />
                <line 
                  x1={pb2Pressed ? "130" : "138"} 
                  y1="215" 
                  x2={pb2Pressed ? "130" : "148"} 
                  y2="245" 
                  stroke={pb2Pressed ? '#16a34a' : '#16a34a'} 
                  strokeWidth="3" 
                />
                <circle cx="130" cy="245" r="3" fill="#003f87" />
                <text x="145" y="234" className="font-mono-tech text-[11px] font-bold fill-[#16a34a]">PB2 (Hidup)</text>

                {/* Junction Re-Merge after PB2 & m */}
                <path d="M 50 245 L 50 260 L 100 260" fill="none" stroke={isCoilEnergized ? '#16a34a' : '#9ca3af'} strokeWidth="2.5" />
                <path d="M 130 245 L 130 260 L 100 260" fill="none" stroke={isCoilEnergized ? '#16a34a' : '#9ca3af'} strokeWidth="2.5" />
                <circle cx="100" cy="260" r="4" fill="#003f87" />

                {/* Wire to Contactor Coil M and LP1 */}
                <path d="M 100 260 L 100 280" fill="none" stroke={isCoilEnergized ? '#16a34a' : '#9ca3af'} strokeWidth="3" />
                <circle cx="100" cy="280" r="4" fill="#003f87" />

                {/* Branch to Coil M */}
                <path d="M 100 280 L 100 295" fill="none" stroke={isCoilEnergized ? '#16a34a' : '#9ca3af'} strokeWidth="3" />
                <rect 
                  x="80" y="295" width="40" height="30" 
                  fill={isCoilEnergized ? '#dcfce7' : 'white'} 
                  stroke={isCoilEnergized ? '#16a34a' : '#003f87'} 
                  strokeWidth="2.5" rx="4"
                  className={isCoilEnergized ? 'pulse-glow' : ''}
                />
                <text x="100" y="315" textAnchor="middle" className="font-mono-tech text-[14px] font-bold fill-[#003f87]">M</text>
                <path d="M 100 325 L 100 340" fill="none" stroke="#2563eb" strokeWidth="2.5" />

                {/* Branch to LP1 (Pilot Lamp 1 - Running Green) */}
                <path d="M 100 280 L 180 280 L 180 295" fill="none" stroke={isCoilEnergized ? '#16a34a' : '#9ca3af'} strokeWidth="2.5" />
                <circle 
                  cx="180" cy="310" r="14" 
                  fill={isLp1On ? '#22c55e' : '#f1f5f9'} 
                  stroke="#003f87" strokeWidth="2" 
                />
                {/* Cross symbol in Lamp */}
                <line x1="170" y1="300" x2="190" y2="320" stroke={isLp1On ? 'white' : '#94a3b8'} strokeWidth="2" />
                <line x1="190" y1="300" x2="170" y2="320" stroke={isLp1On ? 'white' : '#94a3b8'} strokeWidth="2" />
                <text x="180" y="338" textAnchor="middle" className="font-mono-tech text-[10px] font-bold fill-[#15803d]">LP1 (Jalan)</text>
                <path d="M 180 324 L 180 340" fill="none" stroke="#2563eb" strokeWidth="2.5" />

                {/* LP2 (Pilot Lamp 2 - Overload Trip Red/Yellow) */}
                <circle 
                  cx="260" cy="310" r="14" 
                  fill={isLp2On ? '#ef4444' : '#f1f5f9'} 
                  stroke="#003f87" strokeWidth="2" 
                  className={isLp2On ? 'animate-bounce' : ''}
                />
                <line x1="250" y1="300" x2="270" y2="320" stroke={isLp2On ? 'white' : '#94a3b8'} strokeWidth="2" />
                <line x1="270" y1="300" x2="250" y2="320" stroke={isLp2On ? 'white' : '#94a3b8'} strokeWidth="2" />
                <text x="260" y="338" textAnchor="middle" className="font-mono-tech text-[10px] font-bold fill-[#b91c1c]">LP2 (Trip)</text>
                <path d="M 260 324 L 260 340" fill="none" stroke="#2563eb" strokeWidth="2.5" />
              </svg>
            </div>

            {/* Live Component Status Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full mt-2 pt-3 border-t border-[#c2c6d4]">
              <div className="bg-[#f2f3fc] p-2 rounded-xl text-center border border-[#c2c6d4]">
                <p className="text-[10px] text-[#727784] font-bold uppercase">PB2 (START)</p>
                <p className={`font-mono-tech text-[12px] font-bold ${pb2Pressed ? 'text-green-600' : 'text-[#424752]'}`}>
                  {pb2Pressed ? 'DITEKAN' : 'RELEASED'}
                </p>
              </div>
              <div className="bg-[#f2f3fc] p-2 rounded-xl text-center border border-[#c2c6d4]">
                <p className="text-[10px] text-[#727784] font-bold uppercase">SESENTUH (m)</p>
                <p className={`font-mono-tech text-[12px] font-bold ${isLatched ? 'text-green-600' : 'text-[#424752]'}`}>
                  {isLatched ? 'LATCHED (TERTUTUP)' : 'OPEN (TERBUKA)'}
                </p>
              </div>
              <div className="bg-[#f2f3fc] p-2 rounded-xl text-center border border-[#c2c6d4]">
                <p className="text-[10px] text-[#727784] font-bold uppercase">GEGELUNG (M)</p>
                <p className={`font-mono-tech text-[12px] font-bold ${isCoilEnergized ? 'text-green-600' : 'text-[#424752]'}`}>
                  {isCoilEnergized ? 'BERTENAGA (ON)' : 'TIADA BEKALAN'}
                </p>
              </div>
              <div className="bg-[#f2f3fc] p-2 rounded-xl text-center border border-[#c2c6d4]">
                <p className="text-[10px] text-[#727784] font-bold uppercase">STATUS GBL</p>
                <p className={`font-mono-tech text-[12px] font-bold ${gblTripped ? 'text-red-600' : 'text-green-600'}`}>
                  {gblTripped ? 'TERPELANTIK (TRIP)' : 'NORMAL'}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Control Console Side Panel (4 Cols) */}
          <aside className="lg:col-span-4 bg-white border border-[#c2c6d4] rounded-2xl p-5 shadow-md flex flex-col space-y-5">
            <div className="flex items-center gap-2 border-b border-[#c2c6d4] pb-2">
              <span className="material-symbols-outlined text-[#003f87]">touch_app</span>
              <h2 className="text-[18px] font-bold text-[#003f87]">Panel Kawalan Interaktif</h2>
            </div>

            <p className="text-[13px] text-[#424752] leading-relaxed">
              Uji operasi litar secara langsung dengan menekan punat tekan atau mensimulasikan kerosakan beban lebih:
            </p>

            {/* Pushbuttons Action Panel */}
            <div className="space-y-3">
              {/* PB2 Start Button */}
              <button
                onMouseDown={handleStartPressDown}
                onMouseUp={handleStartPressUp}
                onTouchStart={handleStartPressDown}
                onTouchEnd={handleStartPressUp}
                className={`w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-between transition-all cursor-pointer shadow ${
                  pb2Pressed ? 'bg-green-700 scale-98 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    PB2
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] leading-tight">TEKAN PUNAT HIDUP</p>
                    <p className="text-[10px] opacity-80">Normally Open (NO)</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[22px]">play_circle</span>
              </button>

              {/* PB1 Stop Button */}
              <button
                onMouseDown={handleStopPressDown}
                onMouseUp={handleStopPressUp}
                onTouchStart={handleStopPressDown}
                onTouchEnd={handleStopPressUp}
                className={`w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-between transition-all cursor-pointer shadow ${
                  pb1Pressed ? 'bg-red-800 scale-98 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    PB1
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] leading-tight">TEKAN PUNAT HENTI</p>
                    <p className="text-[10px] opacity-80">Normally Closed (NC)</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[22px]">stop_circle</span>
              </button>
            </div>

            <hr className="border-[#c2c6d4]" />

            {/* Fault Testing Controls */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#727784] block">
                UJI KEROSAKAN & SIMULASI
              </label>

              {/* GBL Overload Toggle */}
              <button
                onClick={() => setGblTripped(!gblTripped)}
                className={`w-full p-3 rounded-xl border-2 font-bold flex items-center justify-between transition-all cursor-pointer ${
                  gblTripped
                    ? 'border-red-600 bg-red-50 text-red-700 shadow-sm'
                    : 'border-[#c2c6d4] bg-[#f8fafc] text-[#424752] hover:bg-[#e7e8f0]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">warning</span>
                  <div className="text-left">
                    <p className="text-[13px] leading-tight">GBL (Geganti Beban Lebih)</p>
                    <p className="text-[11px] font-normal">{gblTripped ? 'Status: TERPELANTIK (TRIP)' : 'Status: Normal'}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${gblTripped ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {gblTripped ? 'RESET' : 'TRIP'}
                </span>
              </button>

              {/* Fuse Toggle */}
              <button
                onClick={() => setFuseOk(!fuseOk)}
                className={`w-full p-3 rounded-xl border-2 font-bold flex items-center justify-between transition-all cursor-pointer ${
                  !fuseOk
                    ? 'border-amber-600 bg-amber-50 text-amber-800 shadow-sm'
                    : 'border-[#c2c6d4] bg-[#f8fafc] text-[#424752] hover:bg-[#e7e8f0]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">flash_off</span>
                  <div className="text-left">
                    <p className="text-[13px] leading-tight">Fius Utama (F)</p>
                    <p className="text-[11px] font-normal">{fuseOk ? 'Status: Normal (Elok)' : 'Status: Terbakar / Putus'}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${!fuseOk ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {!fuseOk ? 'BAIKI' : 'PUTUS'}
                </span>
              </button>
            </div>

            {/* Reset All */}
            <button
              onClick={handleResetSimulation}
              className="w-full bg-[#e7e8f0] text-[#003f87] hover:bg-[#003f87] hover:text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer text-[13px]"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              <span>Reset Litar Kebenaran</span>
            </button>
          </aside>
        </main>
      )}

      {/* TAB 2: PHYSICAL WIRING DIAGRAM (Rajah 4.3) */}
      {activeTab === 'wiring' && (
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-2 flex flex-col space-y-6 animate-in fade-in">
          <div className="bg-white border border-[#c2c6d4] rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#c2c6d4]">
              <div>
                <span className="bg-[#006876] text-white font-mono-tech text-[10px] font-bold px-2 py-0.5 rounded">
                  RAJAH 4.3
                </span>
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#003f87] mt-1">
                  Litar Pendawaian Kawalan Penghidup Talian Terus
                </h2>
              </div>
              <span className="text-[12px] text-[#727784] font-mono-tech">Buku Teks ms. 131</span>
            </div>

            {/* Layout Diagram Display */}
            <div className="bg-[#191c21] p-6 rounded-2xl text-white flex flex-col items-center justify-center relative overflow-hidden min-h-[360px]">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg46kN5d2Bvd9-Gi3NrmPcO6Ec7LqraREx624-ZtoxTqZ7dCK95RlXvKiwsD1_lr5rk7Z2lXToh50KHyAgBJypF8dKNCkExEWKClfDIo9qHrfUg30N8H9VCeOhJStL5caXkoTG1OMt6TOn0sEf2BIPrM3JI8P0ahF-PIZIyU2a1mey2oI3tT6BXIN5atOuOWeeMvCesASKJIB0socqMibxt1F1D4XASs13D_d1ezsnoeEq3i6qGKPouZfwme2uMc69LU4RY--YXdE" 
                alt="Rajah 4.3 Litar Pendawaian Kawalan DOL"
                className="w-full max-h-[380px] object-contain rounded-xl bg-white p-2"
              />
            </div>

            {/* Detailed Terminal Legend Table (Petunjuk) */}
            <div className="mt-6">
              <h3 className="text-[16px] font-bold text-[#003f87] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">list_alt</span>
                <span>Petunjuk Symbol & Terminal Komponen</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 bg-[#f2f3fc] rounded-xl border border-[#c2c6d4]">
                  <span className="font-mono-tech font-bold text-[#003f87]">L / N</span>
                  <p className="text-[13px] font-semibold text-[#191c21]">Punca Bekalan</p>
                  <p className="text-[11px] text-[#727784]">Live (240V AC) & Neutral</p>
                </div>
                <div className="p-3 bg-[#f2f3fc] rounded-xl border border-[#c2c6d4]">
                  <span className="font-mono-tech font-bold text-[#003f87]">F</span>
                  <p className="text-[13px] font-semibold text-[#191c21]">Fius Utama</p>
                  <p className="text-[11px] text-[#727784]">Perlindungan Litar Pintas</p>
                </div>
                <div className="p-3 bg-[#f2f3fc] rounded-xl border border-[#c2c6d4]">
                  <span className="font-mono-tech font-bold text-[#dc2626]">PB1</span>
                  <p className="text-[13px] font-semibold text-[#191c21]">Punat Tekan Henti</p>
                  <p className="text-[11px] text-[#727784]">Lazim Tertutup (NC)</p>
                </div>
                <div className="p-3 bg-[#f2f3fc] rounded-xl border border-[#c2c6d4]">
                  <span className="font-mono-tech font-bold text-[#16a34a]">PB2</span>
                  <p className="text-[13px] font-semibold text-[#191c21]">Punat Tekan Hidup</p>
                  <p className="text-[11px] text-[#727784]">Lazim Terbuka (NO)</p>
                </div>
                <div className="p-3 bg-[#f2f3fc] rounded-xl border border-[#c2c6d4]">
                  <span className="font-mono-tech font-bold text-[#003f87]">GBL</span>
                  <p className="text-[13px] font-semibold text-[#191c21]">Geganti Beban Lebih</p>
                  <p className="text-[11px] text-[#727784]">Terminals 95-96 (NC) / 97-98 (NO)</p>
                </div>
                <div className="p-3 bg-[#f2f3fc] rounded-xl border border-[#c2c6d4]">
                  <span className="font-mono-tech font-bold text-[#003f87]">M & m</span>
                  <p className="text-[13px] font-semibold text-[#191c21]">Penyentuh Magnetik</p>
                  <p className="text-[11px] text-[#727784]">Gegelung A1-A2 & Sesentuh 13-14</p>
                </div>
                <div className="p-3 bg-[#f2f3fc] rounded-xl border border-[#c2c6d4]">
                  <span className="font-mono-tech font-bold text-[#16a34a]">LP1</span>
                  <p className="text-[13px] font-semibold text-[#191c21]">Lampu Pandu 1 (Hijau)</p>
                  <p className="text-[11px] text-[#727784]">Petunjuk Beroperasi (Run)</p>
                </div>
                <div className="p-3 bg-[#f2f3fc] rounded-xl border border-[#c2c6d4]">
                  <span className="font-mono-tech font-bold text-[#dc2626]">LP2</span>
                  <p className="text-[13px] font-semibold text-[#191c21]">Lampu Pandu 2 (Kuning/Merah)</p>
                  <p className="text-[11px] text-[#727784]">Petunjuk Beban Lebih (Trip)</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 3: WORKING PRINCIPLES (Prinsip Kerja & Aktiviti) */}
      {activeTab === 'principles' && (
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-2 flex flex-col space-y-6 animate-in fade-in">
          {/* Textbook Principles Section */}
          <div className="bg-white border border-[#c2c6d4] rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 border-b border-[#c2c6d4] pb-3 mb-4">
              <span className="material-symbols-outlined text-[#003f87] text-[28px]">menu_book</span>
              <div>
                <h2 className="text-[20px] font-bold text-[#003f87]">Prinsip Kerja Penghidup Talian Terus</h2>
                <p className="text-[12px] text-[#727784]">Dipetik terus daripada Silibus Kurikulum TVET / Vokasional</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="p-4 bg-[#f2f3fc] rounded-xl border-l-4 border-l-[#003f87] border border-[#c2c6d4]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#003f87] text-white text-[12px] font-bold flex items-center justify-center">1</span>
                  <h3 className="font-bold text-[15px] text-[#003f87]">Penekanan Punat Tekan Hidup (PB2)</h3>
                </div>
                <p className="text-[14px] text-[#424752] leading-relaxed pl-8">
                  Apabila punat tekan hidup (PB2) ditekan, sesentuh punat tekan hidup tertutup dan arus akan mengalir ke gegelung M.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-4 bg-[#f2f3fc] rounded-xl border-l-4 border-l-[#16a34a] border border-[#c2c6d4]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#16a34a] text-white text-[12px] font-bold flex items-center justify-center">2</span>
                  <h3 className="font-bold text-[15px] text-[#16a34a]">Pegang-Diri (Latching) & Lampu LP1</h3>
                </div>
                <p className="text-[14px] text-[#424752] leading-relaxed pl-8">
                  Gegelung M akan bertenaga dan sesentuh lazim terbuka (m) akan tertutup. Lampu pandu (LP1) akan menyala.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-4 bg-[#f2f3fc] rounded-xl border-l-4 border-l-[#dc2626] border border-[#c2c6d4]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#dc2626] text-white text-[12px] font-bold flex items-center justify-center">3</span>
                  <h3 className="font-bold text-[15px] text-[#dc2626]">Penekanan Punat Tekan Henti (PB1)</h3>
                </div>
                <p className="text-[14px] text-[#424752] leading-relaxed pl-8">
                  Apabila punat tekan henti (PB1) ditekan, sesentuh punat tekan henti akan terbuka dan memutuskan bekalan arus ke gegelung M.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-4 bg-[#f2f3fc] rounded-xl border-l-4 border-l-[#d97706] border border-[#c2c6d4]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#d97706] text-white text-[12px] font-bold flex items-center justify-center">4</span>
                  <h3 className="font-bold text-[15px] text-[#d97706]">Perlindungan Lebihan Arus (GBL) & Lampu LP2</h3>
                </div>
                <p className="text-[14px] text-[#424752] leading-relaxed pl-8">
                  Sekiranya berlaku lebihan arus dalam litar, geganti beban lebih (GBL) akan terpelantik dan menyebabkan gegelung M tidak bertenaga. Lampu pandu (LP2) akan menyala, ini menunjukkan berlaku lebihan arus dalam litar.
                </p>
              </div>
            </div>
          </div>

          {/* Practical Checklist Activity */}
          <div className="bg-white border border-[#c2c6d4] rounded-2xl shadow-md p-6">
            <h3 className="text-[18px] font-bold text-[#003f87] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined">assignment_turned_in</span>
              <span>Aktiviti Makmal & Peralatan Diperlukan</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#f9f9ff] p-4 rounded-xl border border-[#c2c6d4]">
                <p className="font-bold text-[13px] text-[#003f87] uppercase mb-2">SENARAI PERALATAN:</p>
                <ul className="text-[13px] text-[#424752] space-y-1.5 list-disc pl-5">
                  <li>Meter Pelbagai (Multimeter Analog/Digital)</li>
                  <li>Pemotong Penjalur Wayar & Pemutar Skru</li>
                  <li>Papan Ujian Pendawaian TVET</li>
                </ul>
              </div>

              <div className="bg-[#f9f9ff] p-4 rounded-xl border border-[#c2c6d4]">
                <p className="font-bold text-[13px] text-[#003f87] uppercase mb-2">SENARAI BAHAN & KELENGKAPAN:</p>
                <ul className="text-[13px] text-[#424752] space-y-1.5 list-disc pl-5">
                  <li>Fius / MCB Fasa Tunggal</li>
                  <li>Punat Tekan Henti (PB1) & Punat Tekan Hidup (PB2)</li>
                  <li>Geganti Beban Lebih (GBL) & Penyentuh Magnetik (M)</li>
                  <li>Lampu Pandu Hijau (LP1) & Lampu Pandu Merah (LP2)</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('schematic')}
              className="mt-6 w-full bg-[#003f87] hover:bg-[#0056b3] text-white py-3 rounded-xl font-bold transition-all shadow cursor-pointer text-center"
            >
              Uji Simulasi Litar Sekarang
            </button>
          </div>
        </main>
      )}
    </div>
  );
};
