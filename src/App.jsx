// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import Navbar from './components/Navbar';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import HomePage from './pages/Homepage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </main>
        {/* Toast Notifications */}
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
};

export default App;