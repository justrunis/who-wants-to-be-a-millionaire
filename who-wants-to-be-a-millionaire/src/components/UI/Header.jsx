import { useState } from "react";
import { Link } from "react-router-dom";
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
    <header className="bg-base-100 text-base-content flex justify-between items-center p-4">
      <div className="flex items-center">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-base-content hover:text-accent text-lg lg:text-xl font-bold"
        >
          <Logo />
        </Link>
      </div>
      <div className="flex items-center lg:hidden">
        <MobileMenuButton
          isMenuOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-base-100 lg:static lg:w-auto lg:flex lg:items-center`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 p-4 lg:p-0">
          <NavLinks />
          <div className="relative flex justify-center items-center">
            <LanguageDropdown
              isDropdownOpen={isDropdownOpen}
              toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
              currentLanguage={getLanguage()}
              handleChangeLanguage={handleChangeLanguage}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
