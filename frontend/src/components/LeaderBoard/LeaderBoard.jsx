import React, { useEffect, useState } from 'react'
import players from '@/playerData/player'

function LeaderBoard() {
    const sortedPlayers = [...players].sort((a, b) => b.xp - a.xp);

    return (
        <section className="min-h-screen bg-gradient-to-b from-[#0b1020] to-[#050814] text-white px-6 py-10">
            {/* Title */}
            <h1 className="text-4xl font-extrabold text-center mb-10 tracking-wide">
                🏆 Leaderboard
            </h1>

            {/* Table Wrapper */}
            <div className="max-w-5xl mx-auto bg-[#0f172a] rounded-2xl shadow-lg border border-white/10 overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-4 px-6 py-4 text-sm font-semibold text-gray-300 bg-[#020617]">
                    <span>Rank</span>
                    <span>Player</span>
                    <span className="text-right">XP</span>
                    <span className="text-right">Coins</span>
                </div>

                {/* Rows */}
                <div className="divide-y divide-white/10">
                    {sortedPlayers.map((player, index) => (
                        <div
                            key={player.uid}
                            className="grid grid-cols-4 px-6 py-4 items-center hover:bg-white/5 transition"
                        >
                            {/* Rank */}
                            <span className="font-bold text-purple-400">
                                #{index + 1}
                            </span>

                            {/* Player */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={player.avatar}
                                    alt={player.name}
                                    className="w-9 h-9 rounded-full border border-purple-500/40"
                                />
                                <span className="font-medium">{player.name}</span>
                            </div>

                            {/* XP */}
                            <span className="text-right text-blue-400 font-semibold">
                                {player.xp}
                            </span>

                            {/* Coins */}
                            <span className="text-right text-yellow-400 font-semibold">
                                🪙 {player.coins}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default LeaderBoard