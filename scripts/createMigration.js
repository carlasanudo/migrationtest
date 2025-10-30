require('dotenv').config();

// Build DATABASE_URL from env variables
const dbUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Get migration name from arg
const migrationName = process.argv[2];

if (!migrationName) {
    console.error('❌ Please provide a name for the migration');
    console.log('Usage: npm run migrate:create your_migration_name');
    process.exit(1);
}

// Execute node-pg-migrate create
const { execSync } = require('child_process');

try {
    execSync(`node_modules/.bin/node-pg-migrate create ${migrationName}`, {
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: dbUrl }
    });
} catch (error) {
    process.exit(1);
}

