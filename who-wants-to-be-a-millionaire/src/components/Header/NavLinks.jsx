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
        className={({ isActive }) =>
          `flex flex-row justify-center items-center text-sm lg:text-lg font-bold mr-5 ${
            isActive ? "text-accent" : "text-base-content hover:text-accent"
          }`
        }
      >
        <AiFillHome className="inline mr-1" />
        {t("header.home")}
      </NavLink>
      <NavLink
        to="/question-upload"
        className={({ isActive }) =>
          `flex flex-row justify-center items-center text-sm lg:text-lg font-bold mr-5 ${
            isActive ? "text-accent" : "text-base-content hover:text-accent"
          }`
        }
      >
        <AiOutlineUpload className="inline mr-1" />
        {t("header.questionUpload")}
      </NavLink>
      <NavLink
        to="/question-creation"
        className={({ isActive }) =>
          `flex flex-row justify-center items-center text-sm lg:text-lg font-bold mr-5 ${
            isActive ? "text-accent" : "text-base-content hover:text-accent"
          }`
        }
      >
        <AiOutlineFileAdd className="inline mr-1" />
        {t("header.questionCreation")}
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `flex flex-row justify-center items-center text-sm lg:text-lg font-bold mr-5 ${
            isActive ? "text-accent" : "text-base-content hover:text-accent"
          }`
        }
      >
        <AiFillQuestionCircle className="inline mr-1" />
        {t("header.about")}
      </NavLink>
    </>
  );
}
