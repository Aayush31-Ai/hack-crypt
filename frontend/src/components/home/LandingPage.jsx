import React from 'react'
import { Link } from 'react-router-dom'
import { Gamepad2, Users, Trophy, Zap } from 'lucide-react'
import PixelBlast from '../PixelBlast/PixleBlast'

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#0b1220] overflow-hidden relative">

      {/* Background Effect - Full Coverage */}
      <div className="absolute inset-0 z-0">
        <PixelBlast
          variant="circle"
          pixelSize={5}
          color="#B19EEF"
          patternScale={2}
          patternDensity={0.8}
          pixelSizeJitter={0.1}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          className="h-full w-full"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220]/40 via-transparent to-[#0b1220]/60 z-5"></div>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-900/30 border border-violet-500/30 text-violet-300 font-mono text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
            SEASON 1 LIVE
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-tight">
            <span className="block text-white">TURN LEARNING</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
              INTO A GAME
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Master coding, math, science, and more through competitive arenas. 
            Battle bugs, solve puzzles, climb the leaderboard, and unlock legendary rewards.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link to="/login/student">
              <button className="group relative px-10 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-lg uppercase tracking-wider transform hover:scale-105 transition-all shadow-[0_0_40px_rgba(139,92,246,0.4)] border-b-4 border-violet-900 hover:border-violet-800 active:scale-95">
                <span className="flex items-center justify-center gap-3">
                  <Gamepad2 size={24} className="group-hover:rotate-12 transition-transform" />
                  START GAME
                </span>
              </button>
            </Link>

            <Link to="/login/teacher">
              <button className="px-10 py-4 rounded-xl bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 border-2 border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-3 transform hover:scale-105 transition-all">
                <Users size={24} />
                TEACHER MODE
              </button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">

            <div className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 rounded-2xl px-6 py-5 backdrop-blur-md transition-all transform hover:-translate-y-1">
              <Trophy size={24} className="text-yellow-400 mx-auto mb-3" />
              <p className="text-sm text-gray-400 mb-1">Global Rank</p>
              <p className="text-2xl font-bold text-white">#1,234</p>
            </div>

            <div className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 rounded-2xl px-6 py-5 backdrop-blur-md transition-all transform hover:-translate-y-1">
              <Zap size={24} className="text-cyan-400 mx-auto mb-3" />
              <p className="text-sm text-gray-400 mb-1">Total XP</p>
              <p className="text-2xl font-bold text-white">45,680</p>
            </div>

            <div className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/50 rounded-2xl px-6 py-5 backdrop-blur-md transition-all transform hover:-translate-y-1">
              <Gamepad2 size={24} className="text-pink-400 mx-auto mb-3" />
              <p className="text-sm text-gray-400 mb-1">Levels Cleared</p>
              <p className="text-2xl font-bold text-white">24 / 50</p>
            </div>

          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center items-center gap-2 text-gray-400 mt-16 animate-bounce">
            <span className="text-sm font-mono">SCROLL DOWN</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

        </div>
      </div>

      {/* Floating Accent Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl animate-pulse opacity-50"></div>
      <div className="absolute bottom-32 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>

    </div>
  )
}

export default LandingPage
