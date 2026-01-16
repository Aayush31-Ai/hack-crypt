import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const worlds = [
  {
    id: "python",
    name: "Code Realm",
    subtitle: "Programming Fundamentals",
    progress: 45,
    status: "active",
  },
  {
    id: 2,
    name: "Logic Realm",
    subtitle: "Maths & Problem Solving",
    progress: 20,
    status: "active",
  },
  {
    id: 3,
    name: "Force Realm",
    subtitle: "Physics Concepts",
    progress: 0,
    status: "active",
  },
  {
    id: "javascript",
    name: "JavaScript",
    subtitle: "Data Structures",
    progress: 0,
    status: "active",
  },
];

const Worlds = () => {

  useEffect(()=>{
window.scrollTo({top:0,behavior:"smooth"})
  },[])

    const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-black text-white px-10 py-12">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Choose Your <span className="text-[#B19EEF]">World</span>
        </h1>
        <p className="text-gray-400 mt-2">
          Each world is a new learning adventure. Progress through zones and stages to level up.
        </p>
      </div>

      {/* Worlds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {worlds.map((world) => (
          <div
            key={world.id}
            onClick={() => navigate(`/world/${world.id}`)}
            className={`relative rounded-2xl border backdrop-blur-lg p-6 transition 
              ${
                world.status === "locked"
                  ? "border-white/10 bg-white/5 opacity-50"
                  : "border-[#B19EEF]/40 bg-white/5 hover:scale-[1.02]"
              }`}
          >
            {/* World Title */}
            <div className="h-40">
                <img className="object-cover h-full w-full" src="\assets\png&gif\gif\grass&Rock-snake.gif" alt="" />
            </div>
            <h2 className="text-2xl mt-4 font-bold mb-1">{world.name}</h2>
            <p className="text-sm text-gray-400 mb-6">{world.subtitle}</p>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{world.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded overflow-hidden">
                <div
                  className="h-full bg-[#B19EEF]"
                  style={{ width: `${world.progress}%` }}
                />
              </div>
            </div>

            {/* CTA */}
            {world.status === "locked" ? (
              <button
                disabled
                className="w-full py-3 rounded-lg bg-white/10 text-gray-400 cursor-not-allowed"
              >
                Locked
              </button>
            ) : (
              <button
                className="w-full py-3 rounded-lg bg-[#B19EEF] text-black font-semibold hover:brightness-110 transition"
              >
                Enter World
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Worlds;
