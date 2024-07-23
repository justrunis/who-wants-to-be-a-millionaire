import { NavLink } from "react-router-dom";
import {
  AiFillHome,
  AiFillQuestionCircle,
  AiOutlineUpload,
  AiOutlineFileAdd,
} from "react-icons/ai";
import { useTranslation } from "react-i18next";

export default function NavLinks() {
  const { t } = useTranslation("global");

  return (
    <>
      <NavLink
        to="/"
        className="flex flex-row justify-center items-center text-base-content hover:text-accent text-sm lg:text-lg font-bold mr-5"
      >
        <AiFillHome className="inline mr-1" />
        {t("header.home")}
      </NavLink>
      <NavLink
        to="/question-upload"
        className="flex flex-row justify-center items-center text-base-content hover:text-accent text-sm lg:text-lg font-bold mr-5"
      >
        <AiOutlineUpload className="inline mr-1" />
        {t("header.questionUpload")}
      </NavLink>
      <NavLink
        to="/question-creation"
        className="flex flex-row justify-center items-center text-base-content hover:text-accent text-sm lg:text-lg font-bold mr-5"
      >
        <AiOutlineFileAdd className="inline mr-1" />
        {t("header.questionCreation")}
      </NavLink>
      <NavLink
        to="/about"
        className="flex flex-row justify-center items-center text-base-content hover:text-accent text-sm lg:text-lg font-bold mr-5"
      >
        <AiFillQuestionCircle className="inline mr-1" />
        {t("header.about")}
      </NavLink>
    </>
  );
}
