const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/database');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// CORS controlled by environment variables
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/todos', todoRoutes);

// Healthcheck
app.get('/health', async (req, res) => {
	try {
		await db.query('SELECT 1');
		res.json({ status: 'ok' });
	} catch (e) {
		res.status(500).json({ status: 'error' });
	}
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});

// Start server
app.listen(PORT, async () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📊 Connecting to: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    
    try {
        await db.query('SELECT NOW()');
        console.log('✅ PostgreSQL connection established');
    } catch (error) {
        console.error('❌ Error connecting to PostgreSQL:', error.message);
        console.error('💡 Make sure your database is running');
    }
});


