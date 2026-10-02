import React, { useState } from 'react';
import { 
  BookOpen, Target, GraduationCap, Zap, MapPin, ChevronRight, 
  CheckCircle2, Clock, Star, ArrowRight, Sparkles, Filter, ExternalLink,
  Layers, Code2, Cpu, Database, Shield, Flame, Scale
} from 'lucide-react';

export default function LearnPage({ initialSubtab = 'roadmaps', onNavigate }) {
  const [activeSubtab, setActiveSubtab] = useState(initialSubtab); // 'roadmaps' | 'free' | 'bootcamps' | 'coaching' | 'compare'
  const [selectedRoadmap, setSelectedRoadmap] = useState('fullstack');
  const [compareRole1, setCompareRole1] = useState('sde');
  const [compareRole2, setCompareRole2] = useState('ai_engineer');

  // Roadmaps Data
  const roadmaps = {
    fullstack: {
      title: 'Full-Stack Modern Engineering',
      tagline: 'From TypeScript fundamentals to production microservices and cloud deployment',
      salary: '₹8 - 22 LPA',
      duration: '16 Weeks',
      demand: 'High (45% of campus drives)',
      stages: [
        {
          phase: 'Phase 1: Foundations (Weeks 1-4)',
          skills: ['Modern JavaScript (ES6+)', 'TypeScript Types & Generics', 'DOM & Async Patterns', 'Git & CI/CD basics'],
          project: 'CLI Tool & Responsive Dashboard with Tailwind'
        },
        {
          phase: 'Phase 2: Modern Frontend (Weeks 5-8)',
          skills: ['React 19 & Next.js App Router', 'State Management (Zustand/TanStack Query)', 'Component Architecture', 'Performance Profiling'],
          project: 'Collaborative Real-Time Kanban Board'
        },
        {
          phase: 'Phase 3: Scalable Backend (Weeks 9-12)',
          skills: ['Node.js & Express / NestJS', 'PostgreSQL & Prisma ORM', 'Redis Caching & Pub/Sub', 'JWT & OAuth Authentication'],
          project: 'E-Commerce Microservice with Payment Gateway'
        },
        {
          phase: 'Phase 4: Cloud & Deployment (Weeks 13-16)',
          skills: ['Docker & Containerization', 'AWS (S3, ECS, RDS)', 'GitHub Actions Workflows', 'System Design Interview Prep'],
          project: 'Production SaaS with Monitoring & SLA Metrics'
        }
      ]
    },
    ai_ml: {
      title: 'Applied Generative AI & ML Engineer',
      tagline: 'Practical machine learning, LLM fine-tuning, RAG pipelines, and agent orchestration',
      salary: '₹12 - 32 LPA',
      duration: '18 Weeks',
      demand: 'Exponential (+180% year-on-year)',
      stages: [
        {
          phase: 'Phase 1: Math & Data Foundations (Weeks 1-4)',
          skills: ['Linear Algebra & Multivariate Calculus', 'NumPy, Pandas, Vectorized Ops', 'Feature Engineering & Data Cleaning', 'Statistical Hypothesis Testing'],
          project: 'Predictive Churn Model with Exploratory EDA'
        },
        {
          phase: 'Phase 2: Classical & Deep Learning (Weeks 5-9)',
          skills: ['Scikit-Learn Regression & Trees', 'PyTorch Tensors & Custom Layers', 'CNNs for Computer Vision', 'RNNs & Transformer Architectures'],
          project: 'Custom Object Detection & Classification System'
        },
        {
          phase: 'Phase 3: LLMs & Modern RAG (Weeks 10-14)',
          skills: ['LangChain & LlamaIndex', 'Vector Databases (Pinecone, Chroma)', 'RAG Pipelines with Hybrid Search', 'Prompt Engineering & Few-shot Evals'],
          project: 'Enterprise Legal Knowledge Base Q&A with Citations'
        },
        {
          phase: 'Phase 4: Autonomous Agents & Deployment (Weeks 15-18)',
          skills: ['Agent Tool Calling & Workflows', 'Quantization (LoRA, QLoRA)', 'FastAPI Model Serving & vLLM', 'Production ML Monitoring'],
          project: 'Multi-Agent Research Assistant with Live Web Search'
        }
      ]
    },
    cloud_devops: {
      title: 'Cloud Native & DevOps Architect',
      tagline: 'Automate infrastructure, Kubernetes orchestration, and zero-downtime CI/CD',
      salary: '₹9 - 24 LPA',
      duration: '14 Weeks',
      demand: 'Very High (Crucial for mid & large tech)',
      stages: [
        {
          phase: 'Phase 1: Linux & Scripting (Weeks 1-3)',
          skills: ['Linux Kernel & Bash Scripting', 'Networking (DNS, TCP/UDP, CIDR)', 'Git Branching & Release Tags', 'Python for System Automation'],
          project: 'Automated Server Health & Audit Script'
        },
        {
          phase: 'Phase 2: Containers & Orchestration (Weeks 4-7)',
          skills: ['Docker Multi-stage Builds', 'Docker Compose Architecture', 'Kubernetes Pods, Services, Ingress', 'Helm Chart Package Management'],
          project: 'High-Availability Multi-Tier Web App on K8s'
        },
        {
          phase: 'Phase 3: Infrastructure as Code (Weeks 8-11)',
          skills: ['Terraform Modular Architecture', 'AWS/GCP Cloud Architecture', 'State Locking & Remote Backends', 'Secret Management (Vault)'],
          project: 'Multi-Region Cloud VPC & EKS Cluster via Terraform'
        },
        {
          phase: 'Phase 4: CI/CD & Observability (Weeks 12-14)',
          skills: ['GitHub Actions & ArgoCD (GitOps)', 'Prometheus Metrics & Grafana Dashboards', 'OpenTelemetry Tracing', 'Chaos Engineering Fundamentals'],
          project: 'Automated Canary Deployment Pipeline with Rollback'
        }
      ]
    }
  };

  // Free Foundation Courses
  const freeCourses = [
    {
      id: 1,
      title: 'Data Structures & Algorithms in C++ & Java',
      instructor: 'Prof. Raghav Verma (Ex-Amazon SDE II)',
      duration: '42 Hours • 118 Lessons',
      enrolled: '14,290 Students',
      rating: 4.9,
      badge: 'Bestseller',
      cover: 'https://images.unsplash.com/photo-1516116211227-bbc0623a6341?w=500&auto=format&fit=crop&q=80',
      topics: ['Arrays, Strings & 2-Pointers', 'Linked Lists & Stacks', 'Trees, BST & AVL', 'Graph BFS/DFS & Dijkstra', 'Dynamic Programming 1D/2D']
    },
    {
      id: 2,
      title: 'System Design Primer for College Graduates',
      instructor: 'Dr. Anya Sharma (Principal Architect)',
      duration: '18 Hours • 45 Lessons',
      enrolled: '9,840 Students',
      rating: 4.8,
      badge: 'High Value',
      cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80',
      topics: ['Load Balancers & Horizontal Scaling', 'Database Sharding & Replication', 'Caching Strategies with Redis', 'Message Queues (Kafka/RabbitMQ)', 'Designing URL Shortener & WhatsApp']
    },
    {
      id: 3,
      title: 'Operating Systems & DBMS Core Fundamentals',
      instructor: 'Vikramaditya Bose (IIT Kharagpur Alum)',
      duration: '26 Hours • 62 Lessons',
      enrolled: '11,400 Students',
      rating: 4.9,
      badge: 'Campus Placement Favorite',
      cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80',
      topics: ['Process Synchronization & Deadlocks', 'Virtual Memory & Paging', 'SQL Normalization (1NF to BCNF)', 'ACID Transactions & Concurrency', 'Indexing (B+ Trees & Hash)']
    }
  ];

  // Bootcamps & Cohorts
  const bootcamps = [
    {
      id: 1,
      title: 'CareerKinetic SDE Fellowship (Cohort 8)',
      timeline: 'Starts Oct 15, 2026 • 24 Weeks',
      mode: 'Live Classes (Sat/Sun) + Daily AI Labs',
      stats: '94% Placement Rate • Average CTC ₹14.8 LPA',
      features: ['1:1 Senior FAANG Mentor', 'Live Mock Interviews with Written Reports', 'Guaranteed Interview Referrals', 'Capstones Reviewed by Tech Leads'],
      scholarship: 'Up to 100% Merit Scholarship via Diagnostic Lab score'
    },
    {
      id: 2,
      title: 'Applied Generative AI & Autonomous Agents',
      timeline: 'Starts Nov 2, 2026 • 12 Weeks',
      mode: 'Live Weekend Sessions + Hackathon Sprints',
      stats: 'Highest Domestic Offer: ₹34 LPA',
      features: ['Build & Deploy 4 Real-World Agent Apps', 'Sponsor Cloud GPU Credits Included', 'Direct Hiring Days with AI Startups', 'Research Paper Deep Dives'],
      scholarship: 'Top 5 rankers in Diagnostic Lab receive full fellowship'
    }
  ];

  // Coaching Centres Directory
  const coachingCentres = [
    {
      name: 'Noida Code Academy',
      location: 'Sector 62, Noida (Near Metro Station)',
      type: 'Offline / Hybrid Classroom',
      rating: 4.8,
      reviews: 420,
      specialty: 'DSA in C++, Java Backend, Full-Stack MERN',
      perk: '15% Discount with CareerKinetic Student ID'
    },
    {
      name: 'Knowledge Park Tech Studio',
      location: 'Knowledge Park III, Greater Noida',
      type: 'Physical Labs with Gigabit Fiber',
      rating: 4.9,
      reviews: 512,
      specialty: 'System Design, GATE CS Prep, PSU Tech Written',
      perk: 'Free 2-Week Trial Lab Pass for GL Bajaj / Galgotias Students'
    },
    {
      name: 'Bangalore Cloud Engineers Hub',
      location: 'Koramangala 4th Block, Bengaluru',
      type: 'Interactive Weekend Bootcamp',
      rating: 4.9,
      reviews: 890,
      specialty: 'AWS DevOps, Kubernetes Production Labs, Terraform',
      perk: 'CareerKinetic verified students get free AWS certification voucher'
    }
  ];

  // Role Comparison Data
  const comparisonRoles = {
    sde: {
      title: 'Software Development Engineer (SDE-1)',
      entrySalary: '₹8 - 18 LPA',
      midSalary: '₹22 - 38 LPA (3-5 Years)',
      barrier: 'Medium-High (Heavy DSA + OOPs + DBMS)',
      dayInLife: 'Writing REST APIs, optimizing DB queries, writing unit tests, reviewing pull requests.',
      hiringVolume: 'Very High (Largest campus intake)',
      mustSkills: ['Data Structures & Algorithms', 'System Architecture Intuition', 'Java/C++/TypeScript', 'SQL & Caching']
    },
    ai_engineer: {
      title: 'Generative AI & ML Engineer',
      entrySalary: '₹12 - 24 LPA',
      midSalary: '₹30 - 55 LPA (3-5 Years)',
      barrier: 'High (Math + Python + Vector DBs + LLM Evals)',
      dayInLife: 'Building RAG pipelines, fine-tuning open-source models, prompt evaluations, agent tool integration.',
      hiringVolume: 'High & Fastest Growing (+180%)',
      mustSkills: ['Python, PyTorch', 'LangChain / LlamaIndex', 'Vector Databases & Embeddings', 'FastAPI & Docker']
    },
    devops: {
      title: 'Cloud & DevOps Engineer',
      entrySalary: '₹7 - 16 LPA',
      midSalary: '₹20 - 36 LPA (3-5 Years)',
      barrier: 'Medium (Linux + Networking + Cloud Automation)',
      dayInLife: 'Managing Kubernetes clusters, debugging CI/CD pipeline failures, writing Terraform IAC, security audits.',
      hiringVolume: 'High (Every tech team requires DevOps)',
      mustSkills: ['Docker & Kubernetes', 'AWS / GCP Architecture', 'CI/CD (GitHub Actions)', 'Terraform & Linux']
    },
    data_analyst: {
      title: 'Data & BI Analyst',
      entrySalary: '₹6 - 12 LPA',
      midSalary: '₹14 - 24 LPA (3-5 Years)',
      barrier: 'Low-Medium (SQL + Statistics + Dashboards)',
      dayInLife: 'Querying data warehouses, building executive dashboards, cohort analysis, hypothesis testing.',
      hiringVolume: 'Medium-High',
      mustSkills: ['Advanced SQL & Window Functions', 'Python / R Data Manipulation', 'Tableau / PowerBI', 'Statistical Inference']
    }
  };

  const role1 = comparisonRoles[compareRole1];
  const role2 = comparisonRoles[compareRole2];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#FFEDD5] text-[#9A3412] border border-[#FED7AA] text-xs font-bold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#C2410C]" />
              Pillar 1: Learn
            </span>
            <span className="text-xs text-[#78716C]">Curated Engineering Pedagogy</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1917]">
            Structured Roadmaps &amp; Masterclasses
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1 max-w-xl">
            Everything you need to transform from student to industry-ready engineer. Zero fluff, production projects, and verified milestones.
          </p>
        </div>

        {/* Subtab Pill Bar */}
        <div className="flex flex-wrap p-1.5 rounded-2xl bg-white border border-[#E7E5E4] text-xs font-semibold shadow-2xs">
          <button
            onClick={() => setActiveSubtab('roadmaps')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubtab === 'roadmaps' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
          >
            Roadmaps
          </button>
          <button
            onClick={() => setActiveSubtab('free')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubtab === 'free' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
          >
            Free Courses
          </button>
          <button
            onClick={() => setActiveSubtab('bootcamps')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubtab === 'bootcamps' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
          >
            Cohorts
          </button>
          <button
            onClick={() => setActiveSubtab('coaching')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubtab === 'coaching' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
          >
            Coaching Directory
          </button>
          <button
            onClick={() => setActiveSubtab('compare')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 ${activeSubtab === 'compare' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#C2410C] hover:bg-[#FFEDD5]/50'}`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Career Compare</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: ROADMAPS */}
      {activeSubtab === 'roadmaps' && (
        <div className="space-y-6">
          {/* Roadmap Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'fullstack', label: 'Full-Stack Engineering', icon: Code2, desc: 'Web & Cloud' },
              { id: 'ai_ml', label: 'Generative AI & ML', icon: Cpu, desc: 'PyTorch & Agents' },
              { id: 'cloud_devops', label: 'Cloud & DevOps', icon: Database, desc: 'K8s & CI/CD' }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRoadmap(tab.id)}
                  className={`p-4 rounded-2xl border text-left transition flex items-center gap-3.5 ${
                    selectedRoadmap === tab.id
                      ? 'bg-white border-[#C2410C] shadow-sm'
                      : 'bg-[#FAF6EE] border-[#E7E5E4] hover:bg-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    selectedRoadmap === tab.id ? 'bg-[#FFEDD5] text-[#C2410C]' : 'bg-white text-[#78716C]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1C1917]">{tab.label}</div>
                    <div className="text-[11px] text-[#78716C]">{tab.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Roadmap Detailed View */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E7E5E4] gap-4">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-[#1C1917]">
                  {roadmaps[selectedRoadmap].title}
                </h2>
                <p className="text-xs text-[#57534E] mt-0.5">
                  {roadmaps[selectedRoadmap].tagline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                <div className="px-3 py-1.5 rounded-xl bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                  Target CTC: {roadmaps[selectedRoadmap].salary}
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-[#FAF6EE] text-[#57534E] border border-[#E7E5E4]">
                  ⏱ {roadmaps[selectedRoadmap].duration}
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]">
                  📈 {roadmaps[selectedRoadmap].demand}
                </div>
              </div>
            </div>

            {/* Stages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roadmaps[selectedRoadmap].stages.map((stage, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E7E5E4] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider">
                      {stage.phase}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-white border border-[#E7E5E4] text-[11px] font-mono font-bold flex items-center justify-center text-[#78716C]">
                      {idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase text-[#78716C]">Skills to Master:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {stage.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded-md bg-white border border-[#E7E5E4] text-[11px] font-medium text-[#1C1917]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E7E5E4]/80 text-xs">
                    <span className="font-bold text-[#1C1917]">Capstone Project: </span>
                    <span className="text-[#57534E]">{stage.project}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E7E5E4]">
              <span className="text-xs text-[#78716C]">
                Includes code templates, unit test suites, and automated PR review rubrics.
              </span>
              <button 
                onClick={() => onNavigate('practice', 'diagnostic')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition"
              >
                <span>Take Diagnostic to Start Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: FREE FOUNDATION COURSES */}
      {activeSubtab === 'free' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {freeCourses.map(course => (
              <div key={course.id} className="bg-white rounded-3xl overflow-hidden border border-[#E7E5E4] shadow-xs flex flex-col justify-between group hover:border-[#C2410C] transition">
                <div>
                  <div className="relative h-44 overflow-hidden bg-stone-200">
                    <img 
                      src={course.cover} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                      {course.badge}
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white text-[#C2410C] text-[10px] font-bold font-mono">
                      100% Free
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#78716C]">
                      <span>{course.duration}</span>
                      <span className="flex items-center gap-1 font-bold text-amber-700">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {course.rating} ({course.enrolled})
                      </span>
                    </div>

                    <h3 className="font-editorial text-lg font-bold text-[#1C1917] leading-snug group-hover:text-[#C2410C] transition">
                      {course.title}
                    </h3>
                    
                    <p className="text-xs text-[#57534E]">
                      {course.instructor}
                    </p>

                    <div className="pt-2 border-t border-[#F5F0E6] space-y-1">
                      <div className="text-[10px] font-bold text-[#78716C] uppercase">Curriculum Highlights:</div>
                      {course.topics.slice(0, 3).map((topic, tIdx) => (
                        <div key={tIdx} className="text-xs text-[#57534E] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button 
                    onClick={() => onNavigate('home')}
                    className="w-full py-2.5 rounded-xl bg-[#FAF6EE] hover:bg-[#FFEDD5] text-[#C2410C] border border-[#E7E5E4] text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Start Free Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: BOOTCAMPS & COHORTS */}
      {activeSubtab === 'bootcamps' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bootcamps.map(boot => (
              <div key={boot.id} className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E5E4] shadow-xs space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] text-xs font-bold">
                      {boot.stats}
                    </span>
                    <span className="text-xs text-[#78716C] font-medium">{boot.timeline}</span>
                  </div>

                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-[#1C1917]">
                      {boot.title}
                    </h3>
                    <p className="text-xs text-[#57534E] mt-1">{boot.mode}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#F5F0E6]">
                    <div className="text-xs font-bold text-[#1C1917]">Program Inclusions:</div>
                    {boot.features.map((feat, fIdx) => (
                      <div key={fIdx} className="text-xs text-[#57534E] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C2410C] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4] text-xs text-[#78716C]">
                    <span className="font-bold text-[#C2410C]">Scholarship Alert: </span>
                    {boot.scholarship}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7E5E4] flex items-center gap-3">
                  <button 
                    onClick={() => onNavigate('practice', 'diagnostic')}
                    className="flex-1 py-3 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold transition shadow-xs text-center"
                  >
                    Take Scholarship Test
                  </button>
                  <button 
                    onClick={() => onNavigate('community', 'feed')}
                    className="px-4 py-3 rounded-xl bg-white hover:bg-[#FAF6EE] border border-[#E7E5E4] text-xs font-bold text-[#1C1917] transition"
                  >
                    Ask Alumni
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: COACHING CENTRES DIRECTORY */}
      {activeSubtab === 'coaching' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-center justify-between">
            <span>📍 Showing verified training hubs near Greater Noida, Noida &amp; NCR. Present your CareerKinetic student card for exclusive fee waivers.</span>
            <span className="font-bold underline cursor-pointer">Submit New Center</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coachingCentres.map((centre, cIdx) => (
              <div key={cIdx} className="bg-white rounded-3xl p-5 border border-[#E7E5E4] shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C2410C] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {centre.location}
                    </span>
                    <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {centre.rating} ({centre.reviews})
                    </span>
                  </div>

                  <h3 className="font-editorial text-lg font-bold text-[#1C1917]">
                    {centre.name}
                  </h3>
                  
                  <div className="text-xs text-[#57534E]">
                    <span className="font-semibold text-[#1C1917]">Focus: </span>
                    {centre.specialty}
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FAF6EE] text-[11px] font-semibold text-[#9A3412] border border-[#FED7AA]">
                    🎁 {centre.perk}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E7E5E4]">
                  <button className="w-full py-2 rounded-xl bg-[#FAF6EE] hover:bg-[#F5F0E6] text-[#1C1917] border border-[#E7E5E4] text-xs font-bold transition flex items-center justify-center gap-1.5">
                    <span>Claim Student Pass</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#78716C]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 5: CARDEKHO CAREER COMPARE TOOL */}
      {activeSubtab === 'compare' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] shadow-xs space-y-6">
          <div className="border-b border-[#E7E5E4] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#FFEDD5] text-[#9A3412] border border-[#FED7AA] text-xs font-bold flex items-center gap-1.5 w-fit mb-2">
                <Scale className="w-3.5 h-3.5 text-[#C2410C]" />
                Interactive Career Compare
              </span>
              <h2 className="font-editorial text-2xl font-bold text-[#1C1917]">
                Compare Engineering Roles Side-by-Side
              </h2>
              <p className="text-xs text-[#57534E]">
                Objectively analyze salaries, interview difficulty, and 3-year growth before locking your placement focus.
              </p>
            </div>

            {/* Selectors */}
            <div className="flex items-center gap-3">
              <div>
                <label className="block text-[10px] font-bold text-[#78716C] uppercase mb-1">Role 1:</label>
                <select 
                  value={compareRole1} 
                  onChange={(e) => setCompareRole1(e.target.value)}
                  className="p-2 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4] text-xs font-bold text-[#1C1917] focus:outline-none"
                >
                  <option value="sde">Software Engineer (SDE-1)</option>
                  <option value="ai_engineer">AI &amp; ML Engineer</option>
                  <option value="devops">Cloud &amp; DevOps</option>
                  <option value="data_analyst">Data &amp; BI Analyst</option>
                </select>
              </div>

              <span className="font-bold text-[#C2410C] mt-4">VS</span>

              <div>
                <label className="block text-[10px] font-bold text-[#78716C] uppercase mb-1">Role 2:</label>
                <select 
                  value={compareRole2} 
                  onChange={(e) => setCompareRole2(e.target.value)}
                  className="p-2 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4] text-xs font-bold text-[#1C1917] focus:outline-none"
                >
                  <option value="ai_engineer">AI &amp; ML Engineer</option>
                  <option value="sde">Software Engineer (SDE-1)</option>
                  <option value="devops">Cloud &amp; DevOps</option>
                  <option value="data_analyst">Data &amp; BI Analyst</option>
                </select>
              </div>
            </div>
          </div>

          {/* Comparison Table Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Column 1: Role 1 */}
            <div className="p-6 rounded-2xl bg-[#FAF6EE] border-2 border-[#C2410C]/30 space-y-5">
              <div className="border-b border-[#E7E5E4] pb-3">
                <span className="text-[10px] font-bold text-[#C2410C] uppercase tracking-wider">Candidate Profile A</span>
                <h3 className="font-editorial text-2xl font-bold text-[#1C1917]">{role1.title}</h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-[10px] font-bold text-[#78716C] uppercase">Starting Fresher CTC:</div>
                  <div className="text-base font-bold text-emerald-800 font-mono">{role1.entrySalary}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-[#78716C] uppercase">3-5 Year CTC Projection:</div>
                  <div className="text-sm font-bold text-[#1C1917] font-mono">{role1.midSalary}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-[#78716C] uppercase">Placement Difficulty:</div>
                  <div className="font-semibold text-[#1C1917]">{role1.barrier}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-[#78716C] uppercase">Hiring Frequency in College Drives:</div>
                  <div className="font-semibold text-[#1C1917]">{role1.hiringVolume}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-[#78716C] uppercase">Day in the Life:</div>
                  <p className="text-[#57534E] leading-relaxed">{role1.dayInLife}</p>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-[#78716C] uppercase mb-1.5">Non-Negotiable Skills:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {role1.mustSkills.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-[#E7E5E4] text-[11px] font-semibold text-[#1C1917]">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('practice', 'discovery')}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-[#FFEDD5] text-[#C2410C] border border-[#C2410C]/40 text-xs font-bold transition text-center"
              >
                Assess Fit for {role1.title.split(' ')[0]}
              </button>
            </div>

            {/* Column 2: Role 2 */}
            <div className="p-6 rounded-2xl bg-[#FAF6EE] border-2 border-stone-300 space-y-5">
              <div className="border-b border-[#E7E5E4] pb-3">
                <span className="text-[10px] font-bold text-[#78716C] uppercase tracking-wider">Candidate Profile B</span>
                <h3 className="font-editorial text-2xl font-bold text-[#1C1917]">{role2.title}</h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-[10px] font-bold text-[#78716C] uppercase">Starting Fresher CTC:</div>
                  <div className="text-base font-bold text-emerald-800 font-mono">{role2.entrySalary}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-[#78716C] uppercase">3-5 Year CTC Projection:</div>
                  <div className="text-sm font-bold text-[#1C1917] font-mono">{role2.midSalary}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-[#78716C] uppercase">Placement Difficulty:</div>
                  <div className="font-semibold text-[#1C1917]">{role2.barrier}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-[#78716C] uppercase">Hiring Frequency in College Drives:</div>
                  <div className="font-semibold text-[#1C1917]">{role2.hiringVolume}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-[#78716C] uppercase">Day in the Life:</div>
                  <p className="text-[#57534E] leading-relaxed">{role2.dayInLife}</p>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-[#78716C] uppercase mb-1.5">Non-Negotiable Skills:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {role2.mustSkills.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-[#E7E5E4] text-[11px] font-semibold text-[#1C1917]">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('practice', 'discovery')}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-stone-200 text-[#1C1917] border border-stone-300 text-xs font-bold transition text-center"
              >
                Assess Fit for {role2.title.split(' ')[0]}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
