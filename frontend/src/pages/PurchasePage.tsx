import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import WelcomeBand from "../components/WelcomeBand";
import { useState } from "react";

// This page allows users to select a quantity of a book and add it to their cart
function PurchasePage() {
  const navigate = useNavigate(); // For navigating to other routes
  const { title, bookID, price } = useParams(); // Get book details from the URL params
  const { addToCart } = useCart(); // Access cart context to add items

  const [quantity, setQuantity] = useState<number>(1); // Quantity input state

  // Handles adding the book to the cart
  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),            // Convert bookID from string to number
      title: title || "No Book Found",   // Fallback if title param is missing
      price: Number(price),              // Convert price from string to number
      quantity: quantity,
    };

    addToCart(newItem); // Add the item to the cart
    navigate("/cart");  // Navigate to the cart page
  };

  return (
    <>
      {/* Top banner */}
      <WelcomeBand />

      {/* Book title */}
      <h3>{title}</h3>

      <div>
        {/* Show book price */}
        <h5>Price: ${price}</h5>

        {/* Quantity input */}
        <p>
          Quantity:{" "}
          <input
            type="number"
            value={quantity}
            onChange={(x) => setQuantity(Number(x.target.value))}
            min={1}
          />
        </p>

        {/* Add to cart button */}
        <button onClick={handleAddToCart} className="btn btn-success">
          Add To Cart
        </button>
      </div>

      {/* Go back button */}
      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        Go Back
      </button>
    </>
  );
}

export default PurchasePage;
