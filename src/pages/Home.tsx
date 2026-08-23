import Filterbar from "@/components/Filterbar";
import ProductCard from "@/components/ProductCard";
import { useProduct } from "@/context/ProductContext";

function Home() {
  const { loading, error, filteredProduct } = useProduct();
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-medium">Loading Products...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-red-500 font-medium">Failed to load Products: {error}</p>
      </div>
    );
  }
  return (
    <div>
      <Filterbar />
      {filteredProduct.length === 0 ? (
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <p className="text-slate-500 font-medium">No Products Found</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-6">
          {filteredProduct.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;