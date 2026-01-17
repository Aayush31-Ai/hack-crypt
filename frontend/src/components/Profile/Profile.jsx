import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Star, Award, Trophy, Zap, User, Edit2 } from 'lucide-react';
import CurrentUser from '../../playerData/CurrentUser';
import players from '../../playerData/player';

function Profile() {
  const location = useLocation();
  const { uid } = useParams();
  const paramStudent = uid ? players.find((p) => p.uid === uid) : null;
  const displayUser = location.state?.student || paramStudent || CurrentUser;

  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(displayUser.about || "Passionate coder and problem solver 🚀");
  const [editedAbout, setEditedAbout] = useState(about);

  useEffect(()=>{
window.scrollTo({top:0,behavior:"smooth"})
  },[])

  useEffect(() => {
    const nextAbout = displayUser.about || "Passionate coder and problem solver 🚀";
    setAbout(nextAbout);
    setEditedAbout(nextAbout);
  }, [displayUser]);

  // Calculate rank based on XP
  const sortedPlayers = [...players].sort((a, b) => b.xp - a.xp);
  const rankIndex = sortedPlayers.findIndex((p) => p.uid === displayUser.uid);
  const userRank = rankIndex >= 0 ? rankIndex + 1 : players.length;
  const userBadges = Array.isArray(displayUser.badges) ? displayUser.badges : [];
  const userXp = displayUser.xp || 0;

  // Badge descriptions
  const badgeDescriptions = {
    'speed-thinker.png': 'Speed Thinker - Quick problem solver',
    'streak-holder.png': 'Streak Holder - Consistent learner',
    'logic-pro.png': 'Logic Pro - Expert in logic',
    'concept-cracked.png': 'Concept Cracked - Master of concepts',
    'level-accended.png': 'Level Ascended - Reached new heights'
  };

  const handleSaveAbout = () => {
    setAbout(editedAbout);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white py-20 px-4 relative overflow-hidden">
      {/* Animated background elements matching site theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Profile Header Card */}
        <div className="group mb-12">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
            
            {/* Card - matching site theme */}
            <div className="relative bg-white/5 border border-violet-500/30 rounded-3xl p-12 backdrop-blur-md">
              <div className="grid md:grid-cols-3 gap-12 items-center">
                
                {/* Avatar Section */}
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="relative group/avatar">
                    {/* Animated ring */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 rounded-2xl blur-lg opacity-60 group-hover/avatar:opacity-100 transition-all duration-500 animate-pulse"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 rounded-2xl opacity-30 group-hover/avatar:opacity-50 transition-all"></div>
                    
                    {/* Image */}
                    <img
                      src={displayUser.avatar}
                      alt={displayUser.name}
                      className="relative w-44 h-44 rounded-2xl object-cover border-2 border-violet-400/50 group-hover/avatar:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Crown badge */}
                    <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 flex items-center justify-center border-3 border-[#0b1220] shadow-2xl group-hover/avatar:scale-125 transition-transform duration-300">
                      <span className="text-2xl">👑</span>
                    </div>
                  </div>

                  {/* Name and UID */}
                  <div className="text-center space-y-2">
                    <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-300 via-violet-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                      {displayUser.name}
                    </h1>
                    <p className="text-sm font-semibold text-violet-400/70 tracking-widest uppercase">UID {displayUser.uid}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="md:col-span-2 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    
                    {/* Rank Card */}
                    <div className="group/card relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/40 to-orange-600/20 rounded-2xl blur-lg opacity-0 group-hover/card:opacity-50 transition-all"></div>
                      <div className="relative bg-gradient-to-br from-violet-900/20 to-purple-900/20 border border-violet-500/30 rounded-2xl p-6 backdrop-blur-md hover:border-violet-400/50 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-violet-300/70 uppercase tracking-widest">Rank</span>
                          <Trophy className="text-yellow-400 group-hover/card:scale-125 transition-transform" size={22} />
                        </div>
                        <p className="text-4xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-2">#{userRank}</p>
                        <p className="text-xs text-violet-300/50">of {players.length} players</p>
                      </div>
                    </div>

                    {/* XP Card */}
                    <div className="group/card relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/40 to-purple-600/20 rounded-2xl blur-lg opacity-0 group-hover/card:opacity-50 transition-all"></div>
                      <div className="relative bg-gradient-to-br from-violet-900/20 to-purple-900/20 border border-violet-500/30 rounded-2xl p-6 backdrop-blur-md hover:border-violet-400/50 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-violet-300/70 uppercase tracking-widest">Total XP</span>
                          <Star className="text-violet-400 fill-violet-400 group-hover/card:scale-125 transition-transform" size={22} />
                        </div>
                        <p className="text-4xl font-black text-transparent bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text mb-2">{userXp.toLocaleString()}</p>
                        <p className="text-xs text-violet-300/50">Points Earned</p>
                      </div>
                    </div>

                    {/* Badges Card */}
                    <div className="group/card relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/40 to-blue-600/20 rounded-2xl blur-lg opacity-0 group-hover/card:opacity-50 transition-all"></div>
                      <div className="relative bg-gradient-to-br from-violet-900/20 to-purple-900/20 border border-violet-500/30 rounded-2xl p-6 backdrop-blur-md hover:border-violet-400/50 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-violet-300/70 uppercase tracking-widest">Badges</span>
                          <Award className="text-cyan-400 group-hover/card:scale-125 transition-transform" size={22} />
                        </div>
                        <p className="text-4xl font-black text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text mb-2">{userBadges.length}</p>
                        <p className="text-xs text-violet-300/50">Achievements</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-12 group/about">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-violet-600/50 rounded-2xl blur-lg opacity-0 group-hover/about:opacity-30 transition-all duration-500"></div>
            <div className="relative bg-white/5 border border-violet-500/30 rounded-2xl p-8 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-violet-600/40 to-purple-600/40 border border-violet-500/30">
                    <User size={24} className="text-violet-300" />
                  </div>
                  <span className="bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">About</span>
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="group/btn px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-600/30 to-purple-600/30 border border-violet-500/30 text-violet-300/80 hover:text-violet-300 hover:border-violet-400/50 hover:from-violet-600/50 hover:to-purple-600/50 transition-all flex items-center gap-2 font-semibold text-sm"
                >
                  <Edit2 size={16} className="group-hover/btn:rotate-12 transition-transform" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={editedAbout}
                    onChange={(e) => setEditedAbout(e.target.value)}
                    className="w-full bg-black/20 border border-violet-500/30 rounded-xl p-4 text-violet-100 placeholder-violet-400/30 focus:outline-none focus:border-violet-400/50 focus:bg-black/30 resize-none transition-all backdrop-blur-sm"
                    rows="3"
                    placeholder="Write something about yourself..."
                  />
                  <button
                    onClick={handleSaveAbout}
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="text-violet-200/80 leading-relaxed font-light text-lg">{about}</p>
              )}
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="mb-12 group/badges">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-violet-600/50 rounded-2xl blur-lg opacity-0 group-hover/badges:opacity-30 transition-all duration-500"></div>
            <div className="relative bg-white/5 border border-violet-500/30 rounded-2xl p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-gradient-to-br from-violet-600/40 to-purple-600/40 border border-violet-500/30">
                  <Award size={24} className="text-violet-300" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">Badges & Achievements</h2>
              </div>

              {userBadges.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {userBadges.map((badge, index) => {
                    const badgeName = badge.split('/').pop();
                    const description = badgeDescriptions[badgeName] || 'Achievement';

                    return (
                      <div
                        key={index}
                        className="group/badge relative"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-br from-violet-600/60 to-purple-600/60 rounded-xl blur-lg opacity-0 group-hover/badge:opacity-40 transition-all duration-300"></div>
                        <div className="relative bg-gradient-to-br from-violet-900/20 to-purple-900/20 border border-violet-500/30 rounded-xl p-4 backdrop-blur-md hover:border-violet-400/50 transition-all group-hover/badge:-translate-y-2">
                          <div className="flex flex-col items-center text-center space-y-3">
                            <img
                              src={badge}
                              alt={description}
                              className="w-16 h-16 rounded-lg object-cover group-hover/badge:scale-125 transition-transform duration-300 drop-shadow-lg"
                            />
                            <p className="text-xs font-semibold text-violet-300 line-clamp-2">{description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-violet-300/60 text-lg font-light">No badges earned yet. Start completing challenges! 🎯</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group/stat relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/40 to-purple-600/40 rounded-2xl blur-lg opacity-0 group-hover/stat:opacity-50 transition-all"></div>
            <div className="relative bg-gradient-to-br from-violet-900/20 to-purple-900/20 border border-violet-500/30 rounded-2xl p-8 backdrop-blur-md hover:border-violet-400/50 transition-all text-center">
              <p className="text-violet-300/60 text-sm font-semibold uppercase tracking-widest mb-3">Level</p>
              <p className="text-5xl font-black bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
                {Math.floor(userXp / 500) + 1}
              </p>
            </div>
          </div>
          <div className="group/stat relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/40 to-purple-600/40 rounded-2xl blur-lg opacity-0 group-hover/stat:opacity-50 transition-all"></div>
            <div className="relative bg-gradient-to-br from-violet-900/20 to-purple-900/20 border border-violet-500/30 rounded-2xl p-8 backdrop-blur-md hover:border-violet-400/50 transition-all text-center">
              <p className="text-violet-300/60 text-sm font-semibold uppercase tracking-widest mb-3">Next Level</p>
              <p className="text-5xl font-black bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                {(userXp % 500)}/500
              </p>
            </div>
          </div>
          <div className="group/stat relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/40 to-purple-600/40 rounded-2xl blur-lg opacity-0 group-hover/stat:opacity-50 transition-all"></div>
            <div className="relative bg-gradient-to-br from-violet-900/20 to-purple-900/20 border border-violet-500/30 rounded-2xl p-8 backdrop-blur-md hover:border-violet-400/50 transition-all text-center">
              <p className="text-violet-300/60 text-sm font-semibold uppercase tracking-widest mb-3">Total</p>
              <p className="text-5xl font-black bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                {userBadges.length + 5}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
