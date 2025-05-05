var swiper = new Swiper('.logos-slider', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: { slidesPerView: 2 },
        600: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 }
    },
    pagination: {
        el: '.swiper-pagination3',
        clickable: true,
    },
});