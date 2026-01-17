const ExplanationBox = ({ explanation, onNext }) => {
  return (
    <div className="bg-white/10 border border-white/20 rounded-lg p-3 sm:p-4 space-y-3">
      <p className="text-red-400 font-semibold text-sm sm:text-base">❌ Incorrect</p>
      <p className="text-xs sm:text-sm text-gray-300">
        <span className="font-semibold text-white">Explanation: </span>
        {explanation}
      </p>

      <button
        onClick={onNext}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#B19EEF] text-black rounded-md font-semibold text-sm sm:text-base hover:bg-[#9d85e0] transition-colors"
      >
        Next Question
      </button>
    </div>
  );
};

export default ExplanationBox;
