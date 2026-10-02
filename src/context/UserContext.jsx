import React, { createContext, useContext, useState, useEffect } from 'react';

// Default Student Profile
const INITIAL_USER = {
  id: 'usr_aryan_2026',
  firstName: 'Aryan',
  lastName: 'Sharma',
  fullName: 'Aryan Sharma',
  email: 'aryan.sharma@glbajaj.org',
  college: 'GL Bajaj Institute of Technology, Greater Noida',
  degree: 'B.Tech Computer Science & Engineering',
  cohort: 'Cohort of 2026',
  state: 'Uttar Pradesh / NCR Tech Cohort',
  kycLevel: 2,
  streak: 5,
  streakProtected: true,
  xp: 1420,
  stateRank: 28,
  statePercentile: 94.2,
  totalPeers: 42000,
  targetCompanies: [
    { name: 'Amazon SDE-1', match: 78, gap: 'Dynamic Programming & System Design' },
    { name: 'Flipkart / Atlassian', match: 64, gap: 'Tree Traversal & Graph DP' },
    { name: 'TCS Digital / Infosys SP', match: 94, gap: 'Cleared Standard OA' }
  ]
};

// Initial Micro-Tasks for the Daily Cockpit
const DEFAULT_TASKS = [
  { id: 't1', title: 'Divide & Conquer Video (8m)', duration: 8, completed: true },
  { id: 't2', title: 'AI Checkpoint: Merge Sort (3m)', duration: 3, completed: true },
  { id: 't3', title: 'Solve 1 Diagnostic Problem (4m)', duration: 4, completed: false }
];

// Initial Doubt Desk Questions & Answers
const DEFAULT_DOUBTS = [
  {
    id: 'd-1',
    question: 'In recursion, why does QuickSort have worst-case O(N²) when MergeSort is O(N log N)?',
    mentor: 'Dr. Anya Sharma',
    reply: 'Great question! QuickSort depends on pivot selection. If the pivot is always the minimum or maximum element, the tree degenerates into a single linked list of N levels. MergeSort always divides exactly in half (N/2), guaranteeing log N height!',
    timestamp: 'Yesterday at 4:15 PM',
    status: 'Answered'
  }
];

const UserContext = createContext(null);

export function UserProvider({ children }) {
  // 1. User Profile State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ck_user_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // 2. Daily Pace State ('5' | '15' | '30')
  const [selectedPace, setSelectedPace] = useState(() => {
    return localStorage.getItem('ck_selected_pace') || '15';
  });

  // 3. Daily Checklist Tasks State
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('ck_daily_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });

  // 4. In-Lesson Quiz State
  const [quizAnswer, setQuizAnswer] = useState(() => {
    return localStorage.getItem('ck_quiz_answer') || null;
  });
  const [quizSubmitted, setQuizSubmitted] = useState(() => {
    return localStorage.getItem('ck_quiz_submitted') === 'true';
  });

  // 5. Mentor Doubts Queue
  const [doubts, setDoubts] = useState(() => {
    const saved = localStorage.getItem('ck_mentor_doubts');
    return saved ? JSON.parse(saved) : DEFAULT_DOUBTS;
  });

  // 6. Active Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('ck_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ck_selected_pace', selectedPace);
  }, [selectedPace]);

  useEffect(() => {
    localStorage.setItem('ck_daily_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (quizAnswer) localStorage.setItem('ck_quiz_answer', quizAnswer);
    localStorage.setItem('ck_quiz_submitted', quizSubmitted ? 'true' : 'false');
  }, [quizAnswer, quizSubmitted]);

  useEffect(() => {
    localStorage.setItem('ck_mentor_doubts', JSON.stringify(doubts));
  }, [doubts]);

  // Toast Dispatcher
  const showToast = (message, type = 'info', extra = null) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, message, type, extra }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Award XP with celebratory feedback
  const awardXP = (amount, reason) => {
    setUser(prev => ({ ...prev, xp: prev.xp + amount }));
    showToast(`+${amount} XP Earned! ${reason}`, 'xp', { amount });
  };

  // Toggle Task Completion in Habit Ring
  const toggleTask = (taskId) => {
    setTasks(prev => {
      const updated = prev.map(t => {
        if (t.id === taskId) {
          const nextState = !t.completed;
          if (nextState) {
            awardXP(20, `Completed "${t.title}"`);
          }
          return { ...t, completed: nextState };
        }
        return t;
      });
      return updated;
    });
  };

  // Update Daily Pace
  const changePace = (newPace) => {
    setSelectedPace(newPace);
    showToast(`Pace calibrated to ${newPace}m Daily Habit`, 'success');
  };

  // Submit In-Lesson Interactive Quiz
  const handleQuizSubmit = (selectedOption) => {
    setQuizAnswer(selectedOption);
    setQuizSubmitted(true);
    if (selectedOption === 'O(N)') {
      awardXP(15, 'Correct Answer on Merge Sort Checkpoint!');
    } else {
      showToast('Review the recurrence tree hint and try again!', 'info');
    }
  };

  // Submit Doubt to Mentor Queue
  const submitDoubt = (questionText) => {
    const newDoubt = {
      id: `d-${Date.now()}`,
      question: questionText.trim(),
      mentor: 'Dr. Anya Sharma',
      reply: null,
      timestamp: 'Just now',
      status: 'In Queue (Est. response in ~2 hrs)'
    };
    setDoubts(prev => [newDoubt, ...prev]);
    awardXP(10, 'Curiosity Bonus: Doubt submitted to mentor!');
    showToast('Your doubt is queued for Dr. Anya Sharma!', 'success');
  };

  // Calculate live habit statistics
  const completedMins = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.duration, 0);
  const totalMins = parseInt(selectedPace, 10);
  const progressPercent = Math.min(100, Math.round((completedMins / totalMins) * 100));
  const remainingMins = Math.max(0, totalMins - completedMins);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
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
        submitDoubt,
        toasts,
        showToast,
        removeToast,
        awardXP
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
