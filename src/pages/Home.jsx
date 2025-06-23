import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ChartBarIcon, CurrencyDollarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9ff] via-[#eef1ff] to-[#e0e7ff]">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-8 sm:py-16 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl shadow-xl">
              <img
                src="https://img.icons8.com/color/400/bar-chart.png"
                alt="Finance Chart"
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-800 mb-4 sm:mb-6">
            Take Control of Your Finances
          </h1>
          <p className="text-base sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Track your income and expenses with our intuitive finance manager. Get insights and make better financial decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link 
                to="/auth" 
                className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to={auth ? "/dashboard" : "/auth"}
                className="inline-block bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-800 border border-gray-200 px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Dashboard
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/90 backdrop-blur-sm border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-indigo-100 to-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <CurrencyDollarIcon className="h-7 w-7 text-indigo-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Track Transactions</h3>
            <p className="text-gray-600 text-sm sm:text-base">Easily record all your income and expenses in one place.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/90 backdrop-blur-sm border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <ChartBarIcon className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Visual Insights</h3>
            <p className="text-gray-600 text-sm sm:text-base">Beautiful charts to understand your spending patterns.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/90 backdrop-blur-sm border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-green-100 to-teal-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <ArrowTrendingUpIcon className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Financial Goals</h3>
            <p className="text-gray-600 text-sm sm:text-base">Set and achieve your financial objectives with ease.</p>
          </motion.div>
        </div>

       
     
      </div>
    </div>
  );
};

export default Home;