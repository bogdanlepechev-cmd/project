const container = document.getElementById('cards-container');
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const IMAGE_URL = 'https://picsum.photos/400/250';

async function fetchAndRenderCards() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
        const posts = await response.json();
        container.innerHTML = '';
        const limitedPosts = posts.slice(0, 12);
        limitedPosts.forEach(post => {
            const cardHTML = `
                <div class="card">
                    <img class="card-image" src="${IMAGE_URL}?random=${post.id}" alt="Placeholder Image">
                    <div class="card-content">
                        <h3 class="card-title">${post.title}</h3>
                        <p class="card-body">${post.body}</p>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', cardHTML);
        });
    } catch (error) {
        console.error('Произошла ошибка при получении данных:', error);
        container.innerHTML = `<p class="error">Не удалось загрузить карточки. Пожалуйста, попробуйте позже. (${error.message})</p>`;
    }
}
fetchAndRenderCards();