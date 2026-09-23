import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, GraduationCap } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('aryan.sharma@pes.edu');
  const [password, setPassword] = useState('password123');
  const [selectedCollege, setSelectedCollege] = useState('PES University, Bengaluru');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden card-warm border border-[#E7E5E4] my-6">
      
      {/* LEFT EDITORIAL STORY */}
      <div className="p-8 sm:p-14 flex flex-col justify-between bg-[#F5F0E6] border-b lg:border-b-0 lg:border-r border-[#E7E5E4]">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#C2410C] text-white flex items-center justify-center font-editorial text-lg font-bold shadow-sm">
            P
          </div>
          <div>
            <span className="font-editorial text-2xl font-bold text-[#1C1917]">PyJaApp</span>
            <span className="block text-[11px] text-[#78716C] -mt-1 font-serif italic">The AI school with a human soul</span>
          </div>
        </div>

        {/* Narrative & Quote */}
        <div className="my-8 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-terracotta text-xs font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-[#C2410C]" />
            <span>2026 Campus Placement Batch</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl text-[#1C1917] font-normal leading-tight">
            "Real mentors. Real intelligence. The future of campus placement has a heart."
          </h2>

          <p className="text-sm text-[#57534E] leading-relaxed">
            Stop drowning in 50-hour generic video playlists. Join 42,000+ college engineers using 15-minute daily focus loops, real human mentors, and state-level diagnostic benchmarking to clear dream tech offers.
          </p>

          {/* Student Placement Testimonial Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#E7E5E4] shadow-sm space-y-3">
            <p className="text-xs text-[#1C1917] italic leading-relaxed">
              "Before PyJaApp, I memorized LeetCode answers and froze in every company OA. The 15-min daily human lessons and the State Rank benchmark showed me my real blindspots in trees and system design."
            </p>
            <div className="flex items-center gap-3 pt-1">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                alt="Karthik N." 
                className="w-10 h-10 rounded-full object-cover border border-[#C2410C]/40"
              />
              <div className="text-xs">
                <div className="font-bold text-[#1C1917]">Karthik Narayanan</div>
                <div className="text-[#C2410C] font-semibold">Cleared Amazon SDE-1 • State Rank #14</div>
              </div>
            </div>
          </div>

          {/* Placement Proof Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#57534E]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>98% Diagnostic accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>₹14.5 LPA Avg. top offer</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[11px] text-[#78716C] flex items-center justify-between">
          <span>© 2026 PyJaApp Academy</span>
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Student Data Encrypted</span>
        </div>

      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="p-8 sm:p-14 flex flex-col justify-center max-w-md mx-auto w-full bg-white">
        
        <div className="mb-6">
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1917]">
            Sign in to your Study Desk
          </h3>
          <p className="text-xs text-[#78716C] mt-1">
            Pick up your daily 15-minute lesson and protect your 5-day streak.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Google 1-Tap Login */}
          <button
            type="button"
            onClick={onLoginSuccess}
            className="w-full py-3 px-4 rounded-xl border border-[#D6D3D1] bg-white hover:bg-[#F5F5F4] text-xs font-bold text-[#1C1917] flex items-center justify-center gap-3 transition shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Continue with College Google Account
          </button>

          <div className="flex items-center gap-2 my-4">
            <div className="h-px bg-[#E7E5E4] flex-1"></div>
            <span className="text-[11px] text-[#A8A29E] uppercase font-semibold">or student email</span>
            <div class="h-px bg-[#E7E5E4] flex-1"></div>
          </div>

          {/* College Selector */}
          <div>
            <label className="block text-xs font-bold text-[#44403C] mb-1">
              Your University / Engineering College:
            </label>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#D6D3D1] bg-[#FDFBF7] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C2410C]"
            >
              <option>PES University, Bengaluru</option>
              <option>BMS College of Engineering</option>
              <option>RV College of Engineering</option>
              <option>IIT Madras (Affiliate)</option>
              <option>NIT Surathkal</option>
              <option>Other VTU / State University</option>
            </select>
          </div>

          {/* Student Email */}
          <div>
            <label className="block text-xs font-bold text-[#44403C] mb-1">
              College Email ID
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-xl border border-[#D6D3D1] bg-[#FDFBF7] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C2410C]"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-[#44403C]">Password</label>
              <a href="#" className="text-[11px] text-[#C2410C] hover:underline font-semibold">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-xl border border-[#D6D3D1] bg-[#FDFBF7] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C2410C]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl btn-terracotta font-bold text-xs shadow-md transition flex items-center justify-center gap-2 mt-4"
          >
            <span>Enter Study Desk</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-center text-[#78716C] pt-2">
            New student?{' '}
            <span className="text-[#C2410C] font-bold cursor-pointer hover:underline" onClick={onLoginSuccess}>
              Register for Free (Karnataka Cohort)
            </span>
          </p>

        </form>

      </div>

    </div>
  );
}
