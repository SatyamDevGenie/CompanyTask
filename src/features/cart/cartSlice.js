// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
    try {
        const serializedCart = localStorage.getItem('userCart');
        return serializedCart ? JSON.parse(serializedCart) : [];
    } catch (e) {
        console.error("Could not load cart from localStorage", e);
        return [];
    }
};

const saveCart = (cartItems) => {
    localStorage.setItem('userCart', JSON.stringify(cartItems));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCart(),
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.find(i => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({ ...item, quantity: 1 });
            }
            saveCart(state);
        },
        increaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.find(i => i.id === id);
            if (item) {
                item.quantity += 1;
            }
            saveCart(state);
        },
        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const itemIndex = state.findIndex(i => i.id === id);

            if (itemIndex > -1) {
                if (state[itemIndex].quantity > 1) {
                    state[itemIndex].quantity -= 1;
                } else {
                    // If quantity is 1, remove the item
                    state.splice(itemIndex, 1);
                }
            }
            saveCart(state);
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const newState = state.filter(item => item.id !== id);
            saveCart(newState);
            return newState;
        },
    },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;

// Selector to calculate total price
export const selectCartTotal = (state) =>
    state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

// Selector for cart count
export const selectCartCount = (state) =>
    state.cart.reduce((count, item) => count + item.quantity, 0);