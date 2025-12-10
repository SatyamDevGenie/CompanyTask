// src/components/Navbar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../features/auth/authSlice';
import { selectCartCount } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';

// Icon Helpers
const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const WishlistIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);
// ----------------------------------------------------------------------

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const cartCount = useSelector(selectCartCount);
    const wishlistCount = useSelector((state) => state.wishlist.length);

    const handleLoginSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        const userData = {
            name: decoded.name,
            picture: decoded.picture,
            email: decoded.email
        };
        dispatch(login(userData));
        toast.success(`Welcome, ${decoded.name}!`);
    };

    const handleLogout = () => {
        googleLogout();
        dispatch(logout());
        toast.success('Logged out successfully!');
    };

    const navLinkClasses = "text-gray-300 hover:text-white transition duration-200 flex items-center space-x-1 p-2 rounded-md";

    return (
        <nav className="bg-black p-4 sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">

                {/* Brand/Home Link */}
                <Link to="/" className="text-white text-2xl font-extrabold tracking-wider">
                    CompanyTask
                </Link>

                {/* Mobile Menu Button (Hamburger) */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-300 hover:text-white focus:outline-none"
                    aria-label="Toggle navigation"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                    </svg>
                </button>

                {/* Desktop Nav Links & Icons */}
                <div className={`md:flex md:items-center md:space-x-6 ${isOpen ? 'flex flex-col absolute top-16 left-0 w-full bg-gray-800 p-4 shadow-xl md:static md:flex-row md:p-0 md:shadow-none' : 'hidden'}`}>
                    
                    <Link to="/" onClick={() => setIsOpen(false)} className={navLinkClasses}>
                        Home
                    </Link>

                    {/* Cart Icon */}
                    <Link to="/cart" onClick={() => setIsOpen(false)} className={`${navLinkClasses} relative`}>
                        <CartIcon />
                        <span>Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center -translate-y-1 translate-x-3 md:top-1 md:right-[-10px]">
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Wishlist Icon */}
                    <Link to="/wishlist" onClick={() => setIsOpen(false)} className={`${navLinkClasses} relative`}>
                        <WishlistIcon />
                        <span>Wishlist</span>
                        {wishlistCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center -translate-y-1 translate-x-3 md:top-1 md:right-[-10px]">
                                {wishlistCount > 99 ? '99+' : wishlistCount}
                            </span>
                        )}
                    </Link>
                    
                    {/* Login/Profile Section */}
                    <div className="mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-700 md:border-none">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                
                                {/* Robust Image Display with Text Fallback */}
                                {user.picture ? (
                                    <img 
                                        src={user.picture} 
                                        alt={user.name} 
                                        className="w-8 h-8 rounded-full border-2 border-green-400 object-cover" 
                                        onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/32/FFFFFF/000000?text=U" }} 
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-sm border-2 border-green-400">
                                        {user.name ? user.name[0].toUpperCase() : 'U'}
                                    </div>
                                )}

                                <span className="text-white font-medium hidden sm:inline">{user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-full transition-colors text-sm"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center md:justify-start">
                                <GoogleLogin
                                    onSuccess={handleLoginSuccess}
                                    onError={() => toast.error('Google Login Failed')}
                                    text='signin'
                                    theme='filled_blue'
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;