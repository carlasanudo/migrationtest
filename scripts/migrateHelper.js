require('dotenv').config();

// Build DATABASE_URL from env variables
const dbUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Set DATABASE_URL for node-pg-migrate
process.env.DATABASE_URL = dbUrl;

// Run node-pg-migrate with provided args
const action = process.argv[2]; // 'up' or 'down'
const { execSync } = require('child_process');

try {
    execSync(`node_modules/.bin/node-pg-migrate ${action}`, {
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: dbUrl }
    });
} catch (error) {
    process.exit(1);
}

