# E-Commerce Frontend Showcase: Authentication and Cart System

## 🌟 Project Overview

This is a responsive, feature-rich e-commerce frontend application built with React and Tailwind CSS. The primary objective of this project was to implement a robust state management system using **Redux Toolkit** combined with client-side data persistence via `localStorage` for both user authentication and shopping features (Cart and Wishlist), as per the assignment requirements.

| Feature | Status | Persistence |
| :--- | :--- | :--- |
| **Google Authentication** | ✅ Implemented | `localStorage` (User) |
| **Shopping Cart** | ✅ Implemented | `localStorage` (Cart Data) |
| **Wishlist** | ✅ Implemented | `localStorage` (Wishlist Data) |
| **Responsive UI** | ✅ Implemented | Tailwind CSS |
| **Toast Notifications** | ✅ Implemented | `react-hot-toast` |

## 🚀 How to Run Locally

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/SatyamDevGenie/CompanyTask.git]
    # Replace [YOUR-REPO-LINK] with your actual repository URL
    cd [CompanyTask] 
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Setup Google OAuth:**
    * No need to create `.env` file in the root directory.
    * Add your Google Client ID (obtained from Google Cloud Console):
        ```
        Add your [YOUR_CLIENT_ID] generated from your own google account
        my client ID for Google Auth [315144209098-iaijlrckng2pgpbdpq3dchr9scgo29pd.apps.googleusercontent.com]
        ```

4.  **Start the Development Server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The application will open in your browser, usually at `http://localhost:5173`.

## ⚙️ Implemented Features

### 1. Google Authentication (Frontend Only)

* **Login Flow:** A dedicated **Google Login button** is present in the Navbar when no user is logged in.
* **Profile Display:** On successful login, the user's **profile picture, name, and a Logout button** replace the Login button in the Navbar. The profile image utilizes robust conditional rendering with a text-initial fallback.
* **Persistence:** The logged-in user object is stored in `localStorage` and restored via Redux on every page refresh (auto-login).
* **Logout Integrity:** Logging out **clears the user profile only**, strictly preserving the Cart and Wishlist data, as required.

### 2. Cart System

* **Add to Cart:** The action handles product duplication by incrementing the quantity using Redux Toolkit reducers.
* **Navbar Count:** The Cart icon displays a real-time count of unique items.
* **Cart Page (`/cart`):**
    * Lists items with name, unit price, and current quantity.
    * **Quantity Controls:** Allows users to **increase/decrease quantity**. The decrease action handles item removal when the quantity reaches zero.
    * **Total Price:** The Grand Total is dynamically calculated and displayed using a Redux selector.
* **Persistence:** The entire cart state persists in `localStorage`.

### 3. Wishlist Functionality

* **Add to Wishlist:** A toggleable **Heart icon** (`❤️`/`🤍`) is present on every product card.
* **Wishlist Page (`/wishlist`):** Lists all saved items.
    * **Move to Cart:** A dedicated button moves the item to the Cart and atomically removes it from the Wishlist, providing clear UX.
* **Persistence:** The wishlist state persists in `localStorage`.

### 4. UI / UX and Responsiveness

* **Styling:** All components are styled using **Tailwind CSS**, featuring a clean, professional aesthetic.
* **Responsiveness:**
    * **Navbar:** Features a responsive hamburger menu for mobile navigation.
    * **Home Page:** Uses a highly responsive product grid (`grid-cols-1` to `xl:grid-cols-4`) for optimal product density on all screen sizes.
    * **Cart/Wishlist Pages:** Item components are designed to fluidly stack content on small screens for better readability.
* **Toast Notifications:** Uses `react-hot-toast` to provide clear, immediate feedback for all critical user actions (e.g., "Product added to cart!", "Logged out successfully!").

## 📂 Project Structure (Key Files)

| Path | Description |
| :--- | :--- |
| `src/components/Navbar.jsx` | Contains all navigation, Google Auth rendering, and live count displays. |
| `src/data/products.js` | Source for the expanded list of product data. |
| `src/features/auth/authSlice.js` | Redux slice for user login/logout and persistence logic. |
| `src/features/cart/cartSlice.js` | Redux slice for cart actions, selectors, and persistence. |
| `src/features/wishlist/wishlistSlice.js` | Redux slice for wishlist actions and persistence. |
| `src/pages/HomePage.jsx` | The main product showcase with responsive grid and product cards. |
| `src/pages/CartPage.jsx` | Handles cart listing, quantity adjustments, and total display. |
| `src/pages/WishlistPage.jsx` | Handles wishlist listing and "Move to Cart" functionality. |