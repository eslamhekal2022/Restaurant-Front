import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [productCount, setproductCount] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
  const [productCategory, setproductCategory] = useState([])
    async function getAllProducts() {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getAllProducts`,{
          headers:{
            token:localStorage.getItem('token')
          }
        });
      
        if (data.success) {
          setProducts(data.data);
          const uniqueCategories = [...new Set(data.data.map((p) => p.category))];
          setCategories(uniqueCategories);
          setproductCount(data.count)
        }
  
      } catch (error) {
        toast.error("حدث خطأ أثناء جلب البيانات");
        console.error("Error fetching products:", error);
      }
  
    }
  

    async function getProductCat() {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getCategoryProduct`);
      
        if (data.success) {
          setproductCategory(data.data);
        }
  
      } catch (error) {
        toast.error("حدث خطأ أثناء جلب البيانات");
        console.error("Error fetching products:", error);
      }
  
    }

    
  useEffect(() => {
    getAllProducts()
    getProductCat()
  }, []);

  return (
    <ProductContext.Provider value={{getAllProducts,productCategory,products,categories,activeCategory,setActiveCategory,productCount}}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
