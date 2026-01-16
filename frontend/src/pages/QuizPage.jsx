import { useNavigate, useParams } from "react-router-dom";
import { worldData } from "../data/worldData";
import { useState } from "react";

const QuizPage = () => {
  const { worldId, zoneId, stageId } = useParams();
  const navigate = useNavigate();

  const stage =
    worldData[worldId]?.zones
      .find((z) => z.id === Number(zoneId))
      ?.stages.find((s) => s.id === Number(stageId));

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!stage) {
    return <div className="text-white p-10">Quiz not found</div>;
  }

  const question = stage.questions[current];

  const handleAnswer = (option) => {
    setSelected(option);

    if (option === question.answer) {
      setScore((prev) => prev + 1);
      setTimeout(() => {
        nextQuestion();
      }, 600);
    } else {
      setShowExplanation(true);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowExplanation(false);
    setCurrent((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(60%_60%_at_20%_10%,_rgba(177,158,239,0.12),_transparent_60%),radial-gradient(50%_50%_at_80%_20%,_rgba(177,158,239,0.08),_transparent_55%),linear-gradient(135deg,_#05060b_0%,_#0b0f1a_45%,_#05060b_100%)] text-white flex items-center justify-center">
      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-xl p-8">

        <h1 className="text-2xl font-bold mb-2">
          {stage.name} – Quiz
        </h1>

        <p className="text-sm text-gray-400 mb-6">
          Question {current + 1} of {stage.questions.length}
        </p>

        {current < stage.questions.length ? (
          <>
            <h2 className="text-lg mb-6">{question.q}</h2>

            <div className="space-y-3">
              {question.options.map((opt, i) => {
                const isCorrect = opt === question.answer;
                const isSelected = opt === selected;

                return (
                  <button
                    key={i}
                    disabled={showExplanation}
                    onClick={() => handleAnswer(opt)}
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

            {/* EXPLANATION */}
            {showExplanation && (
              <div className="mt-6 bg-white/10 border border-white/20 rounded-lg p-4">
                <p className="text-sm text-red-400 mb-1">❌ Incorrect</p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-white">Explanation: </span>
                  {question.explanation}
                </p>

                <button
                  onClick={nextQuestion}
                  className="mt-4 px-4 py-2 bg-[#B19EEF] text-black rounded-md font-semibold"
                >
                  Next Question
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed 🎉</h2>
            <p className="text-lg mb-6">
              Score: {score} / {stage.questions.length}
            </p>
            <button
              onClick={() => navigate(`/world/${worldId}`)}
              className="mt-4 px-6 py-3 bg-[#B19EEF] text-black font-semibold rounded-lg hover:bg-[#9d85e0] transition-colors cursor-pointer"
            >
              Back to World
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
