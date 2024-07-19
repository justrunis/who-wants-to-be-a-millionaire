import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-accent text-center mb-6">About</h1>
      <p className="text-lg mb-4">
        This is a quiz app created with React and Framer Motion. It is based on
        the popular TV show{" "}
        <span className="font-semibold">Who Wants to Be a Millionaire?</span>
      </p>
      <p className="text-lg mb-4">
        The questions are stored in a separate file and are displayed one at a
        time. The player can choose from four possible answers and must answer
        each question before moving on to the next one.
      </p>
      <p className="text-lg mb-4">
        The player can also use four lifelines to help them answer the
        questions. These lifelines include:
        <ul className="list-disc list-inside ml-5 mt-2">
          <li>
            <span className="font-semibold">50/50:</span> Remove two incorrect
            answers.
          </li>
          <li>
            <span className="font-semibold">Phone a Friend:</span> Ask a friend
            for help.
          </li>
          <li>
            <span className="font-semibold">Ask the Host:</span> Get a hint from
            the host.
          </li>
          <li>
            <span className="font-semibold">Ask the Audience:</span> See how the
            audience would vote.
          </li>
        </ul>
      </p>
      <p className="text-lg mb-4">
        The app keeps track of the player's score and displays it at the end of
        the game. Players can choose to play again and try to beat their
        previous score.
      </p>
      <p className="text-lg mb-4">
        It is a fun and challenging game that tests the player's knowledge in a
        variety of categories.
      </p>
      <p className="text-lg text-center font-bold text-accent mt-6">
        Enjoy the game and test your knowledge!
      </p>
    </motion.div>
  );
}
