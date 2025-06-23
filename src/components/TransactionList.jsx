import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTransactionApi } from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

function TransactionList({ transactions, fetchTransactions }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransactionApi(id);
        toast.success('Transaction deleted successfully', {
          style: { background: '#4f46e5', color: '#fff' },
          iconTheme: { primary: '#fff', secondary: '#4f46e5' },
        });
        fetchTransactions();
      } catch (error) {
        toast.error(error.message, {
          style: { background: '#ef4444', color: '#fff' },
        });
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {transactions.length > 0 ? (
        transactions.map((t) => (
          <motion.div
            key={t._id}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="card-hover bg-white p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800 truncate text-base sm:text-lg">{t.title}</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    t.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                </span>
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                  {t.category}
                </span>
                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                  {new Date(t.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span
                className={`text-base sm:text-lg font-semibold ${
                  t.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/add-transaction/${t._id}`, { state: { transaction: t } })}
                  className="p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-lg transition-colors hover:bg-indigo-100"
                  aria-label="Edit transaction"
                >
                  <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-lg transition-colors hover:bg-red-100"
                  aria-label="Delete transaction"
                >
                  <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="card-hover bg-white p-6 sm:p-8 rounded-xl text-center"
        >
          <div className="text-gray-400 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-1">
            No transactions found
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            Add your first transaction to get started
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default TransactionList;