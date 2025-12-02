import React from "react";
import { useCart } from "@/context";
import { HEADER_ARIA, HEADER_ICONS, HEADER_LINKS } from "./constants";

import "./Header.css";

const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className="header" role="banner">
      <a
        aria-label={HEADER_ARIA.logoLabel}
        href={HEADER_LINKS.home}
        className="header__logo"
      >
        <svg role="img" aria-hidden="true" className="logo">
          <use xlinkHref={HEADER_ICONS.logo} />
        </svg>
      </a>

      <a
        aria-label={HEADER_ARIA.cartLabel(cartCount)}
        href={HEADER_LINKS.cart}
        className="header__cart"
      >
        <svg role="img" aria-hidden="true" className="cart__icon">
          <use xlinkHref={HEADER_ICONS.cart} />
        </svg>
        {cartCount > 0 && (
          <span
            aria-atomic="true"
            aria-live="polite"
            className="cart__count"
            data-testid="header-cart-count"
            role="status"
          >
            {cartCount}
          </span>
        )}
      </a>
    </header>
  );
};

export default React.memo(Header);
