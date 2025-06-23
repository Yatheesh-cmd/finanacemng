import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion'; // Added missing import

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

  return (
    <nav className="bg-indigo-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl sm:text-2xl font-bold">Finance Manager</Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-indigo-200 transition-colors">Home</Link>
          {auth ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-indigo-200 transition-colors">Dashboard</Link>
              <Link to="/transactions" className="text-white hover:text-indigo-200 transition-colors">Transactions</Link>
              <Link to="/add-transaction" className="text-white hover:text-indigo-200 transition-colors">Add Transaction</Link>
              <button onClick={handleLogout} className="text-white hover:text-indigo-200 transition-colors">Logout</button>
            </>
          ) : (
            <Link to="/auth" className="text-white hover:text-indigo-200 transition-colors">Login</Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-indigo-700 mt-2 py-4 px-4 rounded-lg"
        >
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-indigo-200 transition-colors text-lg"
            >
              Home
            </Link>
            {auth ? (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-indigo-200 transition-colors text-lg"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/transactions" 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-indigo-200 transition-colors text-lg"
                >
                  Transactions
                </Link>
                <Link 
                  to="/add-transaction" 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-indigo-200 transition-colors text-lg"
                >
                  Add Transaction
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-white hover:text-indigo-200 transition-colors text-left text-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-indigo-200 transition-colors text-lg"
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;