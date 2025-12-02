import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import ProductPage from "@/pages/ProductPage";
import { CartProvider } from "@/context/CartProvider";
import Header from "@/components/Header";
import { QUERY } from "@/api/GetProduct";

const mockProduct = {
  id: 1,
  name: "Sample Product",
  power: "30W",
  description: "A sample product description",
  price: 1599,
  quantity: 4,
  brand: "Sample Brand",
  weight: 500,
  height: 10,
  width: 5,
  length: 5,
  model_code: "E29 ES",
  colour: "white",
  img_url:
    "https://hips.hearstapps.com/edc.h-cdn.co/assets/16/02/1452884006-lightbulb.jpg",
};

const mocks = [
  {
    request: {
      query: QUERY,
    },
    result: {
      data: {
        allProducts: [mockProduct],
      },
    },
  },
];

// Mock localStorage
beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(Storage.prototype, "setItem");
  jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  localStorage.clear();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
  jest.useRealTimers();
});

const renderProductPage = async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CartProvider>
        <Header />
        <ProductPage />
      </CartProvider>
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText("Sample Product")).toBeInTheDocument();
  });
};

describe("ProductPage test cases", () => {
  test("should be able to increase and decrease product quantity", async () => {
    await renderProductPage();

    const increaseQuantity = screen.getByTestId("increase-quantity");
    const decreaseQuantity = screen.getByTestId("decrease-quantity");
    const currentQuantity = screen.getByTestId("current-quantity");

    expect(currentQuantity).toHaveTextContent("1");

    fireEvent.click(increaseQuantity);
    expect(currentQuantity).toHaveTextContent("2");

    fireEvent.click(decreaseQuantity);
    expect(currentQuantity).toHaveTextContent("1");
  });

  test("should be able to add items to the basket", async () => {
    await renderProductPage();

    const increaseQuantity = screen.getByTestId("increase-quantity");
    const addToBasketElement = screen.getByTestId("add-to-cart");

    fireEvent.click(increaseQuantity);
    fireEvent.click(addToBasketElement);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      const headerCartCount = screen.getByTestId("header-cart-count");
      expect(headerCartCount).toBeInTheDocument();
      expect(headerCartCount).toHaveTextContent("2");
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify({
        1: { product: mockProduct, cartQuantity: 2 },
      })
    );
  });

  test("should clear the cart when 'Clear Cart' is clicked", async () => {
    await renderProductPage();

    const increaseQuantity = screen.getByTestId("increase-quantity");
    const addToBasketElement = screen.getByTestId("add-to-cart");

    fireEvent.click(increaseQuantity);
    fireEvent.click(increaseQuantity);
    fireEvent.click(increaseQuantity);
    fireEvent.click(addToBasketElement);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      const headerCartCount = screen.getByTestId("header-cart-count");
      expect(headerCartCount).toHaveTextContent("4");
    });

    const clearCartButton = screen.getByTestId("clear-cart");
    expect(clearCartButton).toBeInTheDocument();

    fireEvent.click(clearCartButton);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.queryByTestId("header-cart-count")).not.toBeInTheDocument();
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify({})
    );
  });

  test("should not allow adding more items than available stock", async () => {
    await renderProductPage();

    const increaseQuantity = screen.getByTestId("increase-quantity");
    const addToBasketElement = screen.getByTestId("add-to-cart");

    // Add 3 items (max is 4, so 1 more would exceed when we try to add)
    fireEvent.click(increaseQuantity);
    fireEvent.click(increaseQuantity);
    fireEvent.click(increaseQuantity);
    fireEvent.click(addToBasketElement);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      const headerCartCount = screen.getByTestId("header-cart-count");
      expect(headerCartCount).toHaveTextContent("4");
    });

    fireEvent.click(increaseQuantity);

    const addButton = screen.getByTestId("add-to-cart");
    expect(addButton).toBeDisabled();
  });

  test("should disable 'Add to cart' button when stock is 0", async () => {
    const outOfStockMocks = [
      {
        request: {
          query: QUERY,
        },
        result: {
          data: {
            allProducts: [{ ...mockProduct, quantity: 0 }],
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={outOfStockMocks} addTypename={false}>
        <CartProvider>
          <Header />
          <ProductPage />
        </CartProvider>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Sample Product")).toBeInTheDocument();
    });

    const addToBasketElement = screen.getByTestId("add-to-cart");
    expect(addToBasketElement).toBeDisabled();
  });

  test("should persist cart items in localStorage after reload", async () => {
    const cartData = JSON.stringify({
      1: { product: mockProduct, cartQuantity: 2 },
    });

    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(cartData);

    await renderProductPage();

    await waitFor(() => {
      const headerCartCount = screen.getByTestId("header-cart-count");
      expect(headerCartCount).toBeInTheDocument();
      expect(headerCartCount).toHaveTextContent("2");
    });

    expect(localStorage.getItem).toHaveBeenCalledWith("cart");
  });

  test("should display an error message when the cart is full", async () => {
    await renderProductPage();

    const increaseQuantity = screen.getByTestId("increase-quantity");
    const addToBasketElement = screen.getByTestId("add-to-cart");

    fireEvent.click(increaseQuantity);
    fireEvent.click(increaseQuantity);
    fireEvent.click(increaseQuantity);
    fireEvent.click(addToBasketElement);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      const errorMessage = screen.getByTestId("cart-full-message");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent(
        "The cart is full. You can't add more of this product."
      );
    });
  });

  test("should handle multiple products in cart", async () => {
    await renderProductPage();

    const increaseQuantity = screen.getByTestId("increase-quantity");
    const addToBasketElement = screen.getByTestId("add-to-cart");

    fireEvent.click(increaseQuantity);
    fireEvent.click(addToBasketElement);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      const headerCartCount = screen.getByTestId("header-cart-count");
      expect(headerCartCount).toHaveTextContent("2");
    });

    const decreaseQuantity = screen.getByTestId("decrease-quantity");
    fireEvent.click(decreaseQuantity);

    fireEvent.click(addToBasketElement);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      const headerCartCount = screen.getByTestId("header-cart-count");
      expect(headerCartCount).toHaveTextContent("3");
    });
  });
});
