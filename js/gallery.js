/* Галерея подгрузка изоборажений (3 блока галерея, фрески, стихи) */
document.addEventListener('DOMContentLoaded', function () {
    // Получаем элементы
    const tabButtons = document.querySelectorAll('.gallery__tab-button');
    const tabContents = document.querySelectorAll('.gallery__tab-content');

    // Проверки на существование элементов
    if (!tabButtons || !tabButtons.length) {
        console.error('Кнопки табов не найдены');
        return;
    }

    if (!tabContents || !tabContents.length) {
        console.error('Контейнеры контента не найдены');
        return;
    }

    // Функция переключения табов
    function showTab(targetId) {
        tabContents.forEach(content => content?.classList.remove('active'));
        tabButtons.forEach(button => button?.classList.remove('active'));

        const activeContent = document.getElementById(targetId);
        if (activeContent) {
            activeContent.classList.add('active');
            tabButtons.forEach(button => {
                if (button?.dataset.target === targetId) {
                    button.classList.add('active');
                }
            });
        }
    }

    // Функция распределения изображений по колонкам
    async function distributeImages(tabId) {
        console.log('Распределение изображений для:', tabId);

        const container = document.querySelector(`.gallery__tab-content#${tabId}`);
        if (!container) return;

        const columns = container.querySelectorAll('.gallery-column');
        const images = Array.from(container.querySelectorAll('.gallery-column img'));

        // Очищаем колонки
        columns.forEach(column => column.innerHTML = '');

        // Распределяем изображения по колонкам
        images.forEach((img, index) => {
            const columnIndex = index % columns.length;
            columns[columnIndex].appendChild(img);
        });
    }

    // Обработчик кликов
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            if (targetId) {
                showTab(targetId);
                distributeImages(targetId);
            }
        });
    });

    // Инициализация
    const initialTarget = document.querySelector('.gallery__tab-button.active');
    if (initialTarget) {
        const targetId = initialTarget.dataset.target;
        if (targetId) {
            showTab(targetId);
            distributeImages(targetId);
        }
    }
});


/* увеличение картинки */
document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const imageOverlay = document.querySelector('.image-overlay');
    const enlargedImage = document.querySelector('.image-overlay__image');
    const closeButton = document.querySelector('.image-overlay__close');

    function toggleOverlay(visible) {
        if (visible) {
            imageOverlay.classList.add('image-overlay_visible');
        } else {
            imageOverlay.classList.remove('image-overlay_visible');
        }
    }

    function openOverlay(src) {
        enlargedImage.src = src;

        enlargedImage.onload = () => {
            const maxWidth = window.innerWidth * 0.9;
            const maxHeight = window.innerHeight * 0.9;
            const ratio = enlargedImage.naturalWidth / enlargedImage.naturalHeight;

            // Рассчитываем оптимальные размеры
            let newWidth, newHeight;

            if (ratio > 1) { // Горизонтальное
                newWidth = Math.min(maxWidth, enlargedImage.naturalWidth);
                newHeight = (newWidth / ratio);
            } else { // Вертикальное
                newHeight = Math.min(maxHeight, enlargedImage.naturalHeight);
                newWidth = (newHeight * ratio);
            }

            // Применяем размеры
            enlargedImage.style.width = `${Math.min(newWidth, maxWidth)}px`;
            enlargedImage.style.height = `${Math.min(newHeight, maxHeight)}px`;

            toggleOverlay(true);
        };
    }

    function closeOverlay() {
        toggleOverlay(false);
    }

    // Обработчики
    closeButton.addEventListener('click', closeOverlay);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && imageOverlay.classList.contains('image-overlay_visible')) {
            closeOverlay();
        }
    });

    imageOverlay.addEventListener('click', (event) => {
        if (event.target === imageOverlay) {
            closeOverlay();
        }
    });

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            openOverlay(img.src);
        });
    });

    // Обработка ресайза
    window.addEventListener('resize', () => {
        if (imageOverlay.classList.contains('image-overlay_visible')) {
            openOverlay(enlargedImage.src); // Перерассчитываем размеры
        }
    });
});
