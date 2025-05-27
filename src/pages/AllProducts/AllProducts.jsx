import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import { useProduct } from "../../context/productContext";
import "./allProducts.css";
import axios from "axios";
import { useHandleAddToCart } from "../../utilits/handleAddCart.js";

export default function AllProducts() {
    const { handleAddToCart } = useHandleAddToCart();

  const {
    products,
    categories,
    activeCategory,
    setActiveCategory,
    getAllProducts,
    addToWihsList
  } = useProduct();

  // 🗑 حذف منتج
  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/removeProduct/${id}`);
        if (res.data.success) {
          toast.success("Product deleted successfully");
          getAllProducts();
        } else {
          toast.error(res.data.message || "Error deleting product");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    }
  };


  // 🔍 فلترة المنتجات حسب التصنيف
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="all-products-page">
      <div className="category-tabs">
        <button
          className={`category-tab ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All
        </button>
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`category-tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, i) => (
            <div key={i} className="product-card">
              <Link to={`/ProductDet/${product._id}`}>
                {product.images?.[0] ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}${product.images[0]}`}
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <p>No image available.</p>
                )}
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-sizes">
                    {product.sizes.map((size, idx) => (
                      <p key={idx}>
                        {size.size.toUpperCase()} : {size.price} EGP
                      </p>
                    ))}
                  </div>
                </div>
              </Link>

              <div className="product-actions">
                <button className="btnProduct delete-button" onClick={() => deleteProduct(product._id)}>
                  Remove 🗑
                </button>
                <button className="btnProduct add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
                <button className="btnProduct btn-wishlist" onClick={() => addToWihsList(product._id)}>
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products available.</p>
        )}
      </div>
    </div>
  );
}
