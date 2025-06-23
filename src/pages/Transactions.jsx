import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TransactionList from '../components/TransactionList';
import FilterBar from '../components/FilterBar';
import { getTransactionsApi } from '../services/api';
import { toast } from 'react-toastify';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', category: '' });

  const fetchTransactions = async () => {
    try {
      const { data } = await getTransactionsApi(filters);
      setTransactions(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  return (
    <div className="container mx-auto mt-8 sm:mt-10 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Transactions</h2>
      <Link to="/add-transaction" className="btn-hover-effect bg-indigo-600 text-white px-4 py-2 sm:py-3 rounded-lg mb-4 inline-block">
        Add Transaction
      </Link>
      <FilterBar setFilters={setFilters} />
      <TransactionList transactions={transactions} fetchTransactions={fetchTransactions} />
    </div>
  );
}

export default Transactions;