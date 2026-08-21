import { fetchCategories, fetchProduct } from "@/api/product";
import type { Product } from "@/types/product";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ProductContextValue {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  //filtering
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOrder: "none" | "price-asc" | "price-desc";
  setSortOrder: (order: "none" | "price-asc" | "price-desc") => void;
  //deleved data
  filteredProduct: Product[];
}
const ProductContext = createContext<ProductContextValue | undefined>(
  undefined,
);
export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCatergories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<
    "none" | "price-asc" | "price-desc"
  >("none");
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [productData, categoriesData] = await Promise.all([
          fetchProduct(),
          fetchCategories(),
        ]);
        if (!cancelled) {
          setProducts(productData);
          setCatergories(categoriesData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something Went Wrong");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProduct = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(term));
    }
    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [products, selectedCategory, searchTerm, sortOrder]);

  const value: ProductContextValue = {
    products,
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortOrder,
    setSortOrder,
    filteredProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProduct() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProduct must be used within ProductProvider");
  }
  return ctx;
}