export const HEADER_LINKS = {
  home: "https://google.com",
  cart: "#",
};

export const HEADER_ARIA = {
  logoLabel: "Go to home page",
  cartLabel: (count: number) =>
    `Shopping cart with ${count} ${count === 1 ? "item" : "items"}`,
};

export const HEADER_ICONS = {
  logo: "/icons.svg#logo",
  cart: "/icons.svg#cart",
};
