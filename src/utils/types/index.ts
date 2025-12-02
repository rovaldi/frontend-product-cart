import { Product } from "@/api/types";

export interface CartItem {
  product: Product;
  cartQuantity: number;
}

export interface Cart {
  [key: number]: CartItem;
}
