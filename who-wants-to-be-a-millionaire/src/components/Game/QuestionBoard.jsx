import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { questions } from "../../data/questions";

export default function QuestionBoard({
  questionID,
  onSelectedOption,
  selectedAnswerStyle,
  selectedOption,
  setSelectedOption,
}) {
  const question = questions.find((q) => q.id === questionID);

  return (
    <div className="w-1/2 p-50">
      <div className="flex flex-col items-center justify-center gap-4 bg-base-100 p-8 rounded-lg border-2 border-secondary mb-5">
        <h2 className="text-2xl text-center">{question.question}</h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {question.answers.map((option, index) => (
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
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
