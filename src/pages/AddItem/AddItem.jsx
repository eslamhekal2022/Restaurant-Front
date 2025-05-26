import axios from "axios";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import "./AddItem.css";
import { useProduct } from "../../context/productContext";

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "pizza",
    sizes: {
      s: "",
      m: "",
      l: "",
    },
    images: [],
    imagePreviews: [],
  });

  const { getAllProducts } = useProduct();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "images") {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
        imagePreviews: [...prev.imagePreviews, ...files.map((file) => URL.createObjectURL(file))],
      }));
    } else if (["s", "m", "l"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        sizes: {
          ...prev.sizes,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const images = [...prev.images];
      const previews = [...prev.imagePreviews];
      images.splice(index, 1);
      previews.splice(index, 1);
      return { ...prev, images, imagePreviews: previews };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataAdd = new FormData();

    dataAdd.append("name", formData.name);
    dataAdd.append("description", formData.description);
    dataAdd.append("category", formData.category);

    // تجهيز الأحجام والأسعار
    const sizesArray = ["s", "m", "l"]
      .filter((size) => formData.sizes[size])
      .map((size) => ({
        size,
        price: Number(formData.sizes[size]),
      }));

    if (sizesArray.length === 0) {
      toast.warning("يرجى إدخال سعر واحد على الأقل!");
      return;
    }

    dataAdd.append("sizes", JSON.stringify(sizesArray));
    formData.images.forEach((image) => dataAdd.append("images", image));

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/addProduct`,
        dataAdd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data.success) {
        toast.success("تمت إضافة الطبق بنجاح!");
        setFormData({
          name: "",
          description: "",
          category: "breakfast",
          sizes: { s: "", m: "", l: "" },
          images: [],
          imagePreviews: [],
        });
        getAllProducts();
      } else {
        toast.warning("حدث خطأ أثناء الإضافة.");
      }
    } catch (error) {
      console.error("حدث خطأ:", error);
      toast.error("خطأ في الخادم، حاول لاحقًا.");
    }
  };

  return (
    <div className="add-item-container">
      <h2>إضافة طبق جديد</h2>
      <form className="add-item-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="meal name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="ingredients / description"
          value={formData.description}
          onChange={handleChange}
        />

        {/* مدخلات الأسعار للأحجام */}
        <div className="size-inputs">
          <input
            type="number"
            name="s"
            placeholder="سعر الحجم الصغير (S)"
            value={formData.sizes.s}
            onChange={handleChange}
          />
          <input
            type="number"
            name="m"
            placeholder="سعر الحجم المتوسط (M)"
            value={formData.sizes.m}
            onChange={handleChange}
          />
          <input
            type="number"
            name="l"
            placeholder="سعر الحجم الكبير (L)"
            value={formData.sizes.l}
            onChange={handleChange}
          />
        </div>

        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="pizza">Pizza</option>
          <option value="mixPizza">mixPizza</option>
          <option value="burger">burger</option>
          <option value="pasta">pasta</option>
        </select>

        <button type="button" className="upload-btn" onClick={() => fileInputRef.current.click()}>
          📸 رفع الصور
        </button>

        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />

        <div className="image-preview-container">
          {formData.imagePreviews.map((src, index) => (
            <div key={index} className="image-preview">
              <img src={src} alt="معاينة" />
              <button type="button" onClick={() => handleRemoveImage(index)}>x</button>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          إضافة الطبق
        </button>
      </form>
    </div>
  );
};

export default AddItem;
