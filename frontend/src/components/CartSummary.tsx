import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// This component displays a small floating cart summary in the top-right corner.
// When clicked, it navigates the user to the cart page.
const CartSummary = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate to other routes
  const { cart } = useCart();     // Access the current cart from context

  // Calculate the total amount in the cart by summing up (price × quantity) for each item
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    // The entire cart summary is a styled, clickable box positioned at the top-right of the screen
    <div
      style={{
        position: "fixed",             // Keep it floating on the screen
        top: "10px",                   // Distance from top
        right: "10px",                 // Distance from right
        background: "#F8F9FA",         // Light gray background
        padding: "10px 15px",          // Padding inside the box
        borderRadius: "8px",           // Rounded corners
        cursor: "pointer",             // Cursor changes to pointer on hover
        display: "flex",               // Flex layout for the icon and total
        alignItems: "center",          // Vertically center items
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)", // Slight shadow for elevation
        fontSize: "16px", 
        zIndex:999,             // Text size
      }}
      onClick={() => navigate("/cart")} // Navigate to the cart page when clicked
    >
      🛒
      {/* Display the total price in bold, with spacing */}
      <strong style={{ marginLeft: "5px" }}>
        ${totalAmount.toFixed(2)}
      </strong>
    </div>
  );
};

export default CartSummary;
