import React, { useState } from 'react';
import { ScreenView, StudentProfile } from './types';
import { initialStudent } from './data';
import { StarDeltaSimulatorScreen } from './components/StarDeltaSimulatorScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('star-delta');
  const [student] = useState<StudentProfile>(initialStudent);

  return (
    <div className="min-h-screen bg-[#060913] text-[#f8fafc] flex flex-col font-sans">
      {/* Main View Router */}
      <div className="flex-1">
        <StarDeltaSimulatorScreen onNavigate={(s) => setCurrentScreen(s)} />
      </div>
    </div>
  );
}
