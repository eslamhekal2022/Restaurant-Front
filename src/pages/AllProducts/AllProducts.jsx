import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import "./allProducts.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useProduct } from "../../context/productContext";
import Swal from 'sweetalert2';

export default function AllProducts() {
  const { addToCart, addToWihsList } = useCart();
  const { products, categories, activeCategory, setActiveCategory, getAllProducts } = useProduct();

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/removeProduct/${id}`);
        if (response.data.success) {
          toast.success("Product deleted successfully");
          getAllProducts();
          Swal.fire('Deleted!', 'Product has been deleted.', 'success');
        } else {
          toast.error(response.data.message || "Error deleting product");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="all-products-page">
      <div className="category-tabs">
        <button className={`category-tab ${activeCategory === "all" ? "active" : ""}`} onClick={() => setActiveCategory("all")}>
          All
        </button>
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`category-tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="products-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, i) => (
            <div key={i} className="product-card">
              <Link id="Link" to={`/ProductDet/${product._id}`}>
                {product.images && product.images.length > 0 ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}${product.images[0]}`}
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <p className="no-image">No image available.</p>
                )}

                <div className="product-info">
                  <h2 className="product-name">{product.name}</h2>
               <div className="product-sizes">
  {product.sizes.map((size, idx) => (
    <p key={idx} className="product-price">
      {size.size.toUpperCase()} : {size.price} EGP
    </p>
  ))}
</div>
                </div>
              </Link>

              <div className="product-actions">
                <button className="delete-button btnProduct" onClick={() => deleteProduct(product._id)}>
                  Remove 🗑
                </button>
                <button className="add-to-cart-btn btnProduct" onClick={() => addToCart(product._id)}>
                  Add to Cart
                </button>
                <button className="btn-wishlist btnProduct" onClick={() => addToWihsList(product._id)}>
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
