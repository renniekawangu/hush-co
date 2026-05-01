import React from 'react';
import styles from './Header.module.css';

const Header = ({ user, onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>Hush & Co</h1>
        </div>
        <nav className={styles.nav}>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/contact">Contact</a>
          {user ? (
            <>
              <a href="/profile">Profile</a>
              {user.role === 'admin' && <a href="/admin">Admin</a>}
              <button onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/signup">Sign Up</a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
