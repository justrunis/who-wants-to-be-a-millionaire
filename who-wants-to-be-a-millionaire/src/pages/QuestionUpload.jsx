import { motion } from "framer-motion";
import { useState } from "react";
import Upload from "../components/QuestionUpload/Upload";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { questionsAction } from "../store/slices/questions";
import UploadInstructions from "../components/QuestionUpload/UploadInstructions";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { fetchQuestions } from "../api/http";

export default function QuestionUpload() {
  const [questions, setQuestions] = useState([]);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["random-questions"],
    queryFn: fetchQuestions,
  });

  const { t } = useTranslation("global");

  function handleFileUpload(e) {
    setFile(e.target.files[0]);
  }

  function validateQuestions(questions) {
    if (!Array.isArray(questions) || questions.length !== 15) {
      return t("alert.questionCountError");
    }

    for (let question of questions) {
      if (
        typeof question.id !== "number" ||
        typeof question.question !== "string" ||
        !Array.isArray(question.answers) ||
        question.answers.length !== 4 ||
        question.answers.some((answer) => typeof answer !== "string") ||
        typeof question.correct !== "number" ||
        question.correct < 0 ||
        question.correct >= question.answers.length
      ) {
        return "Invalid question format.";
      }
    }

    return null;
  }

  function handleSubmit() {
    if (!file) {
      alert(t("alert.noFileError"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const questions = JSON.parse(e.target.result);
        const validationError = validateQuestions(questions);
        if (validationError) {
          alert(validationError);
          return;
        }

        setQuestions(questions);
        dispatch(questionsAction.setQuestions(questions));
        navigate("/");
      } catch (error) {
        alert(t("alert.JSONError") + error.message);
        console.error(error);
      }
    };
    reader.readAsText(file);
  }

  function generateRandomQuestions() {
    if (data) {
      const formattedData = data.results.map((question, index) => {
        const allAnswers = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];

        const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

        const correctAnswerIndex = shuffledAnswers.indexOf(
          question.correct_answer
        );

        return {
          id: index + 1,
          question: question.question,
          answers: shuffledAnswers,
          correct: correctAnswerIndex,
        };
      });
      dispatch(questionsAction.setQuestions(formattedData));
      navigate("/");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        className="flex flex-col gap-2 items-center justify-center font-bold mt-2 p-4 lg:p-28 rounded-lg bg-gray-200 bg-opacity-50 w-full max-w-lg lg:max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <UploadInstructions />
        <Upload
          onFileUpload={handleFileUpload}
          fileTypes=".json"
          className="flex flex-col gap-2 items-center justify-center font-bold p-18 rounded-lg bg-base-300"
        />
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-center">
          <Button
            className="bg-accent text-white font-bold py-2 px-4 rounded-lg mt-4"
            onClick={handleSubmit}
          >
            {t("questionUpload.uploadQuestions")}
          </Button>
          <Button
            className="bg-accent text-white font-bold py-2 px-4 rounded-lg mt-4"
            onClick={generateRandomQuestions}
          >
            Generate random questions
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
