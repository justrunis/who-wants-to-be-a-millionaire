import Modal from "../UI/Modal";
import { motion } from "framer-motion";

export default function ConfirmationModal({ open, onClose, onConfirm, title }) {
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
        <h2 className="text-3xl font-bold text-red-500">{title}</h2>
        <div className="flex gap-5">
          <button
            onClick={onConfirm}
            className="p-2 bg-success text-base-100 rounded-lg"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-error text-base-100 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </Modal>
  );
}
