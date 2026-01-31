# E-Commerce Frontend — Company Task

**A responsive e-commerce frontend with Google Authentication, Shopping Cart, and Wishlist — built with React, Redux Toolkit, and Tailwind CSS. All state is persisted in `localStorage` as per requirements.**

---

## What I Implemented

This project delivers a complete frontend solution with the following **implemented features**:

| # | Feature | Implementation | Persistence |
|---|---------|----------------|-------------|
| 1 | **Google Authentication** | Sign in with Google in navbar; profile picture, name, and Logout on success; auto-login on refresh | `localStorage` (user object) |
| 2 | **Shopping Cart** | Add to cart from product cards; quantity increase/decrease; live cart count in navbar; dedicated Cart page with grand total | `localStorage` (cart state) |
| 3 | **Wishlist** | Toggle wishlist (heart icon) on each product; Wishlist page with “Move to Cart”; item removed from wishlist when moved | `localStorage` (wishlist state) |
| 4 | **Responsive UI** | Mobile-first layout; hamburger menu on small screens; responsive product grid (1–4 columns); Tailwind CSS | — |
| 5 | **Toast Notifications** | Success/error toasts for: add to cart, add/remove wishlist, login, logout | `react-hot-toast` |

**Design decisions:**

- **Logout** clears only the user session; Cart and Wishlist data remain intact.
- **Duplicate “Add to Cart”** increments quantity in Redux (no duplicate line items).
- **Redux Toolkit** for all global state; **localStorage** sync on every relevant action for persistence across refreshes.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19, Vite 7 |
| State management | Redux Toolkit |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Authentication (UI) | @react-oauth/google, jwt-decode |
| Notifications | react-hot-toast |

---

## How to Run

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone https://github.com/SatyamDevGenie/CompanyTask.git
cd CompanyTask
npm install
npm run dev
```

Then open **http://localhost:5173**.

**Google Sign-In (optional):**  
Replace the `GOOGLE_CLIENT_ID` in `src/main.jsx` with your own Client ID from [Google Cloud Console](https://console.cloud.google.com/apis/credentials). Without it, the app runs normally; only the Google login button will fail when clicked.

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (Vite, port 5173) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Project Structure (Key Implementations)

| File / path | What it does |
|-------------|----------------|
| `src/components/Navbar.jsx` | Navigation, Google Login/Logout, profile display, cart & wishlist counts, mobile hamburger menu |
| `src/features/auth/authSlice.js` | Auth state, `login` / `logout`, localStorage read/write for user |
| `src/features/cart/cartSlice.js` | Cart state, add/remove/update quantity, `selectCartCount`, localStorage persistence |
| `src/features/wishlist/wishlistSlice.js` | Wishlist state, toggle, move-to-cart, localStorage persistence |
| `src/pages/HomePage.jsx` | Product grid, product cards, “Add to Cart” and wishlist heart toggle |
| `src/pages/CartPage.jsx` | Cart list, quantity +/- controls, grand total (Redux selector) |
| `src/pages/WishlistPage.jsx` | Wishlist list, “Move to Cart” (adds to cart and removes from wishlist) |
| `src/data/products.js` | Product data (8 items) used across the app |

---

## Feature Details

### 1. Google Authentication (frontend only)

- **Login:** “Sign in with Google” in navbar when user is logged out. On success: user name, profile picture, and Logout button shown.
- **Persistence:** User object stored in `localStorage` and rehydrated on page load (auto-login).
- **Logout:** Only auth state cleared; Cart and Wishlist are not modified.

### 2. Shopping Cart

- **Add to Cart:** From product cards; same product again increases quantity (no duplicate rows).
- **Navbar:** Cart link shows live count of items in cart.
- **Cart page (`/cart`):** Lists each item with name, unit price, quantity; +/- to change quantity; quantity 0 removes the item; grand total computed via Redux selector.
- **Persistence:** Full cart state saved to `localStorage` on every change.

### 3. Wishlist

- **Toggle:** Heart icon on each product card (filled = in wishlist, outline = not).
- **Wishlist page (`/wishlist`):** Lists saved items; “Move to Cart” adds item to cart and removes it from wishlist in one action.
- **Persistence:** Wishlist state saved to `localStorage` on every change.

### 4. UI/UX

- **Styling:** Tailwind CSS; consistent spacing, typography, and colors.
- **Responsive:** Navbar collapses to hamburger on small screens; product grid from 1 column (mobile) to 4 columns (xl); cart and wishlist pages stack cleanly on mobile.
- **Feedback:** Toast notifications for all main actions (cart, wishlist, login, logout).

---

*This README documents the implemented scope of the E-Commerce Frontend task: Authentication, Cart, and Wishlist with Redux and localStorage persistence.*
