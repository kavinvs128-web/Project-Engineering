import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Expense from './models/Expense.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('ExpenseApp API is running...');
});

// Seed data function
const seedData = async () => {
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    console.log('Seeding initial users...');
    
    // Create admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@expenseapp.io',
      password: 'admin123',
      role: 'admin'
    });

    // Create manager
    const manager = await User.create({
      name: 'Manager User',
      email: 'manager@expenseapp.io',
      password: 'manager123',
      role: 'manager'
    });

    // Create regular user
    const user = await User.create({
      name: 'Regular User',
      email: 'user@expenseapp.io',
      password: 'user123',
      role: 'user'
    });

    console.log('Seeding initial expenses for user...');
    await Expense.create([
      {
        title: 'MacBook Pro Charger',
        amount: 89.00,
        category: 'supplies',
        submittedBy: user._id
      },
      {
        title: 'Team Dinner - Project Kickoff',
        amount: 245.50,
        category: 'meals',
        submittedBy: user._id
      },
      {
        title: 'Flights to Conference',
        amount: 1200.00,
        category: 'travel',
        submittedBy: user._id
      }
    ]);

    console.log('Database seeded successfully!');
  }
};

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedData();
});
