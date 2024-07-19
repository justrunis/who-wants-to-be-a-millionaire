import { motion } from "framer-motion";

export default function Input({
  label,
  id,
  error,
  isTextArea,
  labelClass,
  value,
  delay,
  type = "text",
  containerClass,
  ...props
}) {
  const inputVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={containerClass}>
      <motion.label
        className={`block text-sm font-bold ${labelClass}`}
        htmlFor={id}
        initial="hidden"
        animate="visible"
        variants={inputVariants}
        transition={{ delay }}
      >
        {label}
      </motion.label>
      {isTextArea ? (
        <motion.textarea
          id={id}
          name={id}
          value={value}
          {...props}
          style={{ height: value ? "fit-content" : "initial" }}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ delay }}
        />
      ) : (
        <motion.input
          id={id}
          name={id}
          type={type}
          value={value}
          {...props}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ delay }}
        />
      )}
      {error && (
        <motion.p
          className="text-red-500 text-xs italic"
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ delay }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
