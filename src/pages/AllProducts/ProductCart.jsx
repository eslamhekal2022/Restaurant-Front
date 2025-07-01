import React from "react";
import { Link } from "react-router-dom";
import { useHandleAddToCart } from "../../utilits/handleAddCart";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import "./ProductCart.css";

export default function ProductCard({ product }) {
  const { handleAddToCart } = useHandleAddToCart();
  const { addToWihsList } = useCart();

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
          window.location.reload(); // أو استدعاء getAllProducts من context
        } else {
          toast.error(res.data.message || "Error deleting product");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="product-card">
      <Link to={`/ProductDet/${product._id}`}>
        <img
          src={`${process.env.REACT_APP_API_URL}${product.images?.[0]}`}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
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
  );
}
