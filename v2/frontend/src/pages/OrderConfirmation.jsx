import React from 'react';
import { Link } from 'react-router-dom';
import styles from './OrderConfirmation.module.css';

const OrderConfirmation = () => {
  return (
    <div className={styles.container}>
      <h2>Order confirmed</h2>
      <p>Thanks for your purchase! We'll email you once your order ships.</p>
      <div className={styles.actions}>
        <Link to="/products">Continue shopping</Link>
        <Link to="/">Go home</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
