import { createContext } from "react";
import { Cart, CartItem } from "@/utils/types";

export interface CartContextType {
  cart: Cart;
  cartCount: number;
  updateCart: (
    productId: number,
    cartQuantity: number,
    product: CartItem["product"]
  ) => void;
}

export const cartContext = createContext<CartContextType | undefined>(
  undefined
);
