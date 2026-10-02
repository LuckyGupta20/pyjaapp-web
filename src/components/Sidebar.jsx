import React, { useState, useEffect } from 'react';
import CareerKineticLogo from './CareerKineticLogo';
import ImageWithFallback from './ImageWithFallback';
import { useUser } from '../context/UserContext';
import {
  Flame, BookOpen, Compass, Award, User, Bell, MessageSquare, ChevronDown,
  Briefcase, GraduationCap, Users, Sparkles, CheckCircle2, ShieldCheck,
  FileText, Globe, UserCheck, Terminal, MapPin, Search, ArrowRight, Zap, Target,
  X, ChevronRight, Scale, ExternalLink, LogOut, Menu
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  activeSubtab, 
  onNavigate, 
  onOpenProfileModal,
  isOpen,
  isMobileOpen,
  onClose,
  onCloseMobile,
  onToggle
}) {
  const { user } = useUser();

  // Accordions for menu groups
  const [expandedSections, setExpandedSections] = useState({
    learn: activeTab === 'learn',
    practice: activeTab === 'practice',
    opportunities: activeTab === 'opportunities',
    community: activeTab === 'community'
  });

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Auto-expand the active section when tab changes
  useEffect(() => {
    if (['learn', 'practice', 'opportunities', 'community'].includes(activeTab)) {
      setExpandedSections(prev => ({ ...prev, [activeTab]: true }));
    }
  }, [activeTab]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const isSidebarActive = isOpen !== undefined ? isOpen : isMobileOpen;
  const handleClose = onClose || onCloseMobile;
  const handleToggle = onToggle || handleClose;

  const handleNavClick = (tab, subtab = null) => {
    onNavigate(tab, subtab);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      if (handleClose) handleClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isSidebarActive && (
        <div 
          onClick={handleClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Vertical Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#FAF6EE] border-r border-[#E7E5E4] 
        flex flex-col justify-between select-none transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none
        ${isSidebarActive ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* TOP SECTION: BRAND & STREAK */}
        <div className="p-5 border-b border-[#E7E5E4] bg-white">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div 
              onClick={() => handleNavClick('home')}
              className="cursor-pointer group flex items-center"
            >
              <CareerKineticLogo variant="full" size={40} />
            </div>

            {/* 3-Bar Toggle button to hide/collapse sidebar */}
            <button
              onClick={handleToggle}
              className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF6EE] transition cursor-pointer"
              title="Hide Sidebar"
              aria-label="Hide Sidebar"
            >
              <Menu className="w-5 h-5 hidden lg:block" />
              <X className="w-5 h-5 lg:hidden" />
            </button>
          </div>

          {/* Dynamic Streak Banner */}
          <div className="mt-4 p-2.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-600 flex items-center justify-center">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              </span>
              <span>{user.streak}-Day Streak Active</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-200/60 text-amber-900 font-mono">
              {user.xp} XP
            </span>
          </div>
        </div>

        {/* MIDDLE SECTION: SCROLLABLE VERTICAL NAVIGATION */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs font-semibold custom-scrollbar">
          
          {/* GROUP 1: DAILY COCKPIT */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-mono text-[#78716C] uppercase font-bold tracking-wider">
              Main Cockpit
            </div>
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                activeTab === 'home'
                  ? 'bg-[#C2410C] text-white shadow-xs font-bold'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white'
              }`}
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span className="text-xs">Daily Cockpit (Home)</span>
            </button>
          </div>

          {/* GROUP 2: LEARN & PREPARE */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-mono text-[#78716C] uppercase font-bold tracking-wider">
              Curriculum &amp; Prep
            </div>

            {/* LEARN ACCORDION */}
            <div>
              <button
                onClick={() => toggleSection('learn')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
                  activeTab === 'learn'
                    ? 'bg-white text-[#C2410C] font-bold border border-[#E7E5E4]'
                    : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-[#C2410C] shrink-0" />
                  <span>Learn</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSections.learn ? 'rotate-180 text-[#C2410C]' : 'text-[#78716C]'}`} />
              </button>

              {expandedSections.learn && (
                <div className="mt-1 ml-4 pl-3 border-l-2 border-[#E7E5E4] space-y-1 py-1">
                  <button
                    onClick={() => handleNavClick('learn', 'roadmaps')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center justify-between ${
                      activeTab === 'learn' && (!activeSubtab || activeSubtab === 'roadmaps')
                        ? 'text-[#C2410C] font-bold bg-[#FFEDD5]/60'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white'
                    }`}
                  >
                    <span>Tech Roadmaps</span>
                    <span className="text-[9px] text-[#A8A29E] font-mono">3 Tracks</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('learn', 'free')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center justify-between ${
                      activeTab === 'learn' && activeSubtab === 'free'
                        ? 'text-[#C2410C] font-bold bg-[#FFEDD5]/60'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white'
                    }`}
                  >
                    <span>Free Foundation Courses</span>
                    <span className="text-[9px] text-emerald-700 font-bold">100% Free</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('learn', 'bootcamps')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center justify-between ${
                      activeTab === 'learn' && activeSubtab === 'bootcamps'
                        ? 'text-[#C2410C] font-bold bg-[#FFEDD5]/60'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white'
                    }`}
                  >
                    <span>Mentored Cohorts</span>
                    <span className="text-[9px] text-[#C2410C] font-semibold">Live</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('learn', 'coaching')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center justify-between ${
                      activeTab === 'learn' && activeSubtab === 'coaching'
                        ? 'text-[#C2410C] font-bold bg-[#FFEDD5]/60'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white'
                    }`}
                  >
                    <span>Coaching Centres Directory</span>
                    <span className="text-[9px] text-[#78716C]">NCR</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('learn', 'compare')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center justify-between ${
                      activeTab === 'learn' && activeSubtab === 'compare'
                        ? 'text-[#C2410C] font-bold bg-[#FFEDD5]/60'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Scale className="w-3 h-3 text-[#C2410C]" />
                      <span>Career Compare Tool</span>
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* PRACTICE ACCORDION */}
            <div>
              <button
                onClick={() => toggleSection('practice')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
                  activeTab === 'practice'
                    ? 'bg-white text-[#B45309] font-bold border border-[#E7E5E4]'
                    : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-[#B45309] shrink-0" />
                  <span>Practice</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSections.practice ? 'rotate-180 text-[#B45309]' : 'text-[#78716C]'}`} />
              </button>

              {expandedSections.practice && (
                <div className="mt-1 ml-4 pl-3 border-l-2 border-[#E7E5E4] space-y-1 py-1">
                  <button
                    onClick={() => handleNavClick('practice', 'diagnostic')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center justify-between ${
                      activeTab === 'practice' && (!activeSubtab || activeSubtab === 'diagnostic')
                        ? 'text-[#B45309] font-bold bg-[#FEF3C7]/70'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white'
                    }`}
                  >
                    <span>20-Min Diagnostic Lab</span>
                    <span className="text-[9px] text-[#C2410C] font-bold">Rank #28</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('practice', 'mock')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center justify-between ${
                      activeTab === 'practice' && activeSubtab === 'mock'
                        ? 'text-[#B45309] font-bold bg-[#FEF3C7]/70'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white'
                    }`}
                  >
                    <span>AI Mock Interviews</span>
                    <span className="text-[9px] text-amber-700">Voice+Code</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('practice', 'discovery')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center justify-between ${
                      activeTab === 'practice' && activeSubtab === 'discovery'
                        ? 'text-[#B45309] font-bold bg-[#FEF3C7]/70'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white'
                    }`}
                  >
                    <span>Domain Discovery</span>
                    <span className="text-[9px] text-[#78716C]">Aptitude</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* GROUP 3: LAUNCHPAD & COMMUNITY */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-mono text-[#78716C] uppercase font-bold tracking-wider">
              Careers &amp; Network
            </div>

            {/* OPPORTUNITIES ACCORDION */}
            <div>
              <button
                onClick={() => toggleSection('opportunities')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
                  activeTab === 'opportunities'
                    ? 'bg-white text-[#065F46] font-bold border border-[#E7E5E4]'
                    : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-[#065F46] shrink-0" />
                  <span>Opportunities</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSections.opportunities ? 'rotate-180 text-[#065F46]' : 'text-[#78716C]'}`} />
              </button>

              {expandedSections.opportunities && (
                <div className="mt-1 ml-4 pl-3 border-l-2 border-[#E7E5E4] space-y-1 py-1">
                  <button
                    onClick={() => handleNavClick('opportunities', 'private')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center justify-between ${
                      activeTab === 'opportunities' && (!activeSubtab || activeSubtab === 'private')
                        ? 'text-[#065F46] font-bold bg-[#ECFDF5]'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white'
                    }`}
                  >
                    <span>Private Tech Jobs</span>
                    <span className="text-[9px] text-emerald-700 font-bold">140+</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('opportunities', 'govt')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center justify-between ${
                      activeTab === 'opportunities' && activeSubtab === 'govt'
                        ? 'text-[#065F46] font-bold bg-[#ECFDF5]'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white'
                    }`}
                  >
                    <span>Govt &amp; PSU Exams</span>
                    <span className="text-[9px] text-[#1E40AF]">NIC / ISRO</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('opportunities', 'contests')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center justify-between ${
                      activeTab === 'opportunities' && activeSubtab === 'contests'
                        ? 'text-[#065F46] font-bold bg-[#ECFDF5]'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white'
                    }`}
                  >
                    <span>Hackathons &amp; Contests</span>
                    <span className="text-[9px] text-amber-700">₹5L Pool</span>
                  </button>
                </div>
              )}
            </div>

            {/* COMMUNITY ACCORDION */}
            <div>
              <button
                onClick={() => toggleSection('community')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
                  activeTab === 'community'
                    ? 'bg-white text-[#4F46E5] font-bold border border-[#E7E5E4]'
                    : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-[#4F46E5] shrink-0" />
                  <span>Community</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSections.community ? 'rotate-180 text-[#4F46E5]' : 'text-[#78716C]'}`} />
              </button>

              {expandedSections.community && (
                <div className="mt-1 ml-4 pl-3 border-l-2 border-[#E7E5E4] space-y-1 py-1">
                  <button
                    onClick={() => handleNavClick('community', 'feed')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center justify-between ${
                      activeTab === 'community' && (!activeSubtab || activeSubtab === 'feed')
                        ? 'text-[#4F46E5] font-bold bg-[#EEF2FF]'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white'
                    }`}
                  >
                    <span>Campus Discussions</span>
                    <span className="text-[9px] text-[#78716C]">Q&amp;A</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('community', 'snaps')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center justify-between ${
                      activeTab === 'community' && activeSubtab === 'snaps'
                        ? 'text-[#4F46E5] font-bold bg-[#EEF2FF]'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white'
                    }`}
                  >
                    <span>Skill-Snaps (Proofs)</span>
                    <span className="text-[9px] text-amber-600 font-bold">Git</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('community', 'braintwin')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center justify-between ${
                      activeTab === 'community' && activeSubtab === 'braintwin'
                        ? 'text-[#4F46E5] font-bold bg-[#EEF2FF]'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-white'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#C2410C]" />
                      <span>Brain Twin Peer Match</span>
                    </span>
                    <span className="text-[9px] text-[#C2410C] font-bold">New</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 1-CLICK AI PROFILE BUILDER PROMO CARD */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1C1917] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
                AI Profile Builder
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                60% Ready
              </span>
            </div>
            <p className="text-[11px] text-[#78716C] leading-snug">
              ATS Resume, Live Portfolio &amp; Placement Biodata generated in 1 click.
            </p>
            <button
              onClick={() => { onOpenProfileModal(); if (onCloseMobile) onCloseMobile(); }}
              className="w-full py-2 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-[11px] font-bold transition flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>Generate My Assets</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* BOTTOM SECTION: PROFILE, NOTIFICATIONS & CHAT */}
        <div className="p-4 border-t border-[#E7E5E4] bg-white space-y-3">
          
          {/* Utilities Row: Messages & Notifications */}
          <div className="flex items-center justify-between px-1">
            <button
              onClick={() => { setChatOpen(!chatOpen); setNotificationsOpen(false); }}
              className="relative p-2 rounded-xl hover:bg-[#FAF6EE] text-[#57534E] hover:text-[#1C1917] transition flex items-center gap-1.5 text-xs font-semibold"
              title="Discussions & Mentors"
            >
              <MessageSquare className="w-4 h-4 text-[#78716C]" />
              <span className="text-[11px]">Chat (2)</span>
            </button>

            <button
              onClick={() => { setNotificationsOpen(!notificationsOpen); setChatOpen(false); }}
              className="relative p-2 rounded-xl hover:bg-[#FAF6EE] text-[#57534E] hover:text-[#1C1917] transition flex items-center gap-1.5 text-xs font-semibold"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-[#78716C]" />
              <span className="w-2 h-2 rounded-full bg-[#C2410C]"></span>
              <span className="text-[11px]">Alerts</span>
            </button>
          </div>

          {/* Quick Notifications Popup */}
          {notificationsOpen && (
            <div className="p-3 rounded-2xl bg-[#FAF6EE] border border-[#E7E5E4] text-xs space-y-2 animate-in fade-in">
              <div className="font-bold text-[#1C1917] flex justify-between items-center text-[11px]">
                <span>Recent Alerts</span>
                <span className="text-[10px] text-[#C2410C] cursor-pointer" onClick={() => setNotificationsOpen(false)}>Close</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#E7E5E4] text-[11px] space-y-0.5">
                <div className="font-bold text-[#1C1917]">NIC Scientist B Exam Announced</div>
                <p className="text-[#78716C] text-[10px]">180 Vacancies open for 2026 graduates.</p>
              </div>
            </div>
          )}

          {/* Quick Chat Popup */}
          {chatOpen && (
            <div className="p-3 rounded-2xl bg-[#FAF6EE] border border-[#E7E5E4] text-xs space-y-2 animate-in fade-in">
              <div className="font-bold text-[#1C1917] flex justify-between items-center text-[11px]">
                <span>Peer &amp; Mentor Inbox</span>
                <span className="text-[10px] text-[#C2410C] cursor-pointer" onClick={() => setChatOpen(false)}>Close</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#E7E5E4] text-[11px] space-y-0.5">
                <div className="font-bold text-[#1C1917]">Dr. Anya Sharma (Mentor)</div>
                <p className="text-[#78716C] text-[10px]">"Your recursion tree solution was spot on!"</p>
              </div>
            </div>
          )}

          {/* User Profile Bar with 60% Ring */}
          <div className="relative">
            <div
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="p-2 rounded-2xl bg-[#FAF6EE] hover:bg-[#F5F0E6] border border-[#E7E5E4] flex items-center justify-between cursor-pointer transition"
            >
              <div className="flex items-center gap-2.5">
                {/* 60% Avatar Ring */}
                <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="17" className="stroke-[#E7E5E4]" strokeWidth="3" fill="transparent" />
                    <circle
                      cx="20" cy="20" r="17"
                      className="stroke-[#C2410C]"
                      strokeWidth="3"
                      strokeDasharray="107"
                      strokeDashoffset="42" // ~60%
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt={user.fullName}
                    fallbackType="avatar"
                    initials={user.firstName.charAt(0) + user.lastName.charAt(0)}
                    className="absolute inset-1 w-7 h-7 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-black text-white text-[8px] font-bold px-1 rounded-full font-mono">
                    60%
                  </div>
                </div>

                <div className="truncate">
                  <div className="font-bold text-xs text-[#1C1917] truncate">{user.fullName}</div>
                  <div className="text-[10px] text-[#78716C] truncate">Rank #{user.stateRank} &bull; {user.statePercentile}%</div>
                </div>
              </div>

              <ChevronDown className={`w-3.5 h-3.5 text-[#78716C] transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Profile Dropdown Drawer */}
            {profileDropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-white border border-[#E7E5E4] rounded-2xl shadow-xl space-y-2.5 text-xs z-50 animate-in fade-in">
                <div className="pb-2 border-b border-[#E7E5E4]">
                  <div className="font-bold text-[#1C1917]">{user.fullName}</div>
                  <div className="text-[11px] text-[#78716C] truncate">{user.college} &bull; {user.cohort}</div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-emerald-800">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    KYC Level {user.kycLevel} Verified
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                  <div className="p-2 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4]">
                    <span className="text-[9px] text-[#78716C] uppercase font-bold block">State Rank</span>
                    <span className="font-editorial text-base font-bold text-[#1C1917]">#{user.stateRank}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4]">
                    <span className="text-[9px] text-[#78716C] uppercase font-bold block">Percentile</span>
                    <span className="font-editorial text-base font-bold text-emerald-700">{user.statePercentile}%</span>
                  </div>
                </div>

                <button
                  onClick={() => { onOpenProfileModal(); setProfileDropdownOpen(false); }}
                  className="w-full py-2 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open 1-Click AI Profile</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </aside>
    </>
  );
}
