import React, { useState, useEffect } from 'react';
import ChartComponent from '../components/ChartComponent';
import BudgetSettings from '../components/BudgetSettings';
import { getTransactionsApi, getBudgetApi } from '../services/api';
import { toast } from 'react-toastify';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState({ amount: 0 });
  const currentMonth = new Date().toISOString().slice(0, 7);

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
  }, []);

  return (
    <div className="container mx-auto mt-8 sm:mt-10 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 animate-fadeIn">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="card-hover bg-white p-4 sm:p-6 rounded-xl">
          <h3 className="text-lg font-medium">Total Income</h3>
          <p className="text-xl sm:text-2xl text-green-500">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="card-hover bg-white p-4 sm:p-6 rounded-xl">
          <h3 className="text-lg font-medium">Total Expense</h3>
          <p className="text-xl sm:text-2xl text-red-500">${totalExpense.toFixed(2)}</p>
        </div>
        <div className="card-hover bg-white p-4 sm:p-6 rounded-xl">
          <h3 className="text-lg font-medium">Balance</h3>
          <p className={`text-xl sm:text-2xl ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
        <div className={`card-hover bg-white p-4 sm:p-6 rounded-xl ${remainingBudget < 0 ? 'border-red-500 border-2' : ''}`}>
          <h3 className="text-lg font-medium">Budget ({currentMonth})</h3>
          <p className="text-xl sm:text-2xl text-indigo-600">${budget.amount.toFixed(2)}</p>
          <p className={`text-sm ${remainingBudget < 0 ? 'text-red-500' : 'text-green-500'}`}>
            Remaining: ${remainingBudget.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <BudgetSettings currentMonth={currentMonth} />
        <ChartComponent transactions={transactions} />
      </div>
    </div>
  );
}

export default Dashboard;