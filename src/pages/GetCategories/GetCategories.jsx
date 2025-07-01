import React, { useEffect, useState } from 'react';
import GetFilterCat from '../GetFilterCat/GetFilterCat.jsx';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function GetCategories() {
  const { id } = useParams();
  const [dataProduct, setdataProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCategoriesFilter = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/productDetails/${id}`);
      if (data.success && data.data?.category) {
        setdataProduct(data.data);
        toast.success("تم جلب التصنيف بنجاح ✅");
      } else {
        toast.warn("لم يتم العثور على المنتج أو التصنيف غير متاح");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تحميل بيانات المنتج");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoriesFilter();
  }, [id]);

  if (loading) return <div className="loader">جاري التحميل...</div>;

  return (
    <div className='GetCategories'>
      {dataProduct?.category ? (
        <GetFilterCat category={dataProduct.category} />
      ) : (
        <p className="no-category">لم يتم العثور على تصنيف.</p>
      )}
    </div>
  );
}
