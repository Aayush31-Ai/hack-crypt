import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/useAuth";


const Login = () => {
  const { person } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [uid, setUid] = useState("");
  const [minUid, setMinUid] = useState("");
  const [maxUid, setMaxUid] = useState("");
  const [subject, setSubject] = useState("");

  const handleLogin = () => {
    if (!username) {
      toast.error("Username is required");
      return;
    }

    if (person === "student") {
      if (!uid) {
        toast.error("UID is required for student");
        return;
      }

      // Store student data in context and localStorage
      login({
        type: "student",
        username,
        uid,
      });

      toast.success("Student logged in successfully 🚀");
      navigate("/world");
    }

    if (person === "teacher") {
      if (!subject || !minUid || !maxUid) {
        toast.error("All teacher fields are required");
        return;
      }

      if (Number(minUid) >= Number(maxUid)) {
        toast.error("Min UID should be less than Max UID");
        return;
      }

      // Store teacher data in context and localStorage
      login({
        type: "teacher",
        username,
        subject,
        minUid,
        maxUid,
      });

      toast.success("Teacher logged in successfully 👨‍🏫");
      navigate("/world");
    }
  };

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden relative">
      <ToastContainer />



      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-5"></div>

      {/* Floating Accent Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#B19EEF]/10 rounded-full blur-3xl animate-pulse opacity-50"></div>
      <div className="absolute bottom-32 right-10 w-40 h-40 bg-[#B19EEF]/10 rounded-full blur-3xl animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>

      {/* Login Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="bg-black/60 backdrop-blur-md border-2 border-[#B19EEF]/30 p-8 rounded-2xl w-full max-w-md shadow-2xl shadow-[#B19EEF]/20 relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#B19EEF]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#B19EEF]/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Title with game style */}
            <h1 className="text-4xl md:text-5xl font-black mb-3 text-center capitalize tracking-tighter text-[#B19EEF] drop-shadow-[0_0_30px_rgba(177,158,239,0.5)]">
              {person} LOGIN
            </h1>
            <p className="text-center text-[#B19EEF]/70 text-sm mb-8 font-light">Level Up Your Skills</p>

          {/* Username */}
          <div className="mb-5">
            <label className="text-sm font-bold text-[#B19EEF] uppercase tracking-wider">🎮 Username</label>
            <input
              className="w-full mt-2 p-3 rounded-lg bg-black/80 border-2 border-[#B19EEF]/50 focus:border-[#B19EEF] focus:outline-none text-white placeholder-gray-400 transition-all duration-300 font-medium"
              type="text"
              placeholder="Enter your player name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* STUDENT LOGIN */}
          {person === "student" && (
            <div className="mb-5">
              <label className="text-sm font-bold text-[#B19EEF] uppercase tracking-wider">🎯 UID / Roll Number</label>
              <input
                className="w-full mt-2 p-3 rounded-lg bg-black/80 border-2 border-[#B19EEF]/50 focus:border-[#B19EEF] focus:outline-none text-white placeholder-gray-400 transition-all duration-300 font-medium"
                type="text"
                placeholder="Enter your UID"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
              />
            </div>
          )}

          {/* TEACHER LOGIN */}
          {person === "teacher" && (
            <>
              <div className="mb-5">
                <label className="text-sm font-bold text-[#B19EEF] uppercase tracking-wider">📚 Subject</label>
                <select
                  className="w-full mt-2 p-3 rounded-lg bg-black/80 border-2 border-[#B19EEF]/50 focus:border-[#B19EEF] focus:outline-none text-white transition-all duration-300 font-medium"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="">Select your subject</option>
                  <option>Maths</option>
                  <option>Python</option>
                  <option>HTML</option>
                  <option>CSS</option>
                  <option>JavaScript</option>
                  <option>Java</option>
                  <option>C++</option>
                  <option>DSA</option>
                </select>
              </div>

              <div className="flex gap-3 mb-5">
                <div className="flex-1">
                  <label className="text-sm font-bold text-[#B19EEF] uppercase tracking-wider">Min UID</label>
                  <input
                    className="w-full mt-2 p-3 rounded-lg bg-black/80 border-2 border-[#B19EEF]/50 focus:border-[#B19EEF] focus:outline-none text-white placeholder-gray-400 transition-all duration-300 font-medium"
                    type="number"
                    placeholder="Min"
                    value={minUid}
                    onChange={(e) => setMinUid(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-bold text-[#B19EEF] uppercase tracking-wider">Max UID</label>
                  <input
                    className="w-full mt-2 p-3 rounded-lg bg-black/80 border-2 border-[#B19EEF]/50 focus:border-[#B19EEF] focus:outline-none text-white placeholder-gray-400 transition-all duration-300 font-medium"
                    type="number"
                    placeholder="Max"
                    value={maxUid}
                    onChange={(e) => setMaxUid(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* Login Button - Gamified */}
          <button
            onClick={handleLogin}
            className="w-full mt-8 py-4 px-10 rounded-xl font-bold text-lg uppercase tracking-wider text-white bg-[#B19EEF] hover:bg-[#9B7FDE] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(177,158,239,0.4)] border-b-4 border-[#8B6FCE] hover:border-[#7B5FBE] relative group overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              ⚡ ENTER BATTLE ⚡
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Decorative text */}
          <p className="text-center text-[#B19EEF]/50 text-xs mt-6 font-mono">
            &gt; Ready to fight? Login now! &lt;
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
