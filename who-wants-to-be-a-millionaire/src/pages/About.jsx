import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from "../assets/icon.png";

export default function About() {
  const { t } = useTranslation("global");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-lg"
    >
      <motion.h3
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-accent text-center mb-6"
      >
        {t("about.about")}
      </motion.h3>
      <div className="flex justify-center">
        <motion.img
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={logo}
          alt="logo"
          className="inline p-2"
          width={200}
          height={200}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1 }}
        />
      </div>
      <motion.p
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-lg mb-4"
      >
        {t("about.text1")}{" "}
        <span className="font-semibold">{t("header.title")}</span>
      </motion.p>
      <motion.p
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg mb-4"
      >
        {t("about.text2")}{" "}
      </motion.p>
      <motion.p
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg mb-4"
      >
        {t("about.text3")}{" "}
        <ul className="list-disc list-inside ml-5 mt-2">
          <motion.li
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="font-semibold">{t("about.fiftyFifty")}:</span>{" "}
            {t("about.fiftyFiftyText")}
          </motion.li>
          <motion.li
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <span className="font-semibold">{t("about.phoneAFriend")}:</span>{" "}
            {t("about.phoneAFriendText")}
          </motion.li>
          <motion.li
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <span className="font-semibold">{t("about.askTheHost")}:</span>{" "}
            {t("about.askTheHostText")}
          </motion.li>
          <motion.li
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <span className="font-semibold">{t("about.askTheAudience")}:</span>{" "}
            {t("about.askTheAudienceText")}
          </motion.li>
        </ul>
      </motion.p>
      <motion.p
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="text-lg mb-4"
      >
        {t("about.text4")}{" "}
      </motion.p>
      <motion.p
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="text-lg mb-4"
      >
        {t("about.text5")}{" "}
      </motion.p>
      <motion.p
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.8 }}
        className="text-lg text-center font-bold text-accent mt-6"
      >
        {t("about.enjoyGame")}
      </motion.p>
    </motion.div>
  );
}
