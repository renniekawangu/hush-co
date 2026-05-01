const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products });
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
});

// Get product details
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
  } catch (error) {
    res.status(500).send('Error fetching product');
  }
});

// Add to cart (API endpoint)
router.post('/cart/add', (req, res) => {
  try {
    const { productId, quantity } = req.body;
    // Cart logic here
    res.json({ success: true, message: 'Added to cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Checkout page
router.get('/checkout', (req, res) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  }
  res.render('checkout');
});

// Process checkout
router.post('/checkout', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    // Checkout logic here
    res.redirect('/confirmation');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
