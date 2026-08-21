import { useProduct } from "@/context/ProductContext";

function Filterbar() {
  const {
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortOrder,
    setSortOrder,
  } = useProduct();
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6 p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Product"
        className="flex-1 border border-slate-300 rounded-lg px-4 py-3 "
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
      >
        <option value="all">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <select
        value={sortOrder}
        onChange={(e) =>
          setSortOrder(e.target.value as "none" | "price-asc" | "price-desc")
        }
        className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
      >
        <option value="none">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}

export default Filterbar;