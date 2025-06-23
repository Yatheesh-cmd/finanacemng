import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginApi, registerApi } from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        if (user.password !== user.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        const { data } = await registerApi({
          username: user.username,
          email: user.email,
          password: user.password
        });
        sessionStorage.setItem('token', data.token);
        setAuth(true);
        toast.success('Registration successful');
        navigate('/dashboard');
      } else {
        const { data } = await loginApi({
          email: user.email,
          password: user.password
        });
        sessionStorage.setItem('token', data.token);
        setAuth(true);
        toast.success('Login successful');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong');
    }
  };

  const imageSrc = isRegister
    ? 'https://png.pngtree.com/png-vector/20230409/ourlarge/pngtree-modern-finance-investment-logo-vector-png-image_6695844.png'
    : 'https://png.pngtree.com/png-vector/20220924/ourmid/pngtree-business-financial-logo-png-image_6216146.png';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9ff] via-[#eef1ff] to-[#e0e7ff] flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-xl w-full max-w-lg sm:max-w-2xl flex flex-col sm:flex-row overflow-hidden"
      >
        {/* Left image section with centered content */}
        <div className="hidden sm:flex sm:w-1/2 bg-white p-8">
          <div className="m-auto text-center">
            <img
              src={imageSrc}
              alt={isRegister ? 'Finance Investment Logo' : 'Business Financial Logo'}
              className="w-40 h-40 mx-auto mb-6 object-contain"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {isRegister ? 'Join Our Financial Community' : 'Welcome Back'}
            </h3>
            <p className="text-gray-600">
              {isRegister ? 'Start managing your finances like a pro' : 'Continue your financial journey'}
            </p>
          </div>
        </div>

        {/* Right form section */}
        <div className="w-full sm:w-1/2 p-6 sm:p-8">
          {/* Mobile Logo */}
          <div className="flex justify-center sm:hidden mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-3 rounded-xl">
              <img
                src={imageSrc}
                alt="Auth Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center"
          >
            {isRegister ? 'Create Account' : 'Sign In'}
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-blue-500 transition-all duration-200"
                  required
                  placeholder="Enter your username"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: isRegister ? 0.4 : 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-blue-500 transition-all duration-200"
                required
                placeholder="Enter your email"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: isRegister ? 0.5 : 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-blue-500 transition-all duration-200"
                required
                placeholder="Enter your password"
              />
            </motion.div>

            {isRegister && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-blue-500 transition-all duration-200"
                  required
                  placeholder="Confirm your password"
                />
              </motion.div>
            )}

            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: isRegister ? 0.7 : 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isRegister ? 'Register' : 'Login'}
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: isRegister ? 0.8 : 0.6 }}
              className="text-center"
            >
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                {isRegister ? (
                  <>Already have an account? <span className="underline">Sign In</span></>
                ) : (
                  <>Need an account? <span className="underline">Register</span></>
                )}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Auth;
