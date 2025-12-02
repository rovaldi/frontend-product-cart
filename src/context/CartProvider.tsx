import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Cart, CartItem } from "@/utils/types";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";
import { cartContext, CartContextType } from "./cartContext";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart>({});

  useEffect(() => {
    const storedCart = getFromLocalStorage("cart");
    const isValidCart = storedCart && typeof storedCart === "object";
    setCart(isValidCart ? storedCart : {});
  }, []);

  const cartCount = useMemo(
    () =>
      Object.values(cart).reduce(
        (total, item) => total + (item.cartQuantity || 0),
        0
      ),
    [cart]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveToLocalStorage("cart", cart);
    }, 500);

    return () => clearTimeout(timeout);
  }, [cart]);

  const updateCart = useCallback(
    (productId: number, cartQuantity: number, product: CartItem["product"]) => {
      setCart((prevCart) => {
        const updatedCart = { ...prevCart };

        if (cartQuantity > 0) {
          updatedCart[productId] = { product, cartQuantity };
        } else {
          delete updatedCart[productId];
        }

        return updatedCart;
      });
    },
    []
  );

  const value: CartContextType = useMemo(
    () => ({ cart, cartCount, updateCart }),
    [cart, cartCount, updateCart]
  );

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
