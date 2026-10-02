import React, { useState, useEffect } from 'react';
import { 
  Play, Award, CheckCircle2, ArrowRight, Clock, Users, Sparkles, 
  MessageCircle, Flame, Shield, Target, Zap, ChevronRight, Check,
  FileText, Briefcase, BookOpen, Search, Compass, Share2, TrendingUp,
  HelpCircle, MessageSquare, Volume2, Maximize2, X, RefreshCw, BookmarkCheck
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import ImageWithFallback from './ImageWithFallback';

export default function HomePage({ onNavigate, onOpenProfileModal }) {
  const { 
    user, 
    selectedPace, 
    changePace, 
    tasks, 
    toggleTask, 
    completedMins, 
    totalMins, 
    progressPercent, 
    remainingMins,
    quizAnswer,
    quizSubmitted,
    handleQuizSubmit,
    doubts,
    submitDoubt
  } = useUser();

  const [doubtInput, setDoubtInput] = useState('');
  const [showDoubtHistory, setShowDoubtHistory] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeVideoTab, setActiveVideoTab] = useState('notes'); // 'notes' | 'chapters'
  const [copiedLink, setCopiedLink] = useState(false);

  // Time-of-day dynamic greeting
  const [greeting, setGreeting] = useState('Good day');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    const timer = setTimeout(() => setIsHydrating(false), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleSendDoubt = (e) => {
    e.preventDefault();
    if (!doubtInput.trim()) return;
    submitDoubt(doubtInput);
    setDoubtInput('');
    setShowDoubtHistory(true);
  };

  const handleQuickPromptClick = (promptText) => {
    setDoubtInput(promptText);
  };

  const handleKeyDown = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  };

  const handleCopyShareLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Quick 1-click concept questions
  const samplePrompts = [
    "Why does Merge Sort require O(N) auxiliary space?",
    "How to guarantee O(N log N) in QuickSort?",
    "Recurrence tree intuition for T(n) = 2T(n/2) + O(n)"
  ];

  if (isHydrating) {
    return (
      <div className="space-y-8 pb-16 animate-pulse">
        <div className="h-64 rounded-3xl bg-[#FAF6EE] border border-[#E7E5E4]" />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 h-96 rounded-3xl bg-[#FAF6EE] border border-[#E7E5E4]" />
          <div className="h-96 rounded-3xl bg-[#FAF6EE] border border-[#E7E5E4]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 sm:space-y-14 pb-24 max-w-7xl mx-auto">
      
      {/* 1. TOP HERO GREETING & HABIT PROGRESS COCKPIT */}
      <section 
        className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E7E5E4] shadow-[0_4px_24px_-4px_rgba(28,25,23,0.04)] relative overflow-hidden"
        aria-label="Daily Habit Cockpit"
      >
        {/* Integrated Placement Countdown Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-white border border-[#E7E5E4] shadow-2xs text-xs mb-8">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F37021] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F37021]"></span>
            </span>
            <span className="font-bold text-[#1C1917]">National Placement Window:</span>
            <span className="text-[#57534E]">
              TCS Digital &amp; Infosys SP drives begin in <strong className="text-[#1C1917] font-semibold">42 days</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 text-[#78716C]">
            <span className="hidden sm:inline">Cohort Target: <strong>450+ Score</strong></span>
            <span className="font-bold text-[#0F2B5C] bg-[#FAF6EE] px-2.5 py-0.5 rounded-lg border border-[#E7E5E4]">
              {user.statePercentile}th State Percentile
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: Personalized Greeting & Habit Calibration */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean Single-Row Status Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5] text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F37021]" />
                CareerKinetic &bull; {user.cohort}
              </span>
              
              <div 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold shadow-2xs cursor-default"
                title={`${user.streak} consecutive days of focused practice.`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-bounce" />
                <span>{user.streak}-Day Streak Active</span>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                KYC Level {user.kycLevel} Verified
              </span>
            </div>

            {/* Editorial Headline (Quotation Marks Removed for Confident Hierarchy) */}
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal leading-[1.18] tracking-tight">
              {greeting}, {user.firstName}.{' '}
              <span className="text-[#57534E]">Your AI mentor has calibrated today&apos;s roadmap.</span>
            </h1>

            <p className="text-[#57534E] text-sm sm:text-base leading-relaxed max-w-2xl">
              {remainingMins > 0 ? (
                <>
                  You have <span className="font-bold text-[#0F2B5C] bg-[#FAF6EE] px-1.5 py-0.5 rounded border border-[#E7E5E4]">{remainingMins} minutes left</span> to complete today&apos;s milestone on{' '}
                  <span className="text-[#1C1917] font-bold underline decoration-[#F37021]/50 decoration-2">
                    Divide &amp; Conquer Recursion
                  </span>
                  . Complete targets to protect your {user.streak}-day streak and unlock capstone placement mocks.
                </>
              ) : (
                <>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    All daily targets completed!
                  </span>{' '}
                  Outstanding dedication, {user.firstName}. Your {user.streak}-day streak flame is secured for today.
                </>
              )}
            </p>

            {/* Daily Pace Selector (Clean & Uncluttered, Duplicate Button Removed) */}
            <div className="pt-1 flex items-center gap-3">
              <span className="text-xs font-bold text-[#78716C] uppercase tracking-wider">Today&apos;s Pace:</span>
              <div 
                role="radiogroup" 
                aria-label="Daily Study Pace Selector"
                className="inline-flex p-1 rounded-xl bg-white border border-[#E7E5E4] text-xs font-semibold shadow-2xs"
              >
                {[
                  { id: '5', label: '5m Saver' },
                  { id: '15', label: '15m Habit' },
                  { id: '30', label: '30m Deep' }
                ].map((p) => {
                  const isSelected = selectedPace === p.id;
                  return (
                    <button 
                      key={p.id}
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => changePace(p.id)}
                      className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2B5C] ${
                        isSelected 
                          ? 'bg-[#0F2B5C] text-white font-bold shadow-xs' 
                          : 'text-[#78716C] hover:text-[#1C1917]'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: The Interactive Habit Ring & Live Checklist (Full-Width Tasks, Zero Truncation) */}
          <div className="lg:col-span-5 w-full bg-white p-6 sm:p-7 rounded-3xl border border-[#E7E5E4] shadow-[0_8px_24px_-4px_rgba(28,25,23,0.04)] space-y-5">
            
            {/* Card Header with Progress Ring & Remaining Status */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F5F0E6]">
              <div className="flex items-center gap-3.5">
                {/* Compact Progress Ring */}
                <div 
                  className="relative w-14 h-14 shrink-0 flex items-center justify-center select-none"
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Daily completion percentage"
                >
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <defs>
                      <filter id="habit-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#F37021" floodOpacity="0.25"/>
                      </filter>
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="stroke-[#E7E5E4]"
                      strokeWidth="9"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="stroke-[#F37021] transition-all duration-700 ease-out"
                      strokeWidth="9"
                      strokeDasharray="251"
                      strokeDashoffset={251 - (251 * progressPercent) / 100}
                      strokeLinecap="round"
                      filter="url(#habit-glow)"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <span className="font-editorial text-base font-bold text-[#1C1917]">
                      {progressPercent}%
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-[#1C1917]">Daily Cockpit Targets</h4>
                  <p className="text-xs text-[#78716C] font-medium">
                    {completedMins} of {totalMins} mins completed
                  </p>
                </div>
              </div>

              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border shrink-0 transition-all duration-300 ${
                remainingMins === 0 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-2xs' 
                  : 'bg-[#FFF7ED] text-[#EA580C] border-[#FFEDD5]'
              }`}>
                {remainingMins === 0 ? '✓ Goal Met' : `${remainingMins}m left`}
              </span>
            </div>

            {/* Interactive Tasks List (Full Width - Zero Truncation!) */}
            <div className="space-y-2.5">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  role="checkbox"
                  aria-checked={task.completed}
                  title={task.completed ? 'Click to mark incomplete' : 'Click to mark complete and earn +20 XP'}
                  className={`w-full text-left flex items-center justify-between gap-3 p-3 rounded-2xl border transition-all duration-200 active:scale-[0.98] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2B5C] ${
                    task.completed
                      ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900 shadow-2xs'
                      : 'bg-[#FDFBF7] hover:bg-[#FFF7ED]/50 border-[#E7E5E4] hover:border-[#F37021]/50 text-[#1C1917]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 ${
                      task.completed 
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs' 
                        : 'border-stone-400 bg-white group-hover:border-[#F37021]'
                    }`}>
                      {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className={`text-xs leading-snug ${task.completed ? 'line-through text-emerald-800/80 font-medium' : 'font-semibold text-[#1C1917]'}`}>
                      {task.title}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-stone-400 group-hover:text-[#F37021] shrink-0 font-bold transition-colors">
                    {task.completed ? '+20 XP' : `${task.duration}m`}
                  </span>
                </button>
              ))}
            </div>

            {/* Celebratory Banner when 100% complete */}
            {remainingMins === 0 && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between animate-fadeIn">
                <span className="flex items-center gap-1.5">
                  <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                  All targets cleared for today! (+60 XP banked)
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  Protected
                </span>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 2. TODAY'S 15-MINUTE FOCUS MASTERCLASS */}
      <section 
        className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E7E5E4] relative overflow-hidden flex flex-col justify-between shadow-[0_4px_24px_-4px_rgba(28,25,23,0.04)]"
        aria-label="Today's Focus Masterclass"
      >
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F2B5C]">
                Pedagogy-First Masterclass &bull; Active Unit
              </span>
            </div>
            <span className="text-xs text-[#78716C] font-semibold flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-[#E7E5E4]">
              <Clock className="w-3.5 h-3.5 text-[#F37021]" /> 14 mins total &bull; 04:12 remaining
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center mb-6">
            
            {/* Mentor Video Thumbnail with Playback Bar & Click-to-Play Modal */}
            <div 
              role="button"
              tabIndex={0}
              aria-label="Play masterclass video preview on Divide and Conquer"
              onKeyDown={(e) => handleKeyDown(e, () => setIsVideoModalOpen(true))}
              onClick={() => setIsVideoModalOpen(true)}
              className="md:col-span-5 rounded-2xl overflow-hidden aspect-video bg-stone-200 relative group cursor-pointer shadow-xs border border-[#E7E5E4] hover:shadow-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2B5C]"
            >
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80" 
                alt="Mentor Dr. Anya Sharma" 
                fallbackType="video"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <div className="w-14 h-14 rounded-full bg-white text-[#0F2B5C] flex items-center justify-center font-bold shadow-lg group-hover:scale-110 active:scale-95 transition-all duration-200 pl-0.5">
                  <Play className="w-6 h-6 fill-[#0F2B5C]" />
                </div>
              </div>
              <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold font-mono">
                Resume at 04:12
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/40">
                <div className="h-full bg-[#F37021]" style={{ width: '68%' }}></div>
              </div>
            </div>

            {/* Lesson Description */}
            <div className="md:col-span-7 space-y-3">
              <div className="text-xs font-bold text-[#F37021] uppercase tracking-wide">
                Chapter 4 &bull; Algorithmic Paradigms
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight">
                Recursive Divide &amp; Conquer with Dr. Anya Sharma
              </h3>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Master the recurrence tree intuition behind merge sort and binary search boundaries. Includes 3 real-time interactive AI checkpoints.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#78716C]">
                <span className="flex items-center gap-1.5 text-[#1C1917] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Human mentor pedagogy
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5 text-[#1C1917] font-semibold">
                  <Zap className="w-4 h-4 text-[#F37021]" /> In-flow AI Checkpoints
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5 text-[#0F2B5C] font-semibold">
                  <Users className="w-4 h-4" /> 1.2k peers watched
                </span>
              </div>
            </div>
          </div>

          {/* Interactive In-Video Quiz Card with Tactile Feedback */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E7E5E4] space-y-3 mb-4 shadow-[0_2px_12px_rgba(28,25,23,0.02)]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1C1917] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F37021]" />
                Interactive AI Checkpoint (Checkpoint 2 of 3)
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono">
                Earn +15 XP
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#57534E]">
              What is the worst-case auxiliary space complexity of standard <strong>Merge Sort</strong> on an array of length N?
            </p>
            
            <div 
              role="radiogroup" 
              aria-label="Merge sort space complexity options"
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
            >
              {[
                { opt: 'O(1)', label: 'A' },
                { opt: 'O(log N)', label: 'B' },
                { opt: 'O(N)', label: 'C' },
                { opt: 'O(N²)', label: 'D' }
              ].map(({ opt, label }) => {
                const isSelected = quizAnswer === opt;
                return (
                  <button
                    key={opt}
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleQuizSubmit(opt)}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2B5C] ${
                      isSelected
                        ? opt === 'O(N)'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs font-bold'
                          : 'bg-rose-50 border-rose-400 text-rose-800 font-bold'
                        : 'bg-[#FDFBF7] border-[#E7E5E4] text-[#1C1917] hover:border-[#0F2B5C]'
                    }`}
                  >
                    <span className="text-[10px] text-stone-400 font-sans">{label}.</span>
                    <span>{opt}</span>
                    <span className="w-2"></span>
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div 
                role="status"
                aria-live="polite"
                className={`p-3 rounded-xl text-xs font-medium flex items-center justify-between gap-2 transition-all duration-300 ${
                  quizAnswer === 'O(N)' 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {quizAnswer === 'O(N)' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Spot on!</strong> Merge sort requires O(N) temporary space to combine subarrays. (+15 XP awarded)</span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span><strong>Review hint:</strong> Standard array Merge Sort requires auxiliary buffer storage to merge sorted halves.</span>
                    </>
                  )}
                </div>

                {quizAnswer !== 'O(N)' && (
                  <button
                    onClick={() => handleQuizSubmit('O(N)')}
                    className="text-[11px] underline text-rose-700 hover:text-rose-900 font-bold shrink-0"
                  >
                    Select Correct
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Card Footer with CTA */}
        <div className="pt-5 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-[#57534E]">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80" 
              alt="Dr. Anya" 
              fallbackType="mentor"
              initials="DA"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>Mentor Dr. Anya is answering placement doubts today</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#0F2B5C] hover:bg-[#1E3A8A] text-white text-xs font-bold shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#0F2B5C]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Resume Masterclass (04:12)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. FOUR PILLARS FAST-ACTION CARDS (Drawspace / Linear Quiet Luxury Style) */}
      <section className="space-y-6" aria-label="CareerKinetic Ecosystem">
        <div>
          <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-widest block mb-1">
            Structured Foundations
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1917]">
            CareerKinetic Ecosystem
          </h3>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1 max-w-xl">
            Unified four-pillar gateway to engineering excellence, mock interviews, and high-impact placement drives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1: Learn */}
          <div 
            role="button"
            tabIndex={0}
            aria-label="Go to Learn Pillar: Curated Roadmaps and Foundation Courses"
            onKeyDown={(e) => handleKeyDown(e, () => onNavigate('learn', 'roadmaps'))}
            onClick={() => onNavigate('learn', 'roadmaps')}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E5E4] hover:border-[#0F2B5C] hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-4px_rgba(28,25,23,0.07),0_4px_12px_-2px_rgba(28,25,23,0.03)] active:scale-[0.98] transition-all duration-300 cursor-pointer group flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2B5C]"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xs">
                <BookOpen className="w-6 h-6 text-[#F37021]" />
              </div>
              <h4 className="font-bold text-base text-[#1C1917] group-hover:text-[#0F2B5C] flex items-center justify-between">
                Learn
                <ChevronRight className="w-4 h-4 text-[#78716C] group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                Curated Roadmaps, Free Foundation Courses, Bootcamps &amp; Coaching directory.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-[#F5F0E6] flex items-center justify-between text-[11px] text-[#78716C]">
              <span className="flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F37021]"></span> 12 Active Tracks
              </span>
              <span className="font-bold text-[#F37021] group-hover:underline">Explore &rarr;</span>
            </div>
          </div>

          {/* Pillar 2: Practice */}
          <div 
            role="button"
            tabIndex={0}
            aria-label="Go to Practice Pillar: AI Mock Interviews and Diagnostic Lab"
            onKeyDown={(e) => handleKeyDown(e, () => onNavigate('practice', 'mock'))}
            onClick={() => onNavigate('practice', 'mock')}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E5E4] hover:border-[#B45309] hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-4px_rgba(28,25,23,0.07),0_4px_12px_-2px_rgba(28,25,23,0.03)] active:scale-[0.98] transition-all duration-300 cursor-pointer group flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2B5C]"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xs">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#1C1917] group-hover:text-[#B45309] flex items-center justify-between">
                Practice
                <ChevronRight className="w-4 h-4 text-[#78716C] group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                AI Mock Interviews, 20-Min Diagnostic Lab, and Domain Discovery calibration.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-[#F5F0E6] flex items-center justify-between text-[11px] text-[#78716C]">
              <span className="flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Voice + Code Lab
              </span>
              <span className="font-semibold text-[#B45309] group-hover:underline">Simulate &rarr;</span>
            </div>
          </div>

          {/* Pillar 3: Opportunities */}
          <div 
            role="button"
            tabIndex={0}
            aria-label="Go to Opportunities Pillar: Private Tech Jobs and PSU Exams"
            onKeyDown={(e) => handleKeyDown(e, () => onNavigate('opportunities', 'private'))}
            onClick={() => onNavigate('opportunities', 'private')}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E5E4] hover:border-[#065F46] hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-4px_rgba(28,25,23,0.07),0_4px_12px_-2px_rgba(28,25,23,0.03)] active:scale-[0.98] transition-all duration-300 cursor-pointer group flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2B5C]"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#065F46] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xs">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#1C1917] group-hover:text-[#065F46] flex items-center justify-between">
                Opportunities
                <ChevronRight className="w-4 h-4 text-[#78716C] group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                Private Tech Jobs (₹8-28 LPA), Govt &amp; PSU Exams (NIC, ISRO), Hackathons.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-[#F5F0E6] flex items-center justify-between text-[11px] text-[#78716C]">
              <span className="flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 140+ Open Roles
              </span>
              <span className="font-semibold text-[#065F46] group-hover:underline">Apply &rarr;</span>
            </div>
          </div>

          {/* Pillar 4: Community */}
          <div 
            role="button"
            tabIndex={0}
            aria-label="Go to Community Pillar: Peer Discussions and Brain Twin"
            onKeyDown={(e) => handleKeyDown(e, () => onNavigate('community', 'feed'))}
            onClick={() => onNavigate('community', 'feed')}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E5E4] hover:border-[#6366F1] hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-4px_rgba(28,25,23,0.07),0_4px_12px_-2px_rgba(28,25,23,0.03)] active:scale-[0.98] transition-all duration-300 cursor-pointer group flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2B5C]"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xs">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#1C1917] group-hover:text-[#4F46E5] flex items-center justify-between">
                Community
                <ChevronRight className="w-4 h-4 text-[#78716C] group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                Student Q&amp;A discussions, Skill-Snaps proof sharing, Brain Twin study peer matching.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-[#F5F0E6] flex items-center justify-between text-[11px] text-[#78716C]">
              <span className="flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 4,820 Peer Members
              </span>
              <span className="font-semibold text-[#4F46E5] group-hover:underline">Connect &rarr;</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SEMESTER PLACEMENT ROADMAP PROGRESSION WITH TIMELINE CONNECTOR */}
      <section className="bg-[#FAF6EE] rounded-3xl p-8 sm:p-10 border border-[#E7E5E4] space-y-8 shadow-[0_4px_24px_-4px_rgba(28,25,23,0.03)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#1C1917]">
              Semester Placement Roadmap
            </h3>
            <p className="text-xs text-[#78716C]">
              Structured milestone path calibrated for SDE and Product Analyst placement drives.
            </p>
          </div>
          <span className="text-xs font-bold text-[#0F2B5C] bg-[#FFF7ED] px-3 py-1.5 rounded-xl self-start sm:self-auto border border-[#FFEDD5] shadow-2xs">
            Unit 2 of 4 Active &bull; 65% Completed
          </span>
        </div>

        {/* Milestone Cards with subtle progress indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          {/* Milestone 1 */}
          <div className="p-5 rounded-2xl border border-emerald-300 bg-emerald-50/50 space-y-2 relative transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Unit 1</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="font-bold text-sm text-[#1C1917]">Logic &amp; Problem Solving</h4>
            <p className="text-xs text-[#57534E]">Time complexity, arrays, two pointers.</p>
            <div className="text-[11px] font-bold text-emerald-700 pt-1 flex items-center gap-1">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Cleared &bull; 100%
            </div>
          </div>

          {/* Milestone 2 (Active) */}
          <div className="p-5 rounded-2xl border-2 border-[#F37021] bg-[#FFF7ED]/70 space-y-2 relative shadow-xs transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#0F2B5C] uppercase tracking-wider">Unit 2 &bull; IN PROGRESS</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F37021] animate-ping"></span>
            </div>
            <h4 className="font-bold text-sm text-[#1C1917]">Recursion &amp; Trees</h4>
            <p className="text-xs text-[#57534E]">Divide &amp; conquer, binary trees, recurrence trees.</p>
            <div className="text-[11px] font-bold text-[#F37021] pt-1 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-[#F37021]" /> 3 of 5 Lessons Done
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="p-5 rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] space-y-2 opacity-80 transition-all duration-200 hover:opacity-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider">Unit 3</span>
              <span className="text-xs text-[#A8A29E] font-medium">&times; Locked</span>
            </div>
            <h4 className="font-bold text-sm text-[#1C1917]">System Intuition &amp; APIs</h4>
            <p className="text-xs text-[#78716C]">HTTP protocols, database indexing, caching basics.</p>
            <div className="text-[11px] text-[#A8A29E] pt-1">Unlocks after Unit 2</div>
          </div>

          {/* Milestone 4 */}
          <div className="p-5 rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] space-y-2 opacity-80 transition-all duration-200 hover:opacity-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider">Unit 4</span>
              <span className="text-xs text-[#A8A29E] font-medium">&times; Locked</span>
            </div>
            <h4 className="font-bold text-sm text-[#1C1917]">Verified Placement OA</h4>
            <p className="text-xs text-[#78716C]">Official full-length company mock test + recruiter badge.</p>
            <div className="text-[11px] text-[#A8A29E] pt-1">Capstone Final</div>
          </div>

        </div>
      </section>

      {/* 5. MENTOR DOUBT DESK & REAL-TIME QUEUE WITH 1-CLICK PROMPT PILLS */}
      <section className="bg-[#FAF6EE] rounded-3xl p-8 sm:p-12 border border-[#E7E5E4] shadow-[0_4px_24px_-4px_rgba(28,25,23,0.03)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F2B5C] uppercase tracking-wide">
              <MessageCircle className="w-4 h-4 text-[#F37021]" />
              Human Mentor Doubt Desk
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#1C1917]">
              Stuck on a tricky concept? Ask Dr. Anya directly.
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              Never study in isolation. CareerKinetic combines rapid AI checkpoints with expert faculty who break down edge cases and company OA interview patterns.
            </p>
            
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80" 
                  alt="Mentor Dr. Anya" 
                  fallbackType="mentor"
                  initials="DA"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
                  KN
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold">
                  PR
                </div>
              </div>
              <span className="text-xs text-[#78716C] font-semibold">14 college peers active in your batch</span>
            </div>

            {/* Toggle Doubt History Drawer */}
            <div className="pt-2">
              <button
                onClick={() => setShowDoubtHistory(!showDoubtHistory)}
                className="text-xs font-bold text-[#0F2B5C] hover:text-[#F37021] flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{showDoubtHistory ? 'Hide Questions History' : `View Doubt Queue (${doubts.length})`}</span>
              </button>
            </div>
          </div>

          {/* Interactive Question Submission Form */}
          <div className="space-y-4">
            <form onSubmit={handleSendDoubt} className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-[0_2px_12px_rgba(28,25,23,0.02)] space-y-3">
              <label htmlFor="doubt-input" className="block text-xs font-bold text-[#1C1917]">
                Submit Concept Question to Dr. Anya&apos;s Queue:
              </label>
              
              <textarea
                id="doubt-input"
                rows={3}
                value={doubtInput}
                onChange={(e) => setDoubtInput(e.target.value)}
                placeholder="e.g. In merge sort, why is space complexity O(N) when auxiliary array is reused?"
                className="w-full p-3 rounded-xl border border-[#D6D3D1] bg-[#FDFBF7] text-xs text-[#1C1917] focus:outline-none focus:border-[#0F2B5C] focus:ring-2 focus:ring-[#0F2B5C]/15 resize-none transition-all"
              />

              {/* 1-Click Fast Prompt Pills */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Frequently Asked Checkpoint Doubts:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {samplePrompts.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleQuickPromptClick(prompt)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-[#FAF6EE] hover:bg-[#FFF7ED] text-[#57534E] hover:text-[#EA580C] border border-[#E7E5E4] hover:border-[#FFEDD5] transition-all duration-150 active:scale-95 text-left"
                    >
                      &ldquo;{prompt}&rdquo;
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#F5F0E6]">
                <span className="text-[11px] text-[#78716C]">
                  Faculty answers typically within 2-3 hours
                </span>
                <button
                  type="submit"
                  disabled={!doubtInput.trim()}
                  className="px-4 py-2 rounded-xl bg-[#0F2B5C] hover:bg-[#1E3A8A] text-white text-xs font-bold disabled:opacity-50 transition-all duration-200 active:scale-95 shadow-2xs hover:shadow-xs focus-visible:ring-2 focus-visible:ring-[#0F2B5C]"
                >
                  Send to Mentor (+10 XP)
                </button>
              </div>
            </form>

            {/* Real-Time Questions List / Live Queue */}
            {showDoubtHistory && (
              <div className="space-y-3 pt-1 animate-fadeIn">
                <h4 className="text-xs font-bold text-[#78716C] uppercase tracking-wider">
                  Your Questions &amp; Mentor Responses
                </h4>
                {doubts.map((d) => (
                  <div key={d.id} className="p-4 rounded-xl bg-white border border-[#E7E5E4] space-y-2 text-xs shadow-2xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[#1C1917] truncate">{d.question}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        d.status === 'Answered' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {d.status}
                      </span>
                    </div>

                    {d.reply && (
                      <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#57534E] leading-relaxed border border-[#E7E5E4]/60">
                        <strong className="text-[#0F2B5C]">{d.mentor}: </strong>
                        {d.reply}
                      </div>
                    )}

                    <div className="text-[10px] text-stone-400">{d.timestamp}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 6. CINEMATIC IN-COCKPIT MASTERCLASS VIDEO MODAL */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Masterclass Video Player"
        >
          <div className="bg-[#FDFBF7] rounded-3xl border border-[#E7E5E4] shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#E7E5E4] flex items-center justify-between bg-[#FAF6EE]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <div>
                  <h3 className="font-bold text-sm text-[#1C1917]">
                    Recursive Divide &amp; Conquer with Dr. Anya Sharma
                  </h3>
                  <span className="text-[11px] text-[#78716C]">
                    Chapter 4 &bull; Algorithmic Paradigms &bull; 04:12 / 14:00
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-2 rounded-xl text-stone-500 hover:text-[#1C1917] hover:bg-stone-200/50 transition-colors"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Video Canvas */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group select-none">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80"
                alt="Dr. Anya Sharma Lecture"
                fallbackType="video"
                className="w-full h-full object-cover opacity-85"
              />

              {/* Play/Pause Center Overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute w-16 h-16 rounded-full bg-white/90 text-[#0F2B5C] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 pl-0.5"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <span className="font-bold text-xl">❚❚</span> : <Play className="w-7 h-7 fill-[#0F2B5C]" />}
              </button>

              {/* Video Bottom HUD Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent space-y-2">
                
                {/* Scrubber Bar */}
                <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer relative">
                  <div className="h-full bg-[#F37021] rounded-full relative" style={{ width: '42%' }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-xs"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px]">04:12 / 14:00</span>
                    <button 
                      onClick={() => setPlaybackSpeed(s => s === '1x' ? '1.25x' : s === '1.25x' ? '1.5x' : '1x')}
                      className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[11px] font-bold font-mono transition"
                    >
                      {playbackSpeed}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleCopyShareLink}
                      className="px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-[11px] font-medium flex items-center gap-1 transition"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>{copiedLink ? 'Copied Link!' : 'Share Timestamp'}</span>
                    </button>
                    <button 
                      onClick={() => onNavigate('learn', 'roadmaps')}
                      className="px-3 py-1 rounded bg-[#F37021] hover:bg-[#EA580C] text-white text-[11px] font-bold flex items-center gap-1 transition"
                    >
                      <span>Full Roadmap Course</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body Tabs (Notes / Chapters) */}
            <div className="p-6 overflow-y-auto space-y-4 bg-white">
              <div className="flex items-center gap-4 border-b border-[#F5F0E6] pb-3 text-xs font-bold">
                <button
                  onClick={() => setActiveVideoTab('notes')}
                  className={`pb-2 border-b-2 transition ${
                    activeVideoTab === 'notes' ? 'border-[#0F2B5C] text-[#0F2B5C]' : 'border-transparent text-stone-400 hover:text-[#1C1917]'
                  }`}
                >
                  Key Concept Notes (By Dr. Anya)
                </button>
                <button
                  onClick={() => setActiveVideoTab('chapters')}
                  className={`pb-2 border-b-2 transition ${
                    activeVideoTab === 'chapters' ? 'border-[#0F2B5C] text-[#0F2B5C]' : 'border-transparent text-stone-400 hover:text-[#1C1917]'
                  }`}
                >
                  Lecture Chapters (3 Checkpoints)
                </button>
              </div>

              {activeVideoTab === 'notes' ? (
                <div className="space-y-3 text-xs text-[#57534E] leading-relaxed">
                  <p>
                    <strong>Intuition Summary:</strong> When breaking an array problem of size <span className="font-mono bg-stone-100 px-1 py-0.5 rounded">N</span> into halves, each level requires <span className="font-mono bg-stone-100 px-1 py-0.5 rounded">O(N)</span> work to reassemble the elements. Since there are <span className="font-mono bg-stone-100 px-1 py-0.5 rounded">log₂(N)</span> levels in the recursion tree, total runtime is <span className="font-mono bg-stone-100 px-1 py-0.5 rounded">O(N log N)</span>.
                  </p>
                  <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4] text-[#1C1917]">
                    <span className="font-bold text-[#0F2B5C] block mb-1">Company OA Placement Tip:</span>
                    Interviewers frequently ask whether Merge Sort is stable. Yes! Because when <span className="font-mono">left[i] == right[j]</span>, picking <span className="font-mono">left[i]</span> preserves the original relative order.
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  {[
                    { time: '00:00', title: 'Recurrence Relations Overview', completed: true },
                    { time: '01:15', title: 'Why Divide & Conquer beats Brute Force', completed: true },
                    { time: '04:12', title: 'Merge Sort Boundary Checks (Current Position)', current: true },
                    { time: '09:30', title: 'Interactive AI Checkpoint #2: Space Complexity', checkpoint: true },
                    { time: '12:45', title: 'Common Mistakes in TCS / Infosys OA Trees', upcoming: true }
                  ].map((ch, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        ch.current 
                          ? 'bg-[#FFF7ED] border-[#F37021] text-[#0F2B5C] font-bold' 
                          : 'bg-[#FDFBF7] border-[#E7E5E4] text-[#57534E]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#E7E5E4]">
                          {ch.time}
                        </span>
                        <span>{ch.title}</span>
                      </div>
                      {ch.completed && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {ch.current && <span className="text-[10px] font-bold text-[#F37021] uppercase">Playing</span>}
                      {ch.checkpoint && <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Quiz</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
