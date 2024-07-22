import { motion } from "framer-motion";
import { useState } from "react";
import Upload from "../components/QuestionUpload/Upload";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { questionsAction } from "../store/slices/questions";

export default function QuestionUpload() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const questions = JSON.parse(e.target.result);
          // validate the questions object later

          setQuestions(questions);
        } catch (error) {
          console.error(error);
        }
      };
      reader.readAsText(file);
    }
  }

  function handleSubmit() {
    if (questions.length === 0) {
      alert("Please upload a file first");
      return;
    }
    dispatch(questionsAction.setQuestions(questions));
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center max-h-screen">
      <motion.div
        className="flex flex-col gap-2 items-center justify-center font-bold p-28 rounded-lg bg-gray-200 bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl text-center text-accent font-bold mt-10">
          Question Upload
        </h2>
        <p>
          Please upload a JSON file for the questions. The file should be in the
          following format:
        </p>
        <pre className="bg-gray-300 p-4 rounded-lg text-sm text-base-300">
          {`{
    "questions": [
        {
            "id": 1,
            "question": "What is the capital of France?",
            "answers": ["Paris", "London", "Berlin", "Madrid"],
            "correctAnswer": 0
        },
        {
            "id": 2,
            "question": "What is the capital of Spain?",
            "answers": ["Paris", "London", "Berlin", "Madrid"],
            "correctAnswer": 3
        }
    ]
}`}
        </pre>
        <Upload
          onFileUpload={handleFileUpload}
          fileTypes=".json"
          className="flex flex-col gap-2 items-center justify-center bg-base-300 rounded-l shadow-lg"
        />
        <Button
          className="bg-accent text-white font-bold py-2 px-4 rounded-r"
          onClick={handleSubmit}
        >
          Start Game
        </Button>
      </motion.div>
    </div>
  );
}
