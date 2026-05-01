const mongoose = require('mongoose');
const User = require('./models/user');
const Product = require('./models/product');
const Message = require('./models/messages');

async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Message.deleteMany({});

    console.log('📦 Seeding database with mock data...');

    // Create mock users
    const users = await User.insertMany([
      {
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '555-0101',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        role: 'user'
      },
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        phone: '555-0102',
        address: '456 Admin Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'USA',
        role: 'admin'
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'password456',
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '555-0103',
        address: '789 Oak Rd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA',
        role: 'user'
      }
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create mock products
    const products = await Product.insertMany([
      {
        name: 'Wireless Headphones',
        description: 'Premium noise-canceling wireless headphones with 30-hour battery life',
        price: 199.99,
        category: 'Electronics',
        sku: 'WH-1001',
        stock: 50,
        image: '/images/headphones.jpg',
        rating: 4.5,
        reviews: []
      },
      {
        name: 'Smart Watch',
        description: 'Advanced fitness tracking and health monitoring smartwatch',
        price: 299.99,
        category: 'Electronics',
        sku: 'SW-2001',
        stock: 35,
        image: '/images/smartwatch.jpg',
        rating: 4.7,
        reviews: []
      },
      {
        name: 'USB-C Cable',
        description: 'High-speed USB-C charging and data transfer cable (3 pack)',
        price: 29.99,
        category: 'Accessories',
        sku: 'UC-3001',
        stock: 200,
        image: '/images/usb-cable.jpg',
        rating: 4.2,
        reviews: []
      },
      {
        name: 'Phone Case',
        description: 'Durable protective phone case with shock absorption',
        price: 24.99,
        category: 'Accessories',
        sku: 'PC-4001',
        stock: 150,
        image: '/images/phone-case.jpg',
        rating: 4.3,
        reviews: []
      },
      {
        name: 'Screen Protector',
        description: 'Tempered glass screen protector (pack of 2)',
        price: 14.99,
        category: 'Accessories',
        sku: 'SP-5001',
        stock: 300,
        image: '/images/screen-protector.jpg',
        rating: 4.1,
        reviews: []
      },
      {
        name: 'Portable Charger',
        description: '20000mAh portable power bank with fast charging capability',
        price: 49.99,
        category: 'Electronics',
        sku: 'PC-6001',
        stock: 75,
        image: '/images/charger.jpg',
        rating: 4.6,
        reviews: []
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Waterproof portable Bluetooth speaker with 12-hour battery',
        price: 79.99,
        category: 'Electronics',
        sku: 'BS-7001',
        stock: 40,
        image: '/images/speaker.jpg',
        rating: 4.4,
        reviews: []
      },
      {
        name: 'Phone Stand',
        description: 'Adjustable aluminum phone stand for desk',
        price: 19.99,
        category: 'Accessories',
        sku: 'PS-8001',
        stock: 120,
        image: '/images/phone-stand.jpg',
        rating: 4.5,
        reviews: []
      }
    ]);

    console.log(`✅ Created ${products.length} products`);

    // Create mock messages
    const messages = await Message.insertMany([
      {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        subject: 'Product Inquiry',
        message: 'Hi, I would like to know more about the wireless headphones. Are they available in different colors?',
        status: 'unread'
      },
      {
        name: 'Michael Chen',
        email: 'michael@example.com',
        subject: 'Technical Support',
        message: 'I received my smartphone case today but it seems to have a defect. Can you help me with a replacement?',
        status: 'read'
      },
      {
        name: 'Emily Rodriguez',
        email: 'emily@example.com',
        subject: 'Shipping Question',
        message: 'How long does international shipping usually take? I would like to order to Canada.',
        status: 'unread'
      },
      {
        name: 'David Thompson',
        email: 'david@example.com',
        subject: 'Feedback',
        message: 'Great customer service and fast delivery! Will definitely order again.',
        status: 'replied'
      }
    ]);

    console.log(`✅ Created ${messages.length} messages`);
    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Test Accounts:');
    console.log('─────────────────────────────────────');
    console.log('Regular User:');
    console.log('  Email: john@example.com');
    console.log('  Password: password123');
    console.log('─────────────────────────────────────');
    console.log('Admin User:');
    console.log('  Email: admin@example.com');
    console.log('  Password: admin123');
    console.log('─────────────────────────────────────\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

module.exports = seedDatabase;
