const OptionsList = ({ options, answer, selected, onSelect, locked }) => {
  return (
    <div className="space-y-3">
      {options.map((opt, i) => {
        const isCorrect = opt === answer;
        const isSelected = opt === selected;

        return (
          <button
            key={i}
            disabled={locked}
            onClick={() => onSelect(opt)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition
              ${
                selected
                  ? isCorrect
                    ? "bg-green-600/20 border-green-500"
                    : isSelected
                    ? "bg-red-600/20 border-red-500"
                    : "bg-black/40 border-white/10"
                  : "bg-black/40 border-white/10 hover:bg-[#B19EEF]/20"
              }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};

export default OptionsList;
