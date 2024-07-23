import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { questionsAction } from "../store/slices/questions";
import QuestionList from "../components/QuestionCreation/QuestionList";
import { DragDropContext } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../components/QuestionCreation/ConfirmationModal";

export default function QuestionCreation() {
  const startingQuestions = useSelector((state) => state.questions.questions);
  const dispatch = useDispatch();

  const { t } = useTranslation("global");

  const [questions, setQuestions] = useState(startingQuestions);
  const [showModal, setShowModal] = useState(false);

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
      alert(t("alert.maxQuestionError"));
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
      {showModal && (
        <ConfirmationModal
          open={showModal}
          onClose={() => setShowModal(false)}
          title={t("questionCreation.confirmationClearMessage")}
          onConfirm={() => {
            setQuestions([]);
            setShowModal(false);
          }}
        >
          <p>{t("questionCreation.modalText")}</p>
        </ConfirmationModal>
      )}
      <h2 className="text-3xl text-center text-accent font-bold mt-10">
        {t("questionCreation.questionsCreation")}
      </h2>
      <div className="w-80 lg:w-1/3 bg-gray-500 p-6 rounded-lg border-2 border-accent">
        <p className="text-center text-accent">
          {t("questionCreation.instructions")}
        </p>
      </div>
      <form
        className="flex flex-col justify-center gap-5"
        onSubmit={handleSubmit}
      >
        {questions.length > 0 ? (
          <div className="mb-40">
            <DragDropContext onDragEnd={handleDragEnd}>
              <QuestionList
                questions={questions}
                handleInputChange={handleInputChange}
                removeQuestion={removeQuestion}
              />
            </DragDropContext>
          </div>
        ) : (
          <div className="text-center text-accent">
            {t("questionCreation.noQuestions")}
          </div>
        )}
        <div className="fixed bottom-0 left-0 right-0 flex flex-col lg:flex-row justify-center gap-2 bg-gray-500 p-2 lg:p-6">
          <button
            type="submit"
            className="btn btn-success btn-sm lg:btn-md"
            onClick={handleSubmit}
          >
            {t("questionCreation.save")}
          </button>
          <button
            type="button"
            className="btn btn-warning btn-sm lg:btn-md"
            onClick={handleJsonGeneration}
          >
            {t("questionCreation.generateJson")}
          </button>
          <button
            type="button"
            className="btn btn-info btn-sm lg:btn-md"
            onClick={addQuestion}
          >
            {t("questionCreation.addQuestion")}
          </button>
          <button
            type="button"
            className="btn btn-error btn-sm lg:btn-md"
            onClick={() => setShowModal(true)}
          >
            {t("questionCreation.clearQuestions")}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
