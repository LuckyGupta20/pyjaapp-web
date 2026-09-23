import React, { useState } from 'react';
import { 
  Award, CheckCircle2, Share2, ArrowRight, RotateCcw, ShieldCheck, 
  Sparkles, AlertCircle, Copy, Download, ExternalLink, Target, Check
} from 'lucide-react';

export default function DiagnosticLabPage({ onNavigate }) {
  const [testState, setTestState] = useState('completed'); // 'active' or 'completed'
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [copied, setCopied] = useState(false);

  const questions = [
    {
      id: 1,
      topic: "Algorithmic Problem Solving (DSA)",
      question: "In an array with N elements, what is the most optimal time complexity to find the longest subarray having a sum equal to K (all integers are strictly positive)?",
      options: [
        "O(N^2) using two nested iteration loops",
        "O(N) using sliding window / two pointers technique",
        "O(N log N) using binary search over prefix sums",
        "O(K) using auxiliary hash table"
      ],
      correct: 1
    },
    {
      id: 2,
      topic: "System Intuition & Backend APIs",
      question: "When designing a scalable campus placement portal that handles 50,000 concurrent students submitting test answers, which caching strategy prevents database thrashing?",
      options: [
        "Write-through cache with Redis in front of PostgreSQL",
        "Direct SQL queries with no caching layer",
        "Client-side LocalStorage only",
        "Polling the database every 100 milliseconds"
      ],
      correct: 0
    },
    {
      id: 3,
      topic: "Code Complexity & Data Structures",
      question: "Which data structure guarantees O(1) average lookup and insertion time for student roll-number validation?",
      options: [
        "Balanced Binary Search Tree (AVL)",
        "Hash Map / Hash Set",
        "Doubly Linked List",
        "Min-Heap Priority Queue"
      ],
      correct: 1
    }
  ];

  const handleSelect = (optionIdx) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQ]: optionIdx });
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setTestState('completed');
    }
  };

  const shareText = "🎓 I just ranked #28 (Top 1.8% of 42,000 college aspirants) in the Karnataka Engineering Placement Diagnostic on PyJaApp! Check your company readiness score: https://pyjaapp.edu/diagnostic";

  const handleCopyShare = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E7E5E4]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#78716C] mb-1">
            <span className="hover:text-[#C2410C] cursor-pointer" onClick={() => onNavigate('home')}>Cockpit</span>
            <span>/</span>
            <span className="text-[#C2410C] font-bold">Competitive Diagnostic Lab</span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1917]">
            Where Do You Stand in the Crowd?
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#57534E]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span>42,000+ Active College Peer Benchmarks Calibrated</span>
        </div>
      </div>

      {testState === 'active' ? (
        /* ================= TEST IN PROGRESS ================= */
        <div className="max-w-3xl mx-auto card-warm rounded-3xl p-6 sm:p-10 space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
            <div>
              <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider">
                Question {currentQ + 1} of {questions.length}
              </span>
              <div className="text-xs text-[#78716C] mt-0.5">
                Topic: {questions[currentQ].topic}
              </div>
            </div>
            <div className="text-xs font-mono font-bold bg-[#FFEDD5] text-[#9A3412] px-3 py-1 rounded-xl">
              ⏱ 08:45 Remaining
            </div>
          </div>

          <p className="font-editorial text-xl sm:text-2xl text-[#1C1917] font-bold leading-snug">
            {questions[currentQ].question}
          </p>

          <div className="space-y-3 pt-2">
            {questions[currentQ].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between ${
                  selectedAnswers[currentQ] === idx
                    ? 'border-[#C2410C] bg-[#FFEDD5] text-[#9A3412] font-bold shadow-sm'
                    : 'border-[#E7E5E4] bg-white hover:bg-[#FDFBF7] text-[#44403C]'
                }`}
              >
                <span className="text-xs sm:text-sm">{option}</span>
                {selectedAnswers[currentQ] === idx && (
                  <CheckCircle2 className="w-5 h-5 text-[#C2410C] shrink-0" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-[#E7E5E4] flex items-center justify-between">
            <button
              onClick={() => setTestState('completed')}
              className="text-xs text-[#78716C] hover:text-[#1C1917] font-semibold"
            >
              Skip to Results
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQ] === undefined}
              className="px-6 py-3 rounded-2xl btn-terracotta text-xs font-bold shadow-md disabled:opacity-50 flex items-center gap-2"
            >
              <span>{currentQ === questions.length - 1 ? 'Finish & Calculate Rank' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* ================= CELEBRATORY RESULT CARD ================= */
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Main 2-Column Split: Verified Score Card (Left 7) + Company Matches (Right 5) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT 7 COLS: The High-End Verified Placement Passport */}
            <div className="lg:col-span-7 card-warm rounded-3xl p-6 sm:p-8 border-2 border-[#C2410C]/30 bg-gradient-to-b from-[#FFFDF9] to-[#FAF6EE] shadow-md space-y-6">
              
              {/* Card Top Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E5E4] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#C2410C] text-white flex items-center justify-center font-bold text-sm shadow">
                    P
                  </div>
                  <div>
                    <span className="font-editorial text-lg font-bold text-[#1C1917]">PyJaApp Diagnostic</span>
                    <span className="block text-[10px] text-[#78716C] -mt-1 font-mono">ID: PYJ-2026-BLR-094</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Placement Calibrated
                </span>
              </div>

              {/* Student Header & Big State Rank */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-editorial text-3xl font-bold text-[#1C1917]">
                    Aryan Sharma
                  </h3>
                  <p className="text-xs text-[#78716C]">
                    PESIT Bangalore • 3rd Year CSE • SDE Placement Cohort '26
                  </p>
                </div>

                <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E7E5E4] text-center shadow-sm shrink-0">
                  <div className="text-[10px] text-[#78716C] font-bold uppercase tracking-wider">
                    Karnataka State Rank
                  </div>
                  <div className="font-editorial text-4xl font-black text-[#C2410C] my-0.5">
                    #28
                  </div>
                  <div className="text-[11px] text-emerald-700 font-bold">
                    Top 1.8% of 42,000
                  </div>
                </div>
              </div>

              {/* Percentile Stats Grid */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white p-3 rounded-xl border border-[#E7E5E4]">
                  <div className="text-[10px] text-[#78716C] font-semibold">Percentile</div>
                  <div className="font-editorial text-xl font-black text-[#1C1917]">98.2%</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#E7E5E4]">
                  <div className="text-[10px] text-[#78716C] font-semibold">ATS Fit</div>
                  <div className="font-editorial text-xl font-black text-emerald-600">94%</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#E7E5E4]">
                  <div className="text-[10px] text-[#78716C] font-semibold">Target CTC</div>
                  <div className="font-editorial text-xl font-black text-[#C2410C]">₹12–18 LPA</div>
                </div>
              </div>

              {/* 5-Axis Skill Breakdown Barometer */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="font-bold text-[#1C1917] flex items-center justify-between">
                  <span>5-Axis Placement Skill Calibration:</span>
                  <span className="text-[11px] text-[#78716C] font-mono">Benchmark: SDE-1</span>
                </div>

                <div>
                  <div className="flex justify-between text-[#57534E] mb-1">
                    <span className="font-semibold text-[#1C1917]">DSA & Algorithmic Logic</span>
                    <span className="font-bold text-emerald-700">96% (Interview Ready)</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#57534E] mb-1">
                    <span className="font-semibold text-[#1C1917]">System Architecture & Caching</span>
                    <span className="font-bold text-[#C2410C]">74% (18% Placement Gap)</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#C2410C] h-full rounded-full" style={{ width: '74%' }}></div>
                  </div>
                  <div className="text-[11px] text-[#78716C] mt-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C2410C]" />
                    <span>Dr. Anya's Chapter 6 (Redis & APIs) scheduled to close this gap.</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#57534E] mb-1">
                    <span className="font-semibold text-[#1C1917]">Database Querying & Indexing</span>
                    <span className="font-bold text-emerald-700">88% (Cleared)</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>

              {/* Viral Share Action */}
              <div className="pt-4 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleCopyShare}
                  className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copied ? 'Copied Rank Card! ✓' : 'Share Rank Card to College Batch'}</span>
                </button>

                <button
                  onClick={() => {
                    setTestState('active');
                    setCurrentQ(0);
                  }}
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl btn-warm-secondary text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
              </div>

            </div>

            {/* RIGHT 5 COLS: Target Company Readiness & Next Action */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Company Readiness Card */}
              <div className="card-warm rounded-3xl p-6 border border-[#E7E5E4] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-editorial text-xl font-bold text-[#1C1917] flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#C2410C]" />
                    Company Placement Match
                  </h4>
                  <span className="text-[10px] font-bold text-[#78716C] uppercase tracking-wider">
                    2026 Drives
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  
                  {/* Amazon */}
                  <div className="p-3.5 rounded-2xl bg-white border border-[#E7E5E4] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1C1917]">Amazon SDE-1</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                        78% Match
                      </span>
                    </div>
                    <p className="text-[11px] text-[#57534E]">
                      Needs Unit 3 (System Design & Caching) to cross the 85% shortlist threshold.
                    </p>
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#C2410C] h-full rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>

                  {/* TCS Digital / Infosys SP */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-950">TCS Digital / Infosys SP</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
                        94% Cleared
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      Eligible for direct placement interview shortlist based on current percentile.
                    </p>
                    <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>

                  {/* Flipkart / Swiggy */}
                  <div className="p-3.5 rounded-2xl bg-white border border-[#E7E5E4] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1C1917]">Flipkart / Swiggy OA</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold text-[10px]">
                        82% Match
                      </span>
                    </div>
                    <p className="text-[11px] text-[#57534E]">
                      DSA score qualifies. Recommend 1 practice mock on Graphs.
                    </p>
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>

                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => onNavigate('classroom')}
                    className="w-full py-3 rounded-2xl btn-terracotta text-xs font-bold shadow flex items-center justify-center gap-2"
                  >
                    <span>Close Gap in Chapter 4 (Resume Lesson)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* State Leaderboard Teaser */}
              <div className="p-5 rounded-3xl bg-[#FAF6EE] border border-[#E7E5E4] text-xs space-y-3">
                <div className="flex items-center justify-between font-bold text-[#1C1917]">
                  <span>Karnataka Top 5 Aspirants</span>
                  <span className="text-[10px] text-[#C2410C]">Updated Today</span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#E7E5E4]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-600">#1</span>
                      <span className="font-semibold text-[#1C1917]">Rohan K. (RVCE)</span>
                    </div>
                    <span className="font-bold text-emerald-700">99.8%</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#E7E5E4]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-600">#2</span>
                      <span className="font-semibold text-[#1C1917]">Sneha M. (BMSCE)</span>
                    </div>
                    <span className="font-bold text-emerald-700">99.6%</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#FFEDD5] border border-[#FDBA74]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#C2410C]">#28</span>
                      <span className="font-bold text-[#1C1917]">Aryan Sharma (You)</span>
                    </div>
                    <span className="font-bold text-[#C2410C]">98.2%</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
