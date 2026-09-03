/* header */

/*burger menu*/


document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.menu');
    const menuClose = document.querySelector('.menu__closed');

    // Функция для открытия/закрытия меню
    function toggleMenu() {
        menu.classList.toggle("active");
    }

    // Открыть меню при клике на бургер
    burger.addEventListener("click", toggleMenu);

    // Закрыть меню при клике на крестик
    menuClose.addEventListener("click", toggleMenu);

    // Закрыть меню при клике вне него (по желанию)
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && !burger.contains(event.target) && menu.classList.contains("active")) {
            toggleMenu();
        }
    });
});


// слайдер песни


document.addEventListener('DOMContentLoaded', function() {
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


/* слайдер шапка */

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slider__background .slide');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Автоматическое переключение каждые 5 секунд
    setInterval(nextSlide, 5000);

    // Начальная инициализация
    showSlide(currentIndex);
});

/* Галерея подгрузка изоборажений (3 блока галерея, фрески, стихи) */
document.addEventListener('DOMContentLoaded', function() {
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
    const galleryImages = document.querySelectorAll('.gallery-column img');
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

/* аудио плеер */


const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const trackListItems = document.querySelectorAll('.track-list li');
const currentTrackDisplay = document.getElementById('current-track');

let currentTrackIndex = 0;

// Обновление времени воспроизведения
function updateTime() {
  currentTime.textContent = formatTime(audio.currentTime);
  totalTime.textContent = formatTime(audio.duration);
  progressBar.value = (audio.currentTime / audio.duration) * 100;
}

// Форматирование времени (мм:сс)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// События для кнопок
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸';
  } else {
    audio.pause();
    playBtn.textContent = '▶';
  }
});

prevBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + trackListItems.length) % trackListItems.length;
  loadTrack(currentTrackIndex);
});

nextBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % trackListItems.length;
  loadTrack(currentTrackIndex);
});

// Загрузка трека по индексу
function loadTrack(index) {
  const track = trackListItems[index];
  audio.src = track.dataset.audio;
  audio.load(); // Перезагрузка аудио для нового трека
  updateCurrentTrack(track.textContent);
  highlightTrack(index);

  // Добавляем обработчик, который запустит воспроизведение после загрузки метаданных
  audio.onloadedmetadata = () => {
    // Если плеер уже был в режиме воспроизведения, продолжаем играть
    if (!audio.paused) {
      audio.play();
    }
  };
}

// Обновление отображения текущего трека
function updateCurrentTrack(trackName) {
  currentTrackDisplay.textContent = `Сейчас играет: ${trackName}`;
}

// Выделение активного трека в списке
function highlightTrack(index) {
  trackListItems.forEach((item, i) => {
    if (i === index) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Обработка клика по треку в списке
trackListItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentTrackIndex = index;
    loadTrack(index);
  });
});

// Обновление прогресса при воспроизведении
audio.addEventListener('timeupdate', updateTime);

// Установка прогресса при клике на полосу
progressBar.addEventListener('click', (e) => {
  const progress = e.offsetX / progressBar.clientWidth;
  audio.currentTime = progress * audio.duration;
});

// Обработка окончания трека
audio.addEventListener('ended', () => {
  nextBtn.click(); // Переход к следующему треку
});

// Начальная загрузка первого трека без автоматического запуска
loadTrack(currentTrackIndex);
// Явно устанавливаем текст кнопки воспроизведения
playBtn.textContent = '▶';

