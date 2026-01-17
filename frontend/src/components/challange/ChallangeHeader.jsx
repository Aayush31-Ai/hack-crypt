const ChallengeHeader = ({ world, stage, xp }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/10 pb-3 gap-2">
      <div className="min-w-0">
        <p className="text-xs sm:text-sm text-gray-400 truncate">{world}</p>
        <h2 className="font-semibold text-sm sm:text-base truncate">{stage}</h2>
      </div>

      <div className="text-xs sm:text-sm text-[#B19EEF] font-semibold flex-shrink-0">
        +{xp} XP
      </div>
    </div>
  );
};

export default ChallengeHeader;
    