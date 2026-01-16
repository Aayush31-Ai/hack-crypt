import { useState } from 'react';
import { X, CheckCircle, XCircle, Trophy } from 'lucide-react';
import CurrentUser from '../../playerData/CurrentUser';

const ChallengeQuiz = ({ challenge, onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Quiz questions based on challenge
  const questions = generateQuestionsForChallenge(challenge);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
      setTimeout(() => {
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowExplanation(false);
        } else {
          setQuizCompleted(true);
        }
      }, 1000);
    } else {
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleComplete = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 70) {
      // Update CurrentUser XP
      CurrentUser.xp += challenge.xpReward;
      console.log(`XP Updated! New XP: ${CurrentUser.xp}`);
    }
    onComplete(score, percentage);
  };

  if (quizCompleted) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
        <div className="bg-[#0b1220] border border-white/20 rounded-2xl p-8 max-w-md w-full relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="text-center">
            {passed ? (
              <>
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${challenge.color} flex items-center justify-center text-5xl mx-auto mb-6 shadow-[0_0_40px_rgba(168,85,247,0.5)]`}>
                  🎉
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Challenge Completed!
                </h2>
                <p className="text-gray-400 mb-6">
                  Congratulations! You've successfully completed the challenge.
                </p>
              </>
            ) : (
              <>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-5xl mx-auto mb-6">
                  😔
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Keep Trying!
                </h2>
                <p className="text-gray-400 mb-6">
                  You need 70% to pass. Try again!
                </p>
              </>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-1">Score</p>
                <p className="text-2xl font-bold text-white">{score}/{questions.length}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-1">Percentage</p>
                <p className="text-2xl font-bold text-white">{percentage.toFixed(0)}%</p>
              </div>
            </div>

            {passed && (
              <div className="bg-violet-900/30 border border-violet-500/50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-violet-300">
                  <Trophy size={20} />
                  <span className="font-bold">+{challenge.xpReward} XP Earned!</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!passed && (
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setScore(0);
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                    setQuizCompleted(false);
                  }}
                  className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold transition-all"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={passed ? handleComplete : onClose}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  passed
                    ? 'bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {passed ? 'Claim Rewards' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="bg-[#0b1220] border border-white/20 rounded-2xl p-8 max-w-2xl w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${challenge.color} flex items-center justify-center text-2xl`}>
                {challenge.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{challenge.title}</h2>
                <p className="text-sm text-gray-400">Question {currentQuestion + 1} of {questions.length}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Score</p>
              <p className="text-xl font-bold text-violet-400">{score}/{questions.length}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${challenge.color} transition-all duration-300`}
              style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-6">{question.question}</h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.correct;
              const showResult = selectedAnswer !== null;

              return (
                <button
                  key={idx}
                  onClick={() => !selectedAnswer && handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    !showResult
                      ? 'border-white/20 hover:border-violet-500/50 hover:bg-white/5'
                      : isSelected && isCorrect
                      ? 'border-green-500 bg-green-900/20'
                      : isSelected && !isCorrect
                      ? 'border-red-500 bg-red-900/20'
                      : isCorrect && showResult
                      ? 'border-green-500 bg-green-900/20'
                      : 'border-white/10 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{option}</span>
                    {showResult && isSelected && isCorrect && (
                      <CheckCircle size={20} className="text-green-400" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle size={20} className="text-red-400" />
                    )}
                    {showResult && !isSelected && isCorrect && (
                      <CheckCircle size={20} className="text-green-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-xl">
            <p className="text-sm font-semibold text-yellow-300 mb-2">💡 Explanation:</p>
            <p className="text-sm text-gray-300">{question.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        {showExplanation && (
          <button
            onClick={handleNext}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-bold transition-all"
          >
            Next Question →
          </button>
        )}
      </div>
    </div>
  );
};

// Generate questions based on challenge type
function generateQuestionsForChallenge(challenge) {
  const questionBank = {
    1: [ // Python Basics
      {
        question: "What is the correct way to declare a variable in Python?",
        options: ["var x = 5", "x = 5", "int x = 5", "let x = 5"],
        correct: "x = 5",
        explanation: "In Python, you simply assign a value to a variable name without declaring its type."
      },
      {
        question: "Which data type is '42' in Python?",
        options: ["String", "Integer", "Float", "Boolean"],
        correct: "String",
        explanation: "The quotes around 42 make it a string. Without quotes, it would be an integer."
      }
    ],
    5: [ // Speed Coder Challenge
      {
        question: "What is the output of: print(type([]))?",
        options: ["<class 'list'>", "<class 'dict'>", "<class 'tuple'>", "<class 'set'>"],
        correct: "<class 'list'>",
        explanation: "Square brackets [] represent an empty list in Python."
      },
      {
        question: "Which operator is used for exponentiation in Python?",
        options: ["^", "**", "//", "%"],
        correct: "**",
        explanation: "The ** operator is used for exponentiation. For example, 2**3 equals 8."
      },
      {
        question: "What is the result of: 10 // 3?",
        options: ["3.33", "3", "3.0", "4"],
        correct: "3",
        explanation: "The // operator performs floor division, returning only the integer part."
      }
    ],
    6: [ // Logic Master Sprint
      {
        question: "What is the result of: True and False?",
        options: ["True", "False", "None", "Error"],
        correct: "False",
        explanation: "The 'and' operator returns True only if both operands are True."
      },
      {
        question: "What is the output of: bool(0)?",
        options: ["True", "False", "0", "None"],
        correct: "False",
        explanation: "In Python, 0 is considered falsy, so bool(0) returns False."
      }
    ]
  };

  return questionBank[challenge.id] || [
    {
      question: "What is Python?",
      options: ["A programming language", "A snake", "A framework", "A database"],
      correct: "A programming language",
      explanation: "Python is a high-level, interpreted programming language."
    }
  ];
}

export default ChallengeQuiz;
