import React, { useEffect, useState } from 'react';
import { productsAPI } from '../utils/api';
import styles from './Products.module.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h2>Products</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product._id} className={styles.card}>
            {product.image && (
              <img src={product.image} alt={product.name} className={styles.productImage} />
            )}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className={styles.price}>${product.price}</p>
            <p className={styles.stock}>Stock: {product.stock}</p>
            <p className={styles.rating}>Rating: {product.rating}/5</p>
            <button className={styles.btn}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
