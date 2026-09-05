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
  let visibleCount = 2; // сколько карточек видно

  function updateVisibleCount() {
    visibleCount = window.innerWidth <= 992 ? 1 : 2;
  }

  function showCards(index) {
    cards.forEach(card => card.style.display = 'none');

    let normalizedIndex = index % cards.length;
    if (normalizedIndex < 0) {
      normalizedIndex += cards.length;
    }

    for (let i = 0; i < visibleCount; i++) {
      const cardIndex = (normalizedIndex + i) % cards.length;
      cards[cardIndex].style.display = 'flex';
    }

    currentIndex = normalizedIndex;
  }

  // Инициализация
  updateVisibleCount();
  showCards(0);

  // Реакция на ресайз окна
  window.addEventListener('resize', () => {
    updateVisibleCount();
    showCards(currentIndex);
  });

  // Обработчики кликов
  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      showCards(currentIndex - 1);
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      showCards(currentIndex + 1);
    });
  }
});

