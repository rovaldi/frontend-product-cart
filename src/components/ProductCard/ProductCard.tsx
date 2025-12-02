import React, { useState } from "react";
import { useCart } from "@/context";
import { ProductCardProps } from "./types";

import "./ProductCard.css";
import {
  PRODUCT_CARD_ARIA_LABELS,
  PRODUCT_CARD_BUTTONS,
  PRODUCT_CARD_MESSAGES,
} from "./constants";

const ProductCard = ({ product, cartQuantity }: ProductCardProps) => {
  const { id, img_url, name, power, price, quantity } = product;
  const { updateCart } = useCart();

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const isCartFull = cartQuantity === quantity;

  const handleQuantityChange = (increment: boolean) => {
    setSelectedQuantity((prev) =>
      Math.min(
        quantity - cartQuantity,
        Math.max(1, prev + (increment ? 1 : -1))
      )
    );
  };

  const handleAddToCart = () => {
    if (cartQuantity + selectedQuantity > quantity) {
      return;
    }
    updateCart(id, cartQuantity + selectedQuantity, product);
    setSelectedQuantity(1);
  };

  const handleClearCart = () => {
    updateCart(id, 0, product);
    setSelectedQuantity(1);
  };

  return (
    <section className="product" aria-labelledby={`product-title-${id}`}>
      <figure className="box__image">
        <img
          alt={`Image of ${name}`}
          className="product__image"
          src={img_url}
        />
      </figure>
      <div className="container-grid">
        <h1 id={`product-title-${id}`} className="product__title">
          {name}
        </h1>
        <p className="product__partial-description">
          {power} // {PRODUCT_CARD_MESSAGES.packet} {quantity}
        </p>
        <div className="container">
          <span
            className="product__price"
            aria-label={`Price: £${(price / 100).toFixed(2)}`}
          >
            £{(price / 100).toFixed(2)}
          </span>
          <span className="quantity">
            <h2 className="quantity__title" id={`quantity-label-${id}`}>
              {PRODUCT_CARD_MESSAGES.quantity}
            </h2>
            <div
              className="quantity__container"
              aria-labelledby={`quantity-label-${id}`}
            >
              <button
                aria-label="Decrease quantity"
                className="quantity__minus"
                data-testid="decrease-quantity"
                disabled={selectedQuantity === 1}
                onClick={() => handleQuantityChange(false)}
              >
                -
              </button>
              <span
                aria-atomic="true"
                aria-live="polite"
                className="quantity__number"
                data-testid="current-quantity"
              >
                {selectedQuantity}
              </span>
              <button
                aria-label="Increase quantity"
                className="quantity__plus"
                data-testid="increase-quantity"
                disabled={selectedQuantity + cartQuantity >= quantity}
                onClick={() => handleQuantityChange(true)}
              >
                +
              </button>
            </div>
          </span>
        </div>
        <button
          aria-label={PRODUCT_CARD_ARIA_LABELS.addToCart(selectedQuantity)}
          className="button__primary"
          data-testid="add-to-cart"
          disabled={cartQuantity + selectedQuantity > quantity}
          onClick={handleAddToCart}
        >
          {PRODUCT_CARD_BUTTONS.addToCart}
        </button>
        {isCartFull && (
          <>
            <p
              className="error-message"
              data-testid="cart-full-message"
              role="alert"
            >
              {PRODUCT_CARD_MESSAGES.cartFull}
            </p>
            <button
              aria-label={PRODUCT_CARD_ARIA_LABELS.clearCart}
              className="button__secondary"
              data-testid="clear-cart"
              onClick={handleClearCart}
            >
              {PRODUCT_CARD_BUTTONS.clearCart}
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default React.memo(ProductCard);
