const QuestionCard = ({ question, index, total }) => {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-2">
        Question {index + 1} of {total}
      </p>
      <h1 className="text-xl font-semibold">
        {question}
      </h1>
    </div>
  );
};

export default QuestionCard;
