import React, { useState } from 'react';
import { X, FileText, Globe, UserCheck, Download, Sparkles, CheckCircle2, Award, Briefcase, GraduationCap } from 'lucide-react';

export default function AIProfileModal({ isOpen, onClose, initialTab = 'ats' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'ats' | 'portfolio' | 'biodata'
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('https://careerkinetic.in/@aryan-sharma');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FDFBF7] border border-[#E7E5E4] rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E7E5E4] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] text-[#C2410C] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-xl font-bold text-[#1C1917]">AI Profile & Asset Builder</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                  60% Profile Ready
                </span>
              </div>
              <p className="text-xs text-[#78716C]">Generate ATS resumes, digital portfolios, and placement biodatas in 1 click.</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F0E6] hover:bg-[#E7E5E4] text-[#78716C] hover:text-[#1C1917] flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 bg-white border-b border-[#E7E5E4] flex gap-2">
          <button
            onClick={() => setActiveTab('ats')}
            className={`pb-3 px-4 text-xs font-bold transition flex items-center gap-2 border-b-2 ${
              activeTab === 'ats'
                ? 'border-[#C2410C] text-[#C2410C]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <FileText className="w-4 h-4" />
            ATS Resume Generator
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FFEDD5] text-[#9A3412] font-mono">Score 94%</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`pb-3 px-4 text-xs font-bold transition flex items-center gap-2 border-b-2 ${
              activeTab === 'portfolio'
                ? 'border-[#C2410C] text-[#C2410C]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <Globe className="w-4 h-4" />
            Live Digital Portfolio
          </button>

          <button
            onClick={() => setActiveTab('biodata')}
            className={`pb-3 px-4 text-xs font-bold transition flex items-center gap-2 border-b-2 ${
              activeTab === 'biodata'
                ? 'border-[#C2410C] text-[#C2410C]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Campus Placement Biodata
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: ATS RESUME GENERATOR */}
          {activeTab === 'ats' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E7E5E4]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1C1917]">ATS Compatibility Benchmark:</span>
                    <span className="text-xs font-mono font-bold text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                      94/100 (Google, Microsoft & TCS ATS Ready)
                    </span>
                  </div>
                  <p className="text-xs text-[#78716C] mt-1">Single-column plain text architecture with verified keyword density.</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold transition flex items-center gap-2 shrink-0 shadow-sm">
                  <Download className="w-4 h-4" />
                  <span>Download Clean PDF</span>
                </button>
              </div>

              {/* Resume Paper Preview */}
              <div className="bg-white border border-[#D6D3D1] rounded-2xl p-8 shadow-sm font-sans space-y-5 text-[#1C1917] max-w-2xl mx-auto">
                <div className="border-b border-[#E7E5E4] pb-4 text-center">
                  <h1 className="text-2xl font-bold tracking-tight">Aryan Sharma</h1>
                  <p className="text-xs text-[#57534E] mt-1 font-mono">
                    Greater Noida, UP • +91 98765 43210 • aryan.sharma@glbajaj.ac.in • linkedin.com/in/aryan-sharma
                  </p>
                  <p className="text-xs text-[#78716C] mt-0.5 font-mono">
                    CareerKinetic ID: CK-2026-8812 • Verified State College Rank #28
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C2410C] border-b border-[#FED7AA] pb-1 mb-2">
                    Education
                  </h4>
                  <div className="flex justify-between text-xs">
                    <div>
                      <strong className="text-[#1C1917]">B.Tech in Computer Science & Engineering</strong>
                      <div className="text-[#78716C]">GL Bajaj Institute of Technology & Management, Greater Noida</div>
                    </div>
                    <div className="text-right text-[#78716C] font-mono">
                      <span>2022 - 2026</span>
                      <div className="text-[#065F46] font-bold">CGPA: 8.76/10</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C2410C] border-b border-[#FED7AA] pb-1 mb-2">
                    Core Technical Skills
                  </h4>
                  <div className="text-xs space-y-1 text-[#57534E]">
                    <div><strong>Languages:</strong> C++, Python, JavaScript (ES6+), SQL</div>
                    <div><strong>Web & Frameworks:</strong> React, Node.js, FastAPI, Tailwind CSS, Express</div>
                    <div><strong>Developer Tools:</strong> Git, GitHub, Docker, Postman, Supabase, Linux</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C2410C] border-b border-[#FED7AA] pb-1 mb-2">
                    Key Projects
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold text-[#1C1917]">
                        <span>CareerKinetic — Autonomous AI Career Accelerator</span>
                        <span className="font-mono text-[#78716C]">React, FastAPI, WebSockets</span>
                      </div>
                      <p className="text-[#78716C] mt-0.5 leading-relaxed">
                        • Engineered full-stack diagnostic evaluation platform serving 500+ CS aptitude modules.
                        • Built real-time WebSockets telemetry and automated ATS benchmark scoring engine.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE DIGITAL PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white border border-[#E7E5E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#1C1917]">Your Public Verified Portfolio Link:</span>
                  <div className="text-sm font-mono text-[#C2410C] font-semibold mt-0.5">
                    https://careerkinetic.in/@aryan-sharma
                  </div>
                </div>
                <button 
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-xl bg-[#F5F0E6] hover:bg-[#E7E5E4] text-[#1C1917] text-xs font-bold transition flex items-center gap-1.5 shrink-0"
                >
                  {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Globe className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Shareable Link'}</span>
                </button>
              </div>

              {/* Portfolio Preview Card */}
              <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#C2410C] to-[#F59E0B] text-white flex items-center justify-center font-bold text-2xl font-editorial shadow-md">
                    AS
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#1C1917]">Aryan Sharma</h2>
                    <p className="text-xs text-[#78716C]">Full-Stack Systems Engineer &amp; AI Practitioner</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFEDD5] text-[#9A3412] font-bold">
                        🔥 5-Day Coding Streak
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ECFDF5] text-[#065F46] font-bold">
                        Top 6% State Diagnostic
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-[#FDFBF7] border border-[#E7E5E4] text-center">
                    <div className="text-[10px] font-mono text-[#78716C] uppercase">DSA Benchmark</div>
                    <div className="text-lg font-bold text-[#C2410C]">96% Ready</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FDFBF7] border border-[#E7E5E4] text-center">
                    <div className="text-[10px] font-mono text-[#78716C] uppercase">Verified Projects</div>
                    <div className="text-lg font-bold text-[#1C1917]">4 Live Deployed</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FDFBF7] border border-[#E7E5E4] text-center">
                    <div className="text-[10px] font-mono text-[#78716C] uppercase">State Rank</div>
                    <div className="text-lg font-bold text-[#065F46]">#28 Rank</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CAMPUS BIODATA */}
          {activeTab === 'biodata' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white border border-[#E7E5E4] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#1C1917]">Official Campus Recruitment Biodata Format</span>
                  <p className="text-xs text-[#78716C]">Standardized institutional format compliant with college T&amp;P Cell guidelines.</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold transition flex items-center gap-2 shadow-sm">
                  <Download className="w-4 h-4" />
                  <span>Export Official Biodata</span>
                </button>
              </div>

              <div className="bg-white border border-[#D6D3D1] rounded-2xl p-6 text-xs space-y-4 font-sans text-[#1C1917]">
                <div className="border-b border-[#E7E5E4] pb-3 text-center">
                  <div className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider">Department of Training &amp; Placement</div>
                  <h2 className="text-lg font-bold text-[#1C1917] mt-0.5">STUDENT PLACEMENT BIODATA</h2>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-[#FDFBF7] rounded-xl border border-[#E7E5E4]">
                  <div><strong className="text-[#78716C]">Candidate Name:</strong> Aryan Sharma</div>
                  <div><strong className="text-[#78716C]">College Roll No:</strong> 2200970100088</div>
                  <div><strong className="text-[#78716C]">Branch &amp; Course:</strong> B.Tech CSE (3rd Year)</div>
                  <div><strong className="text-[#78716C]">Institution:</strong> GL Bajaj Institute of Tech &amp; Mgmt</div>
                  <div><strong className="text-[#78716C]">10th / 12th Score:</strong> 92.4% / 89.6%</div>
                  <div><strong className="text-[#78716C]">Current CGPA:</strong> 8.76 / 10.0</div>
                </div>

                <div>
                  <strong className="text-[#C2410C] block mb-1">CareerKinetic Institutional Assessment Verification:</strong>
                  <p className="text-[#78716C] leading-relaxed">
                    Student has demonstrated consistent 5-day active problem streak. Scored in 94th percentile across institutional diagnostic tests. Eligible for Tier-1 Product Engineering placements.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#E7E5E4] bg-[#F5F0E6] flex items-center justify-between text-xs text-[#78716C]">
          <span>CareerKinetic Placement AI Engine</span>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white border border-[#D6D3D1] text-[#1C1917] font-bold hover:bg-[#E7E5E4] transition"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
