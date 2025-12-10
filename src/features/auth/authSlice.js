// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Function to safely get user data from localStorage
const getInitialAuth = () => {
    try {
        const serializedAuth = localStorage.getItem('userAuthData');
        if (serializedAuth === null) {
            return { user: null };
        }
        return JSON.parse(serializedAuth);
    } catch (e) {
        console.error("Could not load auth state from localStorage", e);
        return { user: null };
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialAuth(),
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            // Persist to localStorage
            localStorage.setItem('userAuthData', JSON.stringify(state));
        },
        logout: (state) => {
            state.user = null;
            // Clear user data from localStorage
            localStorage.removeItem('userAuthData');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;