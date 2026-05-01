import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import styles from './Auth.module.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);
      const response = await authAPI.login({ email, password });
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
      setError(apiError?.error || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <aside className={styles.aside}>
          <div>
            <span className={styles.pill}>Hush & Co</span>
            <h2>Welcome back</h2>
            <p>Access your orders, manage your profile, and pick up where you left off.</p>
            <ul className={styles.featureList}>
              <li><span>•</span> Track orders in real time</li>
              <li><span>•</span> Save shipping details</li>
              <li><span>•</span> Quick re-order favorites</li>
            </ul>
          </div>
          <p>New here? Create an account in seconds.</p>
        </aside>

        <div className={styles.form}>
          <div className={styles.formHeader}>
            <h2>Login</h2>
            <p>Use your email and password to continue.</p>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }}
                required
                className={fieldErrors.email ? styles.inputError : ''}
              />
              {fieldErrors.email && <div className={styles.fieldError}>{fieldErrors.email}</div>}
            </div>
            <div className={styles.formGroup}>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, password: undefined }));
                }}
                required
                className={fieldErrors.password ? styles.inputError : ''}
              />
              {fieldErrors.password && <div className={styles.fieldError}>{fieldErrors.password}</div>}
            </div>
            <button type="submit" className={styles.btn} disabled={submitting}>
              {submitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className={styles.divider}>or</div>
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
