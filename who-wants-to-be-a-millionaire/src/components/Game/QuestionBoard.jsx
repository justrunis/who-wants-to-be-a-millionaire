import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { questions } from "../../data/questions";

export default function QuestionBoard({
  questionID,
  onSelectedOption,
  selectedAnswerStyle,
  selectedOption,
  setSelectedOption,
  hint,
}) {
  const question = questions.find((q) => q.id === questionID);

  // State to store the original and filtered answers
  const [originalAnswers, setOriginalAnswers] = useState(question.answers);
  const [filteredAnswers, setFilteredAnswers] = useState(question.answers);

  useEffect(() => {
    // Reset the filtered answers when the question changes
    setOriginalAnswers(question.answers);
    setFilteredAnswers(question.answers);
    setSelectedOption(null); // Clear selected option when question changes
  }, [questionID]);

  useEffect(() => {
    if (hint === "fiftyFifty") {
      handleFiftyFifty();
    } else if (hint === "askTheHost") {
      handleAskTheHost();
    } else if (hint === "phoneAFriend") {
      // Do nothing for now
    } else if (hint === "askTheAudience") {
      // Leave empty for now
    }
  }, [hint]);

  const handleFiftyFifty = () => {
    const correctAnswerIndex = question.correct;
    let incorrectAnswers = question.answers
      .map((answer, index) => (index !== correctAnswerIndex ? index : null))
      .filter((index) => index !== null);

    // Randomly pick two incorrect answers to remove
    incorrectAnswers = shuffleArray(incorrectAnswers).slice(0, 2);

    const newAnswers = question.answers.map((answer, index) =>
      incorrectAnswers.includes(index) ? "" : answer
    );

    setFilteredAnswers(newAnswers);
  };

  const handleAskTheHost = () => {
    const correctAnswerIndex = question.correct;

    const newAnswers = question.answers.map((answer, index) =>
      index === correctAnswerIndex ? answer : ""
    );

    setFilteredAnswers(newAnswers);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="w-1/2 p-50">
      <div className="flex flex-col items-center justify-center gap-4 bg-base-100 p-8 rounded-lg border-2 border-secondary mb-5">
        <h2 className="text-2xl text-center">{question.question}</h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {filteredAnswers.map((option, index) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={index}
            onClick={() => {
              setSelectedOption(index);
              onSelectedOption(index);
            }}
            className={`p-2 bg-base-100 text-base-content rounded-lg border-2 border-secondary ${
              selectedOption === index ? selectedAnswerStyle : ""
            }`}
            disabled={!option} // Disable empty buttons
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
