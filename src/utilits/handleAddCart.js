import { toast } from "react-toastify";
import { useCart } from "../context/CartContext.js";
import Swal from "sweetalert2";

export const useHandleAddToCart = () => {
  const { addToCart } = useCart();

  const handleAddToCart = async (product) => {
    const sizeOptions = product.sizes.reduce((acc, s) => {
      acc[s.size] = `${s.size.toUpperCase()} - ${s.price} EGP`;
      return acc;
    }, {});
    
    const { value:selectedSize } = await Swal.fire({
      title: "Select Size",
      input: "select",
      inputOptions: sizeOptions,
      inputPlaceholder: "Select a size",
      showCancelButton: true,
    });

    if (!selectedSize) {
      toast.warning("You must select a size.");
      return;
    }

    try {
      await addToCart(product._id, 1, selectedSize);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error("Error adding to cart");
    }
  };

  return { handleAddToCart };
};
