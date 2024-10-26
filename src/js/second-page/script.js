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
window.addEventListener('resize', function () {
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

// Получаем все input'ы с типом "text"
const inputsElements = document.querySelectorAll('input[type="text"]');
// Объект для хранения идентификаторов интервалов
let intervalIds = {};
// Объект для хранения изначального текста
let originalPlaceholdersText = {};

// Функция для определения ширины текста
function getTextWidth(text, font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}
// Функция проверки размеров placeholder'ов
function checkPlaceholdersSize(inputsElements) {
    // Перебор объекта и очистка 
    // всех запущенных интервалов
    for (let id in intervalIds) {
        console.log(id);
        clearInterval(intervalIds[id]);
    }

    // Очистка объекта
    intervalIds = {};

    inputsElements.forEach(input => {
        // Получаем изначальный текст placeholder'а
        const originalPlaceholderText = input.getAttribute('placeholder');
        // Получаем уникальный идентификатор input (например, id)
        const inputId = input.id;

        // Если для данного inputId еще не сохранено изначальное 
        // значение placeholder'а, сохраняем
        if (!originalPlaceholdersText[inputId]) {
            originalPlaceholdersText[inputId] = originalPlaceholderText;
        }
        // Получаем ширину input и ширину текста placeholder'а
        const inputWidth = input.clientWidth;
        const textWidth = getTextWidth(originalPlaceholderText, getComputedStyle(input).font);

        // Если текст placeholder'а шире, чем сам input 
        // и интервал еще не создан
        if (textWidth > inputWidth && !intervalIds[input]) {
            // Создаем интервал для бегущей строки в placeholder'е
            intervalIds[inputId] = setInterval(() => {
                // Получаем текущий текст placeholder'а
                const placeholderText = input.getAttribute('placeholder');
                // Создаем новый текст с бегущей строкой
                const scrolledText = placeholderText.substring(1) + placeholderText[0];
                // Устанавливаем новый текст в placeholder
                input.setAttribute('placeholder', scrolledText);
            }, 150); // Изменение каждые 200 миллисекунд
        }
        else {
            // Если текст placeholder'а не шире input или интервал уже создан,
            // восстанавливаем изначальный текст
            input.setAttribute('placeholder', originalPlaceholdersText[inputId]);
        }
    });
}

// Подключаем вышеописанную функцию к событию
// изменения размеров окна
window.addEventListener('resize', function () {
    checkPlaceholdersSize(inputsElements);
});

// Изначальный запуск
checkPlaceholdersSize(inputsElements);