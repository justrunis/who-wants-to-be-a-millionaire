import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Upload({
  onFileUpload,
  fileTypes = ".json",
  className = "flex flex-col gap-2 items-center justify-center font-bold p-18 rounded-lg bg-base-200 bg-opacity-50",
  ...props
}) {
  const { t } = useTranslation("global");

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.input
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        type="file"
        accept={fileTypes}
        onChange={onFileUpload}
        className="file-input bg-base-300 text-white font-bold py-2 px-4 rounded"
        {...props}
      />
      <p>
        {t("questionUpload.uploadInstructions")}{" "}
        {fileTypes
          .split(".")
          .filter((type) => type)
          .join(", ")}
      </p>
    </motion.div>
  );
}
