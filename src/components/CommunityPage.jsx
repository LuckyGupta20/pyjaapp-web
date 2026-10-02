import React, { useState } from 'react';
import { 
  Users, MessageSquare, Sparkles, Zap, Heart, Share2, ThumbsUp,
  MessageCircle, Send, CheckCircle2, GitBranch, ExternalLink, Calendar,
  ArrowRight, ShieldCheck, Flame, UserCheck, Code
} from 'lucide-react';

export default function CommunityPage({ initialSubtab = 'feed', onNavigate }) {
  const [activeSubtab, setActiveSubtab] = useState(initialSubtab); // 'feed' | 'snaps' | 'braintwin'
  const [newPostText, setNewPostText] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Placement Experience');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Kunal Singhal',
      college: 'GL Bajaj Institute of Technology, Greater Noida',
      cohort: 'B.Tech CSE &apos;26',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
      time: '2 hours ago',
      category: 'Amazon Interview Exp',
      title: 'Cleared Amazon SDE-1 OA & Technical Round 1: Here is what they actually tested',
      content: 'Do not over-index on crazy hard DP problems. In Round 1, they focused 100% on clean code, edge cases in Two Pointers, and tree traversal intuition. When I explained why an iterative BFS avoids stack overflow risk in large graphs, the interviewer was very impressed. CareerKinetic diagnostic lab covered the exact recurrence tree question!',
      likes: 48,
      liked: false,
      replies: 12
    },
    {
      id: 2,
      author: 'Sneha Chawla',
      college: 'AKTU College of Engineering, Lucknow',
      cohort: 'B.Tech IT &apos;26',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      time: '5 hours ago',
      category: 'Resume Review',
      title: 'Used the 1-Click AI ATS Resume Generator: Score jumped from 61 to 94!',
      content: 'I submitted the exported PDF to our college placement cell coordinator and she confirmed it passes the automated ATS parser cleanly. Make sure you use the verified metrics layout instead of fancy Canva templates with graphics.',
      likes: 35,
      liked: false,
      replies: 7
    }
  ]);

  const [studyInvites, setStudyInvites] = useState({});

  const handleLikePost = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          liked: !p.liked,
          likes: p.liked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: Date.now(),
      author: 'Aryan Sharma',
      college: 'GL Bajaj Institute of Technology, Greater Noida',
      cohort: 'B.Tech CSE &apos;26 (You)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      time: 'Just now',
      category: newPostCategory,
      title: newPostText.slice(0, 60) + (newPostText.length > 60 ? '...' : ''),
      content: newPostText,
      likes: 1,
      liked: true,
      replies: 0
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  // Skill-Snaps
  const skillSnaps = [
    {
      id: 1,
      author: 'Devansh Taneja',
      repo: 'devansh/distributed-rate-limiter',
      title: 'Distributed Token Bucket Rate Limiter in Go',
      desc: 'Benchmarked at 65,000 req/sec using Redis sliding window log and Docker swarm. Verified with automated integration tests.',
      tags: ['Golang', 'Redis', 'High Concurrency', 'Docker'],
      stars: 124,
      verifications: 19
    },
    {
      id: 2,
      author: 'Ananya Roy',
      repo: 'ananya/legal-rag-pipeline',
      title: 'Production Legal Case Search with Hybrid Vector Retrieval',
      desc: 'Combines BM25 keyword matching with ChromaDB embeddings and Gemini 1.5 Flash reranker. Deployed on Cloud Run.',
      tags: ['Python', 'RAG', 'Vector Search', 'FastAPI'],
      stars: 88,
      verifications: 14
    }
  ];

  // Brain Twin Matches
  const brainTwins = [
    {
      id: 1,
      name: 'Rohan Verma',
      college: 'GL Bajaj Institute of Technology, Greater Noida',
      semester: '6th Semester CSE',
      matchScore: '96% Synergistic Match',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      giveSkill: 'Master in DP & Graph Algorithms (95th Percentile)',
      needSkill: 'Wants to learn React 19 & Next.js Backend (Your Core Strength)',
      streak: '12 Days',
      bio: 'Preparing aggressively for Amazon and Atlassian campus OA drives. Looking for a daily 30-min pair coding partner.'
    },
    {
      id: 2,
      name: 'Ishita Bansal',
      college: 'Galgotias College of Engg & Tech, Greater Noida',
      semester: '6th Semester IT',
      matchScore: '92% Synergistic Match',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
      giveSkill: 'System Design & Distributed DBs Expert (91% in Diagnostic)',
      needSkill: 'Wants guidance on Two Pointers & Recursion speed',
      streak: '9 Days',
      bio: 'Final year aspirant. Cleared TCS Digital and currently targeting Morgan Stanley & Swiggy.'
    }
  ];

  const handleSendInvite = (twinId) => {
    setStudyInvites(prev => ({ ...prev, [twinId]: true }));
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] text-xs font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#4F46E5]" />
              Pillar 4: Community
            </span>
            <span className="text-xs text-[#78716C]">Collaborative Engineering Sphere</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1917]">
            Peer Discussions &amp; Brain Twins
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1 max-w-xl">
            Learn with peers, publish verifiable skill-snaps, and find study partners with complementary skill gaps.
          </p>
        </div>

        {/* Subtab Pill Bar */}
        <div className="flex flex-wrap p-1.5 rounded-2xl bg-white border border-[#E7E5E4] text-xs font-semibold shadow-2xs">
          <button
            onClick={() => setActiveSubtab('feed')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubtab === 'feed' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
          >
            Discussions &amp; Q&amp;A
          </button>
          <button
            onClick={() => setActiveSubtab('snaps')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubtab === 'snaps' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#78716C] hover:text-[#1C1917]'}`}
          >
            Skill-Snaps (Proofs)
          </button>
          <button
            onClick={() => setActiveSubtab('braintwin')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 ${activeSubtab === 'braintwin' ? 'bg-[#C2410C] text-white font-bold' : 'text-[#C2410C] hover:bg-[#FFEDD5]/50'}`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Brain Twin Peer Match</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: DISCUSSIONS & Q&A FEED */}
      {activeSubtab === 'feed' && (
        <div className="space-y-6">
          {/* Post Creation Box */}
          <form onSubmit={handleCreatePost} className="bg-white rounded-3xl p-6 border border-[#E7E5E4] shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" 
                alt="Aryan" 
                className="w-10 h-10 rounded-full object-cover border border-[#E7E5E4]"
              />
              <div className="flex-1 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1C1917]">Post to Campus Peer Network</span>
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className="p-1.5 rounded-xl bg-[#FAF6EE] border border-[#E7E5E4] text-[11px] font-semibold text-[#1C1917] focus:outline-none"
                >
                  <option value="Placement Experience">Placement Experience</option>
                  <option value="Doubt / Concept Clarification">Doubt / Concept Clarification</option>
                  <option value="Resume Review">Resume Review</option>
                  <option value="Hackathon Team Finder">Hackathon Team Finder</option>
                </select>
              </div>
            </div>

            <textarea
              rows={3}
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Share an interview experience, ask a conceptual system design question, or seek feedback..."
              className="w-full p-3.5 rounded-2xl border border-[#D6D3D1] bg-[#FDFBF7] text-xs text-[#1C1917] focus:outline-none focus:border-[#C2410C] resize-none leading-relaxed"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#78716C]">
                Visible to students across verified engineering cohorts
              </span>
              <button
                type="submit"
                disabled={!newPostText.trim()}
                className="px-5 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold disabled:opacity-40 transition shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Post</span>
              </button>
            </div>
          </form>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-3xl p-6 border border-[#E7E5E4] shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.avatar} 
                      alt={post.author} 
                      className="w-10 h-10 rounded-full object-cover border border-[#E7E5E4]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#1C1917]">{post.author}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF6EE] text-[#78716C] border border-[#E7E5E4]">
                          {post.cohort}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#78716C]">{post.college} &bull; {post.time}</div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FFEDD5] text-[#9A3412] border border-[#FED7AA]">
                    {post.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-editorial text-lg font-bold text-[#1C1917] leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {post.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F5F0E6] flex items-center justify-between text-xs text-[#78716C]">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleLikePost(post.id)}
                      className={`flex items-center gap-1.5 font-semibold transition ${post.liked ? 'text-[#C2410C]' : 'hover:text-[#1C1917]'}`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${post.liked ? 'fill-[#C2410C]' : ''}`} />
                      <span>{post.likes} Helpful</span>
                    </button>

                    <button className="flex items-center gap-1.5 hover:text-[#1C1917] font-semibold transition">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.replies} Replies</span>
                    </button>
                  </div>

                  <button className="flex items-center gap-1 hover:text-[#1C1917] transition">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: SKILL-SNAPS (MICRO-PROOFS) */}
      {activeSubtab === 'snaps' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs text-[#065F46] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#065F46]" />
              <strong>Proof-of-Work Protocol:</strong> Every skill-snap is backed by public git commit histories and code test runs.
            </span>
            <button className="font-bold underline cursor-pointer">Submit My Project Proof</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillSnaps.map(snap => (
              <div key={snap.id} className="bg-white rounded-3xl p-6 border border-[#E7E5E4] shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#78716C] flex items-center gap-1 font-mono">
                      <GitBranch className="w-4 h-4 text-[#1C1917]" />
                      {snap.repo}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                      {snap.verifications} Peer Endorsements
                    </span>
                  </div>

                  <h3 className="font-editorial text-lg font-bold text-[#1C1917]">
                    {snap.title}
                  </h3>

                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {snap.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {snap.tags.map((tg, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-[#FAF6EE] border border-[#E7E5E4] text-[10px] font-medium text-[#1C1917]">
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between text-xs">
                  <span className="text-[#78716C]">By {snap.author}</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg bg-[#FAF6EE] hover:bg-[#F5F0E6] text-[#1C1917] font-bold text-xs border border-[#E7E5E4] transition flex items-center gap-1">
                      <Code className="w-3.5 h-3.5 text-[#78716C]" />
                      <span>Inspect Code</span>
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-[#FFEDD5] hover:bg-[#FED7AA] text-[#9A3412] font-bold text-xs border border-[#FED7AA] transition">
                      + Endorse Proof
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: BRAIN TWIN PEER MATCHING */}
      {activeSubtab === 'braintwin' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] shadow-xs space-y-6">
          <div className="border-b border-[#E7E5E4] pb-4">
            <span className="px-3 py-1 rounded-full bg-[#FFEDD5] text-[#9A3412] border border-[#FED7AA] text-xs font-bold flex items-center gap-1.5 w-fit mb-2">
              <Zap className="w-3.5 h-3.5 text-[#C2410C]" />
              AI Synergistic Peer Matching
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#1C1917]">
              Brain Twin: Study with Someone Strong in Your Weak Area
            </h2>
            <p className="text-xs text-[#57534E]">
              Our matching algorithm identifies peers in your region whose diagnostic strengths perfectly mirror your skill gaps for 2x faster preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {brainTwins.map(twin => (
              <div key={twin.id} className="p-6 rounded-2xl bg-[#FAF6EE] border-2 border-[#C2410C]/30 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={twin.avatar} 
                        alt={twin.name} 
                        className="w-12 h-12 rounded-2xl object-cover border border-[#E7E5E4]"
                      />
                      <div>
                        <h3 className="font-editorial text-xl font-bold text-[#1C1917]">{twin.name}</h3>
                        <p className="text-[11px] text-[#78716C]">{twin.college} &bull; {twin.semester}</p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                      {twin.matchScore}
                    </span>
                  </div>

                  <p className="text-xs text-[#57534E] leading-relaxed">
                    &ldquo;{twin.bio}&rdquo;
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-[#E7E5E4] space-y-1">
                      <div className="text-[10px] font-bold text-emerald-800 uppercase">What Rohan Can Teach You:</div>
                      <div className="font-semibold text-[#1C1917]">{twin.giveSkill}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#E7E5E4] space-y-1">
                      <div className="text-[10px] font-bold text-[#C2410C] uppercase">What You Can Teach Rohan:</div>
                      <div className="font-semibold text-[#1C1917]">{twin.needSkill}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between">
                  <span className="text-xs text-[#78716C] flex items-center gap-1 font-bold">
                    <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {twin.streak} Streak
                  </span>

                  {studyInvites[twin.id] ? (
                    <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Study Invite Sent
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSendInvite(twin.id)}
                      className="px-5 py-2 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Send Study Invite</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
