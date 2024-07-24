import React from "react";
import { useTranslation } from "react-i18next";

export default function HeaderDropdown({
  currentLanguage,
  handleChangeLanguage,
}) {
  const languages = [
    { code: "EN", flag: "https://flagicons.lipis.dev/flags/4x3/gb.svg" },
    { code: "LT", flag: "https://flagicons.lipis.dev/flags/4x3/lt.svg" },
    { code: "BG", flag: "https://flagicons.lipis.dev/flags/4x3/bg.svg" },
  ];

  const { t } = useTranslation("global");

  return (
    <div className="absolute top-5 right-0 mt-2 bg-base-200 border border-gray-200 rounded-lg shadow-lg w-32 z-50">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChangeLanguage(lang.code)}
          className={`flex items-center justify-between w-full text-left px-4 py-2 rounded hover:bg-accent ${
            currentLanguage === lang.code ? "bg-accent" : ""
          }`}
        >
          <p>{lang.code}</p>
          <img
            src={lang.flag}
            alt={lang.code}
            className="inline ml-2"
            width={20}
            height={20}
          />
        </button>
      ))}
    </div>
  );
}
