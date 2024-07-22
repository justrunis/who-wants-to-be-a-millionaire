import { motion } from "framer-motion";

export default function UploadInstructions() {
  return (
    <motion.div
      className="flex flex-col gap-2 items-center justify-center font-bold"
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
        <li>
          The <code>answer</code> field should be the index of the correct
          answer in the <code>answers</code> array (starting from 0).
        </li>
        <li>
          The array must have 15 questions, each with a unique <code>id</code>.
        </li>
      </ul>
    </motion.div>
  );
}
