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
    }
});