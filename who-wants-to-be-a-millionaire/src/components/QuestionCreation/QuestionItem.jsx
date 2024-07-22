import Input from "../UI/Input";
import { motion } from "framer-motion";
import { MdOutlineCancel } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function QuestionItem({
  provided,
  question,
  questionIndex,
  handleInputChange,
  removeQuestion,
  delay = 0,
}) {
  const inputClassName =
    "bg-base-100 rounded-lg border-2 border-accent h-10 w-50 p-2";
  const inputLabelClassName = "text-accent font-bold";

  const { t } = useTranslation("global");

  const handleRemoveQuestion = () => {
    // add confirmation alert
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay }}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="relative flex flex-col items-center lg:items-start gap-5 mb-5 bg-gray-500 p-4 rounded-lg shadow-md"
    >
      {/* Icon for removing question */}
      <MdOutlineCancel
        className="absolute top-2 right-2 text-red-600 cursor-pointer"
        size={24}
        onClick={() => removeQuestion(questionIndex)}
      />
      <h1 className="text-2xl text-start text-accent font-bold">
        {t("questionCreation.question")} {questionIndex + 1}
      </h1>
      <Input
        label={`${t("questionCreation.question")} ${questionIndex + 1}`}
        labelClass={inputLabelClassName}
        isTextArea={true}
        type="text"
        id="question"
        className={`${inputClassName} lg:w-full`}
        value={question.question}
        onChange={(e) => handleInputChange(e, questionIndex)}
      />
      <div className="flex flex-col lg:flex-row gap-2">
        {question.answers.map((answer, answerIndex) => (
          <div
            key={answerIndex}
            className="flex flex-row items-center justify-center ml-5 lg:ml-0 gap-2"
          >
            <Input
              label={`${t("questionCreation.answer")} ${answerIndex + 1}`}
              labelClass={inputLabelClassName}
              type="text"
              id={`answer${answerIndex}`}
              className={inputClassName}
              value={answer}
              onChange={(e) => handleInputChange(e, questionIndex, answerIndex)}
            />
            <Input
              label=""
              type="checkbox"
              id={String(answerIndex)}
              checked={question.correct === answerIndex}
              onChange={(e) => handleInputChange(e, questionIndex, answerIndex)}
              containerClass="self-end"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
