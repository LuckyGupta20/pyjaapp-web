import React from 'react';
import { Flame, BookOpen, Compass, Award, User, LogIn, LogOut } from 'lucide-react';

export default function Navbar({ activeTab, onNavigate, isLoggedIn, onToggleAuth }) {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 rounded-full bg-[#C2410C] text-white flex items-center justify-center font-editorial text-xl font-bold shadow-sm">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-2xl font-bold tracking-tight text-[#1C1917]">
                  PyJaApp
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold badge-terracotta uppercase tracking-wider">
                  College Cohort '26
                </span>
              </div>
              <p className="text-[11px] text-[#78716C] -mt-1 font-serif italic hidden sm:block">
                An AI school with a human soul
              </p>
            </div>
          </div>

          
          <nav className="hidden md:flex items-center gap-1 bg-[#F5F0E6] p-1 rounded-2xl border border-[#E7E5E4] text-xs font-semibold">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                activeTab === 'home'
                  ? 'bg-[#C2410C] text-white shadow-sm font-bold'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white/60'
              }`}
            >
              <Compass className="w-4 h-4" />
              Daily Cockpit
            </button>

            <button
              onClick={() => onNavigate('classroom')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                activeTab === 'classroom'
                  ? 'bg-[#C2410C] text-white shadow-sm font-bold'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              HITL Classroom
            </button>

            <button
              onClick={() => onNavigate('diagnostic')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                activeTab === 'diagnostic'
                  ? 'bg-[#C2410C] text-white shadow-sm font-bold'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white/60'
              }`}
            >
              <Award className="w-4 h-4" />
              Diagnostic Lab
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>
          </nav>

       
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {/* 5-Day Streak Pill */}
                <div 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-xs font-bold shadow-sm"
                  title="5-Day Study Streak Active! Keep learning to protect your flame."
                >
                  <Flame className="w-4 h-4 text-[#EA580C] fill-[#EA580C] animate-bounce" />
                  <span>5 Days</span>
                </div>

                {/* Student Avatar Chip */}
                <div 
                  className="flex items-center gap-2.5 pl-2 py-1 pr-1.5 rounded-full bg-white border border-[#E7E5E4] shadow-sm hover:border-[#D6D3D1] transition cursor-pointer"
                  onClick={() => onNavigate('home')}
                >
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-[#1C1917]">Aryan Sharma</div>
                    <div className="text-[10px] text-[#78716C]">PESIT • 3rd Year CSE</div>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Aryan"
                    className="w-8 h-8 rounded-full object-cover border border-[#C2410C]/40"
                  />
                </div>

                {/* Sign Out Button */}
                <button
                  onClick={onToggleAuth}
                  className="p-2 text-[#78716C] hover:text-[#C2410C] rounded-lg hover:bg-white transition"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 rounded-xl btn-terracotta text-xs font-bold shadow flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                Student Sign In
              </button>
            )}
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-[#E7E5E4] text-xs font-semibold">
          <button
            onClick={() => onNavigate('home')}
            className={`py-1 px-2 rounded-lg flex items-center gap-1 ${
              activeTab === 'home' ? 'text-[#C2410C] font-bold' : 'text-[#78716C]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Cockpit
          </button>
          <button
            onClick={() => onNavigate('classroom')}
            className={`py-1 px-2 rounded-lg flex items-center gap-1 ${
              activeTab === 'classroom' ? 'text-[#C2410C] font-bold' : 'text-[#78716C]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Classroom
          </button>
          <button
            onClick={() => onNavigate('diagnostic')}
            className={`py-1 px-2 rounded-lg flex items-center gap-1 ${
              activeTab === 'diagnostic' ? 'text-[#C2410C] font-bold' : 'text-[#78716C]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Diagnostic Lab
          </button>
        </div>

      </div>
    </header>
  );
}
