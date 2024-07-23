import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Logo from "../Header/Logo";
import NavLinks from "../Header/NavLinks";
import MobileMenuButton from "../Header/MobileMenuButton";
import LanguageDropdown from "../Header/LanguageDropdown";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation("global");

  const getLanguage = () => i18n.language.toUpperCase();

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng.toLowerCase());
    setIsDropdownOpen(false); // Close dropdown after language change
  };

  return (
    <header className="bg-base-100 text-base-content flex justify-between p-4">
      <div className="flex flex-row items-center">
        <Link
          to="/"
          className="flex flex-row items-center justify-center gap-2 text-base-content hover:text-accent text-lg lg:text-xl font-bold ml-5"
        >
          <Logo />
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <MobileMenuButton
          isMenuOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        />
        <nav
          className={`nav ${
            isMenuOpen ? "block" : "hidden"
          } lg:flex lg:flex-row lg:items-center lg:mr-10 flex flex-col gap-2`}
        >
          <NavLinks />
          <div className="relative flex justify-center items-center">
            <LanguageDropdown
              isDropdownOpen={isDropdownOpen}
              toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
              currentLanguage={getLanguage()}
              handleChangeLanguage={handleChangeLanguage}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
