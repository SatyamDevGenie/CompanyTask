// src/pages/WishlistPage.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { addToCart } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'; 

const WishlistItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeFromWishlist(item.id));
        toast.error(`${item.name} removed from wishlist.`);
    };

    const handleMoveToCart = () => {
        dispatch(addToCart(item));
        dispatch(removeFromWishlist(item.id));
        toast.success(`${item.name} moved to cart!`);
    };

    return (
        <div className="bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 hover:bg-gray-50 transition duration-150 gap-3">
            
            {/* Item Details */}
            <div className="flex-1 min-w-[50%]">
                <p className="text-xl font-semibold text-gray-800">{item.name}</p>
                <p className="text-2xl font-bold text-green-600">${item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1 hidden sm:block">Product ID: {item.id}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <button
                    onClick={handleMoveToCart}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all text-sm shadow-md"
                >
                    Move to Cart
                </button>
                <button
                    onClick={handleRemove}
                    className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all text-sm shadow-md"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

const WishlistPage = () => {
    const wishlistItems = useSelector(state => state.wishlist);

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-2">Your Saved Items (Wishlist)</h2>

            {wishlistItems.length === 0 ? (
                <div className="p-10 border-2 border-dashed border-gray-300 rounded-xl bg-white shadow-md text-center">
                    <p className="text-xl text-gray-600 mb-4">Your wishlist is empty. Start saving your favorite items!</p>
                    <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg transform hover:scale-105">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="bg-white shadow-2xl rounded-xl overflow-hidden divide-y divide-gray-100">
                    {wishlistItems.map(item => (
                        <WishlistItem key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;


