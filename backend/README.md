# Backend API

Express.js backend API with PostgreSQL database.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Configure your `.env` file with your database credentials.

4. Initialize the database:
```bash
npm run init-db
```

5. Run migrations:
```bash
npm run migrate:up
```

## Development

Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:3000` (or the PORT specified in your .env file).

## API Endpoints

- `GET /health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get todo by ID
- `POST /api/todos` - Create new todo
- `PATCH /api/todos/:id` - Update todo status

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run init-db` - Initialize database with sample data
- `npm run migrate:up` - Run database migrations
- `npm run migrate:down` - Rollback database migrations
- `npm run migrate:create <name>` - Create new migration

