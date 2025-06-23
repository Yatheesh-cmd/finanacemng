import React, { useState, useContext } from 'react';
import { setBudgetApi } from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { BudgetContext } from '../context/BudgetContext.jsx';

function BudgetSettings({ currentMonth }) {
  const { updateBudget } = useContext(BudgetContext);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const amount = parseFloat(inputValue);
      if (isNaN(amount) || amount < 0) {
        throw new Error('Please enter a valid positive number');
      }
      const response = await setBudgetApi({ amount, month: currentMonth });
      updateBudget(response.data); // Update context
      toast.success('Budget set successfully', {
        style: { background: 'black', color: '#fff' },
        iconTheme: { primary: '#fff', secondary: '#4f46e5' },
      });
      setInputValue(''); // Clear input
    } catch (error) {
      toast.error(error.message, {
        style: { background: '#ef4444', color: '#fff' },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg card-hover p-6 sm:p-8 space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg sm:text-xl font-medium text-gray-800">Set Monthly Budget</h3>
          <p className="text-sm text-gray-500 mt-2">Budget for {currentMonth}</p>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Budget Amount</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg"
            placeholder="Enter budget amount"
            required
            min="0"
            step="0.01"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-hover-effect w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium text-lg shadow-md transition-all"
        >
          Set Budget
        </motion.button>
      </form>
    </motion.div>
  );
}

export default BudgetSettings;