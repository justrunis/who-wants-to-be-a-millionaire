import { motion } from "framer-motion";
import bgImage from "../assets/background.jpg";
import Pyramid from "../components/Game/Pyramid";
import useSound from "use-sound";
import startSound from "../assets/src_sounds_play.mp3";
import correct from "../assets/src_sounds_correct.mp3";
import wrong from "../assets/src_sounds_wrong.mp3";
import { useEffect, useState } from "react";
import QuestionBoard from "../components/Game/QuestionBoard";
import { questions } from "../data/questions";
import { moneyLevels } from "../data/money";
import GameOverModal from "../components/Game/GameOverModal";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";

export default function Game({ playerName }) {
  const navigate = useNavigate();

  const [play] = useSound(startSound);
  const [playCorrect] = useSound(correct);
  const [playWrong] = useSound(wrong);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswerStyle, setSelectedAnswerStyle] =
    useState("bg-yellow-500");
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [currentHint, setCurrentHint] = useState(null);

  const [showVictoryModal, setShowVictoryModal] = useState(false);

  useEffect(() => {
    play();
  }, [play]);

  function handleSelectedOption(option) {
    if (option === questions[currentQuestion - 1].correct) {
      setTimeout(() => {
        setSelectedAnswerStyle("bg-green-500");
        setCurrentHint(null);
        playCorrect();
      }, 2000);
      if (currentQuestion !== 15) {
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
          setCurrentHint(null);
          setSelectedAnswerStyle("bg-yellow-500");
        }, 3000);
      }

      if (currentQuestion === questions.length) {
        setTimeout(() => {
          setSelectedOption(null);
          setSelectedAnswerStyle("bg-yellow-500");
          setShowVictoryModal(true);
          setCurrentHint(null);
        }, 2000);
      }
    } else {
      setTimeout(() => {
        setSelectedAnswerStyle("bg-red-500");
        playWrong();
        setShowModal(true);
      }, 2000);
    }
  }

  function RestartGame() {
    setCurrentQuestion(1);
    setShowModal(false);
    setShowVictoryModal(false);
    setSelectedOption(null);
    setSelectedAnswerStyle("bg-yellow-500");
  }

  function handleHint(hint) {
    setTimeout(() => {
      setCurrentHint(hint);
    }, 2000);
  }

  return (
    <div className="flex flex-col justify-center items-center lg:flex-row h-screen">
      <div
        className="flex flex-col items-center justify-center h-full w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        {showModal && (
          <GameOverModal
            className="w-100 p-4 rounded-lg shadow-lg dark:shadow-primary-dark"
            playerName={playerName}
            title="Game Over"
            moneyAmount={
              currentQuestion > 1
                ? moneyLevels[currentQuestion - 2].amount
                : "€0"
            }
            open={showModal}
            onClose={RestartGame}
            onRestart={RestartGame}
          />
        )}
        {showVictoryModal && (
          <GameOverModal
            className="w-100 p-4 rounded-lg shadow-lg dark:shadow-primary-dark"
            playerName={playerName}
            title="Congratulations"
            moneyAmount={moneyLevels[moneyLevels.length - 1].amount}
            open={showVictoryModal}
            onClose={() => {
              setCurrentQuestion(1);
              setShowVictoryModal(false);
              setSelectedOption(null);
            }}
            onRestart={RestartGame}
          />
        )}
        <QuestionBoard
          questionID={currentQuestion}
          onSelectedOption={handleSelectedOption}
          selectedAnswerStyle={selectedAnswerStyle}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          hint={currentHint}
        />
      </div>
      <div className="flex lg:flex-col items-center justify-center h-full w-1/2 lg:w-1/4 bg-base-100">
        <div className="flex flex-col gap-2 items-center justify-center mt-4">
          <h3 className="text-base-content text-2xl text-center">
            Player: {playerName ? playerName : "Unknown"}
          </h3>
          <div className="flex flex-col justify-center items-center lg:flex-row gap-2">
            {currentQuestion > 1 && (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="p-2 bg-base-300 text-base-content rounded-lg border-2 border-secondary"
              >
                Previous Question
              </Button>
            )}
            {currentQuestion < questions.length && (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="p-2 bg-base-300 text-base-content rounded-lg border-2 border-secondary"
              >
                Next Question
              </Button>
            )}
          </div>
        </div>
        <Pyramid
          currentQuestion={currentQuestion}
          onHintSelect={(hint) => handleHint(hint)}
        />
      </div>
    </div>
  );
}
