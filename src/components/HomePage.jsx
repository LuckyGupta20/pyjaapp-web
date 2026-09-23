import React, { useState } from 'react';
import { 
  Play, Award, CheckCircle2, ArrowRight, Clock, Users, Sparkles, 
  MessageCircle, Flame, Shield, Target, Zap, ChevronRight, Check
} from 'lucide-react';

export default function HomePage({ onNavigate }) {
  const [doubtText, setDoubtText] = useState('');
  const [doubtSent, setDoubtSent] = useState(false);
  const [selectedPace, setSelectedPace] = useState('15'); // '5', '15', '30'

  const handleSendDoubt = (e) => {
    e.preventDefault();
    if (!doubtText.trim()) return;
    setDoubtSent(true);
    setTimeout(() => {
      setDoubtText('');
      setDoubtSent(false);
    }, 3000);
  };

  // 11 out of 15 mins = ~73% completion
  const completedMins = 11;
  const totalMins = 15;
  const progressPercent = Math.round((completedMins / totalMins) * 100);
  const strokeDashoffset = 283 - (283 * progressPercent) / 100; // 2 * PI * r (r=45, circumference ~ 283)

  return (
    <div className="space-y-10 pb-16">
      
      {/* 1. TOP HERO GREETING & HABIT PROGRESS COCKPIT */}
      <section className="card-warm rounded-3xl p-6 sm:p-8 bg-[#FAF6EE] border border-[#E7E5E4] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left 7 Columns: Context & Personalized Mission */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full badge-terracotta text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
                Campus Placement Accelerator • Semester 6 Cohort
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                5-Day Streak Active
              </span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl text-[#1C1917] font-normal leading-[1.2]">
              "Good morning, Aryan. Your mentor has set today's 15-minute mission."
            </h1>

            <p className="text-[#57534E] text-xs sm:text-sm leading-relaxed max-w-xl">
              You are just 4 minutes away from completing today's target on <span className="text-[#1C1917] font-bold underline decoration-[#C2410C]/40 decoration-2">Divide & Conquer Recursion</span>. Finish this to unlock your Unit 2 milestone badge and protect your streak flame.
            </p>

            {/* Daily Pace Selector */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-bold text-[#78716C] uppercase tracking-wider">Today's Pace:</span>
              <div className="inline-flex p-1 rounded-xl bg-white border border-[#E7E5E4] text-xs font-semibold">
                <button 
                  onClick={() => setSelectedPace('5')}
                  className={`px-3 py-1 rounded-lg transition ${selectedPace === '5' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
                >
                  5m Streak Saver
                </button>
                <button 
                  onClick={() => setSelectedPace('15')}
                  className={`px-3 py-1 rounded-lg transition ${selectedPace === '15' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
                >
                  15m Recommended
                </button>
                <button 
                  onClick={() => setSelectedPace('30')}
                  className={`px-3 py-1 rounded-lg transition ${selectedPace === '30' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
                >
                  30m Deep Dive
                </button>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: The Circular Daily Habit Ring & Checklist */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-[#E7E5E4] shadow-sm flex flex-col sm:flex-row items-center gap-6">
            
            {/* Circular Progress Ring */}
            <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-[#E7E5E4]"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Foreground Animated Progress Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-[#C2410C] transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * progressPercent) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-editorial text-2xl font-bold text-[#1C1917]">
                  {progressPercent}%
                </span>
                <span className="text-[10px] text-[#78716C] font-bold uppercase tracking-wider">
                  {completedMins}/{totalMins}m
                </span>
              </div>
            </div>

            {/* Micro-Step Checklist */}
            <div className="space-y-2 w-full text-xs">
              <div className="font-bold text-[#1C1917] text-xs flex items-center justify-between">
                <span>Today's Habit Checklist</span>
                <span className="text-[11px] font-semibold text-[#C2410C]">4 mins left</span>
              </div>

              <div className="flex items-center gap-2 text-emerald-800 font-medium bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200/60">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span className="truncate">Watch Divide & Conquer Video (8m)</span>
              </div>

              <div className="flex items-center gap-2 text-emerald-800 font-medium bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200/60">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span className="truncate">Pass In-Video AI Checkpoint (3m)</span>
              </div>

              <div 
                onClick={() => onNavigate('diagnostic')}
                className="flex items-center justify-between text-[#C2410C] font-bold bg-[#FFEDD5]/60 px-2.5 py-1.5 rounded-lg border border-[#FDBA74]/50 cursor-pointer hover:bg-[#FFEDD5] transition"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-[#C2410C] flex-shrink-0"></span>
                  <span className="truncate">Solve 1 Placement Diagnostic (4m)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. PRIMARY 2-COLUMN GRID (HITL Hero + Diagnostic Lab Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT 2 COLS: Today's 15-Minute Focus Lesson */}
        <div className="lg:col-span-2 card-warm rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C2410C]">
                  HITL Masterclass • Active Lesson
                </span>
              </div>
              <span className="text-xs text-[#78716C] font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 14 mins total • 04:12 remaining
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center mb-6">
              {/* Mentor Video Thumbnail with Playback Bar */}
              <div 
                className="sm:col-span-1 rounded-2xl overflow-hidden aspect-video sm:aspect-square bg-stone-200 relative group cursor-pointer shadow-sm border border-[#E7E5E4]"
                onClick={() => onNavigate('classroom')}
              >
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80" 
                  alt="Mentor Dr. Anya Sharma" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/40 transition">
                  <div className="w-12 h-12 rounded-full bg-white text-[#C2410C] flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition pl-0.5">
                    <Play className="w-5 h-5 fill-[#C2410C]" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold font-mono">
                  Resume at 04:12
                </div>
                {/* Mini video progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
                  <div className="h-full bg-[#C2410C]" style={{ width: '68%' }}></div>
                </div>
              </div>

              {/* Lesson Description */}
              <div className="sm:col-span-2 space-y-2">
                <div className="text-xs font-semibold text-[#C2410C] uppercase tracking-wide">
                  Chapter 4: Algorithmic Paradigms
                </div>
                <h3 className="font-editorial text-2xl font-bold text-[#1C1917] leading-tight">
                  Recursive Divide & Conquer with Dr. Anya Sharma
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  Master the recurrence tree intuition behind merge sort and binary search boundaries. Includes 3 real-time interactive AI checkpoints.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#78716C]">
                  <span className="flex items-center gap-1.5 text-[#1C1917] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Human mentor pedagogy
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-[#1C1917] font-semibold">
                    <Zap className="w-4 h-4 text-[#C2410C]" /> In-flow AI Checkpoints
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer with CTA */}
          <div className="pt-5 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs text-[#57534E]">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80" 
                alt="Dr. Anya" 
                className="w-6 h-6 rounded-full object-cover"
              />
              <span>Mentor Dr. Anya is answering placement doubts today</span>
            </div>

            <button 
              onClick={() => onNavigate('classroom')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl btn-terracotta text-xs font-bold shadow-md flex items-center justify-center gap-2"
            >
              <span>Resume at 04:12</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT 1 COL: Diagnostic Lab Card (#Rank in State & Company Match) */}
        <div className="card-warm rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#C2410C]" />
                Diagnostic Lab
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold badge-sage">
                Placement Calibrated
              </span>
            </div>

            {/* Big Celebratory Rank Box */}
            <div className="text-center py-5 px-4 bg-[#FDFBF7] rounded-2xl border border-[#E7E5E4] mb-4">
              <div className="text-[11px] text-[#78716C] font-semibold uppercase tracking-wider">
                State College Percentile
              </div>
              <div className="font-editorial text-5xl font-black text-[#1C1917] my-1">
                #28
              </div>
              <div className="text-xs text-[#78716C] font-medium">
                Karnataka Engineering Cohort
              </div>
              <div className="mt-2 inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                Top 1.8% of 42,000 Aspirants
              </div>
            </div>

            {/* Target Company Readiness Barometer */}
            <div className="space-y-2.5 text-xs">
              <div className="font-bold text-[#1C1917] flex items-center justify-between mb-1">
                <span>Target Company Readiness:</span>
                <Target className="w-3.5 h-3.5 text-[#C2410C]" />
              </div>
              
              <div>
                <div className="flex justify-between text-[#57534E] mb-1">
                  <span className="font-semibold text-[#1C1917]">Amazon SDE-1</span>
                  <span className="font-bold text-[#C2410C]">78% Match</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#C2410C] h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#57534E] mb-1">
                  <span className="font-semibold text-[#1C1917]">TCS Digital / Infosys SP</span>
                  <span className="font-bold text-emerald-700">94% (Cleared)</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E7E5E4] space-y-2">
            <button 
              onClick={() => onNavigate('diagnostic')}
              className="w-full py-3 rounded-2xl btn-warm-secondary font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <span>Take Diagnostic Calibration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-[#78716C]">
              Recalculates ranking across 42,000 peer test scores
            </p>
          </div>
        </div>

      </div>

      {/* 3. SEMESTER PLACEMENT ROADMAP */}
      <section className="card-warm rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#1C1917]">
              Placement Preparation Roadmap
            </h3>
            <p className="text-xs text-[#78716C]">
              Structured milestone path calibrated for SDE and Product Analyst placement drives.
            </p>
          </div>
          <span className="text-xs font-bold text-[#C2410C] bg-[#FFEDD5] px-3 py-1.5 rounded-xl self-start sm:self-auto">
            Unit 2 of 4 Active • 65% Completed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          {/* Milestone 1 */}
          <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50/50 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800 uppercase">Unit 1</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="font-bold text-sm text-[#1C1917]">Logic & Problem Solving</h4>
            <p className="text-xs text-[#57534E]">Time complexity, arrays, two pointers.</p>
            <div className="text-[11px] font-bold text-emerald-700 pt-1">Cleared • 100%</div>
          </div>

          {/* Milestone 2 (Active) */}
          <div className="p-4 rounded-2xl border-2 border-[#C2410C] bg-[#FFEDD5]/40 space-y-2 relative shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#C2410C] uppercase">Unit 2 • IN PROGRESS</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#C2410C] animate-ping"></span>
            </div>
            <h4 className="font-bold text-sm text-[#1C1917]">Recursion & Trees</h4>
            <p className="text-xs text-[#57534E]">Divide & conquer, binary trees, recurrence trees.</p>
            <div className="text-[11px] font-bold text-[#C2410C] pt-1">3 of 5 Lessons Done</div>
          </div>

          {/* Milestone 3 */}
          <div className="p-4 rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] space-y-2 opacity-80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#78716C] uppercase">Unit 3</span>
              <span className="text-xs text-[#A8A29E]">🔒 Locked</span>
            </div>
            <h4 className="font-bold text-sm text-[#1C1917]">System Intuition & APIs</h4>
            <p className="text-xs text-[#78716C]">HTTP protocols, database indexing, caching basics.</p>
            <div className="text-[11px] text-[#A8A29E] pt-1">Unlocks after Unit 2</div>
          </div>

          {/* Milestone 4 */}
          <div className="p-4 rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] space-y-2 opacity-80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#78716C] uppercase">Unit 4</span>
              <span className="text-xs text-[#A8A29E]">🔒 Locked</span>
            </div>
            <h4 className="font-bold text-sm text-[#1C1917]">Verified Placement OA</h4>
            <p className="text-xs text-[#78716C]">Official full-length company mock test + recruiter badge.</p>
            <div className="text-[11px] text-[#A8A29E] pt-1">Capstone Final</div>
          </div>

        </div>
      </section>

      {/* 4. MENTOR DOUBT DESK & PEER BATCH */}
      <section className="card-warm rounded-3xl p-6 sm:p-8 bg-[#F5F0E6] border-[#E7E5E4]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2410C] uppercase tracking-wide">
              <MessageCircle className="w-4 h-4" />
              Human Mentor Doubt Desk
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#1C1917]">
              Stuck on a tricky concept? Ask Dr. Anya directly.
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              Never study in isolation. PyJaApp combines AI rapid diagnosis with real educators who review edge cases and interview questions with you.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80" alt="Mentor" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="Peer 1" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80" alt="Peer 2" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
              </div>
              <span className="text-xs text-[#78716C] font-semibold">14 college peers active in your batch</span>
            </div>
          </div>

          {/* Interactive Quick Doubt Box */}
          <form onSubmit={handleSendDoubt} className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-sm space-y-3">
            <label className="block text-xs font-bold text-[#1C1917]">
              Quick Question or Confusion:
            </label>
            <textarea
              rows={3}
              value={doubtText}
              onChange={(e) => setDoubtText(e.target.value)}
              placeholder="e.g. In merge sort, why is space complexity O(N) when auxiliary array is reused?"
              className="w-full p-3 rounded-xl border border-[#D6D3D1] bg-[#FDFBF7] text-xs text-[#1C1917] focus:outline-none focus:border-[#C2410C] resize-none"
            />
            <div className="flex items-center justify-between pt-1">
              {doubtSent ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  ✓ Doubt submitted to Dr. Anya's queue!
                </span>
              ) : (
                <span className="text-[11px] text-[#78716C]">Answers typically within 3 hours</span>
              )}
              <button
                type="submit"
                disabled={!doubtText.trim()}
                className="px-4 py-2 rounded-xl btn-terracotta text-xs font-bold disabled:opacity-50"
              >
                Send Question
              </button>
            </div>
          </form>

        </div>
      </section>

    </div>
  );
}
