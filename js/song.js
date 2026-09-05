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

