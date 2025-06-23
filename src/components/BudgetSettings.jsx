import React, { useState } from 'react';
import { setBudgetApi } from '../services/api';
import { toast } from 'react-toastify';

function BudgetSettings({ currentMonth }) {
  const [budget, setBudget] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setBudgetApi({ amount: parseFloat(budget), month: currentMonth });
      toast.success('Budget set successfully');
      setBudget('');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="card-hover bg-white p-6 sm:p-8 rounded-xl">
      <h3 className="text-lg sm:text-xl font-medium mb-4">Set Monthly Budget</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Budget for {currentMonth}</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-lg"
            placeholder="Enter budget amount"
            required
          />
        </div>
        <button
          type="submit"
          className="btn-hover-effect w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium"
        >
          Set Budget
        </button>
      </form>
    </div>
  );
}

export default BudgetSettings;