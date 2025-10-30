const { Pool } = require('pg');

// Configure connection object
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'imageproject_db',
    user: process.env.DB_USER || 'postgres',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

// Only add password if it's defined
if (process.env.DB_PASSWORD && process.env.DB_PASSWORD.trim() !== '') {
    dbConfig.password = process.env.DB_PASSWORD;
}

const pool = new Pool(dbConfig);

// Event listeners for debugging
pool.on('connect', () => {
    console.log('🔌 New connection established with PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Unexpected error in PostgreSQL client:', err);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};


