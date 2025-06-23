import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  ArrowTrendingUpIcon, 
  ShieldCheckIcon, 
  CalendarIcon, 
  UserGroupIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-20 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 sm:mb-24"
        >
          <motion.div 
            whileHover={{ rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center mb-8"
          >
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl shadow-xl">
              <img
                src="https://img.icons8.com/color/400/bar-chart.png"
                alt="Finance Chart"
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
              />
            </div>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Take Control of Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Finances</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            Track your income and expenses with our intuitive finance manager. 
            <span className="block sm:inline"> Get insights and make better financial decisions.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <Link 
                to="/auth" 
                className="relative bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRightIcon className="w-4 h-4 mt-0.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={auth ? "/dashboard" : "/auth"}
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-200 hover:border-gray-300 px-8 py-3.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
              >
                View Dashboard
                <ArrowRightIcon className="w-4 h-4 mt-0.5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="mb-20 sm:mb-28">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Powerful Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">financial success</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines beautiful design with powerful functionality to help you master your finances.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <CurrencyDollarIcon className="h-6 w-6 text-indigo-600" />,
                title: "Transaction Tracking",
                description: "Easily record all your income and expenses in one place with smart categorization.",
                gradient: "from-indigo-50 to-indigo-100"
              },
              {
                icon: <ChartBarIcon className="h-6 w-6 text-blue-600" />,
                title: "Visual Insights",
                description: "Beautiful charts and graphs to understand your spending patterns at a glance.",
                gradient: "from-blue-50 to-blue-100"
              },
              {
                icon: <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />,
                title: "Financial Goals",
                description: "Set and achieve your financial objectives with personalized recommendations.",
                gradient: "from-green-50 to-green-100"
              },
              {
                icon: <ShieldCheckIcon className="h-6 w-6 text-purple-600" />,
                title: "Budget Planning",
                description: "Create and manage budgets to stay on top of your finances.",
                gradient: "from-purple-50 to-purple-100"
              },
              {
                icon: <CalendarIcon className="h-6 w-6 text-orange-600" />,
                title: "Bill Reminders",
                description: "Never miss a payment with timely bill reminders and alerts.",
                gradient: "from-orange-50 to-orange-100"
              },
              {
                icon: <UserGroupIcon className="h-6 w-6 text-teal-600" />,
                title: "Collaboration",
                description: "Share financial plans with family or advisors securely.",
                gradient: "from-teal-50 to-teal-100"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${feature.gradient} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
      
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;