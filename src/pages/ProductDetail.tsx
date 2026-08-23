import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { fetchProductById } from "@/api/product";
import type { Product } from "@/types/product";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const productId = id;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-medium">Loading Product Details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-red-500 font-medium mb-4">
          {error || "Product not found"}
        </p>
        <Link
          to="/"
          className="inline-block bg-slate-900 text-white font-medium px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-block mb-6 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
      >
        ← Back to Products
      </Link>

      <div className="bg-white rounded-xl border p-6 shadow-sm flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 h-72 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wide text-emerald-500 font-bold">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1 mb-3">
              {product.title}
            </h1>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              {product.description}
            </p>
            <p className="text-2xl font-bold text-slate-900 mb-6">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-slate-900 text-white rounded-lg py-2.5 px-6 font-medium hover:bg-slate-700 transition-colors w-fit"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
