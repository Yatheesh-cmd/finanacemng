import React from 'react';
import TransactionForm from '../components/TransactionForm';
import { useLocation } from 'react-router-dom';

function AddTransaction() {
  const location = useLocation();
  const transaction = location.state?.transaction || {};

  return (
    <div className="container mx-auto mt-8 sm:mt-10 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">{transaction._id ? 'Edit Transaction' : 'Add Transaction'}</h2>
      <TransactionForm transaction={transaction} isEdit={!!transaction._id} />
    </div>
  );
}

export default AddTransaction;