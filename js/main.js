// слайдер песни

document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.songs__cards');
    const leftArrow = document.querySelector('.song-left');
    const rightArrow = document.querySelector('.song-right');

    // Функция для сдвига вправо (следующая карточка)
    function moveRight() {
        const firstCard = cardsContainer.firstElementChild;
        if (firstCard) {
            cardsContainer.removeChild(firstCard); // Удаляем первую
            cardsContainer.appendChild(firstCard); // Добавляем в конец
        }
    }

    // Функция для сдвига влево (предыдущая карточка)
    function moveLeft() {
        const lastCard = cardsContainer.lastElementChild;
        if (lastCard) {
            cardsContainer.removeChild(lastCard); // Удаляем последнюю
            cardsContainer.insertBefore(lastCard, cardsContainer.firstChild); // Ставим в начало
        }
    }

    // Обработчики кликов
    rightArrow.addEventListener('click', moveRight);
    leftArrow.addEventListener('click', moveLeft);
});


/* слайдер видео карточек */

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.video__cards .video__card');
    const leftBtn = document.querySelector('.video-left');
    const rightBtn = document.querySelector('.video-right');
    let currentIndex = 0;

    // Изначальная видимость только первых двух карточек
    cards.forEach((card, index) => {
        if (index >= 2) {
            card.style.display = 'none';
        }
    });

    function showCards(index) {
        // Скрываем все карточки
        cards.forEach(card => card.style.display = 'none');

        // Нормализуем индекс для циклического перехода
        let normalizedIndex = index % cards.length;
        if (normalizedIndex < 0) {
            normalizedIndex += cards.length;
        }

        // Показываем две активные
        cards[normalizedIndex].style.display = 'flex';
        cards[(normalizedIndex + 1) % cards.length].style.display = 'flex';
        currentIndex = normalizedIndex;
    }

    // Обработчики кликов
    leftBtn.addEventListener('click', () => {
        showCards(currentIndex - 1);
    });

    rightBtn.addEventListener('click', () => {
        showCards(currentIndex + 1);
    });

    // Начальная инициализация
    showCards(0);
});
