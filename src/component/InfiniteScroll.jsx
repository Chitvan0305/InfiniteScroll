import React, { useEffect, useState } from 'react';
import { get_api_url } from '../utils/api_url';
import ProductCard from './ProductCard';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { MutatingDots } from 'react-loader-spinner';

const InfiniteScroll = () => {
  const [products, setProducts] = useState([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const fetchProducts = async (skipValue) => {
    try {
      setLoading(true);
      const api_url = get_api_url(skipValue);
      const response = await fetch(api_url);
      const data = await response.json();

      if (data && data.products && data.products.length > 0) {
        setProducts((currProducts) => [...currProducts, ...data.products]);
        setHasMoreProducts(data.products.length < data.total);
      } else {
        setHasMoreProducts(false); 
      }
    } catch (err) {
      console.error('Error fetching products:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(0);
  }, []);

  const getMoreProducts = useInfiniteScroll(async () => {
    if (hasMoreProducts && !isLoading) {
      await fetchProducts(products.length);
    }
  }, [hasMoreProducts, isLoading, products.length]);

  return (
    <>
      {!isLoading ? (
        <div>
          {products.map((product, index) => (
            <div
              ref={index === products.length - 1 ? getMoreProducts : null}
              key={product.id}
            >
              <ProductCard thumbnail={product.thumbnail} id={product.id} />
            </div>
          ))}
        </div>
      ) : (
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
    </>
  );
};

export default InfiniteScroll;
