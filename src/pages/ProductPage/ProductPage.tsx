import ProductCard from "@/components/ProductCard";
import ProductDetails from "@/components/ProductDetails";
import { useCart } from "@/context";
import useGetProducts from "@/api/GetProduct";

import "./ProductPage.css";

const ProductPage = () => {
  const { data: products, error, loading } = useGetProducts();
  const { cart } = useCart();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  if (!loading && products.length === 0) return <p>No products available.</p>;

  return (
    <>
      {products.map((product) => (
        <main className="main-content" key={product.id}>
          <ProductCard
            product={product}
            cartQuantity={cart[product.id]?.cartQuantity || 0}
          />
          <ProductDetails productDetails={product} />
        </main>
      ))}
    </>
  );
};

export default ProductPage;
