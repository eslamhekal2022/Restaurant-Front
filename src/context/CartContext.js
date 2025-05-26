import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [countCart, setcountCart] = useState(0)
  const [wishList, setwishList] = useState([]);
  const [countWishList, setcountWishList] = useState(0)
const [users, setUsers] = useState([])
const [countUsers, setcountUsers] = useState(0)
const [Loading, setLoading] = useState(null)
  
const addToCart = async (productId, quantity = 1) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/AddToCart`,
        { productId, quantity },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (data.success) {
        getCart()
      }
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data?.message || err.message);
      toast.error("Failed to add item to cart");
    }
  };

  const removeCart=async(product)=>{
    const {data}=await axios.delete(`${process.env.REACT_APP_API_URL}/deleteProductCart/${product}`,{
      headers: {token:localStorage.getItem("token")}
    })
    if(data.success) {
      getCart()
    }
  }

  const getCart = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getCart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (data.success) {
        setCart(data.data || []);
        setcountCart(data.count)
      }
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data?.message || err.message);
    }
  };



  // WishList


  const addToWihsList = async (productId) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/addToWishlist`,
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (data.success) {
        getWishList()
      }
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data?.message || err.message);
      toast.error("Failed to add item to cart");
    }
  };
  const removeWishList = async (product) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/removeWishList/${product}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (data.success) {
        getWishList();  // لتحديث قائمة الأمنيات بعد الحذف
      }
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };
  

  const getWishList = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/WishList`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (data.success) {
        setwishList(data.data || []);
        setcountWishList(data.count)
      }
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data?.message || err.message);
    }
  };


  async function getAllUser() {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getUsers`);

      if(data.success){
        setLoading(false)
        setUsers(data.data);
        setcountUsers(data.count)
      }
     
     
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    getCart();
    getWishList();
    getAllUser()
  }, []);

  return (
    <CartContext.Provider value={{Loading,getCart,cart, addToCart,countCart,removeCart ,addToWihsList,wishList,countWishList,removeWishList}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
