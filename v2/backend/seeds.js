const User = require('./models/User');
const Product = require('./models/Product');
const Message = require('./models/Message');

async function seedDatabase() {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('✅ Database already seeded');
      return;
    }

    console.log('📦 Seeding database with mock data...');

    // Create mock users
    const users = await User.insertMany([
      {
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'user'
      },
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin'
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'password456',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'user'
      }
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create mock products
    const products = await Product.insertMany([
      {
        name: 'Wireless Headphones',
        description: 'Premium noise-canceling wireless headphones',
        price: 199.99,
        category: 'Electronics',
        sku: 'WH-1001',
        stock: 50,
        rating: 4.5
      },
      {
        name: 'Smart Watch',
        description: 'Advanced fitness tracking smartwatch',
        price: 299.99,
        category: 'Electronics',
        sku: 'SW-2001',
        stock: 35,
        rating: 4.7
      },
      {
        name: 'USB-C Cable',
        description: 'High-speed USB-C charging cable (3 pack)',
        price: 29.99,
        category: 'Accessories',
        sku: 'UC-3001',
        stock: 200,
        rating: 4.2
      },
      {
        name: 'Phone Case',
        description: 'Durable protective phone case',
        price: 24.99,
        category: 'Accessories',
        sku: 'PC-4001',
        stock: 150,
        rating: 4.3
      },
      {
        name: 'Screen Protector',
        description: 'Tempered glass screen protector (2 pack)',
        price: 14.99,
        category: 'Accessories',
        sku: 'SP-5001',
        stock: 300,
        rating: 4.1
      },
      {
        name: 'Portable Charger',
        description: '20000mAh power bank with fast charging',
        price: 49.99,
        category: 'Electronics',
        sku: 'PC-6001',
        stock: 75,
        rating: 4.6
      }
    ]);

    console.log(`✅ Created ${products.length} products`);

    const messages = await Message.insertMany([
      {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        subject: 'Product Inquiry',
        message: 'Hi, I would like to know more about the wireless headphones.',
        status: 'unread'
      }
    ]);

    console.log(`✅ Created ${messages.length} messages`);
    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Test Accounts:');
    console.log('─────────────────────────────────────');
    console.log('User: john@example.com / password123');
    console.log('Admin: admin@example.com / admin123');
    console.log('─────────────────────────────────────\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

module.exports = seedDatabase;
