import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } =
    useCart();
  if (items.length === 0) {
    <div>
      <p>No Items in Cart</p>
      <Link to={"/"}>Continue Sopping</Link>
    </div>;
  }
  return (
    <div>
      <h1>Your Cart</h1>
      <div>
        {items.map(({ product, quantity }) => (
          <div key={product.id}>
            <img src={product.image} alt={product.title} />
            <div>
              <p>{product.title}</p>
              <p>{product.price.toFixed(2)}</p>
            </div>
            <div>
              <button onClick={() => updateQuantity(product.id, quantity - 1)}>
                -
              </button>
              <p>{quantity}</p>
              <button onClick={() => updateQuantity(product.id, quantity + 1)}>
                +
              </button>
            </div>
            <p>{(product.price * quantity).toFixed(2)}</p>
            <button onClick={() => removeFromCart(product.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={clearCart}>Clear Cart</button>
        <p>Total:${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Cart;