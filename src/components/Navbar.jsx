import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function Navbar() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setAuth(false);
    navigate('/auth');
    setIsOpen(false);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.1 },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-indigo-800 backdrop-blur-lg bg-opacity-80 shadow-lg"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-white text-2xl sm:text-3xl font-semibold tracking-tight font-['Inter']"
          >
            Finance Manager
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-white text-base font-medium hover:text-indigo-200 transition-colors duration-200"
            >
              Home
            </Link>
            {auth ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white text-base font-medium hover:text-indigo-200 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/transactions"
                  className="text-white text-base font-medium hover:text-indigo-200 transition-colors duration-200"
                >
                  Transactions
                </Link>
                <Link
                  to="/add-transaction"
                  className="text-white text-base font-medium hover:text-indigo-200 transition-colors duration-200"
                >
                  Add Transaction
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white bg-indigo-700 hover:bg-indigo-900 px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="text-white bg-indigo-700 hover:bg-indigo-900 px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-md p-1"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? (
                <XMarkIcon className="h-7 w-7" />
              ) : (
                <Bars3Icon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            className="md:hidden bg-indigo-700/90 backdrop-blur-md mt-4 py-6 px-6 rounded-2xl border border-indigo-500/20"
          >
            <div className="flex flex-col space-y-4">
              <motion.div variants={mobileItemVariants}>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="text-white text-lg font-medium hover:text-indigo-200 transition-colors duration-200"
                >
                  Home
                </Link>
              </motion.div>
              {auth ? (
                <>
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="text-white text-lg font-medium hover:text-indigo-200 transition-colors duration-200"
                    >
                      Dashboard
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      to="/transactions"
                      onClick={() => setIsOpen(false)}
                      className="text-white text-lg font-medium hover:text-indigo-200 transition-colors duration-200"
                    >
                      Transactions
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      to="/add-transaction"
                      onClick={() => setIsOpen(false)}
                      className="text-white text-lg font-medium hover:text-indigo-200 transition-colors duration-200"
                    >
                      Add Transaction
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants}>
                    <button
                      onClick={handleLogout}
                      className="text-white bg-indigo-800 hover:bg-indigo-900 w-full text-left py-2 px-4 rounded-lg text-lg font-medium transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </motion.div>
                </>
              ) : (
                <motion.div variants={mobileItemVariants}>
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="text-white bg-indigo-800 hover:bg-indigo-900 w-full text-left py-2 px-4 rounded-lg text-lg font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;