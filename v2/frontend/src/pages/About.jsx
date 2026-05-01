import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <span className={styles.pill}>Our Story</span>
        <h2>About Hush & Co</h2>
        <p>
          Hush & Co crafts bold, premium sauces designed to bring layered heat and flavor to every meal.
          We focus on quality ingredients, small-batch consistency, and unforgettable taste.
        </p>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h3>What We Believe</h3>
          <p>
            Great spice should never overpower food. It should elevate it. Our blends are balanced for heat,
            aroma, and depth.
          </p>
        </article>
        <article className={styles.card}>
          <h3>How We Make It</h3>
          <p>
            Each batch is carefully tested for consistency. We source quality peppers and ingredients to keep
            every bottle exceptional.
          </p>
        </article>
        <article className={styles.card}>
          <h3>Why Customers Stay</h3>
          <p>
            Fast support, reliable shipping, and flavors worth reordering. We are building a brand people trust.
          </p>
        </article>
      </section>

      <section className={styles.cta}>
        <h3>Ready to taste the difference?</h3>
        <div className={styles.actions}>
          <Link to="/products">Browse Products</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </section>
    </div>
  );
};

export default About;
