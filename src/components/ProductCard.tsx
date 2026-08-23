import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow flex flex-col">
      <Link to={`/product/${product.id}`} className="p-4 flex-1 flex flex-col">
        <div className="h-40 flex items-center justify-center mb-3">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <span className="text-xs uppercase tracking-wide text-emerald-500 font-bold mb-1">
          {product.category}
        </span>
        <h3 className="text-sm font-medium line-clamp-2 mb-2">
          {product.title}
        </h3>
        <p className="text-lg font-bold mx-auto">${product.price.toFixed(2)}</p>
      </Link>
      <button
        onClick={handleAddToCart}
        className={`m-4 rounded-2xl py-2 text-sm font-medium transition-colors ${
          added
            ? "bg-emerald-500 text-white"
            : "bg-slate-900 text-white hover:bg-slate-700"
        }`}
      >
        {added ? "✓ Added" : "Add to Cart"}
      </button>
    </div>
  );
}