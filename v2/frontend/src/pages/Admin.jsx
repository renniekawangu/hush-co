import React, { useEffect, useState } from 'react';
import { productsAPI, ordersAPI } from '../utils/api';
import styles from './Admin.module.css';

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  category: '',
  sku: '',
  stock: '',
  image: ''
};

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const [productsRes, ordersRes] = await Promise.all([
        productsAPI.getAll({ page: 1, limit: 100 }),
        ordersAPI.getAllAdmin()
      ]);
      setProducts(productsRes.data.items || []);
      setOrders(ordersRes.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (field) => (e) => {
    setProductForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setProductForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price ?? '',
      category: product.category || '',
      sku: product.sku || '',
      stock: product.stock ?? '',
      image: product.image || ''
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setProductForm(emptyProduct);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingId) {
        await productsAPI.update(editingId, {
          ...productForm,
          price: Number(productForm.price),
          stock: Number(productForm.stock)
        });
      } else {
        await productsAPI.create({
          ...productForm,
          price: Number(productForm.price),
          stock: Number(productForm.stock)
        });
      }
      await fetchData();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productsAPI.delete(id);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete product');
    }
  };

  const handleOrderStatus = async (id, status) => {
    try {
      await ordersAPI.updateStatus(id, status);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update order status');
    }
  };

  if (loading) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <span className={styles.pill}>Admin</span>
          <h2>Admin Dashboard</h2>
          <p>Manage inventory and keep orders moving.</p>
        </div>
        <button className={styles.secondary} onClick={fetchData}>Refresh</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>{editingId ? 'Edit Product' : 'Create Product'}</h3>
          <span className={styles.sectionHint}>All fields are required.</span>
        </div>
        <form className={styles.form} onSubmit={handleProductSubmit}>
          <input placeholder="Name" value={productForm.name} onChange={handleProductChange('name')} required />
          <input placeholder="Description" value={productForm.description} onChange={handleProductChange('description')} required />
          <input type="number" min="0" step="0.01" placeholder="Price" value={productForm.price} onChange={handleProductChange('price')} required />
          <input placeholder="Category" value={productForm.category} onChange={handleProductChange('category')} required />
          <input placeholder="SKU" value={productForm.sku} onChange={handleProductChange('sku')} required />
          <input type="number" min="0" placeholder="Stock" value={productForm.stock} onChange={handleProductChange('stock')} required />
          <input placeholder="Image URL" value={productForm.image} onChange={handleProductChange('image')} required />
          <div className={styles.formActions}>
            <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Product'}</button>
            {editingId && <button type="button" onClick={resetForm} className={styles.secondary}>Cancel</button>}
          </div>
        </form>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Products</h3>
          <span className={styles.sectionHint}>{products.length} items</span>
        </div>
        <div className={styles.table}>
          {products.map((product) => (
            <div key={product._id} className={styles.row}>
              <div>
                <strong>{product.name}</strong>
                <div className={styles.subtext}>{product.category} · ${product.price}</div>
              </div>
              <div className={styles.rowActions}>
                <button onClick={() => startEdit(product)} className={styles.secondary}>Edit</button>
                <button onClick={() => handleDelete(product._id)} className={styles.danger}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Orders</h3>
          <span className={styles.sectionHint}>{orders.length} total</span>
        </div>
        <div className={styles.table}>
          {orders.map((order) => (
            <div key={order._id} className={styles.row}>
              <div>
                <strong>Order #{order._id.slice(-6)}</strong>
                <div className={styles.subtext}>{order.userId?.email || 'Unknown user'} · ${order.totalAmount}</div>
              </div>
              <div className={styles.rowActions}>
                <select
                  value={order.status}
                  onChange={(e) => handleOrderStatus(order._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Admin;
