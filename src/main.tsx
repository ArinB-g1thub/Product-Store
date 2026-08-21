import type { Product } from "@/types/product";
import { Link } from "react-router-dom";
interface ProductCardProps {
  product: Product;
}
function ProductCard({ product }: ProductCardProps) {
  return (
    <div>
      <Link to={`/product/${product.id}`}>
        <div>
          <img src={product.image} alt={product.title} />
        </div>
        <span>{product.category}</span>
        <h3>{product.title}</h3>
        <p>${product.price.toFixed(2)}</p>
        <button>Add to Cart</button>
      </Link>
    </div>
  );
}

export default ProductCard;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductProvider>
      <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  </StrictMode>,
);