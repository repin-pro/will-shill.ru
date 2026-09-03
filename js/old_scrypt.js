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