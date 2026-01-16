import { useState } from "react";
import { Calendar, Users, Trophy, Flame, Star, Lock, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/useAuth';

// Weekly challenges organized by week
const weeklySchedule = [
  {
    week: "Week 1",
    dateRange: "Jan 1 - Jan 7",
    challenges: [
      {
        id: 1,
        title: "Python Basics Blitz",
        description: "Master variables, data types, and basic operations",
        difficulty: "Beginner",
        deadline: "Jan 7, 2026",
        xpReward: 250,
        participants: 2456,
        status: "completed",
        progress: 10,
        totalTasks: 10,
        icon: "🐍",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-900/20",
        borderColor: "border-blue-500/30"
      },
      {
        id: 2,
        title: "Function Fundamentals",
        description: "Build 5 reusable functions from scratch",
        difficulty: "Beginner",
        deadline: "Jan 7, 2026",
        xpReward: 300,
        participants: 1987,
        status: "completed",
        progress: 5,
        totalTasks: 5,
        icon: "⚙️",
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-900/20",
        borderColor: "border-green-500/30"
      }
    ]
  },
  {
    week: "Week 2",
    dateRange: "Jan 8 - Jan 14",
    challenges: [
      {
        id: 3,
        title: "Loop Master Challenge",
        description: "Solve 8 problems using for and while loops",
        difficulty: "Intermediate",
        deadline: "Jan 14, 2026",
        xpReward: 400,
        participants: 1654,
        status: "completed",
        progress: 8,
        totalTasks: 8,
        icon: "🔄",
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-900/20",
        borderColor: "border-purple-500/30"
      },
      {
        id: 4,
        title: "Array & List Sprint",
        description: "Master array manipulations and list operations",
        difficulty: "Intermediate",
        deadline: "Jan 14, 2026",
        xpReward: 450,
        participants: 1432,
        status: "completed",
        progress: 12,
        totalTasks: 12,
        icon: "📊",
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-900/20",
        borderColor: "border-orange-500/30"
      }
    ]
  },
  {
    week: "Week 3",
    dateRange: "Jan 15 - Jan 21",
    challenges: [
      {
        id: 5,
        title: "Speed Coder Challenge",
        description: "Complete 10 Python questions in under 5 minutes",
        difficulty: "Intermediate",
        deadline: "Jan 21, 2026",
        xpReward: 500,
        participants: 1234,
        status: "active",
        progress: 3,
        totalTasks: 10,
        icon: "⚡",
        color: "from-yellow-500 to-orange-500",
        bgColor: "bg-yellow-900/20",
        borderColor: "border-yellow-500/30"
      },
      {
        id: 6,
        title: "Logic Master Sprint",
        description: "Solve 15 logic puzzles with 90% accuracy",
        difficulty: "Advanced",
        deadline: "Jan 21, 2026",
        xpReward: 750,
        participants: 892,
        status: "active",
        progress: 5,
        totalTasks: 15,
        icon: "🧠",
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-900/20",
        borderColor: "border-purple-500/30"
      },
      {
        id: 7,
        title: "Daily Streak Warrior",
        description: "Maintain a 7-day learning streak",
        difficulty: "Easy",
        deadline: "Jan 21, 2026",
        xpReward: 300,
        participants: 2156,
        status: "active",
        progress: 4,
        totalTasks: 7,
        icon: "🔥",
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-900/20",
        borderColor: "border-orange-500/30"
      }
    ]
  },
  {
    week: "Week 4",
    dateRange: "Jan 22 - Jan 28",
    challenges: [
      {
        id: 8,
        title: "Algorithm Apprentice",
        description: "Implement 6 sorting and searching algorithms",
        difficulty: "Advanced",
        deadline: "Jan 28, 2026",
        xpReward: 800,
        participants: 567,
        status: "locked",
        progress: 0,
        totalTasks: 6,
        icon: "🔐",
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-indigo-900/20",
        borderColor: "border-indigo-500/30"
      },
      {
        id: 9,
        title: "Debug Detective",
        description: "Find and fix 10 tricky code bugs",
        difficulty: "Intermediate",
        deadline: "Jan 28, 2026",
        xpReward: 550,
        participants: 789,
        status: "locked",
        progress: 0,
        totalTasks: 10,
        icon: "🐛",
        color: "from-red-500 to-pink-500",
        bgColor: "bg-red-900/20",
        borderColor: "border-red-500/30"
      }
    ]
  }
];

const monthlyChallenges = [
  {
    id: 100,
    title: 'January "30 Days of Code" Challenge',
    description: "Last January we ran a New Year, New Me exercise challenge and it was a massive success. Let's bring back that same intensity.",
    type: "Monthly",
    difficulty: "Legendary",
    deadline: "Jan 31, 2026",
    xpReward: 5000,
    participants: 650,
    status: "active",
    progress: 15,
    totalTasks: 30,
    icon: "💪",
    image: "/assets/png&gif/png/challenge-banner.png",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-900/20",
    borderColor: "border-cyan-500/50"
  }
];

const ChallengePage = () => {
  const { user } = useAuth();
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userXP, setUserXP] = useState(user?.xp || 45680);
  const [expandedWeek, setExpandedWeek] = useState("Week 3"); // Current week expanded by default

  const handleStartChallenge = (challenge) => {
    if (challenge.status === 'locked') {
      alert('⚠️ This challenge is not yet available. Complete current week challenges first!');
      return;
    }
    setSelectedChallenge(challenge);
    // Navigate to challenge quiz page
  };

  const handleCompleteChallenge = (challenge) => {
    // Update user XP
    setUserXP(prevXP => prevXP + challenge.xpReward);
    
    // Show success notification
    alert(`🎉 Challenge Completed! +${challenge.xpReward} XP earned!`);
    
    // Reset selection
    setSelectedChallenge(null);
  };

  const toggleWeek = (week) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "text-green-400",
      Intermediate: "text-yellow-400",
      Advanced: "text-orange-400",
      Legendary: "text-purple-400"
    };
    return colors[difficulty] || "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(251,191,36,0.3)]">
              🏆
            </div>
            <div>
              <h1 className="text-5xl font-black mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Monthly Challenge
                </span>
              </h1>
              <p className="text-gray-400 text-lg">Let's make magic together ✨◇</p>
            </div>
          </div>

          {/* User XP Display */}
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-violet-900/30 border border-violet-500/30 rounded-xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Star className="text-violet-400" size={20} />
                <div>
                  <p className="text-xs text-gray-400">Your Total XP</p>
                  <p className="text-xl font-bold text-violet-300">{userXP.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-3 bg-orange-900/30 border border-orange-500/30 rounded-xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Flame className="text-orange-400" size={20} />
                <div>
                  <p className="text-xs text-gray-400">Current Streak</p>
                  <p className="text-xl font-bold text-orange-300">12 Days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current and Upcoming Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 font-mono">Current and upcoming</h2>

          {/* Monthly Challenge Card */}
          {monthlyChallenges.map(challenge => (
            <div
              key={challenge.id}
              className={`group relative ${challenge.bgColor} ${challenge.borderColor} border-2 rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-opacity-100 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] mb-8`}
            >
              <div className="grid md:grid-cols-2 gap-6 p-8">
                {/* Left: Image Card */}
                <div className="relative bg-gradient-to-br from-cyan-100 to-blue-200 rounded-2xl p-6 overflow-hidden">
                  {/* Month Badge */}
                  <div className="text-xs font-bold tracking-wider text-gray-700 mb-2">JANUARY 2026</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">
                    MONTHLY<br/>CHALLENGE
                  </h3>
                  <p className="text-sm text-gray-700 mb-6">30 Days of ____</p>
                  
                  {/* Icons */}
                  <div className="flex gap-3 mb-6">
                    <div className="w-8 h-8 bg-pink-400 rounded flex items-center justify-center text-white">📱</div>
                    <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">🎨</div>
                  </div>

                  {/* Deadline */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-full text-xs font-bold text-gray-800">
                    DEADLINE SAT 1/31
                  </div>

                  {/* Decorative illustration */}
                  <div className="absolute -bottom-4 -right-4 opacity-20">
                    <div className="text-9xl">🏆</div>
                  </div>
                </div>

                {/* Right: Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                      CODE CHALLENGE
                    </div>

                    <h3 className="text-3xl font-bold mb-3">
                      {challenge.title} {challenge.icon}
                    </h3>

                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {challenge.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-cyan-400" />
                        <div>
                          <p className="text-xs text-gray-500">Submit by</p>
                          <p className="text-sm font-semibold text-cyan-400">{challenge.deadline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-violet-400" />
                        <div>
                          <p className="text-xs text-gray-500">Participants</p>
                          <p className="text-sm font-semibold text-violet-400">{challenge.participants} submissions</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleStartChallenge(challenge)}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold uppercase tracking-wide transform hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] border-b-4 border-cyan-900"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Trophy size={20} />
                      Start Challenge (+{challenge.xpReward} XP)
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Challenges by Week */}
        <div>
          <h2 className="text-3xl font-bold mb-6 font-mono">Weekly Challenges</h2>
          
          <div className="space-y-4">
            {weeklySchedule.map((weekData, idx) => {
              const isExpanded = expandedWeek === weekData.week;
              const weekStatus = weekData.challenges.every(c => c.status === 'completed') ? 'completed' 
                : weekData.challenges.some(c => c.status === 'active') ? 'active' 
                : 'locked';
              
              return (
                <div key={idx} className="border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden">
                  {/* Week Header */}
                  <button
                    onClick={() => toggleWeek(weekData.week)}
                    className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                        weekStatus === 'completed' ? 'bg-green-900/30 border border-green-500/50' :
                        weekStatus === 'active' ? 'bg-violet-900/30 border border-violet-500/50' :
                        'bg-gray-900/30 border border-gray-500/50'
                      }`}>
                        {weekStatus === 'completed' ? '✅' : weekStatus === 'active' ? '🎯' : '🔒'}
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-white">{weekData.week}</h3>
                        <p className="text-sm text-gray-400">{weekData.dateRange}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm text-gray-400">{weekData.challenges.length} Challenges</p>
                        <p className="text-xs text-violet-400">
                          {weekData.challenges.reduce((acc, c) => acc + c.xpReward, 0)} XP Total
                        </p>
                      </div>
                      <ChevronRight 
                        size={24} 
                        className={`text-gray-400 transition-transform duration-300 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Week Challenges */}
                  {isExpanded && (
                    <div className="border-t border-white/10 p-6 bg-black/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {weekData.challenges.map(challenge => (
                          <div
                            key={challenge.id}
                            className={`group relative ${challenge.bgColor} ${challenge.borderColor} border rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:border-opacity-100 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] ${
                              challenge.status === 'locked' ? 'opacity-60' : 'hover:-translate-y-1'
                            }`}
                          >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${challenge.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}></div>

                            {/* Lock Overlay */}
                            {challenge.status === 'locked' && (
                              <div className="absolute top-3 right-3">
                                <Lock size={20} className="text-gray-500" />
                              </div>
                            )}

                            {/* Completed Badge */}
                            {challenge.status === 'completed' && (
                              <div className="absolute top-3 right-3">
                                <div className="px-2 py-1 bg-green-900/30 border border-green-500/50 rounded-full text-xs text-green-400 font-semibold">
                                  ✓ Done
                                </div>
                              </div>
                            )}

                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${challenge.color} flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:scale-110 transition-transform`}>
                                {challenge.icon}
                              </div>
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)} bg-white/10`}>
                                {challenge.difficulty}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-white mb-2">
                              {challenge.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-400 mb-4">{challenge.description}</p>

                            {/* Progress */}
                            <div className="mb-4">
                              <div className="flex justify-between text-xs text-gray-400 mb-2">
                                <span>Progress</span>
                                <span>{challenge.progress}/{challenge.totalTasks}</span>
                              </div>
                              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className={`h-full bg-gradient-to-r ${challenge.color} transition-all duration-500`}
                                  style={{ width: `${(challenge.progress / challenge.totalTasks) * 100}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between items-center mb-4 text-xs text-gray-400">
                              <div className="flex items-center gap-1">
                                <Users size={14} />
                                <span>{challenge.participants}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                                <span className="font-bold text-yellow-400">+{challenge.xpReward} XP</span>
                              </div>
                            </div>

                            {/* Action Button */}
                            <button
                              onClick={() => handleStartChallenge(challenge)}
                              disabled={challenge.status === 'locked'}
                              className={`w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                                challenge.status === 'locked'
                                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                  : challenge.status === 'completed'
                                  ? 'bg-green-900/30 border border-green-500/50 text-green-400 hover:bg-green-900/50'
                                  : 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-violet-400/50 text-white'
                              }`}
                            >
                              {challenge.status === 'locked' ? '🔒 Locked' : 
                               challenge.status === 'completed' ? '✓ Completed' : 
                               'Start Challenge →'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChallengePage;
