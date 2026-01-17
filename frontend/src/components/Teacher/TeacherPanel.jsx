import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { Search, Users, Trophy, BarChart2, ShieldCheck, AlertCircle } from 'lucide-react';
import players from '../../playerData/player';
import { useAuth } from '../../context/useAuth';

const TeacherPanel = () => {
  const navigate = useNavigate();
  const { user, isTeacher, loading } = useAuth();
  const [query, setQuery] = useState('');

useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"})
},[])

  // Access control: redirect if not teacher
  useEffect(() => {
    if (!loading && !isTeacher()) {
      navigate('/login/teacher');
    }
  }, [loading, isTeacher, navigate]);

  const totalStudents = players.length;
  const averageXP = Math.round(players.reduce((sum, p) => sum + (p.xp || 0), 0) / Math.max(players.length, 1));
  const topPerformer = [...players].sort((a, b) => b.xp - a.xp)[0];
  const leaderboard = useMemo(() => [...players].sort((a, b) => b.xp - a.xp), []);
  const topFive = useMemo(() => leaderboard.slice(0, 5), [leaderboard]);

  const levelBuckets = useMemo(() => {
    const buckets = players.reduce((acc, p) => {
      const level = Math.floor((p.xp || 0) / 500) + 1;
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(buckets)
      .map(([level, count]) => ({ level: Number(level), count }))
      .sort((a, b) => a.level - b.level);
  }, []);

  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return players;
    return players.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.uid.toLowerCase().includes(q)
    );
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-700">
        Loading...
      </div>
    );
  }

  if (!isTeacher()) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-800 px-6">
        <div className="max-w-xl w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-lg text-center">
          <div className="flex items-center justify-center mb-4 text-amber-500">
            <AlertCircle size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Access restricted</h1>
          <p className="text-slate-500 mb-6">This panel is only for teachers. Please login as a teacher to continue.</p>
          <button
            onClick={() => navigate('/login/teacher')}
            className="px-6 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 transition"
          >
            Go to Teacher Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <button onClick={()=>navigate("/")} className="mb-4 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition">
            Back
        </button>
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-1">Teacher Panel</p>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900">Welcome, {user?.username || 'Teacher'}</h1>
              {Array.isArray(user?.subjects) && user.subjects.length > 0 && (
                <p className="text-slate-500 mt-1">Subjects: {user.subjects.join(', ')}</p>
              )}
              {(user?.minUid || user?.maxUid) && (
                <p className="text-slate-500 text-sm">UID Range: {user?.minUid || '—'} - {user?.maxUid || '—'}</p>
              )}
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-100 rounded-2xl border border-slate-200 shadow-sm">
                <ShieldCheck className="text-emerald-500" size={24} />
                <div>
                  <p className="text-xs text-slate-500 uppercase">Access</p>
                  <p className="text-sm font-semibold text-emerald-600">Teacher Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-500 border border-amber-100">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Students</p>
              <p className="text-2xl font-bold">{totalStudents}</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-500 border border-indigo-100">
              <BarChart2 size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Average XP</p>
              <p className="text-2xl font-bold">{averageXP}</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg flex items-center gap-4">
            <div className="p-3 rounded-xl bg-teal-50 text-teal-500 border border-teal-100">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Top Performer</p>
              <p className="text-2xl font-bold">{topPerformer?.name || '—'}</p>
              <p className="text-xs text-slate-400">XP {topPerformer?.xp || 0}</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Top performers</p>
                <h3 className="text-xl font-bold text-slate-900">XP leaderboard</h3>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topFive} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 12, borderColor: '#e2e8f0' }} />
                  <Bar dataKey="xp" radius={[8, 8, 0, 0]} fill="#6366f1">
                    {topFive.map((entry, index) => (
                      <Cell key={entry.uid || index} fill={["#6366f1", "#8b5cf6", "#22c55e", "#06b6d4", "#f59e0b"][index % 5]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Level spread</p>
                <h3 className="text-xl font-bold text-slate-900">Level distribution</h3>
              </div>
              <span className="text-xs text-slate-500">{totalStudents} students</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={levelBuckets} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="level" stroke="#64748b" tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 12, borderColor: '#e2e8f0' }} formatter={(value) => [`${value} students`, 'Count']} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Search and list */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Students</h2>
              <p className="text-slate-500 text-sm">Search and review student progress</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 w-72"
                placeholder="Search by name or UID"
              />
            </div>
          </div>

          <div className="overflow-auto border border-slate-200 rounded-2xl">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Student</th>
                  <th className="px-4 py-3 text-left">UID</th>
                  <th className="px-4 py-3 text-left">XP</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.uid}
                    className="hover:bg-slate-50/80 cursor-pointer"
                    onClick={() => navigate(`/profile/${student.uid}`, { state: { student } })}
                  >
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img src={student.avatar} alt={student.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                      <span className="font-semibold text-slate-800">{student.name}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{student.uid}</td>
                    <td className="px-4 py-3 text-slate-800 font-semibold">{student.xp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/* Leaderboard snapshot */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Leaderboard</h2>
            <p className="text-sm text-slate-500">Top performers</p>
          </div>
          <div className="space-y-3">
            {leaderboard.slice(0, 5).map((player, idx) => (
              <div key={player.uid} className="flex items-center justify-between bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center">#{idx + 1}</span>
                  <img src={player.avatar} alt={player.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                  <div>
                    <p className="font-semibold text-slate-800">{player.name}</p>
                    <p className="text-xs text-slate-500">UID {player.uid}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-indigo-600 font-bold">{player.xp} XP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPanel;
