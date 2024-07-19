import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { AiFillHome, AiFillQuestionCircle } from "react-icons/ai";
import logo from "../../assets/icon.png";
import { motion } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  return (
    <header className="bg-base-100 text-base-content flex justify-between p-4">
      <div className="flex flex-row items-center">
        <Link
          to="/"
          className="flex flex-row  items-center justify-center gap-2 text-base-content  hover:text-accent text-xl font-bold ml-5"
        >
          <motion.img
            src={logo}
            alt="Virtual Vroom"
            className="inline p-2"
            width={100}
            height={100}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1 }}
          />
          <h3>Who Wants to Be a Millionaire?</h3>
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <button
          className="text-base-content  hover:text-accent text-sm lg:text-lg font-bold mr-5 lg:hidden"
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
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="flex flex-row justify-center items-center text-base-content hover:text-accent text-sm lg:text-lg font-bold mr-5"
          >
            <AiFillQuestionCircle className="inline mr-1" />
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
