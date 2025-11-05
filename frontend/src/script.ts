// API URL - can be configured via environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// URLs de la API
const API_URLS = {
    users: `${API_BASE_URL}/api/users`,
    posts: `${API_BASE_URL}/api/posts`,
    todos: `${API_BASE_URL}/api/todos`
};

// Tipos de datos
interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    city?: string;
    company?: string;
    created_at?: string;
}

interface Post {
    id: number;
    title: string;
    body?: string;
    user_id: number;
}

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

type DataType = 'users' | 'posts' | 'todos';

// Referencias a elementos del DOM
const fetchUsersBtn = document.getElementById('fetchUsers') as HTMLButtonElement;
const fetchPostsBtn = document.getElementById('fetchPosts') as HTMLButtonElement;
const fetchTodosBtn = document.getElementById('fetchTodos') as HTMLButtonElement;
const resultsDiv = document.getElementById('results') as HTMLDivElement;
const loadingDiv = document.getElementById('loading') as HTMLDivElement;
const errorDiv = document.getElementById('error') as HTMLDivElement;

// Función para mostrar/ocultar loading
function showLoading(show: boolean): void {
    if (show) {
        loadingDiv.classList.remove('hidden');
        resultsDiv.innerHTML = '';
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';
    } else {
        loadingDiv.classList.add('hidden');
    }
}

// Función para mostrar errores
function showError(message: string): void {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Función para obtener datos de la API
async function fetchData(url: string, type: DataType): Promise<void> {
    showLoading(true);
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        showLoading(false);
        displayResults(data, type);
    } catch (error) {
        showLoading(false);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        showError(`Error al obtener datos: ${errorMessage}`);
    }
}

// Función para mostrar los resultados
function displayResults(data: User[] | Post[] | Todo[] | User | Post | Todo, type: DataType): void {
    resultsDiv.innerHTML = '';
    
    // Limitar a 10 resultados para mejor visualización
    const limitedData = Array.isArray(data) ? data : [data];
    
    limitedData.slice(0, 10).forEach(item => {
        const card = createCard(item, type);
        resultsDiv.appendChild(card);
    });
    
    if (limitedData.length === 0) {
        const noData = document.createElement('p');
        noData.style.textAlign = 'center';
        noData.style.color = '#666';
        noData.textContent = 'No hay datos disponibles';
        resultsDiv.appendChild(noData);
    }
}

// Función para crear tarjetas según el tipo de datos
function createCard(item: User | Post | Todo, type: DataType): HTMLDivElement {
    const card = document.createElement('div');
    card.className = 'card';
    
    switch(type) {
        case 'users':
            const user = item as User;
            card.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Teléfono:</strong> ${user.phone || 'N/A'}</p>
                <p><strong>Ciudad:</strong> ${user.city || 'N/A'}</p>
                <p><strong>Compañía:</strong> ${user.company || 'N/A'}</p>
                ${user.created_at ? `<p><strong>Join at:</strong> ${user.created_at}</p>` : ''}
            `;
            break;
            
        case 'posts':
            const post = item as Post;
            card.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body || 'Sin contenido'}</p>
                <p><strong>ID de Usuario:</strong> ${post.user_id}</p>
            `;
            break;
            
        case 'todos':
            const todo = item as Todo;
            const badgeClass = todo.completed ? 'badge-complete' : 'badge-incomplete';
            const statusText = todo.completed ? 'Completada' : 'Pendiente';
            card.innerHTML = `
                <h3>${todo.title}</h3>
                <span class="badge ${badgeClass}">${statusText}</span>
            `;
            break;
    }
    
    return card;
}

// Event Listeners
fetchUsersBtn.addEventListener('click', () => fetchData(API_URLS.users, 'users'));
fetchPostsBtn.addEventListener('click', () => fetchData(API_URLS.posts, 'posts'));
fetchTodosBtn.addEventListener('click', () => fetchData(API_URLS.todos, 'todos'));

