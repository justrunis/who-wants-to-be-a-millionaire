import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function UploadInstructions() {
  const { t } = useTranslation("global");

  return (
    <motion.div
      className="flex flex-col gap-2 items-center justify-center font-bold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl text-center text-accent font-bold mt-10">
        {t("questionUpload.questionUpload")}
      </h2>
      <p>{t("questionUpload.questionUploadText1")}</p>
      <pre className="bg-gray-300 p-4 rounded-lg text-sm text-base-300">
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
      <ul className="flex flex-col gap-2 text-left bg-gray-300 text-base-300 p-4 rounded-lg">
        <li>{t("questionUpload.questionUploadText2")}</li>
        <li>{t("questionUpload.questionUploadText3")}</li>
      </ul>
    </motion.div>
  );
}
