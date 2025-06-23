import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTransactionApi, updateTransactionApi } from '../services/api';
import { toast } from 'react-toastify';

function TransactionForm({ transaction = {}, isEdit = false }) {
  const [formData, setFormData] = useState({
    title: transaction.title || '',
    amount: transaction.amount || '',
    type: transaction.type || 'income',
    category: transaction.category || '',
    date: transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : '',
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
        toast.success('Transaction updated');
      } else {
        response = await addTransactionApi(formData);
        toast.success('Transaction added');
      }
      if (response.data.exceedsBudget) {
        const month = new Date(formData.date).toLocaleString('default', { month: 'long', year: 'numeric' });
        toast.error(`Budget exceeded for ${month}!`, {
          toastId: 'budget-exceeded',
        });
      }
      navigate('/transactions');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-hover space-y-6 max-w-md sm:max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full rounded-lg"
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full rounded-lg"
          required
        />
      </div>
      <button
        type="submit"
        className="btn-hover-effect w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium"
      >
        {isEdit ? 'Update Transaction' : 'Add Transaction'}
      </button>
    </form>
  );
}

export default TransactionForm;