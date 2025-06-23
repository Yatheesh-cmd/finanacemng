import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.8)',
      titleFont: { size: 14 },
      bodyFont: { size: 12 },
      padding: 12,
      usePointStyle: true,
    },
  },
  animation: {
    duration: 2000,
    easing: 'easeOutQuart',
  },
};

function ChartComponent({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const categoryData = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + (t.type === 'expense' ? t.amount : 0);
    return acc;
  }, {});

  const pieData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['#4ade80', '#f87171'],
        borderWidth: 1,
      },
    ],
  };

  const categoryPieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          '#4ade80', 
          '#f87171', 
          '#60a5fa', 
          '#facc15', 
          '#a3e635',
          '#f97316',
          '#8b5cf6',
          '#ec4899'
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Object.values(monthlyData),
        backgroundColor: '#60a5fa',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-hover bg-white p-4 sm:p-6 rounded-xl">
          <h3 className="text-lg sm:text-xl font-medium mb-3 text-gray-800">Income vs Expense</h3>
          <div className="chart-container h-64 sm:h-80">
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="card-hover bg-white p-4 sm:p-6 rounded-xl">
          <h3 className="text-lg sm:text-xl font-medium mb-3 text-gray-800">Category Breakdown</h3>
          <div className="chart-container h-64 sm:h-80">
            <Pie data={categoryPieData} options={chartOptions} />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="card-hover bg-white p-4 sm:p-6 rounded-xl">
          <h3 className="text-lg sm:text-xl font-medium mb-3 text-gray-800">Monthly Spend Trend</h3>
          <div className="chart-container h-64 sm:h-80">
            <Bar 
              data={barData} 
              options={{
                ...chartOptions,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0,0,0,0.05)',
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ChartComponent;