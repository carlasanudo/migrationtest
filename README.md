# ImageProject

Full-stack web app with Node.js, Express and PostgreSQL.

## 🚀 Features

- ✅ **Backend with Node.js and Express**: RESTful API to interact with the database
- 🗄️ **PostgreSQL database**: Persistent data storage
- 🎨 **Modern frontend**: Gradients and animations
- 📱 **Responsive**: Adapts to different screen sizes
- ⚡ **API routes**: Full CRUD for users, posts and todos

## 📁 Project Structure

```
imageproject/
├── backend/                 # Backend (Express + PostgreSQL)
│   ├── server.js           # Servidor principal
│   ├── config/             # Configuración
│   │   └── database.js
│   ├── routes/             # Rutas de la API
│   │   ├── users.js
│   │   ├── posts.js
│   │   └── todos.js
│   ├── scripts/            # Scripts de utilidad
│   │   ├── initDatabase.js
│   │   ├── migrateHelper.js
│   │   └── createMigration.js
│   ├── public/             # Frontend estático (legacy)
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   ├── migrate.json
│   └── migrations/
│       └── 001_add_created_at_to_users.js
├── frontend/               # Frontend (React + Vite)
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api.js
│       └── pages/
│           ├── Users.jsx
│           ├── Posts.jsx
│           └── Todos.jsx
├── package.json            # Scripts raíz para backend/frontend
└── ENV_EXAMPLE.md          # Ejemplo de variables de entorno
```

## 🛠️ Instalación

### 1. Install dependencies

```bash
npm install
```

### 2. Configure PostgreSQL

Ensure PostgreSQL is installed and running, then:

1. Create an `.env` file based on `ENV_EXAMPLE.md`:

```bash
cp .env.example .env
```

2. Edit the `.env` file with your credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=imageproject_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña
PORT=3000
```

3. Create the database:

```bash
createdb imageproject_db
```

4. Initialize tables and sample data:

```bash
npm run init-db
```

### 3. Start the servers

```bash
# Backend
npm run dev

# Frontend (React)
npm run frontend:dev
```

The backend runs at `http://localhost:3000` and the frontend at `http://localhost:5173`.

## 📡 API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `POST /api/users` - Create a new user

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post

### Todos

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/:id` - Update a todo status

## 💻 Usage

1. Open your browser at `http://localhost:3000` (legacy) or `http://localhost:5173` (React)
2. Click the buttons to load data:
   - **Get Users**: Shows users from the database
   - **Get Posts**: Shows posts from the database
   - **Get Todos**: Shows todos from the database

## 🗄️ Database

### Tables

1. **users**: Stores user information
   - id, name, email, phone, city, company

2. **posts**: Stores posts
   - id, title, body, user_id

3. **todos**: Stores todos
   - id, title, completed

### Initialization

The script `backend/scripts/initDatabase.js` creates tables and inserts sample data automatically.

## 🔧 Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Frontend**: React (Vite) and legacy HTML/CSS/JS
- **Other**: pg (PostgreSQL client), dotenv, cors

## 📝 Available Scripts

- `npm start` - Start backend in production mode
- `npm run dev` - Start backend with nodemon (development)
- `npm run init-db` - Initialize database

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License
