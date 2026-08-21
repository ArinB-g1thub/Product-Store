import Filterbar from "@/components/Filterbar";
import ProductCard from "@/components/ProductCard";
import { useProduct } from "@/context/ProductContext";

function Home() {
  const { loading, error, filteredProduct } = useProduct();
  if (loading) {
    return <p>Loading Products...</p>;
  }
  if (error) {
    return <p>Failed to load Products:{error}</p>;
  }
  return (
    <div>
      <Filterbar />
      {filteredProduct.length === 0 ? (
        <p>No Product Found</p>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-4">
          {filteredProduct.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;