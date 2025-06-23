import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTransactionApi, updateTransactionApi } from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  TagIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const categories = [
  'Salary', 'Freelance', 'Investment',
  'Food', 'Transport', 'Housing',
  'Entertainment', 'Shopping', 'Other'
];

function TransactionForm({ transaction = {}, isEdit = false }) {
  const [formData, setFormData] = useState({
    title: transaction.title || '',
    amount: transaction.amount || '',
    type: transaction.type || 'income',
    category: transaction.category || '',
    date: transaction.date
      ? new Date(transaction.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEdit) {
        response = await updateTransactionApi(transaction._id, formData);
        toast.success('Transaction updated successfully', {
          style: {
            background: '#4f46e5',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#4f46e5',
          },
        });
      } else {
        response = await addTransactionApi(formData);
        toast.success('Transaction added successfully', {
          style: {
            background: 'green',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#4f46e5',
          },
        });
      }

      if (response.data.exceedsBudget) {
        const month = new Date(formData.date).toLocaleString('default', {
          month: 'long',
          year: 'numeric'
        });
        toast.error(`Budget exceeded for ${month}!`, {
          toastId: 'budget-exceeded',
          style: {
            background: '#ef4444',
            color: '#fff',
          },
        });
      }

      navigate('/transactions');
    } catch (error) {
      toast.error(error.message || 'An error occurred', {
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9ff] via-[#eef1ff] to-[#e0e7ff] flex items-center justify-center p-4 sm:p-6 md:p-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl z-10"
      >
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
          <div className="p-6 sm:p-8 md:p-10 space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {isEdit ? 'Edit Transaction' : 'Add New Transaction'}
              </h2>
            </div>

            {/* Title Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Transaction Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg"
                placeholder="e.g. Salary, Groceries"
                required
              />
            </div>

            {/* Amount Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Type Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'income' })}
                  className={`flex items-center justify-center py-3 px-4 rounded-lg border transition-all text-lg ${
                    formData.type === 'income'
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  <ArrowUpIcon className="h-5 w-5 mr-2" />
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'expense' })}
                  className={`flex items-center justify-center py-3 px-4 rounded-lg border transition-all text-lg ${
                    formData.type === 'expense'
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : 'bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  <ArrowDownIcon className="h-5 w-5 mr-2" />
                  Expense
                </button>
              </div>
            </div>

            {/* Category Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TagIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg appearance-none"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all text-lg ${
                isEdit ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isEdit ? 'Update Transaction' : 'Add Transaction'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default TransactionForm;
