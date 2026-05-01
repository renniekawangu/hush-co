import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import styles from './Checkout.module.css';

const Checkout = ({ user }) => {
  const { items, total, clearCart } = useCart();
  const shipping = total > 0 ? 6.5 : 0;
  const grandTotal = total + shipping;
  const [form, setForm] = useState({
    name: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    country: user?.country || '',
    paymentMethod: 'card'
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await ordersAPI.create({
        items,
        totalAmount: grandTotal,
        shippingAddress: {
          name: form.name,
          address: form.address,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          country: form.country
        },
        paymentMethod: form.paymentMethod
      });
      clearCart();
      navigate('/order-confirmation');
    } catch (err) {
      setError(err.response?.data?.error || 'Checkout failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Checkout</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h3>Shipping</h3>
          <input placeholder="Full name" value={form.name} onChange={handleChange('name')} required />
          <input placeholder="Address" value={form.address} onChange={handleChange('address')} required />
          <div className={styles.grid}>
            <input placeholder="City" value={form.city} onChange={handleChange('city')} required />
            <input placeholder="State" value={form.state} onChange={handleChange('state')} required />
          </div>
          <div className={styles.grid}>
            <input placeholder="Zip code" value={form.zipCode} onChange={handleChange('zipCode')} required />
            <input placeholder="Country" value={form.country} onChange={handleChange('country')} required />
          </div>
        </div>

        <div className={styles.section}>
          <h3>Payment</h3>
          <select value={form.paymentMethod} onChange={handleChange('paymentMethod')}>
            <option value="card">Credit card</option>
            <option value="paypal">PayPal</option>
            <option value="cash">Cash on delivery</option>
          </select>
          <div className={styles.placeholder}>
            Payment details placeholder (integrate Stripe/PayPal later)
          </div>
        </div>

        <div className={styles.summary}>
          <div>
            <span>Subtotal</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <div>
            <span>Shipping</span>
            <strong>${shipping.toFixed(2)}</strong>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <strong>${grandTotal.toFixed(2)}</strong>
          </div>
        </div>

        <button type="submit" className={styles.primary} disabled={submitting}>
          {submitting ? 'Placing order...' : 'Place order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
