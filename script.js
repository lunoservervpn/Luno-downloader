// Создаем падающие звезды
function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Случайный размер от 1 до 3 пикселей
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Случайная позиция
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        
        // Случайная прозрачность
        star.style.opacity = Math.random();
        
        // Случайная скорость падения
        const duration = Math.random() * 10 + 5;
        star.style.animationDuration = `${duration}s`;
        
        container.appendChild(star);
    }
}

// Загружаем и отображаем список загрузок
async function loadDownloads() {
    try {
        const response = await fetch('links.json');
        if (!response.ok) {
            throw new Error('Не удалось загрузить файл links.json');
        }
        
        const downloads = await response.json();
        const container = document.getElementById('downloads-list');
        
        downloads.forEach(item => {
            const downloadItem = document.createElement('div');
            downloadItem.className = 'download-item';
            
            downloadItem.innerHTML = `
                <h3>${item.name}</h3>
                ${item.description ? `<p>${item.description}</p>` : ''}
                <a href="${item.url}" class="download-link" download>Скачать</a>
            `;
            
            container.appendChild(downloadItem);
        });
    } catch (error) {
        console.error('Ошибка:', error);
        const container = document.getElementById('downloads-list');
        container.innerHTML = `<p style="color: #ff6b6b;">Ошибка загрузки списка файлов: ${error.message}</p>`;
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    loadDownloads();
});
