# Frontend Application

Frontend application built with Vite for the API Data Viewer.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional):
```env
VITE_API_URL=http://localhost:3000
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

The built files will be in the `dist` folder.

## Preview Production Build

Preview the production build:
```bash
npm run preview
```

## Configuration

- **API URL**: Configure via `VITE_API_URL` environment variable (defaults to `http://localhost:3000`)
- **Port**: Development server runs on port 5173 by default
- **Proxy**: API requests are automatically proxied during development

## Project Structure

```
frontend/
├── src/
│   ├── index.html      # Main HTML file
│   ├── main.js         # Entry point
│   ├── script.js       # Application logic
│   └── style.css       # Styles
├── dist/               # Production build output
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies and scripts

```

