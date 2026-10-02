import React, { useState, useRef, useEffect } from 'react';
import {
  Flame, BookOpen, Compass, Award, User, Bell, MessageSquare, ChevronDown,
  Briefcase, GraduationCap, Users, Sparkles, CheckCircle2, ShieldCheck,
  FileText, Globe, UserCheck, Terminal, MapPin, Search, ArrowRight, Zap, Target
} from 'lucide-react';

export default function Navbar({ activeTab, onNavigate, onOpenProfileModal }) {
  const [openDropdown, setOpenDropdown] = useState(null); // 'learn' | 'practice' | 'opps' | 'community' | 'profile' | null
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const navRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setNotificationsOpen(false);
        setChatOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => prev === name ? null : name);
    setNotificationsOpen(false);
    setChatOpen(false);
  };

  return (
    <header ref={navRef} className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E7E5E4] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* 1. BRAND LOGO */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
            onClick={() => { onNavigate('home'); setOpenDropdown(null); }}
          >
            <div className="w-10 h-10 rounded-2xl bg-[#C2410C] text-white flex items-center justify-center font-editorial text-xl font-bold shadow-sm shadow-[#C2410C]/20 hover:scale-105 transition-transform">
              CK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-2xl font-bold tracking-tight text-[#1C1917]">
                  CareerKinetic
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFEDD5] text-[#9A3412] border border-[#FED7AA] uppercase tracking-wider">
                  Cohort &apos;26
                </span>
              </div>
              <p className="text-[11px] text-[#78716C] -mt-1 font-serif italic hidden sm:block">
                Accelerating Career Excellence &middot; AI + Mentorship
              </p>
            </div>
          </div>

          {/* 2. RESTRUCTURED 4-PILLAR CLEAN NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold">
            
            {/* A. HOME (Single direct link, NO giant dropdown) */}
            <button
              onClick={() => { onNavigate('home'); setOpenDropdown(null); }}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === 'home'
                  ? 'bg-[#C2410C] text-white shadow-sm font-bold'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white/80'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Home</span>
            </button>

            {/* B. LEARN DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('learn')}
                className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  activeTab === 'learn' || openDropdown === 'learn'
                    ? 'bg-[#F5F0E6] text-[#1C1917] font-bold'
                    : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white/80'
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#C2410C]" />
                <span>Learn</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'learn' ? 'rotate-180 text-[#C2410C]' : 'text-[#78716C]'}`} />
              </button>

              {openDropdown === 'learn' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-[#E7E5E4] rounded-2xl p-2 shadow-xl animate-in fade-in duration-150 z-50">
                  <div className="text-[10px] font-mono text-[#78716C] uppercase px-3 py-1.5 font-bold">
                    Curated Learning Pathways
                  </div>
                  <button
                    onClick={() => { onNavigate('learn', 'roadmaps'); setOpenDropdown(null); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FDFBF7] transition flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FFEDD5] text-[#C2410C] flex items-center justify-center shrink-0 mt-0.5">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#1C1917] group-hover:text-[#C2410C]">Tech Roadmaps &amp; Paths</div>
                      <p className="text-[11px] text-[#78716C] leading-snug">AI/ML, Full-Stack, Cloud &amp; DevOps guides</p>
                    </div>
                  </button>

                  <button
                    onClick={() => { onNavigate('learn', 'free'); setOpenDropdown(null); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FDFBF7] transition flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#065F46] flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#1C1917] group-hover:text-[#065F46]">Free Foundation Courses</div>
                      <p className="text-[11px] text-[#78716C] leading-snug">Zero-cost curated video curriculum</p>
                    </div>
                  </button>

                  <button
                    onClick={() => { onNavigate('learn', 'bootcamps'); setOpenDropdown(null); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FDFBF7] transition flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#1E40AF] flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#1C1917] group-hover:text-[#1E40AF]">Bootcamps &amp; Cohorts</div>
                      <p className="text-[11px] text-[#78716C] leading-snug">Mentored live tracks with placement support</p>
                    </div>
                  </button>

                  <button
                    onClick={() => { onNavigate('learn', 'coaching'); setOpenDropdown(null); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FDFBF7] transition flex items-start gap-3 group border-t border-[#F5F0E6] mt-1 pt-2"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F5F0E6] text-[#57534E] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#1C1917]">Coaching Centres Directory</div>
                      <p className="text-[11px] text-[#78716C] leading-snug">Verified offline centers near Knowledge Park</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* C. PRACTICE DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('practice')}
                className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  activeTab === 'practice' || openDropdown === 'practice'
                    ? 'bg-[#F5F0E6] text-[#1C1917] font-bold'
                    : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white/80'
                }`}
              >
                <Award className="w-4 h-4 text-[#F59E0B]" />
                <span>Practice</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'practice' ? 'rotate-180 text-[#F59E0B]' : 'text-[#78716C]'}`} />
              </button>

              {openDropdown === 'practice' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-[#E7E5E4] rounded-2xl p-2 shadow-xl animate-in fade-in duration-150 z-50">
                  <div className="text-[10px] font-mono text-[#78716C] uppercase px-3 py-1.5 font-bold">
                    Interview Prep &amp; Evaluation
                  </div>
                  <button
                    onClick={() => { onNavigate('practice', 'mock'); setOpenDropdown(null); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FDFBF7] transition flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#1C1917] group-hover:text-[#C2410C]">AI Mock Interviews</div>
                      <p className="text-[11px] text-[#78716C] leading-snug">Instant voice &amp; DSA logic critique</p>
                    </div>
                  </button>

                  <button
                    onClick={() => { onNavigate('practice', 'diagnostic'); setOpenDropdown(null); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FDFBF7] transition flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#1C1917] group-hover:text-[#B45309]">20-Min Diagnostic Lab</div>
                      <p className="text-[11px] text-[#78716C] leading-snug">Calculate your State Rank &amp; Skill Gap</p>
                    </div>
                  </button>

                  <button
                    onClick={() => { onNavigate('practice', 'discovery'); setOpenDropdown(null); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FDFBF7] transition flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F5F0E6] text-[#57534E] flex items-center justify-center shrink-0 mt-0.5">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#1C1917]">Domain Discovery Tool</div>
                      <p className="text-[11px] text-[#78716C] leading-snug">Find which tech role fits your natural aptitude</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* D. OPPORTUNITIES DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('opps')}
                className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  activeTab === 'opportunities' || openDropdown === 'opps'
                    ? 'bg-[#F5F0E6] text-[#1C1917] font-bold'
                    : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white/80'
                }`}
              >
                <Briefcase className="w-4 h-4 text-[#10B981]" />
                <span>Opportunities</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'opps' ? 'rotate-180 text-[#10B981]' : 'text-[#78716C]'}`} />
              </button>

              {openDropdown === 'opps' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-[#E7E5E4] rounded-2xl p-2 shadow-xl animate-in fade-in duration-150 z-50">
                  <div className="text-[10px] font-mono text-[#78716C] uppercase px-3 py-1.5 font-bold">
                    Career Openings &amp; Events
                  </div>
                  <button
                    onClick={() => { onNavigate('opportunities', 'private'); setOpenDropdown(null); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FDFBF7] transition flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#065F46] flex items-center justify-center shrink-0 mt-0.5">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#1C1917] group-hover:text-[#065F46]">Private Tech Jobs &amp; Internships</div>
                      <p className="text-[11px] text-[#78716C] leading-snug">Verified high-growth startups &amp; MNCs</p>
                    </div>
                  </button>

                  <button
                    onClick={() => { onNavigate('opportunities', 'govt'); setOpenDropdown(null); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FDFBF7] transition flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#1E40AF] flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#1C1917] group-hover:text-[#1E40AF]">Govt Tech &amp; PSU Exams</div>
                      <p className="text-[11px] text-[#78716C] leading-snug">NIC, ISRO, DRDO &amp; State Engineering alerts</p>
                    </div>
                  </button>

                  <button
                    onClick={() => { onNavigate('opportunities', 'contests'); setOpenDropdown(null); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FDFBF7] transition flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#1C1917] group-hover:text-[#C2410C]">Competitions &amp; Hackathons</div>
                      <p className="text-[11px] text-[#78716C] leading-snug">Win prizes &amp; direct interview fast-tracks</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* E. COMMUNITY DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('community')}
                className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  activeTab === 'community' || openDropdown === 'community'
                    ? 'bg-[#F5F0E6] text-[#1C1917] font-bold'
                    : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white/80'
                }`}
              >
                <Users className="w-4 h-4 text-[#6366F1]" />
                <span>Community</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'community' ? 'rotate-180 text-[#6366F1]' : 'text-[#78716C]'}`} />
              </button>

              {openDropdown === 'community' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#E7E5E4] rounded-2xl p-2 shadow-xl animate-in fade-in duration-150 z-50">
                  <div className="text-[10px] font-mono text-[#78716C] uppercase px-3 py-1.5 font-bold">
                    Student Sphere
                  </div>
                  <button
                    onClick={() => { onNavigate('community', 'feed'); setOpenDropdown(null); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FDFBF7] transition flex items-center gap-2.5"
                  >
                    <MessageSquare className="w-4 h-4 text-[#6366F1]" />
                    <span className="text-xs font-semibold text-[#1C1917]">Discussions &amp; Posts</span>
                  </button>

                  <button
                    onClick={() => { onNavigate('community', 'snaps'); setOpenDropdown(null); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FDFBF7] transition flex items-center gap-2.5"
                  >
                    <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                    <span className="text-xs font-semibold text-[#1C1917]">Skill-Snaps (Micro-Proofs)</span>
                  </button>

                  <button
                    onClick={() => { onNavigate('community', 'braintwin'); setOpenDropdown(null); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FDFBF7] transition flex items-center gap-2.5"
                  >
                    <Zap className="w-4 h-4 text-[#C2410C]" />
                    <span className="text-xs font-semibold text-[#1C1917]">Brain Twin Peer Matching</span>
                  </button>
                </div>
              )}
            </div>

          </nav>

          {/* 3. RIGHT UTILITIES (CHAT, NOTIFICATIONS, STREAK, 60% PROFILE RING) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Discussions / Chat Button */}
            <button
              onClick={() => { setChatOpen(!chatOpen); setNotificationsOpen(false); }}
              className="w-9 h-9 rounded-xl bg-white hover:bg-[#F5F0E6] border border-[#E7E5E4] text-[#57534E] hover:text-[#1C1917] flex items-center justify-center transition shadow-xs"
              title="Peer Chat & Mentor Inbox"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => { setNotificationsOpen(!notificationsOpen); setChatOpen(false); }}
                className="relative w-9 h-9 rounded-xl bg-white hover:bg-[#F5F0E6] border border-[#E7E5E4] text-[#57534E] hover:text-[#1C1917] flex items-center justify-center transition shadow-xs"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C2410C]"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#E7E5E4] rounded-2xl p-3 shadow-xl z-50 text-xs">
                  <div className="font-bold border-b border-[#E7E5E4] pb-2 mb-2 flex justify-between items-center text-[#1C1917]">
                    <span>Notifications</span>
                    <span className="text-[10px] text-[#C2410C] font-mono">2 Unread</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] text-[#9A3412]">
                      <strong className="block text-[11px]">🔥 Streak at Risk!</strong>
                      Complete today&apos;s 15-min lesson before 11:59 PM to maintain 5 days.
                    </div>
                    <div className="p-2 rounded-xl bg-[#FDFBF7] border border-[#E7E5E4] text-[#57534E]">
                      <strong className="block text-[11px] text-[#1C1917]">New Job Match</strong>
                      Amazon Campus Intern 2026 hiring matches your DSA percentile.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5-DAY STREAK FLAME PILL */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-xs font-bold shadow-xs cursor-pointer hover:bg-[#FDE68A]/80 transition"
              title="5-Day Active Streak! Complete today's module to protect your flame."
              onClick={() => onNavigate('home')}
            >
              <Flame className="w-4 h-4 text-[#EA580C] fill-[#EA580C] animate-bounce" />
              <span className="font-mono text-[11px]">5 Days</span>
            </div>

            {/* 4. CIRCULAR 60% PROFILE AVATAR RING (AS DRAWN IN PHOTO) */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('profile')}
                className="flex items-center gap-2 p-1 rounded-2xl bg-white border border-[#E7E5E4] hover:border-[#D6D3D1] transition shadow-xs group"
                title="60% Profile Completed - Tap to view AI Profile Builder"
              >
                {/* SVG 60% Circular Progress Ring */}
                <div className="relative w-9 h-9 flex items-center justify-center">
                  <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                    {/* Background track */}
                    <path
                      className="text-[#E7E5E4]"
                      strokeWidth="3.2"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* 60% Progress stroke */}
                    <path
                      className="text-[#C2410C]"
                      strokeDasharray="60, 100"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Aryan Sharma"
                    className="absolute w-6 h-6 rounded-full object-cover"
                  />
                  {/* Tiny 60% badge */}
                  <span className="absolute -bottom-1 -right-1 text-[8px] font-mono font-bold bg-[#1C1917] text-white px-1 rounded-full">
                    60%
                  </span>
                </div>

                <div className="text-left hidden xl:block pr-1">
                  <div className="text-xs font-bold text-[#1C1917] leading-tight">Aryan S.</div>
                  <div className="text-[10px] text-[#78716C] leading-none">Rank #28 &middot; 94%</div>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-[#78716C] group-hover:text-[#1C1917]" />
              </button>

              {/* Profile Dropdown Drawer (Percentile, Rank, KYC, ATS Resume, Portfolio, Biodata) */}
              {openDropdown === 'profile' && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#E7E5E4] rounded-3xl p-4 shadow-2xl z-50 text-xs space-y-3.5 animate-in fade-in duration-150">
                  {/* Header identity */}
                  <div className="flex items-center gap-3 pb-3 border-b border-[#E7E5E4]">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Aryan"
                      className="w-11 h-11 rounded-2xl object-cover border border-[#C2410C]/30"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#1C1917]">Aryan Sharma</h4>
                      <p className="text-[11px] text-[#78716C]">GL Bajaj Inst. of Tech &amp; Mgmt &middot; 3rd Yr CSE</p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#065F46] bg-[#ECFDF5] px-1.5 py-0.2 rounded font-bold mt-1">
                        <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                        <span>KYC Verified Student</span>
                      </span>
                    </div>
                  </div>

                  {/* 3 Core Stats from Wireframe: Percentile, Ranking, Profile Progress */}
                  <div className="grid grid-cols-3 gap-1.5 p-2 bg-[#FDFBF7] rounded-2xl border border-[#E7E5E4] text-center font-mono">
                    <div className="p-1.5">
                      <span className="text-[9px] text-[#78716C] uppercase block">Percentile</span>
                      <strong className="text-xs text-[#C2410C] font-bold">94.2%</strong>
                    </div>
                    <div className="p-1.5 border-x border-[#E7E5E4]">
                      <span className="text-[9px] text-[#78716C] uppercase block">State Rank</span>
                      <strong className="text-xs text-[#1C1917] font-bold">#28</strong>
                    </div>
                    <div className="p-1.5">
                      <span className="text-[9px] text-[#78716C] uppercase block">Profile</span>
                      <strong className="text-xs text-[#065F46] font-bold">60%</strong>
                    </div>
                  </div>

                  {/* AI Profile Builder Quick Triggers (From Wireframe) */}
                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] font-mono text-[#78716C] uppercase tracking-wider font-bold px-1">
                      AI Profile Builder &amp; Assets
                    </div>

                    <button
                      onClick={() => { onOpenProfileModal('ats'); setOpenDropdown(null); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-[#FDFBF7] border border-transparent hover:border-[#E7E5E4] transition flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#C2410C]" />
                        <span className="font-semibold text-[#1C1917] group-hover:text-[#C2410C]">ATS Resume Generator</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FFEDD5] text-[#9A3412] font-bold">Score 94%</span>
                    </button>

                    <button
                      onClick={() => { onOpenProfileModal('portfolio'); setOpenDropdown(null); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-[#FDFBF7] border border-transparent hover:border-[#E7E5E4] transition flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#10B981]" />
                        <span className="font-semibold text-[#1C1917] group-hover:text-[#10B981]">Digital Portfolio Link</span>
                      </div>
                      <span className="text-[10px] text-[#78716C]">Live &middot; Share</span>
                    </button>

                    <button
                      onClick={() => { onOpenProfileModal('biodata'); setOpenDropdown(null); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-[#FDFBF7] border border-transparent hover:border-[#E7E5E4] transition flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-[#6366F1]" />
                        <span className="font-semibold text-[#1C1917] group-hover:text-[#6366F1]">Placement Biodata</span>
                      </div>
                      <span className="text-[10px] text-[#78716C]">PDF Ready</span>
                    </button>
                  </div>

                  {/* Sign Out / Switch User */}
                  <div className="pt-2 border-t border-[#E7E5E4] flex justify-between items-center text-[11px] text-[#78716C]">
                    <span>Account Active</span>
                    <button 
                      onClick={() => { onNavigate('home'); setOpenDropdown(null); }}
                      className="text-[#C2410C] font-semibold hover:underline"
                    >
                      Switch Cohort
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
