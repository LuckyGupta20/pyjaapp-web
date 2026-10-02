import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CareerKineticLogo from './components/CareerKineticLogo';
import HomePage from './components/HomePage';
import LearnPage from './components/LearnPage';
import PracticePage from './components/PracticePage';
import OpportunitiesPage from './components/OpportunitiesPage';
import CommunityPage from './components/CommunityPage';
import LoginPage from './components/LoginPage';
import AIProfileModal from './components/AIProfileModal';
import ToastContainer from './components/ToastContainer';
import { 
  Menu, Sparkles, Heart, Compass, BookOpen, Award, Briefcase, Users, 
  FileText, Flame, Bell, Search, ShieldCheck 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'learn' | 'practice' | 'opportunities' | 'community' | 'login'
  const [activeSubtab, setActiveSubtab] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleNavigate = (tab, subtab = null) => {
    setActiveTab(tab);
    setActiveSubtab(subtab);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
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

  // Human readable title for top breadcrumb bar
  const tabTitles = {
    home: 'Daily Cockpit & Habit Tracker',
    learn: 'Curated Roadmaps & Masterclasses',
    practice: 'Diagnostic Labs & AI Mock Interviews',
    opportunities: 'Private Tech Openings & PSU Exams',
    community: 'Peer Discussions & Brain Twin Network',
    login: 'Student Desk Sign-In'
  };

  return (
    <div className="min-h-screen flex bg-[#FDFBF7] text-[#1C1917] selection:bg-[#FED7AA] selection:text-[#9A3412]">
      
      {/* 1. VERTICAL NAVIGATION SIDEBAR (Collapsible on desktop, Slide-over on mobile) */}
      <Sidebar 
        activeTab={activeTab} 
        activeSubtab={activeSubtab}
        onNavigate={handleNavigate}
        onOpenProfileModal={handleOpenProfileModal}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onToggle={() => setIsSidebarOpen(prev => !prev)}
      />

      {/* 2. MAIN CONTENT WRAPPER (Dynamically shifts left when sidebar is hidden) */}
      <div className={`flex-1 ${isSidebarOpen ? 'lg:pl-72' : 'lg:pl-0'} flex flex-col min-w-0 transition-all duration-300 ease-in-out`}>
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E7E5E4] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Toggle & Page Context */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(prev => !prev)}
              className={`p-2 rounded-xl border border-[#E7E5E4] bg-white text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF6EE] shadow-2xs transition cursor-pointer items-center justify-center ${
                isSidebarOpen ? 'lg:hidden flex' : 'flex'
              }`}
              title={isSidebarOpen ? "Hide Navigation Sidebar" : "Show Navigation Sidebar"}
              aria-label="Toggle Navigation Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand Logo when sidebar is hidden on desktop, or always on mobile */}
            <div 
              onClick={() => handleNavigate('home')} 
              className={`cursor-pointer flex items-center ${isSidebarOpen ? 'lg:hidden' : 'flex'}`}
            >
              <CareerKineticLogo variant="full" size={30} />
            </div>

            {/* Desktop Breadcrumb Context */}
            <div className="hidden xl:flex items-center gap-2 text-xs">
              <span className="text-[#78716C] font-medium">Dashboard</span>
              <span className="text-[#A8A29E]">&rsaquo;</span>
              <span className="font-bold text-[#1C1917] capitalize">{tabTitles[activeTab] || activeTab}</span>
            </div>
          </div>

          {/* Center: Primary Navigation Tabs (Home, Learn, Practice) */}
          <nav 
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1.5 bg-[#FAF6EE] p-1.5 rounded-2xl border border-[#E7E5E4] text-xs font-semibold w-80 lg:w-96 shadow-2xs"
          >
            {[
              { id: 'home', label: 'Home' },
              { id: 'learn', label: 'Learn' },
              { id: 'practice', label: 'Practice' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavigate(tab.id)}
                  className={`flex-1 py-2 px-4 rounded-xl text-center transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#0F2B5C] font-bold shadow-xs border border-[#E7E5E4]'
                      : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-semibold">
            {/* Quick State Rank Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4] text-[#1C1917]">
              <span className="text-[#78716C] font-mono text-[10px] uppercase font-bold hidden lg:inline">State Rank</span>
              <span className="font-editorial font-bold text-sm text-[#C2410C]">#28</span>
              <span className="text-[10px] text-emerald-700 font-bold hidden 2xl:inline">(Top 1.8%)</span>
            </div>

            {/* Streak Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-amber-900 font-bold">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>5 Days</span>
            </div>

            {/* 1-Click AI Profile CTA */}
            <button
              onClick={handleOpenProfileModal}
              className="px-3.5 py-1.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">AI Profile Builder</span>
              <span className="xl:hidden">AI Profile</span>
            </button>
          </div>

        </header>

        {/* 3. MAIN PAGE CONTENT */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {activeTab === 'home' && (
            <HomePage 
              onNavigate={handleNavigate} 
              onOpenProfileModal={handleOpenProfileModal}
            />
          )}

          {activeTab === 'learn' && (
            <LearnPage 
              key={activeSubtab || 'learn-default'}
              initialSubtab={activeSubtab || 'roadmaps'} 
              onNavigate={handleNavigate} 
            />
          )}

          {activeTab === 'practice' && (
            <PracticePage 
              key={activeSubtab || 'practice-default'}
              initialSubtab={activeSubtab || 'diagnostic'} 
              onNavigate={handleNavigate} 
            />
          )}

          {activeTab === 'opportunities' && (
            <OpportunitiesPage 
              key={activeSubtab || 'opps-default'}
              initialSubtab={activeSubtab || 'private'} 
              onNavigate={handleNavigate} 
            />
          )}

          {activeTab === 'community' && (
            <CommunityPage 
              key={activeSubtab || 'comm-default'}
              initialSubtab={activeSubtab || 'feed'} 
              onNavigate={handleNavigate} 
            />
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

        {/* 4. WARM EDITORIAL FOOTER */}
        <footer className="border-t border-[#E7E5E4] bg-[#FAF6EE] py-10 mt-16 text-xs text-[#78716C]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
              <div 
                onClick={() => handleNavigate('home')}
                className="cursor-pointer"
              >
                <CareerKineticLogo variant="full" size={36} />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
                <button onClick={() => handleNavigate('home')} className="hover:text-[#1C1917] transition">Daily Cockpit</button>
                <button onClick={() => handleNavigate('learn', 'roadmaps')} className="hover:text-[#1C1917] transition">Roadmaps</button>
                <button onClick={() => handleNavigate('practice', 'diagnostic')} className="hover:text-[#1C1917] transition">Diagnostic Lab</button>
                <button onClick={() => handleNavigate('opportunities', 'private')} className="hover:text-[#1C1917] transition">Tech Jobs</button>
                <button onClick={() => handleNavigate('community', 'braintwin')} className="hover:text-[#1C1917] transition">Brain Twin</button>
                <button onClick={handleOpenProfileModal} className="text-[#C2410C] font-bold hover:underline">
                  AI Profile
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#A8A29E]">
              <span>Calibrated for college placement aspirants &bull; B.Tech CSE &amp; IT Cohorts</span>
              <span>&copy; 2026 CareerKinetic Inc. &bull; All Rights Reserved</span>
            </div>

          </div>
        </footer>

      </div>

      {/* 5. AI PROFILE & ASSET BUILDER MODAL */}
      <AIProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />

      {/* 6. GLOBAL TOAST & CELEBRATION CONTAINER */}
      <ToastContainer />

    </div>
  );
}
