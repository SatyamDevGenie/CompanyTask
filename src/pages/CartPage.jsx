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
        <div className="flex items-center justify-between border-b py-4">
            <div className="flex-1">
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-gray-500">${item.price.toFixed(2)} each</p>
            </div>

            <div className="flex items-center space-x-4">
                {/* Quantity Controls */}
                <div className="flex items-center border rounded-lg">
                    <button onClick={handleDecrease} className="px-3 py-1 text-lg hover:bg-gray-100 rounded-l-lg">
                        -
                    </button>
                    <span className="px-4 py-1 text-lg font-medium">{item.quantity}</span>
                    <button onClick={handleIncrease} className="px-3 py-1 text-lg hover:bg-gray-100 rounded-r-lg">
                        +
                    </button>
                </div>

                {/* Total Item Price */}
                <p className="text-xl font-bold w-20 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                </p>

                {/* Remove Button */}
                <button onClick={handleRemove} className="text-red-500 hover:text-red-700 transition-colors">
                    <span className="text-2xl">🗑️</span>
                </button>
            </div>
        </div>
    );
};

const CartPage = () => {
    const cartItems = useSelector(state => state.cart);
    const cartTotal = useSelector(selectCartTotal);

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <p className="text-xl text-gray-500 p-8 border rounded-lg bg-gray-50 text-center">Your cart is empty.</p>
            ) : (
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="p-6">
                        {/* Cart Items List */}
                        {cartItems.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}

                        {/* Cart Total */}
                        <div className="mt-6 pt-4 border-t-2 border-gray-200 flex justify-end">
                            <div className="text-right">
                                <p className="text-2xl font-bold text-gray-800">
                                    Cart Total: <span className="text-green-600">${cartTotal}</span>
                                </p>
                                <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all">
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