import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import WelcomeBand from "../components/WelcomeBand";

// This component displays the contents of the user's cart,
// allows removing individual items, shows the total cost,
// and provides options to checkout or continue shopping.
function CartPage() {
  const navigate = useNavigate(); // Allows navigation to other pages
  const { cart, removeFromCart } = useCart(); // Access cart and remove function from context

  // Calculate the total amount by summing price * quantity for each item
  const totalAmount = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2); // Format to 2 decimal places

  return (
    <>
      {/* Optional welcome banner at the top */}
      <WelcomeBand />

      <div>
        <h2>Your Cart:</h2>

        <div>
          {/* If cart is empty, show message */}
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            // Otherwise, display list of items
            <ul className="list-unstyled">
              {cart.map((item: CartItem) => (
                <li
                  key={item.bookID}
                  className="d-flex justify-content-between align-items-baseline mb-2"
                >
                  <div className="me-3" style={{ flex: 1 }}>
                    <strong>{item.title}</strong>: {item.quantity} @ $
                    {item.price.toFixed(2)} = $
                    {(item.quantity * item.price).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.bookID)}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Display total cost */}
        <h3>Total: ${totalAmount}</h3>

        {/* Checkout and continue shopping buttons */}
        <button className="btn btn-primary">Checkout</button>
        <button
          onClick={() => navigate("/books")}
          className="btn btn-secondary"
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
}

export default CartPage;
