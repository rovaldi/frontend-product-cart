import React from "react";
import ReactDOM from "react-dom/client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ApolloProvider } from "@apollo/client";
import client from "@/api/apolloClient";
import ProductPage from "@/pages/ProductPage";
import { CartProvider } from "@/context/CartProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <CartProvider>
          <Header />
          <ProductPage />
          <Footer />
        </CartProvider>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
