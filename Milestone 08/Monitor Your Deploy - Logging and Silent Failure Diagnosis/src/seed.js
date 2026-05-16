import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stockapi';

const products = [
  { name: 'Wireless Earbuds', price: 99.99, category: 'electronics' },
  { name: 'Mechanical Keyboard', price: 149.99, category: 'electronics' },
  { name: 'Gaming Mouse', price: 59.99, category: 'electronics' },
  { name: '4K Monitor', price: 399.99, category: 'electronics' },
  { name: 'Cotton T-Shirt', price: 19.99, category: 'clothing' },
  { name: 'Denim Jeans', price: 49.99, category: 'clothing' },
  { name: 'Winter Jacket', price: 120.00, category: 'clothing' },
  { name: 'JavaScript: The Good Parts', price: 29.99, category: 'books' },
  { name: 'Clean Code', price: 45.00, category: 'books' },
  { name: 'Design Patterns', price: 55.00, category: 'books' }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(products);
    console.log('Seeded 10 products successfully');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
