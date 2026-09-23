import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ClassroomPage from './components/ClassroomPage';
import DiagnosticLabPage from './components/DiagnosticLabPage';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAuth = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setActiveTab('login');
    } else {
      setIsLoggedIn(true);
      setActiveTab('home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1C1917]">
      
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        onToggleAuth={handleToggleAuth}
      />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {activeTab === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}

        {activeTab === 'classroom' && (
          <ClassroomPage onNavigate={handleNavigate} />
        )}

        {activeTab === 'diagnostic' && (
          <DiagnosticLabPage onNavigate={handleNavigate} />
        )}

        {activeTab === 'login' && (
          <LoginPage 
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              setActiveTab('home');
            }} 
          />
        )}
      </main>

      {/* Warm Editorial Footer */}
      <footer className="border-t border-[#E7E5E4] bg-[#F5F0E6] py-10 mt-16 text-xs text-[#78716C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C2410C] text-white flex items-center justify-center font-editorial font-bold text-sm">
              P
            </div>
            <div>
              <span className="font-editorial text-lg font-bold text-[#1C1917]">PyJaApp</span>
              <span className="block text-[11px] font-serif italic text-[#78716C] -mt-1">
                An AI school with a human soul
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <button onClick={() => handleNavigate('home')} className="hover:text-[#1C1917]">Daily Cockpit</button>
            <button onClick={() => handleNavigate('classroom')} className="hover:text-[#1C1917]">HITL Classroom</button>
            <button onClick={() => handleNavigate('diagnostic')} className="hover:text-[#1C1917]">Diagnostic Lab</button>
            <button onClick={() => handleNavigate('login')} className="hover:text-[#1C1917]">Student Portal</button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Crafted for college placement aspirants</span>
            <span>•</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
