export const PRODUCT_CARD_BUTTONS = {
  addToCart: "add to cart",
  clearCart: "clear cart",
};

export const PRODUCT_CARD_MESSAGES = {
  cartFull: "The cart is full. You can't add more of this product.",
  packet: "Packet of",
  quantity: "qty",
};

export const PRODUCT_CARD_ARIA_LABELS = {
  addToCart: (quantity: number) => `Add ${quantity} items to cart`,
  clearCart: "Clear cart",
};
