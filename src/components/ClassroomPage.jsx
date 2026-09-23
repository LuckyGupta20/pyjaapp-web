import React, { useState } from 'react';
import { 
  Play, Pause, RotateCcw, CheckCircle2, ArrowRight, Sparkles, 
  MessageCircle, Lock, BookOpen, Clock, Bot, FileText, Send, Zap, ThumbsUp
} from 'lucide-react';

export default function ClassroomPage({ onNavigate }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(252); // 04:12
  const [totalTime] = useState(860); // 14:20
  
  // Right Panel Tabs: 'checkpoint', 'notes', 'ask'
  const [copilotTab, setCopilotTab] = useState('checkpoint');
  
  // AI Checkpoint State
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [quizSuccess, setQuizSuccess] = useState(false);

  // Live Doubt State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'mentor',
      text: "Hello Aryan! I'm Dr. Anya's AI Twin. I'm actively following this lecture on Divide & Conquer. Ask me any doubt about recurrence relations or space complexity!",
      time: "04:10"
    }
  ]);
  const [doubtInput, setDoubtInput] = useState('');

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (index) => {
    setSelectedAnswer(index);
  };

  const handleVerifyAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerChecked(true);
    if (selectedAnswer === 1) { // Option B is correct
      setQuizSuccess(true);
    } else {
      setQuizSuccess(false);
    }
  };

  const handleContinueLesson = () => {
    setIsPlaying(true);
    setCopilotTab('notes');
  };

  const handleRewind = () => {
    setCurrentTime(Math.max(0, currentTime - 30));
    setIsPlaying(true);
    setIsAnswerChecked(false);
    setSelectedAnswer(null);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!doubtInput.trim()) return;

    const userText = doubtInput;
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: userText, time: formatTime(currentTime) }
    ]);
    setDoubtInput('');

    // Simulated immediate smart reply from Dr. Anya's AI Twin
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'mentor',
          text: `Great question regarding "${userText.slice(0, 30)}..."! In merge sort, because we recursively divide the array into halves until singletons remain, we need O(N) temporary buffer memory to merge the sorted halves without overwriting adjacent items. Rewatch 08:30 for the visual animation!`,
          time: formatTime(currentTime)
        }
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Breadcrumb & Live Mentor Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E7E5E4]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#78716C] mb-1">
            <span className="hover:text-[#C2410C] cursor-pointer" onClick={() => onNavigate('home')}>Cockpit</span>
            <span>/</span>
            <span>Campus Placement SDE Track</span>
            <span>/</span>
            <span className="text-[#C2410C] font-bold">Chapter 4: Divide & Conquer</span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1917]">
            Divide & Conquer Partitioning Intuition
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full badge-terracotta text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C2410C] animate-ping"></span>
            HITL Active • AI Co-Pilot Synchronized
          </span>
        </div>
      </div>

      {/* Main 2-Column Split-Screen (Video Left 65% + AI Co-Pilot Right 35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT 7-8 COLS: Video Player & Controls */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          
          <div className="rounded-3xl overflow-hidden card-warm border border-[#E7E5E4] bg-stone-900 text-white relative shadow-lg aspect-video flex flex-col justify-between p-4 sm:p-5">
            
            {/* Top Video Overlay Bar */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>Dr. Anya Sharma • Lead Mentor Lecture</span>
              </div>

              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-semibold text-emerald-400 border border-white/10">
                1080p • 1.0x Calibrated
              </div>
            </div>

            {/* Video Canvas & Mentor Backdrop */}
            <div className="absolute inset-0 flex items-center justify-center opacity-45 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80" 
                alt="Dr. Anya Sharma Lecture" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* In-Video Watermark & Recurrence Formula Overlay */}
            <div className="relative z-10 max-w-sm bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs font-mono text-stone-200">
              <span className="text-[#FDBA74] font-bold">Recurrence:</span> T(n) = 2T(n/2) + O(n)
              <div className="text-[10px] text-stone-400 font-sans mt-0.5">Level depth = log₂(n) • Work per level = O(n)</div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="space-y-2 z-10 bg-black/70 p-3 rounded-2xl backdrop-blur-md border border-white/10">
              {/* Progress Slider */}
              <div className="w-full bg-stone-700 h-1.5 rounded-full overflow-hidden relative cursor-pointer">
                <div 
                  className="bg-[#C2410C] h-full rounded-full transition-all"
                  style={{ width: `${(currentTime / totalTime) * 100}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-300">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <span className="font-mono text-[11px]">
                    {formatTime(currentTime)} / {formatTime(totalTime)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-emerald-400 font-semibold hidden sm:inline">
                    Checkpoint 1 of 3 (Active)
                  </span>
                  <button 
                    onClick={() => setCopilotTab('checkpoint')}
                    className="text-[11px] bg-[#C2410C] text-white px-2.5 py-1 rounded-md font-bold hover:bg-[#9A3412] transition flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3" />
                    <span>View AI Quiz</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Teacher Credentials & Quick Syllabus Drawer */}
          <div className="card-warm rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
                alt="Dr. Anya Sharma" 
                className="w-11 h-11 rounded-full object-cover border-2 border-[#C2410C]/40"
              />
              <div>
                <h4 className="font-editorial text-base sm:text-lg font-bold text-[#1C1917]">
                  Dr. Anya Sharma • Lead Mentor
                </h4>
                <p className="text-xs text-[#78716C]">
                  Curriculum Director • ex-IIT Madras • Human-in-the-Loop Pedagogy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={() => setCopilotTab('ask')}
                className="w-full sm:w-auto px-4 py-2 rounded-xl btn-warm-secondary text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C2410C]" />
                Ask Mentor Twin
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT 4-5 COLS: The Live AI Co-Pilot Panel */}
        <div className="lg:col-span-5 xl:col-span-4 card-warm rounded-3xl p-5 border border-[#E7E5E4] shadow-sm flex flex-col h-[560px] justify-between">
          
          <div>
            {/* Co-Pilot Tab Selector */}
            <div className="flex items-center justify-between p-1 bg-[#F5F0E6] rounded-2xl border border-[#E7E5E4] mb-4 text-xs font-bold">
              <button
                onClick={() => setCopilotTab('checkpoint')}
                className={`flex-1 py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  copilotTab === 'checkpoint' 
                    ? 'bg-[#C2410C] text-white shadow-sm' 
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>AI Checkpoint</span>
              </button>

              <button
                onClick={() => setCopilotTab('notes')}
                className={`flex-1 py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  copilotTab === 'notes' 
                    ? 'bg-[#C2410C] text-white shadow-sm' 
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Smart Notes</span>
              </button>

              <button
                onClick={() => setCopilotTab('ask')}
                className={`flex-1 py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  copilotTab === 'ask' 
                    ? 'bg-[#C2410C] text-white shadow-sm' 
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask Twin</span>
              </button>
            </div>

            {/* TAB 1: AI CHECKPOINT */}
            {copilotTab === 'checkpoint' && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
                    In-Flow Concept Check
                  </span>
                  <span className="text-[10px] font-mono bg-[#FFEDD5] text-[#9A3412] px-2 py-0.5 rounded font-bold">
                    Pause: 04:12
                  </span>
                </div>

                <p className="font-editorial text-sm sm:text-base font-bold text-[#1C1917] leading-snug">
                  Why does Divide & Conquer merge-sort guarantee \(O(N \log N)\) time complexity in all cases?
                </p>

                <div className="space-y-2 text-xs">
                  {[
                    "A) Because it compares adjacent elements like bubble sort",
                    "B) Because it splits into log₂N levels with O(N) merge work per level",
                    "C) Because it uses a hash map to avoid comparisons entirely"
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerChecked && quizSuccess}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-center justify-between leading-snug ${
                        selectedAnswer === idx
                          ? 'border-[#C2410C] bg-[#FFEDD5] text-[#9A3412] font-bold'
                          : 'border-[#E7E5E4] bg-white hover:bg-stone-50 text-[#44403C]'
                      }`}
                    >
                      <span>{option}</span>
                      {selectedAnswer === idx && <CheckCircle2 className="w-4 h-4 text-[#C2410C] shrink-0 ml-1.5" />}
                    </button>
                  ))}
                </div>

                {/* Feedback state after check */}
                {isAnswerChecked && (
                  <div className={`p-3 rounded-xl text-xs ${quizSuccess ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                    {quizSuccess ? (
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-bold">Correct, Aryan!</div>
                          <div className="text-[11px] text-emerald-700 mt-0.5">The recursion tree has \(\log_2 N\) depth, and each level performs \(N\) comparisons. Checkpoint 1 cleared!</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2">
                        <RotateCcw className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-bold">Not quite right!</div>
                          <div className="text-[11px] text-rose-700 mt-0.5">Remember Dr. Anya's tree diagram. Rewind 30s to re-listen.</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SMART NOTES (SYNCHRONIZED) */}
            {copilotTab === 'notes' && (
              <div className="space-y-3 text-xs overflow-y-auto max-h-[380px] pr-1">
                <div className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider mb-2">
                  Auto-Generated Lesson Highlights
                </div>

                <div 
                  onClick={() => setCurrentTime(45)}
                  className="p-2.5 rounded-xl border border-[#E7E5E4] bg-white hover:border-[#C2410C] transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#C2410C] mb-1">
                    <span>00:45 • Problem Framing</span>
                    <span className="font-mono text-[#78716C]">00:45</span>
                  </div>
                  <p className="text-[#57534E]">Why O(N²) brute-force quadratic algorithms trigger TLE in Amazon and Google online assessments.</p>
                </div>

                <div 
                  onClick={() => setCurrentTime(135)}
                  className="p-2.5 rounded-xl border border-[#E7E5E4] bg-white hover:border-[#C2410C] transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#C2410C] mb-1">
                    <span>02:15 • The Partition Principle</span>
                    <span className="font-mono text-[#78716C]">02:15</span>
                  </div>
                  <p className="text-[#57534E]">Splitting problems into subproblems: mid = L + (R-L)//2 avoids integer overflow.</p>
                </div>

                <div 
                  onClick={() => setCurrentTime(252)}
                  className="p-2.5 rounded-xl border border-[#C2410C] bg-[#FFEDD5]/40 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#C2410C] mb-1">
                    <span>04:12 • Recurrence Tree Analysis</span>
                    <span className="font-mono text-[#C2410C]">Current</span>
                  </div>
                  <p className="text-[#1C1917] font-medium">T(n) = 2T(n/2) + O(n). Height = log₂n, Work per level = n.</p>
                </div>

                <div 
                  onClick={() => setCurrentTime(510)}
                  className="p-2.5 rounded-xl border border-[#E7E5E4] bg-white hover:border-[#C2410C] transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#78716C] mb-1">
                    <span>08:30 • Space Complexity Trap</span>
                    <span className="font-mono text-[#78716C]">08:30</span>
                  </div>
                  <p className="text-[#57534E]">Auxiliary buffer O(N) vs In-place QuickSort partitioning trade-offs.</p>
                </div>
              </div>
            )}

            {/* TAB 3: ASK DR. ANYA (AI TWIN LIVE CHAT) */}
            {copilotTab === 'ask' && (
              <div className="flex flex-col h-[380px] justify-between">
                <div className="space-y-2.5 overflow-y-auto max-h-[310px] pr-1 text-xs">
                  {chatMessages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded-2xl ${
                        msg.sender === 'mentor' 
                          ? 'bg-white border border-[#E7E5E4] text-[#1C1917] mr-4' 
                          : 'bg-[#C2410C] text-white ml-4 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] opacity-75 mb-1 font-bold">
                        <span>{msg.sender === 'mentor' ? 'Dr. Anya Sharma (AI Twin)' : 'Aryan (You)'}</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={doubtInput}
                    onChange={(e) => setDoubtInput(e.target.value)}
                    placeholder="Ask Dr. Anya about this timestamp..."
                    className="flex-1 p-2.5 rounded-xl border border-[#D6D3D1] bg-white text-xs focus:outline-none focus:border-[#C2410C]"
                  />
                  <button 
                    type="submit" 
                    className="p-2.5 rounded-xl btn-terracotta text-white font-bold"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

          </div>

          {/* Bottom Action Footer for Checkpoint Tab */}
          {copilotTab === 'checkpoint' && (
            <div className="pt-3 border-t border-[#E7E5E4] flex items-center justify-between gap-3">
              <button
                onClick={handleRewind}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-[#78716C] hover:text-[#1C1917] flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Rewind 30s
              </button>

              {!isAnswerChecked ? (
                <button
                  onClick={handleVerifyAnswer}
                  disabled={selectedAnswer === null}
                  className="px-5 py-2.5 rounded-xl btn-terracotta text-xs font-bold shadow disabled:opacity-50"
                >
                  Verify Answer
                </button>
              ) : quizSuccess ? (
                <button
                  onClick={handleContinueLesson}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <span>Resume Video</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleRewind}
                  className="px-5 py-2.5 rounded-xl btn-terracotta text-xs font-bold shadow"
                >
                  Rewind & Listen
                </button>
              )}
            </div>
          )}

          {copilotTab === 'notes' && (
            <div className="pt-3 border-t border-[#E7E5E4]">
              <button
                onClick={() => onNavigate('diagnostic')}
                className="w-full py-2.5 rounded-xl btn-terracotta text-xs font-bold shadow text-center flex items-center justify-center gap-1.5"
              >
                <span>Verify Mastery in Diagnostic Lab</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
