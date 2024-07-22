import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { questionsAction } from "../store/slices/questions";
import QuestionList from "../components/QuestionCreation/QuestionList";
import { DragDropContext } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";

export default function QuestionCreation() {
  const startingQuestions = useSelector((state) => state.questions.questions);
  const dispatch = useDispatch();

  const { t } = useTranslation("global");

  const [questions, setQuestions] = useState(startingQuestions);

  const handleInputChange = (e, questionIndex, answerIndex = null) => {
    const { id, value, type } = e.target;

    setQuestions((prevQuestions) =>
      prevQuestions.map((q, qIndex) => {
        if (qIndex === questionIndex) {
          if (answerIndex === null) {
            // Update question text
            return { ...q, [id]: value };
          } else if (type === "text") {
            // Update answer text
            const updatedAnswers = q.answers.map((a, aIndex) =>
              aIndex === answerIndex ? value : a
            );
            return {
              ...q,
              answers: updatedAnswers,
            };
          } else if (type === "checkbox") {
            // Update correct answer
            return {
              ...q,
              correct: answerIndex,
            };
          }
        }
        return q;
      })
    );
  };

  const addQuestion = () => {
    if (questions.length < 15) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        { question: "", answers: ["", "", "", ""], correct: 0 },
      ]);
    } else {
      alert("You can only have a maximum of 15 questions.");
    }
  };

  const removeQuestion = (questionIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, index) => index !== questionIndex)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(questionsAction.setQuestions(questions));
  };

  const handleJsonGeneration = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(questions)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "questions.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

    // clean up
    document.body.removeChild(element);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedQuestions = Array.from(questions);
    const [movedQuestion] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, movedQuestion);

    setQuestions(reorderedQuestions);
  };

  return (
    <motion.div
      className="flex flex-col gap-2 items-center justify-center font-bold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl text-center text-accent font-bold mt-10">
        {t("questionCreation.questionsCreation")}
      </h2>
      <form
        className="flex flex-col justify-center gap-5"
        onSubmit={handleSubmit}
      >
        <div className="mb-40">
          <DragDropContext onDragEnd={handleDragEnd}>
            <QuestionList
              questions={questions}
              handleInputChange={handleInputChange}
              removeQuestion={removeQuestion}
            />
          </DragDropContext>
        </div>
        <div className="fixed bottom-0 left-0 right-0 flex flex-row justify-center gap-2 bg-gray-500 p-6">
          <button
            type="submit"
            className="btn btn-success"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleJsonGeneration}
          >
            Generate JSON
          </button>
          <button type="button" className="btn btn-info" onClick={addQuestion}>
            Add question
          </button>
        </div>
      </form>
    </motion.div>
  );
}
