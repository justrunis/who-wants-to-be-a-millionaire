import { useTranslation } from "react-i18next";
import HeaderDropdown from "./HeaderDropdown";

export default function LanguageDropdown({
  isDropdownOpen,
  toggleDropdown,
  currentLanguage,
  handleChangeLanguage,
}) {
  const { t } = useTranslation("global");

  return (
    <>
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
        <HeaderDropdown
          currentLanguage={currentLanguage}
          handleChangeLanguage={handleChangeLanguage}
        />
      )}
    </>
  );
}
