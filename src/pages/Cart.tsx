import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } =
    useCart();
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckedOut(true);
    clearCart();
  };

  if (isCheckedOut) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-emerald-700 text-sm mb-6">
            Thank you for your purchase. Your order has been placed.
          </p>
          <Link
            to="/"
            onClick={() => setIsCheckedOut(false)}
            className="inline-block bg-slate-900 hover:bg-slate-700 text-white font-medium px-5 py-2 rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          No Items in Cart
        </h2>
        <p className="text-slate-500 mb-6">
          Your shopping cart is currently empty.
        </p>
        <Link
          to="/"
          className="inline-block bg-slate-900 hover:bg-slate-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Your Cart</h1>

      {/* Cart Items List */}
      <div className="space-y-4 mb-6">
        {items.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
          >
            <div className="flex items-center gap-4 flex-1">
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="font-medium text-slate-800 text-sm line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-slate-500 text-sm font-bold mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-lg">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="w-6 h-6 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-200 rounded"
              >
                -
              </button>
              <span className="font-semibold text-sm w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="w-6 h-6 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-200 rounded"
              >
                +
              </button>
            </div>

            {/* Subtotal & Delete */}
            <div className="flex items-center gap-6 min-w-140 justify-end">
              <p className="font-bold text-slate-900 text-base">
                ${(product.price * quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(product.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary Footer */}
      <div className="bg-slate-100 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={clearCart}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Clear Cart
        </button>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-medium">Total:</span>
            <span className="text-xl font-bold text-slate-900">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className="bg-slate-900 hover:bg-slate-700 text-white font-medium px-6 py-2 rounded-lg text-sm transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;