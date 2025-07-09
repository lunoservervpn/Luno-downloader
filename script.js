// Создаем падающие звезды с улучшениями
function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Случайный размер и форма
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Случайная форма (не все звёзды круглые)
        if (Math.random() > 0.7) {
            star.style.borderRadius = '0';
            star.style.transform = 'rotate(45deg)';
        }
        
        // Случайная позиция
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${-Math.random() * 50}vh`;
        
        // Случайная прозрачность и цвет
        const opacity = Math.random() * 0.8 + 0.2;
        star.style.opacity = opacity;
        
        // Случайный цвет для некоторых звёзд
        if (Math.random() > 0.8) {
            star.style.backgroundColor = `hsl(${Math.random() * 60 + 250}, 100%, 80%)`;
        }
        
        // Случайная скорость падения
        const duration = Math.random() * 15 + 5;
        star.style.animationDuration = `${duration}s`;
        
        // Случайная задержка анимации
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(star);
    }
}

// Получаем иконку для типа файла
function getFileIcon(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    const icons = {
        pdf: 'file-pdf',
        doc: 'file-word',
        docx: 'file-word',
        xls: 'file-excel',
        xlsx: 'file-excel',
        ppt: 'file-powerpoint',
        pptx: 'file-powerpoint',
        zip: 'file-archive',
        rar: 'file-archive',
        exe: 'file-code',
        js: 'file-code',
        html: 'file-code',
        css: 'file-code',
        json: 'file-code',
        txt: 'file-alt',
        jpg: 'file-image',
        jpeg: 'file-image',
        png: 'file-image',
        gif: 'file-image',
        mp3: 'file-audio',
        wav: 'file-audio',
        mp4: 'file-video',
        mov: 'file-video',
        avi: 'file-video'
    };
    
    return icons[extension] || 'file-download';
}

// Форматируем размер файла
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
        
        // Очищаем контейнер
        container.innerHTML = '';
        
        // Добавляем карточки файлов
        downloads.forEach((item, index) => {
            const downloadItem = document.createElement('div');
            downloadItem.className = 'download-item';
            downloadItem.style.animationDelay = `${index * 0.1}s`;
            
            // Получаем иконку для файла
            const fileIcon = getFileIcon(item.url.split('/').pop());
            
            downloadItem.innerHTML = `
                <h3><i class="fas fa-${fileIcon}"></i> ${item.name}</h3>
                <div class="file-info">
                    <span><i class="fas fa-file"></i> ${item.type || 'Файл'}</span>
                    ${item.size ? `<span><i class="fas fa-database"></i> ${formatFileSize(item.size)}</span>` : ''}
                </div>
                ${item.description ? `<div class="file-description">${item.description}</div>` : ''}
                <a href="${item.url}" class="download-link" download>
                    <i class="fas fa-download"></i> Скачать
                </a>
            `;
            
            container.appendChild(downloadItem);
        });
    } catch (error) {
        console.error('Ошибка:', error);
        const container = document.getElementById('downloads-list');
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Ошибка загрузки списка файлов: ${error.message}</p>
            </div>
        `;
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    loadDownloads();
});
