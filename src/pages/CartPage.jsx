// src/pages/CartPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartTotal, increaseQuantity, decreaseQuantity, removeItem } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleIncrease = () => {
        dispatch(increaseQuantity(item.id));
        toast.success(`Increased ${item.name} quantity.`);
    };

    const handleDecrease = () => {
        dispatch(decreaseQuantity(item.id));
        if (item.quantity === 1) {
            toast.error(`${item.name} removed from cart.`);
        } else {
            toast.success(`Decreased ${item.name} quantity.`);
        }
    };

    const handleRemove = () => {
        dispatch(removeItem(item.id));
        toast.error(`${item.name} removed from cart.`);
    };

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b py-4 gap-3 sm:gap-4">
            
            {/* Item Name and Price */}
            <div className="flex-1 min-w-[50%]"> 
                <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                <p className="text-gray-500 text-sm">Unit Price: ${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto space-x-4">
                
                <div className="flex items-center border rounded-lg shadow-sm">
                    <button 
                        onClick={handleDecrease} 
                        className="px-3 py-1 text-lg text-gray-700 hover:bg-gray-200 transition-colors rounded-l-lg"
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>
                    <span className="px-4 py-1 text-lg font-medium bg-gray-50">{item.quantity}</span>
                    <button 
                        onClick={handleIncrease} 
                        className="px-3 py-1 text-lg text-gray-700 hover:bg-gray-200 transition-colors rounded-r-lg"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>

                <p className="text-xl font-bold text-gray-800 w-20 text-right hidden sm:block">
                    ${(item.price * item.quantity).toFixed(2)}
                </p>

                {/* Remove Button */}
                <button 
                    onClick={handleRemove} 
                    className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                    aria-label="Remove item"
                >
                    <span className="text-xl">🗑️</span>
                </button>
            </div>
            
            <div className="sm:hidden w-full text-right font-bold text-lg pt-2 border-t border-dashed sm:border-none">
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    );
};

const CartPage = () => {
    const cartItems = useSelector(state => state.cart);
    // Note: selectCartTotal selector should return a string like "123.45"
    const cartTotal = useSelector(selectCartTotal); 

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-2">Your Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <p className="text-xl text-gray-500 p-8 border border-gray-300 rounded-xl bg-white shadow-md text-center">
                    Looks like your cart is lonely. Time to shop!
                </p>
            ) : (
                <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
                    <div className="p-6">
                        
                        {/* Cart Items List */}
                        {cartItems.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}

                        {/* Cart Total & Checkout Button */}
                        <div className="mt-8 pt-6 border-t-2 border-gray-200 flex flex-col items-end">
                            <div className="text-right w-full sm:w-auto">
                                <p className="text-3xl font-bold text-gray-800 mb-4">
                                    Grand Total: <span className="text-green-600">${cartTotal}</span>
                                </p>
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-[1.02]">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
