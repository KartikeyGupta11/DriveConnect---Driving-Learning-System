import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaBars, FaTimes, FaCarSide } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Wave animation for letters
  const waveVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: [0, -5, 0], // Wave effect
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeInOut" },
    }),
  };

  return (
    <nav
      className={`p-4 transition ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-[#1E293B] to-[#4F46E5] text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center space-x-2"
        >
          <Link to="/" className="text-3xl font-extrabold tracking-wide flex items-center">
            {["D", "r", "i", "v", "e", " ", "C", "o", "n", "n", "e", "c", "t"].map(
              (char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={waveVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {char}
                </motion.span>
              )
            )}

            {/* Car Moving Effect */}
            <motion.span
              animate={{ x: [-5, 5, -5] }} // Car moves more left and right
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="ml-3 mt-2.5" // Adjusted margin-left to prevent overlap
            >
              <FaCarSide className="text-3xl text-yellow-400" />
            </motion.span>
          </Link>
        </motion.div>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6 ml-auto">
          {["Home", "Find Instructor", "Book Lesson", "Admin"].map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <Link className="hover:text-teal-400 transition" to={`/${item.toLowerCase().replace(" ", "")}`}>
                {item}
              </Link>
            </motion.div>
          ))}
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <Link className="bg-teal-500 px-4 py-2 rounded-lg hover:bg-teal-400 transition" to="/login">
              Login
            </Link>
          </motion.div>

          {/* Dark Mode Toggle */}
          <button onClick={() => setDarkMode(!darkMode)} className="text-2xl">
            {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gradient-to-r from-[#1E293B] to-[#4F46E5] text-center md:hidden">
            {["Home", "Find Instructor", "Book Lesson", "Admin"].map((item, index) => (
              <motion.div key={index} whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                <Link className="block py-2 hover:text-teal-400 transition" to={`/${item.toLowerCase().replace(" ", "")}`}>
                  {item}
                </Link>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <Link className="block py-2 bg-teal-500 rounded-lg hover:bg-teal-400 transition mx-4" to="/login">
                Login
              </Link>
            </motion.div>

            {/* Dark Mode Toggle in Mobile */}
            <button onClick={() => setDarkMode(!darkMode)} className="text-2xl py-4">
              {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
