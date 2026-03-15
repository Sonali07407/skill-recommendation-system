const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Validate critical environment variables
if (!process.env.MONGO_URI) {
    console.error('FATAL: MONGO_URI environment variable is not set. Database connections will fail.');
}
if (!process.env.JWT_SECRET) {
    console.warn('WARNING: JWT_SECRET environment variable is not set. Using insecure default.');
}

// Allow both local dev and the deployed Vercel frontend
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://skill-recommendation-system-jade.vercel.app'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. curl, Postman, server-to-server)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS: origin '${origin}' not allowed`));
        }
    },
    credentials: true
}));
app.use(express.json());

// Database connection — returns true on success, false on failure
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return true;
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
        return true;
    } catch (err) {
        console.error('Database connection error:', err.message, '| MONGO_URI set:', !!process.env.MONGO_URI);
        return false;
    }
};

// Middleware to ensure DB connection for serverless
app.use(async (req, res, next) => {
    const connected = await connectDB();
    if (!connected) {
        return res.status(503).json({ msg: 'Database unavailable. Please try again later.' });
    }
    next();
});

// Basic route
app.get('/', (req, res) => {
    res.send('Skill Recommendation System API');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/skills', require('./routes/skills'));

// Start server only if not in serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
