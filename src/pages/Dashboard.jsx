import React, { useState, useEffect } from 'react';
import ChartComponent from '../components/ChartComponent';
import BudgetSettings from '../components/BudgetSettings';
import { getTransactionsApi, getBudgetApi } from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState({ amount: 0 });
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;
  const remainingBudget = budget.amount - totalExpense;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionRes, budgetRes] = await Promise.all([
          getTransactionsApi(),
          getBudgetApi(currentMonth),
        ]);
        setTransactions(transactionRes.data);
        setBudget(budgetRes.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [currentMonth]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Financial Overview</h1>
        <p className="text-gray-500 mt-2">{currentMonth} Summary</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
      >
        {/* Income Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-green-50 to-green-100 border border-green-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-green-800">Total Income</h3>
            <div className="p-2 bg-green-200 rounded-lg">
              <ArrowUpIcon className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-900">${totalIncome.toFixed(2)}</p>
          <p className="text-xs text-green-600 mt-1">All incoming funds</p>
        </motion.div>

        {/* Expense Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-red-50 to-red-100 border border-red-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-red-800">Total Expense</h3>
            <div className="p-2 bg-red-200 rounded-lg">
              <ArrowDownIcon className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-900">${totalExpense.toFixed(2)}</p>
          <p className="text-xs text-red-600 mt-1">All outgoing funds</p>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          variants={itemVariants}
          className={`bg-gradient-to-br ${balance >= 0 ? 'from-blue-50 to-blue-100 border-blue-100' : 'from-amber-50 to-amber-100 border-amber-100'} border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-medium ${balance >= 0 ? 'text-blue-800' : 'text-amber-800'}`}>Current Balance</h3>
            <div className={`p-2 rounded-lg ${balance >= 0 ? 'bg-blue-200' : 'bg-amber-200'}`}>
              <CurrencyDollarIcon className={`h-5 w-5 ${balance >= 0 ? 'text-blue-600' : 'text-amber-600'}`} />
            </div>
          </div>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-900' : 'text-amber-900'}`}>
            ${balance.toFixed(2)}
          </p>
          <p className={`text-xs ${balance >= 0 ? 'text-blue-600' : 'text-amber-600'} mt-1`}>
            {balance >= 0 ? 'Positive balance' : 'Negative balance'}
          </p>
        </motion.div>

        {/* Budget Card */}
        <motion.div
          variants={itemVariants}
          className={`bg-gradient-to-br ${remainingBudget < 0 ? 'from-purple-50 to-purple-100 border-purple-100' : 'from-indigo-50 to-indigo-100 border-indigo-100'} border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-medium ${remainingBudget < 0 ? 'text-purple-800' : 'text-indigo-800'}`}>Monthly Budget</h3>
            <div className={`p-2 rounded-lg ${remainingBudget < 0 ? 'bg-purple-200' : 'bg-indigo-200'}`}>
              <ChartBarIcon className={`h-5 w-5 ${remainingBudget < 0 ? 'text-purple-600' : 'text-indigo-600'}`} />
            </div>
          </div>
          <p className="text-2xl font-bold text-indigo-900">${budget.amount.toFixed(2)}</p>
          <div className="flex justify-between items-center mt-1">
            <p className={`text-xs ${remainingBudget < 0 ? 'text-red-600' : 'text-green-600'}`}>
              Remaining: ${remainingBudget.toFixed(2)}
            </p>
            {remainingBudget < 0 && (
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Over Budget</span>
            )}
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
        >
          <BudgetSettings currentMonth={currentMonth} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
        >
          <ChartComponent transactions={transactions} />
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;