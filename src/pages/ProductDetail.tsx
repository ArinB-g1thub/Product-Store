import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useProduct } from "@/context/ProductContext";
import { fetchProductById } from "@/api/product";
import type { Product } from "@/types/product";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, items, updateQuantity } = useCart();
  const { products } = useProduct();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    const productIdNum = Number(id);

    // 1. Instant cache lookup from ProductContext
    const cached = products.find((p) => p.id === productIdNum);
    if (cached) {
      setProduct(cached);
      setLoading(false);
      return;
    }

    // 2. Fallback fetch if not in context cache yet
    const productIdStr = id;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(productIdStr);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, products]);

  const handleAddToCart = () => {
    if (!product) return;
    const existingInCart = items.find((item) => item.product.id === product.id);
    if (existingInCart) {
      updateQuantity(product.id, existingInCart.quantity + quantity);
    } else {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-medium">Loading Details...</p>
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
      {/* Back Link */}
      <Link
        to="/"
        className="inline-block mb-6 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
      >
        ← Back to Products
      </Link>

      {/* Main Product Container */}
      <div className="bg-white rounded-xl border p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
        {/* Product Image */}
        <div className="w-full md:w-1/2 h-80 flex items-center justify-center p-4 bg-slate-50 rounded-xl border">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs uppercase tracking-wide text-emerald-500 font-bold bg-emerald-50 px-2.5 py-1 rounded-md inline-block mb-2">
              {product.category}
            </span>

            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {product.title}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span className="text-amber-500 font-bold">★ {product.rating.rate}</span>
                <span className="text-slate-400">({product.rating.count} reviews)</span>
              </div>
            )}

            <p className="text-3xl font-bold text-slate-900 mb-4">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-slate-600 text-sm leading-relaxed mb-6 border-t pt-4">
              {product.description}
            </p>
          </div>

          {/* Controls & Add to Cart */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700">Quantity:</span>
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-6 h-6 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-200 rounded"
                >
                  -
                </button>
                <span className="font-semibold text-sm w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-6 h-6 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-200 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full sm:w-auto px-8 py-3 rounded-lg font-medium text-sm transition-colors ${
                added
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-900 hover:bg-slate-700 text-white"
              }`}
            >
              {added ? `✓ Added ${quantity} item(s) to Cart!` : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
