import { motion } from "framer-motion";
import Input from "../components/UI/Input";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { useTranslation } from "react-i18next";

export default function Start({ onNameChange }) {
  const navigate = useNavigate();

  const { t } = useTranslation("global");

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
        <h1 className="text-4xl text-center">{t("header.title")}</h1>
        <form
          className="flex flex-col gap-2 items-center justify-center"
          onSubmit={handleNameSubmit}
        >
          <Input
            label={t("start.name")}
            labelClass="text-center"
            placeholder={t("start.namePlaceholder")}
            id="name"
            type="text"
            containerClass="mt-4"
            className="mt-2 bg-base-100 text-base-content p-2 rounded-lg"
            delay={0.4}
          />
          <Button
            type="submit"
            className="p-2 bg-base-100 text-base-content rounded-lg"
          >
            {t("start.start")}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
