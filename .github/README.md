# GitHub Actions - Database Migrations

This workflow automatically runs database migrations when:

- You push to `main` or `develop`
- You open a Pull Request to `main` or `develop`
- You manually trigger it from the GitHub "Actions" tab

## Triggers

The workflow runs only when there are changes to:

- Files in the `migrations/` folder
- The workflow configuration file
- The `package.json` file

## Setup

The workflow uses a PostgreSQL Docker container to run migrations in an isolated environment.

### Environment Variables

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=migration
DB_USER=sergio
DB_PASSWORD=sergio123
```

## Run Manually

1. Go to the "Actions" tab in your GitHub repository
2. Select "Run Database Migrations"
3. Click "Run workflow"

## See Results

After each run, you can view:

- The status of executed migrations
- Logs for each step of the process
- Confirmation of migrations in the `pgmigrations` table
