import React, { useEffect, useState } from 'react';
import { productsAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import styles from './Products.module.css';

const Products = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });
  const [appliedFilters, setAppliedFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [appliedFilters, page]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const rawParams = {
        ...appliedFilters,
        page,
        limit: 9
      };
      const params = Object.entries(rawParams).reduce((acc, [key, value]) => {
        if (value === '' || value === null || value === undefined) {
          return acc;
        }
        acc[key] = value;
        return acc;
      }, {});
      const response = await productsAPI.getAll(params);
      const data = response.data;
      setProducts(data.items || []);
      setPages(data.pages || 1);
      setTotal(data.total || 0);
      const uniqueCategories = Array.from(
        new Set((data.items || []).map((item) => item.category).filter(Boolean))
      );
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field) => (e) => {
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    setAppliedFilters(filters);
    setPage(1);
  };

  const clearFilters = () => {
    const cleared = { search: '', category: '', minPrice: '', maxPrice: '' };
    setFilters(cleared);
    setAppliedFilters(cleared);
    setPage(1);
  };

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div>
          <span className={styles.heroPill}>Curated heat</span>
          <h2>Discover bold flavors</h2>
          <p>Search by category, refine by price, and stock up on your favorites.</p>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.statCard}>
            <span>Products</span>
            <strong>{total}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Categories</span>
            <strong>{categories.length || 0}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Page</span>
            <strong>{page} / {pages}</strong>
          </div>
        </div>
      </section>

      <form className={styles.toolbar} onSubmit={applyFilters}>
        <div className={styles.searchGroup}>
          <label className={styles.label}>Search</label>
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={handleFilterChange('search')}
          />
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.label}>Category</label>
          <select value={filters.category} onChange={handleFilterChange('category')}>
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.label}>Min price</label>
          <input
            type="number"
            min="0"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={handleFilterChange('minPrice')}
          />
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.label}>Max price</label>
          <input
            type="number"
            min="0"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={handleFilterChange('maxPrice')}
          />
        </div>
        <div className={styles.toolbarActions}>
          <button type="submit" className={styles.btnPrimary}>Apply</button>
          <button type="button" className={styles.btnSecondary} onClick={clearFilters}>Clear</button>
        </div>
      </form>
      <div className={styles.resultsMeta}>
        <span>Showing {products.length} of {total} products</span>
      </div>
      <div className={styles.grid}>
        {products.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No products found</h3>
            <p>Try adjusting your filters or clearing all search fields.</p>
            <button className={styles.btnSecondary} type="button" onClick={clearFilters}>Clear filters</button>
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id} className={styles.card}>
              {product.image && (
                <img src={product.image} alt={product.name} className={styles.productImage} />
              )}
              <div className={styles.cardHeader}>
                <h3>{product.name}</h3>
                <span className={styles.rating}>★ {product.rating}</span>
              </div>
              <p>{product.description}</p>
              <div className={styles.metaRow}>
                <span className={styles.price}>${product.price}</span>
                <span className={styles.stock}>Stock: {product.stock}</span>
              </div>
              <button className={styles.btn} onClick={() => addItem(product)}>Add to Cart</button>
            </div>
          ))
        )}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.btnSecondary}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {pages}</span>
        <button
          className={styles.btnSecondary}
          onClick={() => setPage((prev) => Math.min(pages, prev + 1))}
          disabled={page === pages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
