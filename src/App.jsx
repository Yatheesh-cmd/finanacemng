import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastStyle={{
            backgroundColor: '#1e1b4b', // indigo-900
            color: '#fff',
          }}
          progressStyle={{
            background: 'linear-gradient(to right, #4f46e5, #a5b4fc)',
          }}
        />
        <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
          <Route path="/add-transaction" element={<PrivateRoute><AddTransaction /></PrivateRoute>} />
          <Route path="/add-transaction/:id" element={<PrivateRoute><AddTransaction /></PrivateRoute>} />
       
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  return token ? children : <Navigate to="/auth" />;
};

export default App;