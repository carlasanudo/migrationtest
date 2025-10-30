const { Pool } = require('pg');
require('dotenv').config();

// Configure connection object
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'imageproject_db',
    user: process.env.DB_USER || 'postgres',
};

// Only add password if defined and not empty
if (process.env.DB_PASSWORD) {
    const password = process.env.DB_PASSWORD.trim();
    if (password !== '') {
        dbConfig.password = password;
    }
}

// Use passwordless auth if not specified
const pool = new Pool(dbConfig);

async function initDatabase() {
    try {
        console.log('🔄 Initializing database...');

        // Create users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(50),
                city VARCHAR(100),
                company VARCHAR(255)
            )
        `);
        console.log('✅ Table "users" created');

        // Create posts table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                title VARCHAR(500) NOT NULL,
                body TEXT,
                user_id INTEGER REFERENCES users(id)
            )
        `);
        console.log('✅ Table "posts" created');

        // Create todos table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS todos (
                id SERIAL PRIMARY KEY,
                title VARCHAR(500) NOT NULL,
                completed BOOLEAN DEFAULT FALSE
            )
        `);
        console.log('✅ Table "todos" created');

        // Insert sample data if tables are empty
        const usersCount = await pool.query('SELECT COUNT(*) FROM users');
        if (parseInt(usersCount.rows[0].count) === 0) {
            console.log('📝 Inserting sample data...');
            
            await pool.query(`
                INSERT INTO users (name, email, phone, city, company) VALUES
                ('John Smith', 'john@example.com', '555-0101', 'Madrid', 'Tech Corp'),
                ('Mary Johnson', 'mary@example.com', '555-0102', 'Barcelona', 'Design Studio'),
                ('Charles Brown', 'charles@example.com', '555-0103', 'Valencia', 'Dev Solutions')
            `);
            
            await pool.query(`
                INSERT INTO posts (title, body, user_id) VALUES
                ('Welcome to the blog', 'This is my first post about technology', 1),
                ('Modern web development', 'Learn the latest trends in development', 1),
                ('Interface design', 'Tips to create beautiful designs', 2)
            `);
            
            await pool.query(`
                INSERT INTO todos (title, completed) VALUES
                ('Learn Node.js', true),
                ('Connect to PostgreSQL', false),
                ('Create REST API', false),
                ('Improve design', true)
            `);
            
            console.log('✅ Sample data inserted');
        }

        console.log('🎉 Database initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

initDatabase();

