import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/useAuth";


const Login = () => {
  const { person } = useParams();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [username, setUsername] = useState("");
  const [uid, setUid] = useState("");
  const [minUid, setMinUid] = useState("");
  const [maxUid, setMaxUid] = useState("");
  const [subjects, setSubjects] = useState([]);

  // Check if teacher is already logged in and redirect
  useEffect(() => {
    if (person === "teacher" && user && user.type === "teacher") {
      navigate("/teacher");
    }
  }, [person, user, navigate]);

  const handleLogin = () => {
    if (!username) {
      toast.error("Username is required");
      return;
    }

    if (person === "student") {Ba
      if (!uid) {
        toast.error("UID is required for student");
        return;
      }

      // Check if UID is within teacher's allowed range
      const teacherRange = localStorage.getItem('teacherUidRange');
      if (teacherRange) {
        try {
          const { minUid: teacherMin, maxUid: teacherMax } = JSON.parse(teacherRange);
          const studentUid = Number(uid);
          const min = Number(teacherMin);
          const max = Number(teacherMax);
          
          if (studentUid < min || studentUid > max) {
            toast.error(`UID must be between ${teacherMin} and ${teacherMax}`);
            return;
          }
        } catch (error) {
          console.error('Error validating UID range:', error);
        }
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
      if (!subjects.length || !minUid || !maxUid) {
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
        subjects,
        minUid,
        maxUid,
      });

      // Store teacher's UID range for student validation
      localStorage.setItem('teacherUidRange', JSON.stringify({ minUid, maxUid }));

      toast.success("Teacher logged in successfully 👨‍🏫");
      navigate("/teacher");
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

          {/* Username / Game Master name */}
          <div className="mb-5">
            <label className="text-sm font-bold text-[#B19EEF] uppercase tracking-wider">{person === "teacher" ? "🎮 Enter the Game Master name" : "🎮 Username"}</label>
            <input
              className="w-full mt-2 p-3 rounded-lg bg-black/80 border-2 border-[#B19EEF]/50 focus:border-[#B19EEF] focus:outline-none text-white placeholder-gray-400 transition-all duration-300 font-medium"
              type="text"
              placeholder={person === "teacher" ? "Enter the Game Master name" : "Enter your player name"}
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
                <label className="text-sm font-bold text-[#B19EEF] uppercase tracking-wider">Subjects</label>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  {[
                    { label: "Python", value: "Python" },
                    { label: "JavaScript", value: "JavaScript" },
                    { label: "Maths", value: "Maths" },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="accent-[#B19EEF]"
                        checked={subjects.includes(opt.value)}
                        onChange={(e) => {
                          setSubjects((prev) =>
                            e.target.checked
                              ? [...prev, opt.value]
                              : prev.filter((s) => s !== opt.value)
                          );
                        }}
                      />
                      <span className="text-white">{opt.label }</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-[#B19EEF]/70 mt-2">Choose one or more subjects</p>
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


          {person=="student" ?<button
            onClick={handleLogin}
            className="w-full mt-8 py-4 px-10 rounded-xl font-bold text-lg uppercase tracking-wider text-white bg-[#B19EEF] hover:bg-[#9B7FDE] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(177,158,239,0.4)] border-b-4 border-[#8B6FCE] hover:border-[#7B5FBE] relative group overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              ⚡ Enter  Battle ⚡
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button> :
          <button
            onClick={handleLogin}
            className="w-full mt-8 py-4 px-10 rounded-xl font-bold text-lg uppercase tracking-wider text-white bg-[#B19EEF] hover:bg-[#9B7FDE] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(177,158,239,0.4)] border-b-4 border-[#8B6FCE] hover:border-[#7B5FBE] relative group overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              ⚡ Start Battle ⚡
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          }
          

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
