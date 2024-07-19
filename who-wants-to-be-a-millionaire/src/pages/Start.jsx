import { motion } from "framer-motion";
import Input from "../components/UI/Input";
import { useNavigate } from "react-router-dom";

export default function Start({ onNameChange }) {
  const navigate = useNavigate();

  function handleNameSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    onNameChange(name);
    navigate("/game");
  }

  return (
    <div className="flex items-center justify-center max-h-screen">
      <motion.div
        className="flex flex-col gap-2 items-center justify-center font-bold  p-28 rounded-lg bg-gray-200 bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl text-center">Who Wants to Be a Millionaire?</h1>
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleNameSubmit}
        >
          <Input
            label="Enter your name"
            labelClass="text-center"
            placeholder="Your name"
            id="name"
            type="text"
            containerClass="mt-4"
            className="mt-2 bg-base-100 text-base-content p-2 rounded-lg"
            delay={0.4}
          />
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            type="submit"
            className="mt-4 bg-base-100 text-base-content p-2 rounded-lg"
          >
            Start the game
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
