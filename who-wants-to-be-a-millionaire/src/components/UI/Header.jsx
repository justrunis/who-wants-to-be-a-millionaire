import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  AiFillHome,
  AiFillQuestionCircle,
  AiOutlineUpload,
  AiOutlineFileAdd,
} from "react-icons/ai";
import logo from "../../assets/icon.png";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [t, i18n] = useTranslation("global");

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsDropdownOpen(false); // Close dropdown after language change
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <header className="bg-base-100 text-base-content flex justify-between p-4">
      <div className="flex flex-row items-center">
        <Link
          to="/"
          className="flex flex-row items-center justify-center gap-2 text-base-content hover:text-accent text-xl font-bold ml-5"
        >
          <motion.img
            src={logo}
            alt="logo"
            className="inline p-2"
            width={100}
            height={100}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1 }}
          />
          <h3>{t("header.title")}</h3>
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <button
          className="text-base-content hover:text-accent text-sm lg:text-lg font-bold mr-5 lg:hidden"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
        <nav
          className={`nav ${
            isMenuOpen ? "block" : "hidden"
          } lg:flex lg:flex-row lg:items-center lg:mr-10 flex flex-col gap-2`}
        >
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
          <div className="relative flex items-center">
            <button
              onClick={toggleDropdown}
              className="text-base-content hover:text-accent text-sm lg:text-lg font-bold flex items-center"
            >
              {t("header.language")}
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-base-200 border border-gray-200 rounded-lg shadow-lg w-32">
                <button
                  onClick={() => handleChangeLanguage("en")}
                  className="flex items-center w-full text-left px-4 py-2 rounded-lg hover:bg-accent"
                >
                  EN
                  <img
                    src="https://flagicons.lipis.dev/flags/4x3/gb.svg"
                    alt="EN"
                    className="inline ml-2"
                    width={20}
                    height={20}
                  />
                </button>
                <button
                  onClick={() => handleChangeLanguage("lt")}
                  className="flex items-center w-full text-left px-4 py-2 rounded-lg hover:bg-accent"
                >
                  LT
                  <img
                    src="https://flagicons.lipis.dev/flags/4x3/lt.svg"
                    alt="EN"
                    className="inline ml-2"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
