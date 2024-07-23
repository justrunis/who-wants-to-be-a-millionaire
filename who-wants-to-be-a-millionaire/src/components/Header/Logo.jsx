import { motion } from "framer-motion";
import logo from "../../assets/icon.png";

export default function Logo() {
  return (
    <motion.img
      src={logo}
      alt="logo"
      className="inline p-2"
      width={100}
      height={100}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 1 }}
    />
  );
}
