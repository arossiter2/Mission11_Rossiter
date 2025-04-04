import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

// Define the shape of the context value (what will be accessible to components)
interface CartContextType {
  cart: CartItem[];                          // List of items in the cart
  addToCart: (item: CartItem) => void;       // Function to add an item to the cart
  removeFromCart: (bookID: number) => void;  // Function to remove an item by its book ID
  clearCart: () => void;                     // Function to clear the entire cart
}

// Create the actual context with an initial value of undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider wraps your app (or part of it) and makes the cart context available to children
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]); // Internal cart state

  // Adds an item to the cart; if it already exists, increase its quantity
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);

      const updatedCart = prevCart.map((c) =>
        c.bookID === item.bookID
          ? { ...c, quantity: c.quantity + item.quantity } // Increment quantity if exists
          : c
      );

      return existingItem ? updatedCart : [...prevCart, item]; // Add new item if not found
    });
  };

  // Removes an item from the cart based on its book ID
  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
  };

  // Clears the entire cart
  const clearCart = () => {
    setCart(() => []);
  };

  // Provide the cart context value to all child components
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to consume the cart context
export const useCart = () => {
  const context = useContext(CartContext);

  // Throw an error if used outside a CartProvider
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
