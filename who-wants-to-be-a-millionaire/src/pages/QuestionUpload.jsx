import { motion } from "framer-motion";
import { useState } from "react";
import Upload from "../components/QuestionUpload/Upload";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { questionsAction } from "../store/slices/questions";
import UploadInstructions from "../components/QuestionUpload/UploadInstructions";

export default function QuestionUpload() {
  const [questions, setQuestions] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleFileUpload(e) {
    setFile(e.target.files[0]);
  }

  function validateQuestions(questions) {
    if (!Array.isArray(questions) || questions.length !== 15) {
      return "Please upload a file with 15 questions.";
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
      alert("Please upload a file first.");
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
        alert("Error parsing JSON: " + error.message);
        console.error(error);
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="flex items-center justify-center max-h-screen">
      <motion.div
        className="flex flex-col gap-2 items-center justify-center font-bold p-28 rounded-lg bg-gray-200 bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <UploadInstructions />
        <Upload
          onFileUpload={handleFileUpload}
          fileTypes=".json"
          className="flex flex-col gap-2 items-center justify-center bg-base-300 rounded-l shadow-lg"
        />
        <Button
          className="bg-accent text-white font-bold py-2 px-4 rounded-r"
          onClick={handleSubmit}
        >
          Upload Questions
        </Button>
      </motion.div>
    </div>
  );
}
