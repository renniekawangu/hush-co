import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h2>Welcome to Hush & Co</h2>
        <p>Discover our exclusive collection of premium products</p>
        {!user && (
          <div className={styles.buttons}>
            <button className={styles.btn} onClick={() => navigate('/signup')}>
              Sign Up
            </button>
            <button className={styles.btnSecondary} onClick={() => navigate('/login')}>
              Login
            </button>
          </div>
        )}
        <button className={styles.btnPrimary} onClick={() => navigate('/products')}>
          Browse Products
        </button>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>Quality Products</h3>
          <p>Carefully curated high-quality products for you</p>
        </div>
        <div className={styles.feature}>
          <h3>Fast Shipping</h3>
          <p>Quick and reliable delivery to your doorstep</p>
        </div>
        <div className={styles.feature}>
          <h3>Great Support</h3>
          <p>Our team is here to help with any questions</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
