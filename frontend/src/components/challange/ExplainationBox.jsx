const ExplanationBox = ({ explanation, onNext }) => {
  return (
    <div className="bg-white/10 border border-white/20 rounded-lg p-4 space-y-3">
      <p className="text-red-400 font-semibold">❌ Incorrect</p>
      <p className="text-sm text-gray-300">
        <span className="font-semibold text-white">Explanation: </span>
        {explanation}
      </p>

      <button
        onClick={onNext}
        className="px-4 py-2 bg-[#B19EEF] text-black rounded-md font-semibold"
      >
        Next Question
      </button>
    </div>
  );
};

export default ExplanationBox;
