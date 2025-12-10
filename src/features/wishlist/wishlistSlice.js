// src/features/wishlist/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadWishlist = () => {
    try {
        const serializedWishlist = localStorage.getItem('userWishlist');
        return serializedWishlist ? JSON.parse(serializedWishlist) : [];
    } catch (e) {
        console.error("Could not load wishlist from localStorage", e);
        return [];
    }
};

const saveWishlist = (wishlistItems) => {
    localStorage.setItem('userWishlist', JSON.stringify(wishlistItems));
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: loadWishlist(),
    reducers: {
        toggleWishlist: (state, action) => {
            const item = action.payload;
            const existingItemIndex = state.findIndex(i => i.id === item.id);

            if (existingItemIndex > -1) {
                // Item exists, remove it
                state.splice(existingItemIndex, 1);
            } else {
                // Item doesn't exist, add it
                state.push(item);
            }
            saveWishlist(state);
        },
        removeFromWishlist: (state, action) => {
            const id = action.payload;
            const newState = state.filter(item => item.id !== id);
            saveWishlist(newState);
            return newState;
        }
    },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;