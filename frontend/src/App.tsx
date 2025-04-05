import "./App.css";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import PurchasePage from "./pages/PurchasePage";
import BooksPage from "./pages/BooksPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminBooksPage from "./pages/AdminBooksPage";

// This is the main entry point of the application.
// It sets up routing and wraps the app in the CartProvider for global cart state.
function App() {
  return (
    <>
      {/* Provide cart context to the entire app */}
      <CartProvider>
        {/* React Router handles navigation between pages */}
        <Router>
          <Routes>
            {/* Home route - shows the book catalog */}
            <Route path="/" element={<BooksPage />} />

            {/* Explicit /books route - also shows the book catalog */}
            <Route path="/books" element={<BooksPage />} />

            {/* Purchase page with dynamic route params: title, bookID, and price */}
            <Route
              path="/purchase/:title/:bookID/:price"
              element={<PurchasePage />}
            />

            {/* Cart page where users see their selected items */}
            <Route path="/cart" element={<CartPage />} />

            <Route path="/adminbooks" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
