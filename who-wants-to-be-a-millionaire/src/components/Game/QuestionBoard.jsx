import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function QuestionBoard({
  questionID,
  onSelectedOption,
  selectedAnswerStyle,
  selectedOption,
  setSelectedOption,
  hint,
}) {
  const questions = useSelector((state) => state.questions.questions);
  const question = questions.find((q) => q.id === questionID);

  const { t } = useTranslation("global");

  // State to store the original and filtered answers
  const [originalAnswers, setOriginalAnswers] = useState(question.answers);
  const [filteredAnswers, setFilteredAnswers] = useState(question.answers);
  const [audiencePoll, setAudiencePoll] = useState(null); // State to store audience poll percentages

  useEffect(() => {
    // Reset the filtered answers and audience poll when the question changes
    setOriginalAnswers(question.answers);
    setFilteredAnswers(question.answers);
    setAudiencePoll(null);
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
      handleAskTheAudience();
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

  const handleAskTheAudience = () => {
    const correctAnswerIndex = question.correct;

    // Generate random percentages for incorrect answers
    let incorrectPercentages = new Array(question.answers.length).fill(0);
    incorrectPercentages[correctAnswerIndex] = 0; // Placeholder for correct answer

    let totalPercentage = 0;
    for (let i = 0; i < incorrectPercentages.length; i++) {
      if (i !== correctAnswerIndex) {
        // Random percentage between 5 and 20
        const randomPercentage = Math.floor(Math.random() * 16) + 5;
        incorrectPercentages[i] = randomPercentage;
        totalPercentage += randomPercentage;
      }
    }

    // Ensure the correct answer gets the highest percentage
    const correctAnswerPercentage = Math.min(60, 100 - totalPercentage);
    incorrectPercentages[correctAnswerIndex] = correctAnswerPercentage;

    // Adjust percentages to sum up to 100
    let adjustment = 100 - totalPercentage - correctAnswerPercentage;
    if (adjustment > 0) {
      // Distribute adjustment among incorrect answers
      let adjustmentIndices = incorrectPercentages
        .map((_, index) => index)
        .filter((index) => index !== correctAnswerIndex);
      adjustmentIndices = shuffleArray(adjustmentIndices);

      for (let i = 0; i < adjustmentIndices.length; i++) {
        if (adjustment <= 0) break;
        const addPercentage = Math.min(adjustment, 10); // Add up to 10% per incorrect answer
        incorrectPercentages[adjustmentIndices[i]] += addPercentage;
        adjustment -= addPercentage;
      }
    }

    setAudiencePoll(incorrectPercentages);
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
          <Button
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
            {option && (
              <>
                {String.fromCharCode(65 + index)}. {option}
                {audiencePoll && (
                  <div className="text-xs text-base-content italic">
                    {audiencePoll[index]}% {t("game.voted")}
                  </div>
                )}
              </>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
