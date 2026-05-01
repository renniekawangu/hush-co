import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <h3>About Hush & Co</h3>
            <p>Small-batch sauces crafted for bold flavor and everyday heat.</p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <p>Email: hello@hushco.com</p>
            <p>Phone: +260 XXX XXX XXX</p>
          </div>
          <div>
            <h3>Follow</h3>
            <div className={styles.socials}>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>Hush & Co © 2026. All rights reserved.</span>
          <span>Crafted with heat.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
