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

  window.onload = function() {
    // Para cada barra de progreso, animarla con un valor diferente
    animateProgressBar('progress1', 95);
    animateProgressBar('progress2', 90);
    animateProgressBar('progress3', 90);
    animateProgressBar('progress4', 95);
    animateProgressBar('progress5', 90);
    animateProgressBar('progress6', 85);
    animateProgressBar('progress7', 95);
    animateProgressBar('progress8', 85);
};

// Función que anima la barra de progreso según el id y el porcentaje
function animateProgressBar(progressId, percentage) {
    var progressBar = document.querySelector(`#${progressId} .progress-bar`);
    var spanprogressBar = document.querySelector(`#span${progressId}`);
    var width = 0;

    var interval = setInterval(function() {
        if (width >= percentage) {
            clearInterval(interval);  // Detener la animación cuando llegue al porcentaje final
        } else {
            width++;
            progressBar.style.width = width + '%';  // Actualizar el ancho de la barra
            spanprogressBar.textContent = width + '%';
        }
    }, 30);  // Actualizar cada 30ms (puedes ajustar la velocidad)
}

});

