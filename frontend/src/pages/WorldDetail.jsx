import { useNavigate, useParams } from "react-router-dom";
import { worldsData } from "../data/worldData";
import { useEffect, useState } from "react";
import { getCompletedStages, getPlayerStats, updateWorldProgress } from "../services/localStorage";

const WorldDetail = () => {
  const { worldId } = useParams();
  const world = worldsData.find(w => w.id === worldId);
  const navigate = useNavigate();
  const [completedStagesData, setCompletedStagesData] = useState({});
  const [stats, setStats] = useState(null);

  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"})
    setCompletedStagesData(getCompletedStages());
    setStats(getPlayerStats());
    updateWorldProgress(worldId, calculateProgress());
  },[])
  
  const calculateProgress = () => {
    const completed = getCompletedStages();
    let completedCount = 0;
    world?.zones.forEach(zone => {
      zone.stages.forEach(stage => {
        const key = `${worldId}_${zone.id}_${stage.id}`;
        if (completed[key]?.completed) completedCount++;
      });
    });
    const total = world?.zones.reduce((acc, zone) => acc + zone.stages.length, 0) || 0;
    return total > 0 ? Math.round((completedCount / total) * 100) : 0;
  };

  // Calculate total stages and completed stages
  const totalStages = world?.zones.reduce((acc, zone) => acc + zone.stages.length, 0) || 0;
  let completedCount = 0;
  world?.zones.forEach(zone => {
    zone.stages.forEach(stage => {
      const key = `${worldId}_${zone.id}_${stage.id}`;
      if (completedStagesData[key]?.completed) completedCount++;
    });
  });
  const completionPercentage = totalStages > 0 ? (completedCount / totalStages) * 100 : 0;

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
      <div
      style={{backgroundImage: `url(${world.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
      className="bg-gradient-to-r from-[#1a1f3c] to-[#0B0F1A] p-10">
        <h1 className="text-5xl font-bold mb-4">{world.name}</h1>
        <p className="text-gray-300 max-w-2xl">{world.description}</p>
        <button 
          onClick={() => {
            const firstZone = world.zones[0];
            const firstStage = firstZone?.stages[0];
            if (firstZone && firstStage) {
              navigate(`/world/${worldId}/zone/${firstZone.id}/stage/${firstStage.id}`);
            }
          }}
          className="mt-6 px-6 py-3 bg-[#B19EEF] text-black font-semibold rounded-lg hover:bg-[#9d85e0] transition-colors cursor-pointer"
        >
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
                {zone.stages.map((stage, i) => {
                  const key = `${worldId}_${zone.id}_${stage.id}`;
                  const isCompleted = completedStagesData[key]?.completed;
                  return (
                    <div
                      key={stage.id}
                      className={`flex justify-between items-center px-4 py-2 rounded-lg transition ${
                        isCompleted
                          ? 'bg-green-500/20 border border-green-500/50'
                          : 'bg-black/40 border border-white/10 hover:bg-black/60'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isCompleted && <span className="text-green-400">✓</span>}
                        {stage.name}
                      </span>

                      <button
                        onClick={() =>
                          navigate(
                            `/world/${worldId}/zone/${zone.id}/stage/${zone.stages[i].id}`
                          )
                        }
                        className="text-sm px-3 py-1 bg-[#B19EEF]/20 border border-[#B19EEF]/40 rounded hover:bg-[#B19EEF]/30 transition-colors cursor-pointer"
                      >
                        {isCompleted ? 'Review' : 'Start'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT – USER PANEL */}
        <div className="w-[320px] space-y-6">
          {/* Course Progress Section */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex gap-3 items-center">
            <img  className="h-20 " src="/assets/png&gif/gif/boy.gif" alt="boy" />
<h3 className="font-semibold text-lg">Course Progress</h3>
          </div>
            
            
            <div className="space-y-4">
              {/* Completion Stats */}
              <div className="bg-black/40 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Levels Completed</span>
                  <span className="text-2xl font-bold text-[#B19EEF]">{completedCount}/{totalStages}</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#B19EEF] to-[#9d85e0] transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{completionPercentage.toFixed(0)}% Complete</p>
              </div>

              {/* XP Stats */}
              <div className="bg-black/40 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total XP Earned</span>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#B19EEF]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-2xl font-bold text-[#B19EEF]">{stats?.totalXP || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldDetail;
