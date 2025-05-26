import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import GetFilterCat from '../GetFilterCat/GetFilterCat.jsx';

const SearchComponent = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchData = async () => {
      if (query && query.trim()) {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/searchProducts?query=${query}`);
          setProducts(data.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      } else {
        setProducts([]);
      }
    };

    fetchData();
  }, [query]);

  // استخراج التصنيفات الفريدة من المنتجات
  const uniqueCategories = [...new Set(products.map(product => product.category))];

  return (
    <div>
      {products.length > 0 ? (
        <GetFilterCat category={uniqueCategories} />
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default SearchComponent;
