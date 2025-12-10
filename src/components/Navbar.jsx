// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../features/auth/authSlice';
import { selectCartCount } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
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

    return (
        <nav className="bg-gray-800 p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">

                {/* Home Link */}
                <Link to="/" className="text-white text-2xl font-bold">
                    E-Shop
                </Link>

                {/* Nav Links & Icons */}
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-300 hover:text-white">
                        Home
                    </Link>

                    {/* Cart Icon */}
                    <Link to="/cart" className="text-gray-300 hover:text-white relative">
                        🛒 Cart
                        {cartCount > 0 && (
                            <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Wishlist Icon */}
                    <Link to="/wishlist" className="text-gray-300 hover:text-white relative">
                        ❤️ Wishlist
                        {wishlistCount > 0 && (
                            <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    {/* Login/Profile Section */}
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                            <span className="text-white hidden sm:inline">{user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-md text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={() => toast.error('Google Login Failed')}
                            text='signin'
                        />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;