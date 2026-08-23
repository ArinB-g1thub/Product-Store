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

  const isFiltered =
    searchTerm.trim() !== "" ||
    selectedCategory !== "all" ||
    sortOrder !== "none";

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortOrder("none");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-3 mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Product"
        className="flex-1 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 w-full"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 capitalize w-full sm:w-auto"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat} className="capitalize">
            {cat}
          </option>
        ))}
      </select>
      <select
        value={sortOrder}
        onChange={(e) =>
          setSortOrder(e.target.value as "none" | "price-asc" | "price-desc")
        }
        className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 w-full sm:w-auto"
      >
        <option value="none">Sort: Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>

      {isFiltered && (
        <button
          onClick={handleReset}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}

export default Filterbar;