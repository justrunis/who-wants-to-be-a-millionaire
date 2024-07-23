import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function UploadInstructions() {
  const { t } = useTranslation("global");

  return (
    <motion.div
      className="flex flex-col gap-2 items-center justify-center font-bold w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-2xl lg:text-3xl text-center text-accent font-bold mt-10">
        {t("questionUpload.questionUpload")}
      </h2>
      <p className="text-center text-sm lg:text-base">
        {t("questionUpload.questionUploadText1")}
      </p>
      <pre className="bg-gray-300 p-2 lg:p-4 rounded-lg text-xs lg:text-sm text-base-300 w-full max-w-md overflow-x-auto">
        {`{
    "questions": [
        {
            "id": 1,
            "question": "What is the capital of France?",
            "answers": ["Paris", "London", "Berlin", "Madrid"],
            "answer": 0
        },
        {
            "id": 2,
            "question": "What is the capital of Spain?",
            "answers": ["Paris", "London", "Berlin", "Madrid"],
            "answer": 3
        }
    ]
}`}
      </pre>
      <ul className="flex flex-col justify-center items-center gap-2 text-left p-2 lg:p-4 rounded-lg w-full max-w-md">
        <li className="text-sm lg:text-base">
          {t("questionUpload.questionUploadText2")}
        </li>
        <li className="text-sm lg:text-base">
          {t("questionUpload.questionUploadText3")}
        </li>
      </ul>
    </motion.div>
  );
}
