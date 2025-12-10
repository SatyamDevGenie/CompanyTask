// src/pages/WishlistPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { addToCart } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';

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
        <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between border-b border-gray-200">
            <div className="flex-1">
                <p className="text-xl font-semibold text-gray-800">{item.name}</p>
                <p className="text-2xl font-bold text-green-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex space-x-3">
                <button
                    onClick={handleMoveToCart}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-all text-sm"
                >
                    Move to Cart
                </button>
                <button
                    onClick={handleRemove}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-all text-sm"
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
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Wishlist</h2>

            {wishlistItems.length === 0 ? (
                <p className="text-xl text-gray-500 p-8 border rounded-lg bg-gray-50 text-center">Your wishlist is empty.</p>
            ) : (
                <div className="bg-white shadow-xl rounded-lg overflow-hidden divide-y divide-gray-100">
                    {wishlistItems.map(item => (
                        <WishlistItem key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;