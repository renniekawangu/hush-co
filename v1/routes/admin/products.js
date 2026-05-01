const express = require('express');
const router = express.Router();
const Product = require('../../models/product');

// Get all products (admin view)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('admin/products', { products });
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
});

// Product form page
router.get('/form', (req, res) => {
  res.render('admin/product-form');
});

// Create product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, sku, stock } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
      category,
      sku,
      stock
    });

    await product.save();
    res.redirect('/admin/products');
  } catch (error) {
    res.status(500).send('Error creating product');
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, category, sku, stock } = req.body;
    
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
      category,
      sku,
      stock,
      updatedAt: Date.now()
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
