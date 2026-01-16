import { useParams } from "react-router-dom";



export const worldData = {
  python: {
    id: 1,
    name: "Python",
    description:
      "Learn programming fundamentals such as variables, control flow, and loops using Python.",
    zones: [
      {
        id: 1,
        name: "Hello World",
        stages: [
          "Setting Up",
          "Hello World",
          "Patterns",
          "Variables",
        ],
      },
      {
        id: 2,
        name: "Variables",
        stages: ["Numbers", "Strings", "Input"],
      },
      {
        id: 3,
        name: "Control Flow",
        stages: ["If Else", "Conditions", "Logic"],
      },
    ],
  },

  javascript: {
    id:2,
    name: "JavaScript",
    description:
      "Learn JavaScript fundamentals for building modern web applications.",
    zones: [
      {
        id: 1,
        name: "Basics",
        stages: ["Variables", "Data Types"],
      },
    ],
  },
};




const WorldDetail = () => {
  const { worldId } = useParams();
  const world = worldData[worldId];

  if (!world) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        World not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-[#1a1f3c] to-[#0B0F1A] p-10">
        <h1 className="text-5xl font-bold mb-4">{world.name}</h1>
        <p className="text-gray-300 max-w-2xl">
          {world.description}
        </p>
        <button className="mt-6 px-6 py-3 bg-[#B19EEF] text-black font-semibold rounded-lg">
          Start Learning
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex px-10 py-10 gap-10">

        {/* LEFT – MAP */}
        <div className="flex-1 space-y-6">
          {world.zones.map((zone, index) => (
            <div
              key={zone.id}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4">
                {index + 1}. {zone.name}
              </h2>

              <div className="space-y-2">
                {zone.stages.map((stage, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-black/40 px-4 py-2 rounded-lg"
                  >
                    <span>{stage}</span>
                    <button className="text-sm px-3 py-1 bg-[#B19EEF]/20 border border-[#B19EEF]/40 rounded">
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT – USER PANEL */}
        <div className="w-[320px] bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-lg">Your Progress</h3>
            <p className="text-gray-400 text-sm">Level 1 Beginner</p>
          </div>

          <div>
            <p className="text-sm mb-1">XP Progress</p>
            <div className="w-full h-2 bg-gray-700 rounded">
              <div className="h-full w-1/3 bg-[#B19EEF]" />
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Exercises</span>
              <span>2 / 20</span>
            </div>
            <div className="flex justify-between">
              <span>Projects</span>
              <span>0</span>
            </div>
          </div>

          <button className="w-full py-3 bg-[#B19EEF] text-black font-semibold rounded-lg">
            Continue
          </button>
        </div>

      </div>
    </div>
  );
};

export default WorldDetail;
