const ChallengeHeader = ({ world, stage, xp }) => {
  return (
    <div className="flex justify-between items-center border-b border-white/10 pb-3">
      <div>
        <p className="text-sm text-gray-400">{world}</p>
        <h2 className="font-semibold">{stage}</h2>
      </div>

      <div className="text-sm text-[#B19EEF] font-semibold">
        +{xp} XP
      </div>
    </div>
  );
};

export default ChallengeHeader;
    