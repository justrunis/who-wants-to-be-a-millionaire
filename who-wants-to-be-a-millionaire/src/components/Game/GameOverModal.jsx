import { motion } from "framer-motion";
import Modal from "../UI/Modal";

export default function GameOverModal({
  playerName,
  moneyAmount,
  open,
  onClose,
  onRestart,
  title,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex flex-col items-center justify-center bg-base-300 text-base-content rounded-lg border-4 border-secondary"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="flex flex-col items-center gap-5 justify-center p-8 bg-base-100 text-base-content"
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-lg">
          {playerName ? playerName : "Unknown"}, you have won {moneyAmount}
        </p>
        <button
          onClick={onRestart}
          className="p-2 bg-secondary text-base-100 rounded-lg"
        >
          Restart
        </button>
      </motion.div>
    </Modal>
  );
}
