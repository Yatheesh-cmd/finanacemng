import axios from 'axios';
import BASE_URL from './base_url';

const commonApi = async (url, method, data = {}, isMultipart = false) => {
  const config = {
    method,
    url: `${BASE_URL}${url}`,
    headers: isMultipart
      ? { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      : { 'Content-Type': 'application/json', 'Authorization': `Bearer ${sessionStorage.getItem('token')}` },
    data,
    timeout: 10000,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const registerApi = (data) => commonApi('/auth/register', 'POST', data);
export const loginApi = (data) => commonApi('/auth/login', 'POST', data);
export const addTransactionApi = (data) => commonApi('/transactions/add', 'POST', data);
export const getTransactionsApi = (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  return commonApi(`/transactions/all?${query}`, 'GET');
};
export const updateTransactionApi = (id, data) => commonApi(`/transactions/${id}`, 'PUT', data);
export const deleteTransactionApi = (id) => commonApi(`/transactions/${id}`, 'DELETE');
export const setBudgetApi = (data) => commonApi('/budget/set', 'POST', data);
export const getBudgetApi = (month) => commonApi(`/budget/get?month=${month}`, 'GET');