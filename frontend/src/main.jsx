import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Users from './pages/Users.jsx';
import Posts from './pages/Posts.jsx';
import Todos from './pages/Todos.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Users /> },
      { path: 'users', element: <Users /> },
      { path: 'posts', element: <Posts /> },
      { path: 'todos', element: <Todos /> }
    ]
  }
]);

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);


