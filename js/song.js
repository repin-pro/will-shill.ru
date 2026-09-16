/* аудио плеер */

const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const trackListItems = document.querySelectorAll('.album-list');
const currentTrackDisplay = document.querySelector('.current-track');
const volumeControl = document.getElementById('volume-control');

let currentTrackIndex = 0;

// Синхронизация громкости при изменении ползунка
volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
  // Опционально: можно менять прозрачность иконки динамика или показывать значение
});

// Если громкость меняется другим способом (например, mute), обновляем ползунок
audio.addEventListener('volumechange', () => {
  volumeControl.value = audio.volume;
});


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

// Вспомогательная функция: переключает иконку и aria-label
function setPlayState(isPlaying) {
  if (isPlaying) {
    playBtn.classList.add('is-playing');
    playBtn.setAttribute('aria-label', 'Пауза');
  } else {
    playBtn.classList.remove('is-playing');
    playBtn.setAttribute('aria-label', 'Воспроизвести');
  }
}


// События для кнопок
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    setPlayState(true);
  } else {
    audio.pause();
    setPlayState(false);
  }
});

// Кнопка «Предыдущий»
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + trackListItems.length) % trackListItems.length;
    loadTrack(currentTrackIndex, true); // <-- Добавил true для автостарта
});

// Кнопка «Следующий»
nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % trackListItems.length;
    loadTrack(currentTrackIndex, true); // <-- Добавил true для автостарта
});

// Загрузка трека по индексу
function loadTrack(index, autoPlay = false) {
  const track = trackListItems[index];
  audio.src = track.dataset.audio;
  audio.load();
  updateCurrentTrack(track.textContent);
  highlightTrack(index);

  // Сбрасываем обработчик, чтобы не накапливались дубли
  audio.onloadedmetadata = null;

  audio.onloadedmetadata = () => {
    // Если нужно автовоспроизведение (после окончания трека или по клику на список)
    if (autoPlay) {
      audio.play().catch(e => {
        console.warn('Автовоспроизведение заблокировано браузером:', e);
        // Браузеры блокируют автоплей без взаимодействия пользователя.
        // В этом случае можно показать подсказку: «Нажмите Play для продолжения».
      });
      setPlayState(true);
    } else {
      // Если трек выбран вручную — не запускаем, ждём клика по Play
      setPlayState(false);
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
  // Переходим к следующему треку
  currentTrackIndex = (currentTrackIndex + 1) % trackListItems.length;
  loadTrack(currentTrackIndex, true); // true = автовоспроизведение
});

// Начальная загрузка первого трека без автоматического запуска
loadTrack(currentTrackIndex);
// Явно устанавливаем текст кнопки воспроизведения
// playBtn.textContent = '▶';

