import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TransactionList from '../components/TransactionList';
import FilterBar from '../components/FilterBar';
import { getTransactionsApi } from '../services/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { DownloadIcon, PlusIcon, RefreshIcon } from '../components/Icons';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ 
    startDate: '', 
    endDate: '', 
    category: '',
    searchQuery: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const params = {
        ...filters,
        page: currentPage,
        limit: itemsPerPage
      };
      
      const { data, pagination } = await getTransactionsApi(params);
      setTransactions(data);
      setTotalPages(Math.ceil(pagination.total / itemsPerPage));
      
      if (data.length === 0 && currentPage > 1) {
        setCurrentPage(1); // Reset to first page if current page is empty
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch transactions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters, currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleRefresh = () => {
    fetchTransactions();
    toast.info('Transactions refreshed');
  };

  const exportToCSV = () => {
    // In a real app, this would call an API endpoint for CSV export
    const headers = ['Date', 'Description', 'Category', 'Amount', 'Type'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        format(new Date(t.date), 'yyyy-MM-dd'),
        `"${t.description}"`,
        t.category,
        t.amount,
        t.type
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${format(new Date(), 'yyyyMMdd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Export started');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Transaction History</h1>
          <p className="text-gray-600 mt-1">
            {filters.startDate || filters.endDate 
              ? `Showing transactions ${filters.startDate ? `from ${format(new Date(filters.startDate), 'MMM d, yyyy')}` : ''} ${filters.endDate ? `to ${format(new Date(filters.endDate), 'MMM d, yyyy')}` : ''}`
              : 'All transactions'}
          </p>
        </div>
        
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button
            onClick={handleRefresh}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <RefreshIcon className="w-5 h-5 mr-2" />
            Refresh
          </button>
          
          <button
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={transactions.length === 0}
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Export
          </button>
          
          <Link 
            to="/add-transaction" 
            className="flex items-center px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Transaction
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <FilterBar 
          filters={filters} 
          setFilters={handleFilterChange} 
          className="mb-6"
        />
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : transactions.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <TransactionList 
                transactions={transactions} 
                fetchTransactions={fetchTransactions} 
              />
            </div>
            
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="No transactions found"
            description="Try adjusting your filters or add a new transaction."
            action={
              <Link 
                to="/add-transaction" 
                className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Your First Transaction
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}

export default Transactions;