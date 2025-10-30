// Local API URLs
const API_URLS = {
    users: '/api/users',
    posts: '/api/posts',
    todos: '/api/todos'
};

// DOM references
const fetchUsersBtn = document.getElementById('fetchUsers');
const fetchPostsBtn = document.getElementById('fetchPosts');
const fetchTodosBtn = document.getElementById('fetchTodos');
const resultsDiv = document.getElementById('results');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');

function showLoading(show) {
    if (show) {
        loadingDiv.classList.remove('hidden');
        resultsDiv.innerHTML = '';
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';
    } else {
        loadingDiv.classList.add('hidden');
    }
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

async function fetchData(url, type) {
    showLoading(true);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        showLoading(false);
        displayResults(data, type);
    } catch (error) {
        showLoading(false);
        showError(`Failed to fetch data: ${error.message}`);
    }
}

function displayResults(data, type) {
    resultsDiv.innerHTML = '';
    const limitedData = Array.isArray(data) ? data : [data];
    limitedData.slice(0, 10).forEach(item => {
        const card = createCard(item, type);
        resultsDiv.appendChild(card);
    });
    if (limitedData.length === 0) {
        const noData = document.createElement('p');
        noData.style.textAlign = 'center';
        noData.style.color = '#666';
        noData.textContent = 'No data available';
        resultsDiv.appendChild(noData);
    }
}

function createCard(item, type) {
    const card = document.createElement('div');
    card.className = 'card';
    switch(type) {
        case 'users':
            card.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Email:</strong> ${item.email}</p>
                <p><strong>Phone:</strong> ${item.phone || 'N/A'}</p>
                <p><strong>City:</strong> ${item.city || 'N/A'}</p>
                <p><strong>Company:</strong> ${item.company || 'N/A'}</p>
                <p><strong>Joined at:</strong> ${item.created_at}</p>
            `;
            break;
        case 'posts':
            card.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.body || 'No content'}</p>
                <p><strong>User ID:</strong> ${item.user_id}</p>
            `;
            break;
        case 'todos':
            const badgeClass = item.completed ? 'badge-complete' : 'badge-incomplete';
            const statusText = item.completed ? 'Completed' : 'Pending';
            card.innerHTML = `
                <h3>${item.title}</h3>
                <span class="badge ${badgeClass}">${statusText}</span>
            `;
            break;
    }
    return card;
}

fetchUsersBtn.addEventListener('click', () => fetchData(API_URLS.users, 'users'));
fetchPostsBtn.addEventListener('click', () => fetchData(API_URLS.posts, 'posts'));
fetchTodosBtn.addEventListener('click', () => fetchData(API_URLS.todos, 'todos'));


