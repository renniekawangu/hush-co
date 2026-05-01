import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactAPI } from '../utils/api';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactAPI.submit(formData);
      setSuccess('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <aside className={styles.aside}>
          <div>
            <span className={styles.pill}>Support</span>
            <h2>Contact Us</h2>
            <p>We usually respond within 24 hours.</p>
            <ul className={styles.featureList}>
              <li><span>•</span> Order questions</li>
              <li><span>•</span> Wholesale inquiries</li>
              <li><span>•</span> Product feedback</li>
            </ul>
          </div>
          <p>Prefer email? hello@hushco.com</p>
        </aside>

        <div className={styles.form}>
          <div className={styles.formHeader}>
            <h2>Send a message</h2>
            <p>Tell us how we can help.</p>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
              />
            </div>
            <button type="submit" className={styles.btn}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
