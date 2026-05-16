const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Task = require('./models/Task');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/taskRoutes'));
app.use('/api', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 3000;

const seed = async () => {
    try {
        await User.deleteMany();
        await Task.deleteMany();

        // Admin creds: admin@tokenapp.io / admin123
        const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            email: 'admin@tokenapp.io',
            password: hashedPasswordAdmin,
            role: 'admin'
        });

        // User creds: user@tokenapp.io / user123
        const hashedPasswordUser = await bcrypt.hash('user123', 10);
        const user = await User.create({
            email: 'user@tokenapp.io',
            password: hashedPasswordUser,
            role: 'user'
        });

        // Seed 3 tasks
        await Task.create([
            { title: 'Learn JWT security', userId: user._id, status: 'pending' },
            { title: 'Fix auth bugs', userId: user._id, status: 'pending' },
            { title: 'Deploy secure app', userId: admin._id, status: 'completed' }
        ]);

        console.log('✅ Database seeded with 2 users and 3 tasks');
    } catch (err) {
        console.error('❌ Seeding failed', err.message);
    }
};

app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    await seed();
});
