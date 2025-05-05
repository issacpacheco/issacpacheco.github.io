$(document).ready(function () {

  $('.scroll-top').hide();

  /*--------------- Navbar Toggler ---------------*/
  $('#menu-btn').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('active');
  });

  /*--------------- Scroll-Top ---------------*/
  $(window).on('scroll', function () {

    $('#menu-btn').removeClass('fa-times');
    $('.navbar').removeClass('active');

    // STICKY HEADER
    if ($(window).scrollTop() > 0) {
      $(".header").addClass("sticky");
    } else {
      $(".header").removeClass("sticky");
    }

    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.scroll-top').fadeIn();
      } else {
        $('.scroll-top').fadeOut();
      }
    });

  });

  const light = document.createElement('div');
  light.classList.add('cursor-light');
  document.body.appendChild(light);

  // Mover el destello
  document.addEventListener('mousemove', (e) => {
    light.style.opacity = '1';
    light.style.transform = `translate(${e.clientX - 75}px, ${e.clientY - 75}px)`;
  });

  // Ocultar al salir de la ventana
  document.addEventListener('mouseleave', () => {
    light.style.opacity = '0';
  });

  // Mostrar al volver a entrar
  document.addEventListener('mouseenter', () => {
    light.style.opacity = '1';
  });

});

