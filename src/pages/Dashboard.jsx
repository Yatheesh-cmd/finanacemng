import React, { useState, useEffect, useContext } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { getTransactionsApi, getBudgetApi } from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';
import { BudgetContext, BudgetProvider } from '../context/BudgetContext.jsx';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

function DashboardContent() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('DashboardContent must be used within a BudgetProvider');
  }

  const { budget, updateBudget } = context;
  const [transactions, setTransactions] = useState([]);
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  // Calculate financial metrics
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;
  const remainingBudget = (budget?.amount || 0) - totalExpense;

  // Group expenses by category for the pie chart
  const expenseByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, transaction) => {
      const category = transaction.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += transaction.amount;
      return acc;
    }, {});

  // Prepare data for expense pie chart
  const expenseChartData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        data: Object.values(expenseByCategory),
        backgroundColor: [
          '#3B82F6', // blue-500
          '#10B981', // emerald-500
          '#F59E0B', // amber-500
          '#EF4444', // red-500
          '#8B5CF6', // violet-500
          '#EC4899', // pink-500
          '#14B8A6', // teal-500
          '#F97316', // orange-500
        ],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  // Prepare data for income vs expense pie chart
  const incomeExpenseChartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['#10B981', '#EF4444'],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            label += '$' + context.raw.toFixed(2);
            return label;
          },
        },
        displayColors: true,
        usePointStyle: true,
        bodyFont: {
          family: 'Inter, sans-serif',
          size: 12,
        },
        titleFont: {
          family: 'Inter, sans-serif',
          size: 14,
          weight: 'bold',
        },
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
      title: {
        display: true,
        text: 'Expense Distribution',
        font: {
          family: 'Inter, sans-serif',
          size: 16,
          weight: '600',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
    cutout: '65%',
  };

  const incomeExpenseChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: 'Income vs Expenses',
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionRes, budgetRes] = await Promise.all([
          getTransactionsApi(),
          getBudgetApi(currentMonth),
        ]);
        setTransactions(transactionRes.data);
        updateBudget(budgetRes.data);
      } catch (error) {
        toast.error(error.message, {
          style: { background: 'rgba(239, 68, 58, 0.9)', color: '#fff' },
        });
      }
    };
    fetchData();
  }, [currentMonth, updateBudget]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
      >
        {/* Total Income */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-green-50 to-green-100 border border-green-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-green-800">Total Income</h3>
            <div className="p-2 bg-green-200 rounded-lg">
              <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-900">${totalIncome.toFixed(2)}</p>
          <p className="text-xs text-green-600 mt-1">All incoming funds</p>
        </motion.div>

        {/* Total Expense */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-red-50 to-red-100 border border-red-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-red-800">Total Expense</h3>
            <div className="p-2 bg-red-200 rounded-lg">
              <ArrowTrendingDownIcon className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-900">${totalExpense.toFixed(2)}</p>
          <p className="text-xs text-red-600 mt-1">All outgoing funds</p>
        </motion.div>

        {/* Current Balance */}
        <motion.div
          variants={itemVariants}
          className={`bg-gradient-to-br ${
            balance >= 0 ? 'from-blue-50 to-blue-100 border-blue-100' : 'from-amber-50 to-amber-100 border-amber-100'
          } border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-medium ${balance >= 0 ? 'text-blue-800' : 'text-amber-800'}`}>
              Current Balance
            </h3>
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

        {/* Monthly Budget */}
        <motion.div
          variants={itemVariants}
          className={`bg-gradient-to-br ${
            remainingBudget < 0 ? 'from-purple-50 to-purple-100 border-purple-100' : 'from-indigo-50 to-indigo-100 border-indigo-100'
          } border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-medium ${remainingBudget < 0 ? 'text-purple-800' : 'text-indigo-800'}`}>
              Monthly Budget
            </h3>
            <div className={`p-2 rounded-lg ${remainingBudget < 0 ? 'bg-purple-200' : 'bg-indigo-200'}`}>
              <ChartBarIcon className={`h-5 w-5 ${remainingBudget < 0 ? 'text-purple-600' : 'text-indigo-600'}`} />
            </div>
          </div>
          <p className="text-2xl font-bold text-indigo-900">${(budget?.amount || 0).toFixed(2)}</p>
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

      {/* Bottom Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
        >
          <BudgetSettings currentMonth={currentMonth} transactions={transactions} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
        >
          <div className="h-64">
            <Doughnut data={incomeExpenseChartData} options={incomeExpenseChartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Expense Breakdown Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense Breakdown</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-80">
            <Pie data={expenseChartData} options={chartOptions} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="space-y-4">
              {Object.entries(expenseByCategory).map(([category, amount], index) => (
                <div key={category} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: expenseChartData.datasets[0].backgroundColor[index] }}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">{category}</span>
                      <span className="text-sm font-medium text-gray-900">
                        ${amount.toFixed(2)} ({(amount / totalExpense * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(amount / totalExpense * 100)}%`,
                          backgroundColor: expenseChartData.datasets[0].backgroundColor[index],
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Dashboard() {
  return (
    <BudgetProvider>
      <DashboardContent />
    </BudgetProvider>
  );
}

export default Dashboard;