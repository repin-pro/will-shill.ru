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