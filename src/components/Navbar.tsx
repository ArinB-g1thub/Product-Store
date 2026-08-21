import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { totalItems } = useCart();
  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={"/"} className="text-xl font-bold ">
          {" "}
          Product Store
        </Link>
        <Link
          to={"/cart"}
          className="relative flex items-center gap-2 bg-slate-700 hover:bg-slate-600 transition-colors px-4 py-2 rounded-lg"
        >
          <span>Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-emerald-500 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;