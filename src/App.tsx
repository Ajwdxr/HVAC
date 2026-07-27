import React, { useState } from 'react';
import { ScreenView, StudentProfile } from './types';
import { initialStudent, modulesData, announcementsData } from './data';
import { HeaderNav } from './components/HeaderNav';
import { BottomNav } from './components/BottomNav';
import { DrawerNav } from './components/DrawerNav';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ModuleListScreen } from './components/ModuleListScreen';
import { SimulationScreen } from './components/SimulationScreen';
import { TroubleshootingScreen } from './components/TroubleshootingScreen';
import { WiringExerciseScreen } from './components/WiringExerciseScreen';
import { DolStarterScreen } from './components/DolStarterScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('dashboard');
  const [student, setStudent] = useState<StudentProfile>(initialStudent);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getSubTitle = (screen: ScreenView) => {
    switch (screen) {
      case 'dashboard':
        return 'Dashboard Pelajar';
      case 'modules':
        return 'Senarai Modul';
      case 'simulation':
        return 'Simulasi Litar & Sistem';
      case 'troubleshooting':
        return 'Troubleshooting & Multimeter';
      case 'wiring':
        return 'Modul 4: Litar Kawalan (Latihan Pendawaian)';
      case 'dol-starter':
        return 'Modul 5: Litar Kawalan Penghidup Talian Terus (DOL)';
      default:
        return 'Pusat Interaktif';
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#191c21] flex flex-col font-sans">
      {/* Header App Bar */}
      {currentScreen !== 'login' && (
        <HeaderNav
          currentScreen={currentScreen}
          student={student}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onNavigate={(s) => setCurrentScreen(s)}
          subtitle={getSubTitle(currentScreen)}
        />
      )}

      {/* Main View Router */}
      <div className="flex-1">
        {currentScreen === 'login' && (
          <LoginScreen onLoginSuccess={() => setCurrentScreen('dashboard')} />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardScreen
            student={student}
            modules={modulesData}
            announcements={announcementsData}
            onNavigate={(s) => setCurrentScreen(s)}
          />
        )}

        {currentScreen === 'modules' && (
          <ModuleListScreen
            modules={modulesData}
            onNavigate={(s) => setCurrentScreen(s)}
          />
        )}

        {currentScreen === 'simulation' && (
          <SimulationScreen onNavigate={(s) => setCurrentScreen(s)} />
        )}

        {currentScreen === 'troubleshooting' && (
          <TroubleshootingScreen onNavigate={(s) => setCurrentScreen(s)} />
        )}

        {currentScreen === 'wiring' && (
          <WiringExerciseScreen onNavigate={(s) => setCurrentScreen(s)} />
        )}

        {currentScreen === 'dol-starter' && (
          <DolStarterScreen onNavigate={(s) => setCurrentScreen(s)} />
        )}
      </div>

      {/* Global Navigation Bar */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={(s) => setCurrentScreen(s)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Global Drawer Menu */}
      <DrawerNav
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        student={student}
        onNavigate={(s) => setCurrentScreen(s)}
      />
    </div>
  );
}
