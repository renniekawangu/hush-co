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
        name: 'Midnight Ember',
        description: 'A deep, smoky ghost pepper hot sauce with rich undertones of coffee and chipotle.',
        price: 18.99,
        category: 'Hot Sauce',
        sku: 'HS-1001',
        stock: 120,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1547097465-1cb7341ab476?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Golden Ghost',
        description: 'Bright scotch bonnet heat balanced with sweet mango and tropical fruit notes.',
        price: 21.99,
        category: 'Hot Sauce',
        sku: 'HS-1002',
        stock: 95,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Smoky Inferno',
        description: 'Intense habanero fire with a smoky finish and hints of roasted garlic.',
        price: 17.49,
        category: 'Hot Sauce',
        sku: 'HS-1003',
        stock: 80,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1543353071-087092ec3935?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Velvet Cayenne',
        description: 'A smooth cayenne blend with buttery texture, perfect for everyday heat.',
        price: 14.99,
        category: 'Hot Sauce',
        sku: 'HS-1004',
        stock: 150,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Blazing Serrano',
        description: 'Fresh serrano peppers with lime and cilantro for a bright, lively burn.',
        price: 16.99,
        category: 'Hot Sauce',
        sku: 'HS-1005',
        stock: 110,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Fiery Gold Reserve',
        description: 'Premium black garlic and chili blend for a gourmet hot sauce experience.',
        price: 24.99,
        category: 'Hot Sauce',
        sku: 'HS-1006',
        stock: 45,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=800&q=80'
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
