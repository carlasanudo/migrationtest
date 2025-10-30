const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET - Get all todos
router.get('/', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, title, completed FROM todos ORDER BY id ASC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

// GET - Get todo by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            'SELECT id, title, completed FROM todos WHERE id = $1',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching todo:', error);
        res.status(500).json({ error: 'Failed to fetch todo' });
    }
});

// POST - Create new todo
router.post('/', async (req, res) => {
    try {
        const { title, completed } = req.body;
        
        const result = await db.query(
            'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *',
            [title, completed || false]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

// PATCH - Update todo status
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        
        const result = await db.query(
            'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
            [completed, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

module.exports = router;


