import React, { useState } from 'react';
import { 
  Briefcase, ShieldCheck, Award, MapPin, Building2, ExternalLink,
  Search, Filter, CheckCircle2, Clock, Calendar, Users, DollarSign,
  ArrowRight, Sparkles, AlertCircle, FileText, Check
} from 'lucide-react';

export default function OpportunitiesPage({ initialSubtab = 'private', onNavigate }) {
  const [activeSubtab, setActiveSubtab] = useState(initialSubtab); // 'private' | 'govt' | 'contests'
  const [appliedJobs, setAppliedJobs] = useState({});
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterBatch, setFilterBatch] = useState('all');
  const [alertSubscribed, setAlertSubscribed] = useState(false);

  // Private Tech Openings
  const privateJobs = [
    {
      id: 1,
      company: 'Razorpay',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
      title: 'Associate Software Engineer (Backend)',
      location: 'Bengaluru / Hybrid',
      batch: '2026 Batch',
      salary: '₹18 - 22 LPA',
      skills: ['Go / Node.js', 'PostgreSQL', 'Redis', 'Kafka'],
      match: '94% Profile Match',
      type: 'Full-Time',
      posted: '2 days ago'
    },
    {
      id: 2,
      company: 'Swiggy',
      logo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=100&auto=format&fit=crop&q=80',
      title: 'Software Development Engineer - 1 (Frontend)',
      location: 'Bengaluru / Remote',
      batch: '2025 & 2026 Batch',
      salary: '₹16 - 20 LPA',
      skills: ['React 19', 'TypeScript', 'Next.js', 'Web Vitals'],
      match: '88% Profile Match',
      type: 'Full-Time',
      posted: 'Yesterday'
    },
    {
      id: 3,
      company: 'Cred',
      logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&auto=format&fit=crop&q=80',
      title: 'AI Platform Engineering Intern',
      location: 'Bengaluru / In-Office',
      batch: '2026 Batch',
      salary: '₹1,00,000 / month (PPO: ₹28 LPA)',
      skills: ['Python', 'PyTorch', 'Vector DBs', 'FastAPI'],
      match: '91% Profile Match',
      type: '6-Month Internship',
      posted: 'Just now'
    },
    {
      id: 4,
      company: 'Noida FinTech Labs',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
      title: 'Junior Cloud & DevOps Engineer',
      location: 'Noida (Sector 126)',
      batch: '2025 & 2026 Batch',
      salary: '₹10 - 14 LPA',
      skills: ['Docker', 'AWS', 'Kubernetes', 'CI/CD'],
      match: '82% Profile Match',
      type: 'Full-Time',
      posted: '3 days ago'
    }
  ];

  // Government & PSU Tech Exams
  const govtExams = [
    {
      id: 1,
      agency: 'National Informatics Centre (NIC / MeitY)',
      role: 'Scientist B (Computer Science & Information Technology)',
      vacancies: '180 Openings',
      examDate: 'December 14, 2026',
      eligibility: 'B.E. / B.Tech (CSE, IT, ECE) or MCA with 60%+',
      salaryScale: 'Level 10 (₹56,100 - ₹1,77,500 + HRA/DA)',
      status: 'Notification Released • Applications Closing Soon',
      syllabus: 'Discrete Math, Computer Architecture, Data Structures, Algorithms, OS, DBMS, Networks, Cyber Law'
    },
    {
      id: 2,
      agency: 'Indian Space Research Organisation (ISRO / SAC)',
      role: 'Scientist / Engineer &apos;SC&apos; (Computer Science)',
      vacancies: '42 Openings',
      examDate: 'January 25, 2027',
      eligibility: 'B.Tech CSE with minimum 68.4% or 7.14 CGPA',
      salaryScale: 'Level 10 (Starting gross ~ ₹92,000 / month)',
      status: 'Admit Cards to be released',
      syllabus: 'Core CS (GATE Standard) + Domain Engineering Aptitude'
    },
    {
      id: 3,
      agency: 'Centre for Development of Advanced Computing (C-DAC)',
      role: 'Project Engineer (Distributed Computing & AI)',
      vacancies: '95 Openings',
      examDate: 'November 20, 2026',
      eligibility: 'B.Tech CSE / IT or M.Sc Comp Sci',
      salaryScale: '₹4.5 - ₹7.2 LPA Consolidated + Benefits',
      status: 'Online Application Window Open',
      syllabus: 'C/C++, Linux Kernel, Parallel Processing, REST Microservices'
    }
  ];

  // Hackathons & Competitions
  const hackathons = [
    {
      id: 1,
      title: 'Smart India Hackathon (SIH 2026)',
      organizer: 'Ministry of Education & AICTE',
      deadline: 'October 28, 2026',
      prize: '₹1,00,000 per problem statement',
      mode: '36-Hour National Physical Hackathon',
      tags: ['Smart Automation', 'Heritage & Culture', 'CleanTech', 'Cybersecurity'],
      status: 'College Internal Scrutiny Active'
    },
    {
      id: 2,
      title: 'Flipkart GRiD 7.0 - Software Development Track',
      organizer: 'Flipkart Campus Talent',
      deadline: 'November 10, 2026',
      prize: '₹5,00,000 Pool + Direct PPI for Top Teams',
      mode: 'Online Coding + System Design Presentation',
      tags: ['E-Commerce Scalability', 'High-Throughput Streaming', 'Inventory AI'],
      status: 'Registrations Open'
    },
    {
      id: 3,
      title: 'Google Solution Challenge 2026',
      organizer: 'Google Developer Student Clubs',
      deadline: 'December 15, 2026',
      prize: '$12,000 Top Tier + Global Mentorship',
      mode: 'Global Hybrid Project Submission',
      tags: ['17 UN Sustainable Goals', 'Flutter', 'Firebase', 'Gemini AI'],
      status: 'Team Formation Open'
    }
  ];

  const handleApply = (jobId) => {
    setAppliedJobs(prev => ({ ...prev, [jobId]: true }));
  };

  const filteredJobs = privateJobs.filter(job => {
    if (filterLocation !== 'all' && !job.location.toLowerCase().includes(filterLocation.toLowerCase())) return false;
    if (filterBatch !== 'all' && !job.batch.includes(filterBatch)) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] text-xs font-bold flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#065F46]" />
              Pillar 3: Opportunities
            </span>
            <span className="text-xs text-[#78716C]">Verified Career Openings</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1917]">
            Private Tech Drives &amp; PSU Exams
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1 max-w-xl">
            1-Click apply using your verified CareerKinetic AI Profile. Access exclusive campus referrals and direct PSU notifications.
          </p>
        </div>

        {/* Subtab Pill Bar */}
        <div className="flex flex-wrap p-1.5 rounded-2xl bg-white border border-[#E7E5E4] text-xs font-semibold shadow-2xs">
          <button
            onClick={() => setActiveSubtab('private')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubtab === 'private' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
          >
            Private Tech Jobs ({privateJobs.length})
          </button>
          <button
            onClick={() => setActiveSubtab('govt')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubtab === 'govt' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
          >
            Govt &amp; PSU Exams ({govtExams.length})
          </button>
          <button
            onClick={() => setActiveSubtab('contests')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubtab === 'contests' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
          >
            Hackathons ({hackathons.length})
          </button>
        </div>
      </div>

      {/* SUBTAB 1: PRIVATE TECH JOBS */}
      {activeSubtab === 'private' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl p-4 border border-[#E7E5E4] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold text-[#1C1917] flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#C2410C]" /> Filters:
              </span>

              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="p-2 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4] text-[#1C1917] font-semibold focus:outline-none"
              >
                <option value="all">All Locations</option>
                <option value="bengaluru">Bengaluru</option>
                <option value="noida">Noida / NCR</option>
                <option value="remote">Remote</option>
              </select>

              <select
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                className="p-2 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4] text-[#1C1917] font-semibold focus:outline-none"
              >
                <option value="all">All Batches</option>
                <option value="2026">2026 Batch Eligible</option>
                <option value="2025">2025 Batch Eligible</option>
              </select>
            </div>

            <div className="text-[#78716C] text-[11px]">
              Showing <strong>{filteredJobs.length}</strong> active openings with verified recruiter CTCs
            </div>
          </div>

          {/* Job Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredJobs.map(job => (
              <div 
                key={job.id} 
                className="bg-white rounded-3xl p-6 border border-[#E7E5E4] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#C2410C] transition group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] border border-[#E7E5E4] overflow-hidden flex items-center justify-center p-1 font-bold text-xs">
                        {job.company.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#78716C] uppercase tracking-wider">{job.company}</div>
                        <h3 className="font-editorial text-lg font-bold text-[#1C1917] group-hover:text-[#C2410C] transition">
                          {job.title}
                        </h3>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                      {job.match}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#57534E]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#78716C]" />
                      {job.location}
                    </span>
                    <span>&bull;</span>
                    <span className="font-bold text-emerald-800 font-mono">
                      {job.salary}
                    </span>
                    <span>&bull;</span>
                    <span className="text-[#78716C]">{job.batch}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.skills.map((sk, sIdx) => (
                      <span key={sIdx} className="px-2.5 py-0.5 rounded-lg bg-[#FAF6EE] border border-[#E7E5E4] text-[11px] font-medium text-[#1C1917]">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between">
                  <span className="text-[11px] text-[#78716C]">Posted {job.posted}</span>

                  {appliedJobs[job.id] ? (
                    <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Applied with AI Profile
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(job.id)}
                      className="px-5 py-2 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>1-Click Apply</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: GOVT & PSU EXAMS */}
      {activeSubtab === 'govt' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E5E4] gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] text-xs font-bold flex items-center gap-1.5 w-fit mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1E40AF]" />
                  Central &amp; State Engineering Cadres
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#1C1917]">
                  Public Sector &amp; Scientific Officer Examinations
                </h2>
                <p className="text-xs text-[#57534E]">
                  Direct permanent government appointments for computer science graduates.
                </p>
              </div>

              <button
                onClick={() => setAlertSubscribed(!alertSubscribed)}
                className={`px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                  alertSubscribed
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-[#FAF6EE] text-[#1C1917] border-[#E7E5E4] hover:bg-[#FFEDD5]'
                }`}
              >
                {alertSubscribed ? '✓ Subscribed to PSU Deadlines' : '🔔 Alert Me on New Govt Notifications'}
              </button>
            </div>

            <div className="space-y-5">
              {govtExams.map(exam => (
                <div key={exam.id} className="p-6 rounded-2xl bg-[#FAF6EE] border border-[#E7E5E4] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C2410C]">
                        {exam.agency}
                      </span>
                      <h3 className="font-editorial text-xl font-bold text-[#1C1917]">
                        {exam.role}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white border border-[#E7E5E4] text-xs font-bold text-[#1C1917] self-start sm:self-auto font-mono">
                      {exam.vacancies}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-[#E7E5E4]">
                      <div className="text-[10px] font-bold text-[#78716C] uppercase">Examination Date:</div>
                      <div className="font-bold text-[#1C1917] mt-0.5">{exam.examDate}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#E7E5E4]">
                      <div className="text-[10px] font-bold text-[#78716C] uppercase">Salary Scale:</div>
                      <div className="font-bold text-emerald-800 font-mono mt-0.5">{exam.salaryScale}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#E7E5E4]">
                      <div className="text-[10px] font-bold text-[#78716C] uppercase">Eligibility Criteria:</div>
                      <div className="font-semibold text-[#1C1917] mt-0.5">{exam.eligibility}</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#E7E5E4] text-xs text-[#57534E]">
                    <span className="font-bold text-[#1C1917]">Syllabus Blueprint: </span>
                    {exam.syllabus}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E7E5E4]">
                    <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {exam.status}
                    </span>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onNavigate('practice', 'diagnostic')}
                        className="px-4 py-2 rounded-xl bg-white border border-[#E7E5E4] hover:bg-[#FAF6EE] text-xs font-bold text-[#1C1917] transition"
                      >
                        Practice PSU PYQ Mock
                      </button>
                      <button className="px-4 py-2 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold transition flex items-center gap-1">
                        <span>Official Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: HACKATHONS */}
      {activeSubtab === 'contests' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hackathons.map(hack => (
              <div key={hack.id} className="bg-white rounded-3xl p-6 border border-[#E7E5E4] shadow-xs flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#C2410C] uppercase tracking-wide">{hack.organizer}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                      {hack.status}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-[#1C1917] leading-snug">
                    {hack.title}
                  </h3>

                  <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4] space-y-1">
                    <div className="text-[10px] font-bold text-[#78716C] uppercase">Prize &amp; Recognition:</div>
                    <div className="text-sm font-bold text-emerald-800 font-mono">{hack.prize}</div>
                  </div>

                  <div className="space-y-1 text-xs text-[#57534E]">
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">Deadline:</span>
                      <span className="font-bold text-[#1C1917]">{hack.deadline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">Format:</span>
                      <span>{hack.mode}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {hack.tags.map((tg, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-[#FAF6EE] border border-[#E7E5E4] text-[10px] text-[#78716C]">
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7E5E4] flex items-center gap-2">
                  <button 
                    onClick={() => onNavigate('community', 'braintwin')}
                    className="flex-1 py-2 rounded-xl bg-[#FAF6EE] hover:bg-[#F5F0E6] text-[#1C1917] border border-[#E7E5E4] text-xs font-bold transition text-center"
                  >
                    Find Teammate
                  </button>
                  <button className="flex-1 py-2 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold transition text-center">
                    Register Team
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
