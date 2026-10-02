import React, { useState, useEffect } from 'react';
import { 
  Award, Terminal, Sparkles, Search, CheckCircle2, Clock, 
  ArrowRight, Play, RefreshCw, AlertCircle, MessageSquare, Mic,
  MicOff, Volume2, ShieldCheck, ChevronRight, BarChart3, Target,
  Check, X
} from 'lucide-react';

export default function PracticePage({ initialSubtab = 'diagnostic', onNavigate }) {
  const [activeSubtab, setActiveSubtab] = useState(initialSubtab); // 'mock' | 'diagnostic' | 'discovery'

  // ==================== 1. AI MOCK INTERVIEW STATE ====================
  const [interviewRole, setInterviewRole] = useState('sde_dsa'); // 'sde_dsa' | 'system_design' | 'hr_behavioral'
  const [interviewStep, setInterviewStep] = useState(0); // 0: Question, 1: Response submitted, 2: Critique
  const [candidateResponse, setCandidateResponse] = useState('');
  const [isSimulatingVoice, setIsSimulatingVoice] = useState(false);
  const [interviewFeedback, setInterviewFeedback] = useState(null);

  const mockQuestions = {
    sde_dsa: {
      interviewer: 'Alex (Senior Staff Engineer, CareerKinetic AI)',
      prompt: 'Given an array of integers representing stock prices on consecutive days, explain how you would find the maximum profit you can achieve with at most ONE buy and ONE sell transaction. What is the optimal time and space complexity, and how do you handle edge cases like strictly decreasing prices?',
      idealPoints: ['Keep track of minimum price seen so far', 'Calculate potential profit at each step', 'Single pass O(N) time complexity', 'O(1) auxiliary space complexity', 'Handle zero/negative profit case']
    },
    system_design: {
      interviewer: 'Vikram (VP Engineering & Cloud Architect)',
      prompt: 'Design a URL shortener service like TinyURL. How would you generate unique 7-character aliases, prevent hash collisions, and ensure 99.99% read uptime with low latency for 100M active daily clicks?',
      idealPoints: ['Base62 encoding of auto-incrementing ID or MD5/SHA256 truncation', 'Distributed ID generator (Snowflake)', 'Read-heavy caching with Redis LRU', 'Relational/Key-Value storage with read replicas', 'Rate limiting and DDOS protection']
    },
    hr_behavioral: {
      interviewer: 'Priya (Head of Campus Talent)',
      prompt: 'Tell me about a technical project where a teammate failed to deliver their module on time before a college deadline. How did you handle the friction, communicate, and ensure the project succeeded?',
      idealPoints: ['STAR format (Situation, Task, Action, Result)', 'Empathy and root cause identification', 'Constructive workload redistribution', 'Positive outcome and professional relationship preserved']
    }
  };

  const handleSimulateVoice = () => {
    setIsSimulatingVoice(true);
    setTimeout(() => {
      setIsSimulatingVoice(false);
      setCandidateResponse(
        interviewRole === 'sde_dsa'
          ? "I would maintain two variables: minPrice initialized to infinity and maxProfit initialized to zero. Traversing through the array once, for each price I update minPrice = min(minPrice, price), and then calculate candidateProfit = price - minPrice. If candidateProfit is greater than maxProfit, I update maxProfit. This executes in O(N) time and O(1) space. If prices strictly decrease, maxProfit remains 0 as no profitable transaction is possible."
          : "For TinyURL, I would utilize Base62 encoding (a-z, A-Z, 0-9) giving 62^7 ≈ 3.5 trillion unique combinations. Since the read-to-write ratio is roughly 100:1, I would deploy a Redis caching layer in front of a distributed database to serve hot URLs with sub-5ms latency, utilizing Snowflake ID generation to prevent collisions across multiple app servers."
      );
    }, 1500);
  };

  const handleSubmitInterviewResponse = () => {
    if (!candidateResponse.trim()) return;
    setInterviewStep(1);
    setTimeout(() => {
      setInterviewFeedback({
        score: interviewRole === 'sde_dsa' ? 92 : 88,
        strengths: [
          'Correctly identified single-pass O(N) time and O(1) space optimal bounds',
          'Addressed decreasing price edge case without requiring prompt reminders',
          'Structured answer with clear variable naming and algorithmic state progression'
        ],
        improvements: [
          'Mention how you would handle an empty array or single-element input explicitly in code guard clauses',
          'Explain cache-locality advantage over maintaining separate candidate arrays'
        ],
        rubric: {
          problemSolving: '9.4/10',
          codeComplexity: '9.5/10',
          communication: '8.8/10'
        }
      });
      setInterviewStep(2);
    }, 1200);
  };

  // ==================== 2. DIAGNOSTIC LAB STATE ====================
  const [diagnosticActive, setDiagnosticActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes

  useEffect(() => {
    let timer;
    if (diagnosticActive && !testSubmitted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [diagnosticActive, testSubmitted, timeLeft]);

  const diagnosticQuestions = [
    {
      id: 1,
      topic: 'Algorithm Analysis',
      question: 'What is the tightest upper bound time complexity of the following recurrence: T(n) = 2T(n/2) + O(n log n)?',
      options: [
        'O(n log n)',
        'O(n log² n)',
        'O(n²)',
        'O(2ⁿ)'
      ],
      correct: 1,
      explanation: 'Using Master Theorem Case 2 extension: a=2, b=2, so n^(log_b a) = n^1. Since f(n) = n log n = n^(log_b a) * log^k(n) where k=1, T(n) = Θ(n log^(k+1) n) = Θ(n log² n).'
    },
    {
      id: 2,
      topic: 'Data Structures & Pointers',
      question: 'In a singly linked list with N nodes, which of the following operations CANNOT be performed in O(1) time without extra pointers or memory?',
      options: [
        'Insert a node at the head',
        'Delete the node immediately after a given node pointer',
        'Delete the tail node given only head and tail pointers',
        'Insert a node after a given node pointer'
      ],
      correct: 2,
      explanation: 'Deleting the tail of a singly linked list requires traversing to the node prior to the tail to update its next pointer to NULL, requiring O(N) time without a doubly linked structure.'
    },
    {
      id: 3,
      topic: 'Database Systems & Indexing',
      question: 'Given a composite B-Tree index on (department_id, salary, hire_date), which WHERE clause will NOT be able to utilize this index effectively?',
      options: [
        'WHERE department_id = 10 AND salary > 50000',
        'WHERE department_id = 10',
        'WHERE salary = 75000 AND hire_date > "2024-01-01"',
        'WHERE department_id = 10 AND salary = 60000 AND hire_date > "2023-01-01"'
      ],
      correct: 2,
      explanation: 'Composite B-Tree indices follow the leftmost prefix rule. A query querying salary and hire_date without department_id cannot leverage the index root and causes a full index/table scan.'
    },
    {
      id: 4,
      topic: 'System Design & Distributed Systems',
      question: 'In the CAP theorem, what does Partition Tolerance (P) guarantee during a network split between two database replica clusters?',
      options: [
        'The system never loses data even if hardware burns',
        'The system continues to operate despite an arbitrary number of messages being dropped or delayed',
        'Every read request receives the most recent write or an error',
        'All nodes simultaneously update within 10 milliseconds'
      ],
      correct: 1,
      explanation: 'Partition tolerance means the cluster as a whole continues functioning despite communication packet drops or delays between nodes.'
    }
  ];

  const handleSelectAnswer = (qIndex, optionIndex) => {
    if (testSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const calculateDiagnosticScore = () => {
    let correctCount = 0;
    diagnosticQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) correctCount++;
    });
    return correctCount;
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ==================== 3. DOMAIN DISCOVERY STATE ====================
  const [discoveryAnswers, setDiscoveryAnswers] = useState({});
  const [discoveryResult, setDiscoveryResult] = useState(null);

  const discoveryQuestions = [
    {
      id: 1,
      text: 'When starting a new personal project, what excites you most?',
      options: [
        { label: 'Designing interactive user interfaces, animations, and clean APIs', domain: 'fullstack' },
        { label: 'Analyzing datasets, training models, and building intelligent agents', domain: 'ai' },
        { label: 'Configuring servers, Docker containers, and optimizing deployment pipelines', domain: 'devops' },
        { label: 'Reverse-engineering code, finding vulnerabilities, and penetration testing', domain: 'security' }
      ]
    },
    {
      id: 2,
      text: 'Which problem sounds most enjoyable to debug?',
      options: [
        { label: 'A subtle race condition in React component state rendering', domain: 'fullstack' },
        { label: 'A model suffering from hallucination and low cosine similarity retrieval', domain: 'ai' },
        { label: 'A Kubernetes pod crashing with OOMKilled in production', domain: 'devops' },
        { label: 'A JWT signature verification bypass flaw in an API endpoint', domain: 'security' }
      ]
    },
    {
      id: 3,
      text: 'Which college subject did you find most intuitive?',
      options: [
        { label: 'Web Technologies & Object-Oriented Software Design', domain: 'fullstack' },
        { label: 'Linear Algebra, Probability & Artificial Intelligence', domain: 'ai' },
        { label: 'Operating Systems & Computer Networks', domain: 'devops' },
        { label: 'Cryptography & Network Security', domain: 'security' }
      ]
    }
  ];

  const handleSelectDiscovery = (qId, domain) => {
    setDiscoveryAnswers(prev => ({ ...prev, [qId]: domain }));
  };

  const handleCalculateDiscovery = () => {
    const counts = { fullstack: 0, ai: 0, devops: 0, security: 0 };
    Object.values(discoveryAnswers).forEach(dom => {
      if (counts[dom] !== undefined) counts[dom]++;
    });

    let topDomain = 'fullstack';
    let maxCount = -1;
    for (const [dom, cnt] of Object.entries(counts)) {
      if (cnt > maxCount) {
        maxCount = cnt;
        topDomain = dom;
      }
    }

    const domainProfiles = {
      fullstack: {
        title: 'Full-Stack Software Engineer',
        fit: '94% Natural Aptitude Match',
        desc: 'You thrive when connecting user-facing interactions with robust backend systems. You enjoy seeing immediate visual results and building end-to-end products.',
        targetCompanies: 'Amazon, Microsoft, Swiggy, Razorpay',
        startingCTC: '₹10 - 22 LPA',
        roadmap: 'fullstack'
      },
      ai: {
        title: 'Applied Generative AI & ML Engineer',
        fit: '96% Natural Aptitude Match',
        desc: 'You have strong mathematical and algorithmic intuition. You enjoy working with stochastic systems, LLMs, and large-scale data representations.',
        targetCompanies: 'Google, Nvidia, Adobe Research, OpenAI Ecosystem Startups',
        startingCTC: '₹14 - 30 LPA',
        roadmap: 'ai_ml'
      },
      devops: {
        title: 'Cloud & Infrastructure Architect',
        fit: '92% Natural Aptitude Match',
        desc: 'You value resilience, scalability, and automated reliability. You enjoy systems-level thinking, containers, and cloud architecture.',
        targetCompanies: 'Atlassian, Cisco, Cred, HashiCorp Ecosystem',
        startingCTC: '₹11 - 24 LPA',
        roadmap: 'cloud_devops'
      },
      security: {
        title: 'Application Security Engineer',
        fit: '90% Natural Aptitude Match',
        desc: 'You think like an adversary and take pride in bulletproofing applications against data leaks and privilege escalations.',
        targetCompanies: 'Palo Alto Networks, CrowdStrike, FinTech Banks',
        startingCTC: '₹12 - 26 LPA',
        roadmap: 'fullstack'
      }
    };

    setDiscoveryResult(domainProfiles[topDomain]);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] text-xs font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#B45309]" />
              Pillar 2: Practice
            </span>
            <span className="text-xs text-[#78716C]">Rigorous Evaluation &amp; Calibration</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1917]">
            Diagnostic Labs &amp; AI Interviews
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1 max-w-xl">
            Simulate real tech rounds, calculate your accurate State Engineering Rank, and pinpoint exact conceptual gaps before campus placements.
          </p>
        </div>

        {/* Subtab Pill Bar */}
        <div className="flex flex-wrap p-1.5 rounded-2xl bg-white border border-[#E7E5E4] text-xs font-semibold shadow-2xs">
          <button
            onClick={() => setActiveSubtab('diagnostic')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubtab === 'diagnostic' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
          >
            20-Min Diagnostic Lab
          </button>
          <button
            onClick={() => setActiveSubtab('mock')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubtab === 'mock' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
          >
            AI Mock Interviews
          </button>
          <button
            onClick={() => setActiveSubtab('discovery')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubtab === 'discovery' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
          >
            Domain Discovery
          </button>
        </div>
      </div>

      {/* SUBTAB 1: 20-MIN DIAGNOSTIC LAB */}
      {activeSubtab === 'diagnostic' && (
        <div className="space-y-6">
          {!diagnosticActive && !testSubmitted && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] shadow-xs space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-4">
                  <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] text-xs font-bold">
                    Official Calibration Test • 42,000 Verified Peer Submissions
                  </span>
                  <h2 className="font-editorial text-3xl font-bold text-[#1C1917]">
                    Calculate Your State Rank &amp; Company Fit
                  </h2>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    This calibrated 20-minute diagnostic tests your actual problem-solving and foundational CS depth across DSA, Database Indexing, Recurrence Trees, and Distributed Systems. 
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4]">
                      <div className="text-[10px] font-bold text-[#78716C] uppercase">Time Allowed</div>
                      <div className="text-sm font-bold text-[#1C1917]">20 Minutes</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4]">
                      <div className="text-[10px] font-bold text-[#78716C] uppercase">Total Problems</div>
                      <div className="text-sm font-bold text-[#1C1917]">4 Calibrated MCQs</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4]">
                      <div className="text-[10px] font-bold text-[#78716C] uppercase">Negative Marking</div>
                      <div className="text-sm font-bold text-[#1C1917]">None (Diagnostic)</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4]">
                      <div className="text-[10px] font-bold text-[#78716C] uppercase">Instant Output</div>
                      <div className="text-sm font-bold text-emerald-700">Rank &amp; Gap Radar</div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <button
                      onClick={() => setDiagnosticActive(true)}
                      className="px-6 py-3 rounded-2xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-md flex items-center gap-2 transition"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Start 20-Minute Calibration Now</span>
                    </button>
                    <span className="text-xs text-[#78716C]">Camera &amp; mic not required</span>
                  </div>
                </div>

                {/* Right Preview Card */}
                <div className="p-6 rounded-2xl bg-[#FAF6EE] border border-[#E7E5E4] space-y-4">
                  <div className="text-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C]">Current State Percentile</span>
                    <div className="font-editorial text-5xl font-black text-[#1C1917] my-1">#28</div>
                    <div className="text-xs text-[#78716C]">Uttar Pradesh / NCR Engineering Cohort</div>
                  </div>
                  <div className="text-xs space-y-1.5 border-t border-[#E7E5E4] pt-3">
                    <div className="flex justify-between">
                      <span className="text-[#57534E]">Last Test Taken:</span>
                      <span className="font-semibold text-[#1C1917]">3 Days Ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#57534E]">Current Percentile:</span>
                      <span className="font-bold text-emerald-700">94.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#57534E]">Aspirants Evaluated:</span>
                      <span className="font-semibold text-[#1C1917]">42,180</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE TEST RUNNER */}
          {diagnosticActive && !testSubmitted && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] shadow-xs space-y-6">
              {/* Test Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-[#FAF6EE] text-[#1C1917] font-mono text-xs font-bold border border-[#E7E5E4]">
                    Question {currentQuestionIndex + 1} of {diagnosticQuestions.length}
                  </span>
                  <span className="text-xs font-bold text-[#C2410C]">
                    Topic: {diagnosticQuestions[currentQuestionIndex].topic}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs font-bold">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{formatTimer(timeLeft)}</span>
                </div>
              </div>

              {/* Question Body */}
              <div className="space-y-4">
                <h3 className="font-editorial text-xl font-bold text-[#1C1917] leading-relaxed">
                  {diagnosticQuestions[currentQuestionIndex].question}
                </h3>

                <div className="space-y-2.5 pt-2">
                  {diagnosticQuestions[currentQuestionIndex].options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(currentQuestionIndex, optIdx)}
                      className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between ${
                        selectedAnswers[currentQuestionIndex] === optIdx
                          ? 'bg-[#FFEDD5] border-[#C2410C] text-[#1C1917] font-semibold'
                          : 'bg-[#FAF6EE] border-[#E7E5E4] text-[#57534E] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                          selectedAnswers[currentQuestionIndex] === optIdx
                            ? 'bg-[#C2410C] text-white'
                            : 'bg-white border border-[#E7E5E4] text-[#78716C]'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {selectedAnswers[currentQuestionIndex] === optIdx && (
                        <Check className="w-4 h-4 text-[#C2410C]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Test Navigation & Submit */}
              <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl bg-[#FAF6EE] text-[#57534E] border border-[#E7E5E4] text-xs font-bold disabled:opacity-40"
                >
                  &larr; Previous Question
                </button>

                <div className="flex items-center gap-2">
                  {currentQuestionIndex < diagnosticQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                      className="px-5 py-2.5 rounded-xl bg-[#1C1917] text-white text-xs font-bold hover:bg-stone-800 transition"
                    >
                      Next Question &rarr;
                    </button>
                  ) : (
                    <button
                      onClick={() => { setDiagnosticActive(false); setTestSubmitted(true); }}
                      className="px-6 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-md transition"
                    >
                      Submit Calibration Test
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TEST RESULTS & REPORT */}
          {testSubmitted && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    Calibration Complete • Verified Score
                  </span>
                  <h2 className="font-editorial text-3xl font-bold text-[#1C1917] mt-1">
                    Your Calibration Diagnostic Report
                  </h2>
                </div>

                <button
                  onClick={() => { setTestSubmitted(false); setDiagnosticActive(false); setSelectedAnswers({}); }}
                  className="px-4 py-2 rounded-xl bg-[#FAF6EE] text-[#1C1917] border border-[#E7E5E4] text-xs font-bold flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Retake Calibration</span>
                </button>
              </div>

              {/* Score & Rank Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E7E5E4] text-center">
                  <div className="text-[11px] font-bold text-[#78716C] uppercase">Test Score</div>
                  <div className="font-editorial text-4xl font-bold text-[#1C1917] my-1">
                    {calculateDiagnosticScore()} / {diagnosticQuestions.length}
                  </div>
                  <div className="text-xs text-[#57534E]">
                    {Math.round((calculateDiagnosticScore() / diagnosticQuestions.length) * 100)}% Accuracy
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E7E5E4] text-center">
                  <div className="text-[11px] font-bold text-[#78716C] uppercase">State Rank Calibrated</div>
                  <div className="font-editorial text-4xl font-bold text-[#C2410C] my-1">
                    {calculateDiagnosticScore() >= 3 ? '#24' : '#39'}
                  </div>
                  <div className="text-xs text-emerald-700 font-bold">
                    {calculateDiagnosticScore() >= 3 ? '▲ +4 Positions Gained' : '▼ -11 Positions'}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E7E5E4] text-center">
                  <div className="text-[11px] font-bold text-[#78716C] uppercase">Percentile</div>
                  <div className="font-editorial text-4xl font-bold text-[#1C1917] my-1">
                    {calculateDiagnosticScore() >= 3 ? '95.8%' : '91.4%'}
                  </div>
                  <div className="text-xs text-[#57534E]">Top 4.2% of State Cohort</div>
                </div>
              </div>

              {/* Detailed Question Review */}
              <div className="space-y-4 pt-4 border-t border-[#E7E5E4]">
                <h4 className="font-bold text-sm text-[#1C1917]">Detailed Solutions &amp; Conceptual Explanations</h4>
                {diagnosticQuestions.map((q, idx) => {
                  const isCorrect = selectedAnswers[idx] === q.correct;
                  return (
                    <div key={idx} className={`p-4 rounded-2xl border text-xs space-y-2 ${isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1C1917]">Question {idx + 1}: {q.topic}</span>
                        <span className={`font-bold flex items-center gap-1 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {isCorrect ? '✓ Correct (+25 XP)' : '✗ Incorrect'}
                        </span>
                      </div>
                      <p className="text-[#57534E]">{q.question}</p>
                      <div className="p-2.5 rounded-xl bg-white border border-[#E7E5E4] text-[#1C1917]">
                        <span className="font-bold text-[#C2410C]">Explanation: </span>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#78716C]">
                  Your calibrated score has been saved to your CareerKinetic student ledger.
                </span>
                <button
                  onClick={() => onNavigate('learn', 'roadmaps')}
                  className="px-6 py-2.5 rounded-xl bg-[#C2410C] text-white text-xs font-bold hover:bg-[#9A3412] transition"
                >
                  View Recommended Roadmaps for Weak Areas &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: AI MOCK INTERVIEW SIMULATOR */}
      {activeSubtab === 'mock' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E7E5E4] gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#FFEDD5] text-[#9A3412] border border-[#FED7AA] text-xs font-bold flex items-center gap-1.5 w-fit mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
                Voice &amp; Code Interview Simulator
              </span>
              <h2 className="font-editorial text-2xl font-bold text-[#1C1917]">
                AI Technical &amp; Behavioral Mock Rounds
              </h2>
              <p className="text-xs text-[#57534E]">
                Get real-time critique on optimal time complexities, architectural trade-offs, and communication fluency.
              </p>
            </div>

            {/* Track Selector */}
            <div className="flex items-center gap-2">
              {[
                { id: 'sde_dsa', label: 'DSA & Logic' },
                { id: 'system_design', label: 'System Design' },
                { id: 'hr_behavioral', label: 'HR / STAR' }
              ].map(track => (
                <button
                  key={track.id}
                  onClick={() => { setInterviewRole(track.id); setInterviewStep(0); setCandidateResponse(''); setInterviewFeedback(null); }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                    interviewRole === track.id
                      ? 'bg-[#C2410C] text-white border-[#C2410C]'
                      : 'bg-[#FAF6EE] text-[#57534E] border-[#E7E5E4] hover:bg-white'
                  }`}
                >
                  {track.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interviewer Prompt Box */}
          <div className="p-6 rounded-2xl bg-[#FAF6EE] border border-[#E7E5E4] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#C2410C] text-white font-editorial font-bold flex items-center justify-center text-xs">
                  AI
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1C1917]">{mockQuestions[interviewRole].interviewer}</div>
                  <div className="text-[10px] text-[#78716C]">CareerKinetic AI Technical Panelist</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-emerald-700 border border-[#E7E5E4] font-mono">
                Round 1
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#1C1917] font-medium leading-relaxed bg-white p-4 rounded-xl border border-[#E7E5E4]">
              &ldquo;{mockQuestions[interviewRole].prompt}&rdquo;
            </p>

            <div className="flex items-center justify-between text-[11px] text-[#78716C] pt-1">
              <span>Rubric expectations: Optimal Complexity &bull; Clean Variable Semantics &bull; Edge Cases</span>
              <button
                onClick={handleSimulateVoice}
                className="text-[#C2410C] hover:underline font-bold flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate Spoken Candidate Answer</span>
              </button>
            </div>
          </div>

          {/* Candidate Response Workspace */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1C1917]">Your Technical Response:</label>
              <span className="text-[11px] text-[#78716C]">Type your explanation or pseudocode</span>
            </div>

            <textarea
              rows={5}
              value={candidateResponse}
              onChange={(e) => setCandidateResponse(e.target.value)}
              placeholder="State your approach, time complexity O(...), auxiliary space O(...), and edge cases..."
              className="w-full p-4 rounded-xl border border-[#D6D3D1] bg-[#FDFBF7] text-xs text-[#1C1917] font-mono leading-relaxed focus:outline-none focus:border-[#C2410C] resize-none"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs text-[#78716C]">
                {isSimulatingVoice ? (
                  <span className="text-[#C2410C] font-bold flex items-center gap-1.5 animate-pulse">
                    <Mic className="w-3.5 h-3.5" /> Transcribing speech from microphone...
                  </span>
                ) : (
                  <span>Ready to submit for multi-dimensional evaluation</span>
                )}
              </div>

              <button
                disabled={!candidateResponse.trim() || interviewStep === 1}
                onClick={handleSubmitInterviewResponse}
                className="px-6 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-md disabled:opacity-50 transition flex items-center gap-2"
              >
                {interviewStep === 1 ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Evaluating Response...</span>
                  </>
                ) : (
                  <>
                    <span>Submit to AI Panel</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI FEEDBACK CRITIQUE CARD */}
          {interviewStep === 2 && interviewFeedback && (
            <div className="p-6 rounded-2xl bg-[#ECFDF5]/50 border border-[#A7F3D0] space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#A7F3D0]/60 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-editorial text-lg font-bold flex items-center justify-center">
                    {interviewFeedback.score}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#1C1917]">Interviewer Evaluation: Strong Clear Recommendation</div>
                    <div className="text-[11px] text-[#065F46]">Exceeds hiring bar for tier-1 SDE-1 recruitment</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold text-[#1C1917]">
                  <span>DSA Logic: <strong>{interviewFeedback.rubric.problemSolving}</strong></span>
                  <span>&bull;</span>
                  <span>Complexity: <strong>{interviewFeedback.rubric.codeComplexity}</strong></span>
                  <span>&bull;</span>
                  <span>Fluency: <strong>{interviewFeedback.rubric.communication}</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Key Strengths Observed:
                  </div>
                  {interviewFeedback.strengths.map((str, sIdx) => (
                    <div key={sIdx} className="text-[#065F46] flex items-start gap-1.5 leading-snug">
                      <span className="text-emerald-600 font-bold">&bull;</span>
                      <span>{str}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    Recommended Adjustments for Top 1%:
                  </div>
                  {interviewFeedback.improvements.map((imp, iIdx) => (
                    <div key={iIdx} className="text-[#92400E] flex items-start gap-1.5 leading-snug">
                      <span className="text-amber-600 font-bold">&bull;</span>
                      <span>{imp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#A7F3D0]/60 flex items-center justify-between text-xs">
                <span className="text-[#065F46] font-medium">+30 Practice Points Added to Student Portfolio</span>
                <button
                  onClick={() => { setInterviewStep(0); setCandidateResponse(''); setInterviewFeedback(null); }}
                  className="px-4 py-1.5 rounded-lg bg-white border border-[#A7F3D0] text-[#065F46] font-bold hover:bg-emerald-50 transition"
                >
                  Try Another Question
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: DOMAIN DISCOVERY TOOL */}
      {activeSubtab === 'discovery' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] shadow-xs space-y-6">
          <div className="border-b border-[#E7E5E4] pb-4">
            <span className="px-3 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] text-xs font-bold flex items-center gap-1.5 w-fit mb-2">
              <Search className="w-3.5 h-3.5 text-[#B45309]" />
              Engineering Aptitude Calibration
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#1C1917]">
              Domain Discovery Calibration Tool
            </h2>
            <p className="text-xs text-[#57534E]">
              Answer 3 psychometric and problem-solving scenarios to discover your natural engineering alignment.
            </p>
          </div>

          {!discoveryResult ? (
            <div className="space-y-6">
              {discoveryQuestions.map((q) => (
                <div key={q.id} className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E7E5E4] space-y-3">
                  <div className="font-bold text-xs text-[#1C1917] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#C2410C] text-white flex items-center justify-center text-[10px]">
                      {q.id}
                    </span>
                    <span>{q.text}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectDiscovery(q.id, opt.domain)}
                        className={`p-3 rounded-xl border text-left text-xs transition ${
                          discoveryAnswers[q.id] === opt.domain
                            ? 'bg-[#FFEDD5] border-[#C2410C] text-[#1C1917] font-semibold'
                            : 'bg-white border-[#E7E5E4] text-[#57534E] hover:border-[#C2410C]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-2 flex justify-end">
                <button
                  disabled={Object.keys(discoveryAnswers).length < discoveryQuestions.length}
                  onClick={handleCalculateDiscovery}
                  className="px-6 py-3 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold disabled:opacity-40 transition shadow-sm"
                >
                  Calculate My Ideal Engineering Track &rarr;
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#FAF6EE] border-2 border-[#C2410C]/40 space-y-5 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E5E4] gap-2">
                <div>
                  <span className="text-[10px] font-bold text-[#C2410C] uppercase tracking-wider">Calibration Result</span>
                  <h3 className="font-editorial text-3xl font-bold text-[#1C1917]">{discoveryResult.title}</h3>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold self-start sm:self-auto">
                  {discoveryResult.fit}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                {discoveryResult.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-[#E7E5E4]">
                  <span className="text-[10px] font-bold text-[#78716C] uppercase">Starting Salary Benchmark:</span>
                  <div className="text-sm font-bold text-emerald-800 font-mono mt-0.5">{discoveryResult.startingCTC}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#E7E5E4]">
                  <span className="text-[10px] font-bold text-[#78716C] uppercase">Top Hiring Recruiters:</span>
                  <div className="text-xs font-bold text-[#1C1917] mt-0.5">{discoveryResult.targetCompanies}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between">
                <button
                  onClick={() => setDiscoveryResult(null)}
                  className="text-xs text-[#78716C] hover:underline"
                >
                  Retake Aptitude Assessment
                </button>

                <button
                  onClick={() => onNavigate('learn', 'roadmaps')}
                  className="px-5 py-2.5 rounded-xl bg-[#C2410C] text-white text-xs font-bold hover:bg-[#9A3412] transition flex items-center gap-1.5"
                >
                  <span>Open {discoveryResult.title} Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
