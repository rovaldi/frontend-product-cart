import { useContext } from "react";
import { cartContext, CartContextType } from "./cartContext";

export const useCart = (): CartContextType => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider. Make sure your component is wrapped with <CartProvider>"
    );
  }
  return context;
};
