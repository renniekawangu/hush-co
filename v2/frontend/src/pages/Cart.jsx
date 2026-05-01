import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
  const { items, total, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const subtotal = total;
  const shipping = total > 0 ? 6.5 : 0;
  const grandTotal = subtotal + shipping;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h2>Your Cart</h2>
          <p>Your cart is empty. Browse products and add your favorites.</p>
          <button className={styles.primary} onClick={() => navigate('/products')}>Explore Products</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Your Cart</h2>
      <div className={styles.list}>
        {items.map((item) => (
          <div key={item.productId} className={styles.item}>
            <div className={styles.itemInfo}>
              {item.image && <img src={item.image} alt={item.name} />}
              <div>
                <strong>{item.name}</strong>
                <div className={styles.subtext}>${item.price}</div>
              </div>
            </div>
            <div className={styles.itemActions}>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
              />
              <button onClick={() => removeItem(item.productId)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <div className={styles.summaryRow}>
          <span>Shipping</span>
          <strong>${shipping.toFixed(2)}</strong>
        </div>
        <div className={styles.summaryTotal}>
          <span>Total</span>
          <strong>${grandTotal.toFixed(2)}</strong>
        </div>
        <button className={styles.primary} onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
