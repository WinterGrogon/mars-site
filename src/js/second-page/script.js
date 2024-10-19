const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 1000,
    slidesPerView: 3,
    spaceBetween: 130,
    grabCursor: true,
    mousewheel: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        800: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
        1600: {
            spaceBetween: 130,
        },
    }
});


// Настройка размеров слайда при изменении размера окна
window.addEventListener('resize', function() {
    // Перебираем слайды
    swiper.slides.forEach(slide => {
        // Получаем details и закрываем его
        const details = slide.querySelector('details');
        if (details) {
            details.removeAttribute('open');
        }
        
        // Делаем автоматический рассчет высоты
        setTimeout(() => {
            slide.style.height = '';
        }, 10);
        
        // Установим явную высоту слайда с небольшой задержкой (10 мс)
        setTimeout(() => {
            slide.style.height = slide.clientHeight + 'px';
        }, 10);
    });
});


// настройка слайдов и взаимодействия с ними
swiper.slides.forEach((slide, index) => {
    // Получим высоту слайда
    const cardHeight = slide.clientHeight;
    // Установим явную высоту слайда
    slide.style.height = slide.clientHeight + 'px';

    // дополнительные настройки при наведении курсора
    slide.addEventListener('mouseenter', () => {
        // Остановим автоматическую прокрутку слайдов при наведении курсора
        swiper.autoplay.stop();
    });

    slide.addEventListener('mouseleave', () => {
        // Запустим автоматическую прокрутку слайдов при уходе курсора
        swiper.autoplay.start();
    });

    // настройка клика по слайду
    slide.addEventListener('click', () => {
        // Проверим, отображается ли больше одного слайда
        if (swiper.params.slidesPerView > 1) {
            // Если текущий слайд активен, перейдем на предыдущий слайд
            if (slide.classList.contains('swiper-slide-active')) {
                swiper.slidePrev(300);
            }
            // Если не активен, и индекс не равен 0, перейдем на предыдущий слайд
            else if (index != 0) {
                swiper.slideToLoop(index - 1, 300);
            }
            // Иначе, если индекс равен 0, перейдем на последний слайд
            else {
                swiper.slideToLoop(swiper.slides.lenght - 1, 300)
            }
        }
    });
});


// Получаем все элементы <details> внутри слайдов
const detailsElements = document.querySelectorAll('.swiper-slide details');

// Добавляем обработчик события toggle каждому элементу <details>
detailsElements.forEach((details) => {
    // Находим родительский слайд
    const slide = details.closest('.swiper-slide');
    let cardHeight;

    details.addEventListener('toggle', () => {
        // Если слайд найден, обновляем его размер
        if (slide) {
            // Если <details> открыт, получаем высоту его содержимого и обновляем высоту слайда
            if (details.open) {
                // Сохраняем исходную высоту карточки
                cardHeight = slide.clientHeight;
                // Получаем высоту details'а
                const detailsHeight = slide.querySelector('.professions__details').clientHeight;
                // Задаем высоту карточку равную высоте details'а
                slide.style.height = detailsHeight + 'px';
            }
        }
        else {
            // Восстанавливаем исходную высоту слайда
            slide.style.height = cardHeight + 'px';
        }
    });
});


// Настройка Хифенополии для разбиения слов на слоги
Hyphenopoly.config({
    require: {
        "ru": "Съешьещёэтихмягкихфранцузскихбулокдавыпейчаю",
        "en-us": "Supercalifragilisticexpialidocious"
    },
    setup: {
        defaultLanguage: "ru",
        selectors: {
            ".professions": {},
            ".professions__types": { minWordLength: 1000 },
        }
    },
    paths: {
        "patterndir": "../js/hyphenopoly/patterns/",
        "maindir": "../js/hyphenopoly/"
    }
});