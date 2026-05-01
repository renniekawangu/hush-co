import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroPill}>Small-batch heat</span>
          <h2>Welcome to Hush & Co</h2>
          <p>Discover curated, premium sauces crafted to elevate every dish.</p>
          <div className={styles.heroActions}>
            {!user && (
              <>
                <button className={styles.btn} onClick={() => navigate('/signup')}>
                  Sign Up
                </button>
                <button className={styles.btnSecondary} onClick={() => navigate('/login')}>
                  Login
                </button>
              </>
            )}
            <button className={styles.btnPrimary} onClick={() => navigate('/products')}>
              Browse Products
            </button>
          </div>
          <div className={styles.heroStats}>
            <div>
              <strong>6</strong>
              <span>Signature blends</span>
            </div>
            <div>
              <strong>4.9★</strong>
              <span>Avg rating</span>
            </div>
            <div>
              <strong>24h</strong>
              <span>Dispatch</span>
            </div>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
            alt="Signature sauces"
          />
        </div>
      </section>

      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>Quality Products</h3>
          <p>Carefully curated, chef-approved sauces.</p>
        </div>
        <div className={styles.feature}>
          <h3>Fast Shipping</h3>
          <p>Quick and reliable delivery to your doorstep.</p>
        </div>
        <div className={styles.feature}>
          <h3>Great Support</h3>
          <p>Our team is here to help with any questions.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
