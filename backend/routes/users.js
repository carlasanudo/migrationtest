const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET - Get all users
router.get('/', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, name, email, phone, city, company, created_at FROM users ORDER BY id ASC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// GET - Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            'SELECT id, name, email, phone, city, company, created_at FROM users WHERE id = $1',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// POST - Create new user
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, city, company } = req.body;
        
        const result = await db.query(
            'INSERT INTO users (name, email, phone, city, company) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, phone, city, company]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

module.exports = router;


