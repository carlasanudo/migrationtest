# Project Setup Guide

This project consists of a backend API and a frontend application. Follow these steps to get everything running.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (see `backend/ENV_SETUP.md` for details):
```bash
# Copy the example or create manually
DB_HOST=localhost
DB_PORT=5432
DB_NAME=imageproject_db
DB_USER=postgres
DB_PASSWORD=
PORT=3000
NODE_ENV=development
```

4. Initialize the database:
```bash
npm run init-db
```

5. Run migrations:
```bash
npm run migrate:up
```

6. Start the backend server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend will be available at `http://localhost:3000`

## Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file if you need to change the API URL:
```bash
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

5. Build for production:
```bash
npm run build
```

## Running Both Services

### Option 1: Separate Terminals

Open two terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Using npm scripts (if configured)

You can add scripts to the root `package.json` to run both services simultaneously.

## Project Structure

```
.
├── backend/          # Backend API (Express + PostgreSQL)
│   ├── config/       # Database configuration
│   ├── routes/       # API routes
│   ├── scripts/      # Database initialization and migration scripts
│   ├── migrations/   # Database migrations
│   └── server.js     # Main server file
│
├── frontend/         # Frontend application (Vite)
│   ├── src/          # Source files
│   ├── dist/         # Production build output
│   └── index.html    # Entry HTML file
│
└── public/           # Static files (served by backend if needed)
```

## Troubleshooting

### Backend Issues

- **Database connection error**: Make sure PostgreSQL is running and the credentials in `.env` are correct
- **Port already in use**: Change the `PORT` in `.env` or stop the service using port 3000
- **Migration errors**: Check that the database exists and the user has proper permissions

### Frontend Issues

- **API connection errors**: Verify the backend is running and `VITE_API_URL` points to the correct URL
- **CORS errors**: Make sure the backend CORS configuration allows requests from the frontend origin
- **Build errors**: Check that all dependencies are installed with `npm install`

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

