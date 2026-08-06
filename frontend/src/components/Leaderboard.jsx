import React, { useState, memo } from 'react';
import { LEADERBOARD_USERS } from '../data/mockData';
import { motion } from 'framer-motion';

const Leaderboard = memo(() => {
  const [timeframe, setTimeframe] = useState('Weekly');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = LEADERBOARD_USERS.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top3 = LEADERBOARD_USERS.slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      {/* Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-black text-slate-900">
            Global Skill Leaderboard
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-normal">
            Top performing candidates based on problem submissions, streak consistency, and accuracy.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          {['Weekly', 'Monthly', 'All Time'].map((tf) => (
            <motion.button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold ${
                timeframe === tf
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {tf}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* 2nd Place */}
        <motion.div
          className="glass-panel rounded-3xl p-6 border border-white/80 shadow-liquid flex flex-col items-center text-center relative order-2 md:order-1 mt-4 md:mt-6"
          whileHover={{ y: -4, boxShadow: '0 16px 32px -12px rgba(99, 102, 241, 0.2)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="absolute -top-4 px-3.5 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-extrabold shadow-sm">
            🥈 2nd Place
          </span>
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xl mb-3 shadow-md border-2 border-slate-300">
            {top3[1].avatar}
          </div>
          <h3 className="font-display font-bold text-base text-slate-900">{top3[1].name}</h3>
          <p className="text-xs text-slate-500">{top3[1].college}</p>
          <div className="mt-4 pt-3 border-t border-slate-100 w-full flex justify-between text-xs">
            <span className="font-bold text-indigo-600">{top3[1].points} PTS</span>
            <span className="text-amber-600 font-medium">🔥 {top3[1].streak} Days</span>
          </div>
        </motion.div>

        {/* 1st Place (Gold) */}
        <motion.div
          className="bg-gradient-to-b from-amber-50 to-white/90 rounded-3xl p-6 border-2 border-amber-300 shadow-xl flex flex-col items-center text-center relative order-1 md:order-2 transform md:-translate-y-3"
          whileHover={{ y: -6, boxShadow: '0 24px 48px -12px rgba(251, 191, 36, 0.3)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="absolute -top-4 px-4 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-md">
            👑 1st Place Winner
          </span>
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-black text-2xl mb-3 shadow-lg border-4 border-amber-400">
            {top3[0].avatar}
          </div>
          <h3 className="font-display font-black text-lg text-slate-900">{top3[0].name}</h3>
          <p className="text-xs text-slate-500 font-medium">{top3[0].college}</p>
          <div className="mt-4 pt-3 border-t border-amber-200 w-full flex justify-between text-xs">
            <span className="font-black text-indigo-600 text-sm">{top3[0].points} PTS</span>
            <span className="text-amber-600 font-bold">🔥 {top3[0].streak} Days</span>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          className="glass-panel rounded-3xl p-6 border border-white/80 shadow-liquid flex flex-col items-center text-center relative order-3 mt-4 md:mt-8"
          whileHover={{ y: -4, boxShadow: '0 16px 32px -12px rgba(251, 191, 36, 0.2)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="absolute -top-4 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold shadow-sm">
            🥉 3rd Place
          </span>
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xl mb-3 shadow-md border-2 border-amber-200">
            {top3[2].avatar}
          </div>
          <h3 className="font-display font-bold text-base text-slate-900">{top3[2].name}</h3>
          <p className="text-xs text-slate-500">{top3[2].college}</p>
          <div className="mt-4 pt-3 border-t border-slate-100 w-full flex justify-between text-xs">
            <span className="font-bold text-indigo-600">{top3[2].points} PTS</span>
            <span className="text-amber-600 font-medium">🔥 {top3[2].streak} Days</span>
          </div>
        </motion.div>
      </div>

      {/* Rankings Table */}
      <div className="glass-panel rounded-3xl border border-white/80 shadow-liquid overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-display font-bold text-base text-slate-900">Leaderboard Rankings</h3>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find user or university..."
            className="px-3.5 py-1.5 rounded-2xl border border-slate-200 text-xs font-medium w-56 shadow-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">Rank</th>
                <th className="py-3 px-6">Candidate</th>
                <th className="py-3 px-6">University</th>
                <th className="py-3 px-6">Problems Solved</th>
                <th className="py-3 px-6">Streak</th>
                <th className="py-3 px-6 text-right">Forge Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredUsers.map((u) => (
                <tr
                  key={u.rank}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    u.isCurrentUser ? 'bg-indigo-50/60 font-bold border-l-4 border-indigo-600' : ''
                  }`}
                >
                  <td className="py-4 px-6 font-mono font-bold text-slate-900">
                    #{u.rank}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        {u.avatar}
                      </div>
                      <span className="text-slate-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{u.college}</td>
                  <td className="py-4 px-6 font-mono">{u.problems} Solved</td>
                  <td className="py-4 px-6 text-amber-600 font-semibold">🔥 {u.streak} Days</td>
                  <td className="py-4 px-6 text-right font-mono font-bold text-indigo-600">
                    {u.points} PTS
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

Leaderboard.displayName = 'Leaderboard';

export default Leaderboard;
