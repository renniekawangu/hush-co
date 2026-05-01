import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import styles from './Auth.module.css';

const Signup = ({ onLogin }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!form.username.trim()) {
      errors.username = 'Username is required.';
    } else if (form.username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters.';
    }

    if (!form.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Enter a valid email.';
    }

    if (!form.password) {
      errors.password = 'Password is required.';
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);
      const response = await authAPI.register(form);
      onLogin(response.data.user);
      navigate('/');
    } catch (err) {
      const apiError = err.response?.data;
      if (apiError?.details?.length) {
        const details = apiError.details.reduce((acc, item) => {
          acc[item.field] = item.message;
          return acc;
        }, {});
        setFieldErrors(details);
      }
      setError(apiError?.error || 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <aside className={styles.aside}>
          <div>
            <span className={styles.pill}>Join Hush & Co</span>
            <h2>Create your account</h2>
            <p>Unlock a personalized shopping experience and exclusive offers.</p>
            <ul className={styles.featureList}>
              <li><span>•</span> Faster checkout</li>
              <li><span>•</span> Order tracking</li>
              <li><span>•</span> Curated recommendations</li>
            </ul>
          </div>
          <p>Already have an account? Log in in seconds.</p>
        </aside>

        <div className={styles.form}>
          <div className={styles.formHeader}>
            <h2>Create Account</h2>
            <p>Start with your basic details. You can add more later.</p>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Username:</label>
              <input
                type="text"
                value={form.username}
                onChange={handleChange('username')}
                required
                className={fieldErrors.username ? styles.inputError : ''}
              />
              {fieldErrors.username && <div className={styles.fieldError}>{fieldErrors.username}</div>}
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                required
                className={fieldErrors.email ? styles.inputError : ''}
              />
              {fieldErrors.email && <div className={styles.fieldError}>{fieldErrors.email}</div>}
            </div>
            <div className={styles.formGroup}>
              <label>Password:</label>
              <input
                type="password"
                value={form.password}
                onChange={handleChange('password')}
                required
                className={fieldErrors.password ? styles.inputError : ''}
              />
              {fieldErrors.password && <div className={styles.fieldError}>{fieldErrors.password}</div>}
            </div>
            <button type="submit" className={styles.btn} disabled={submitting}>
              {submitting ? 'Creating account...' : 'Sign up'}
            </button>
          </form>
          <div className={styles.divider}>or</div>
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
