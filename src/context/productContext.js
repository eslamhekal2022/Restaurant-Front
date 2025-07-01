import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
     const [products, setProducts] = useState([]);
  const [productCount, setproductCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [productCategory, setproductCategory] = useState([]);
  const [TotalPages, setTotalPages] = useState(0);
  const [CurrentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem("token");

  const getAllProducts = async (page = 1, limit = 7) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/getAllProducts?page=${page}&limit=${limit}`,
        { headers: { token } }
      );
      if (data.success) {
        setProducts(data.data);
        const uniqueCategories = [...new Set(data.data.map((p) => p.category))];
        setCategories(uniqueCategories);
        setproductCount(data.count);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء جلب البيانات");
      console.error("Error fetching products:", error);
    }
  };

  const getProductCat = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getCategoryProduct`);
      if (data.success) {
        setproductCategory(data.data);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء جلب التصنيفات");
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getProductCat();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        TotalPages,
        CurrentPage,
        setTotalPages,
        setCurrentPage,
        getAllProducts,
        productCategory,
        products,
        categories,
        activeCategory,
        setActiveCategory,
        productCount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
