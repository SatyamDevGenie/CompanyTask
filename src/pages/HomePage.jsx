// src/pages/HomePage.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { products } from '../data/products';
import { addToCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist);
    const isWished = wishlist.some(item => item.id === product.id);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`);
    };

    const handleToggleWishlist = () => {
        dispatch(toggleWishlist(product));
        if (!isWished) {
            toast.success(`${product.name} added to wishlist!`);
        } else {
            toast.error(`${product.name} removed from wishlist!`);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                <button
                    onClick={handleToggleWishlist}
                    className={`text-2xl transition-colors ${isWished ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
                    aria-label="Toggle Wishlist"
                >
                    {isWished ? '❤️' : '🤍'}
                </button>
            </div>
            <p className="text-gray-600 mt-2 flex-grow">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-2xl font-semibold text-green-600">${product.price.toFixed(2)}</span>
                <button
                    onClick={handleAddToCart}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

const HomePage = () => {
    return (
        <div className="container mx-auto p-4 md:p-8">
            {/* Fancy Header */}
            <div className="text-center mb-12 py-6 bg-gray-50 rounded-xl shadow-inner">
                <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                    <span className="block text-indigo-600">Discovering</span> Our Featured Products
                </h2>
                <p className="text-xl text-gray-500 mt-2">Premium gadgets and essentials delivered to your door.</p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;