const $botonContactoMovil = document.getElementById('contacto-movil');
//  Creación de evento de scroll vertical
var vScroll = window.scrollY;
var scrollInicial = false;
//  Agrega / quita estilos al botón del contacto móvil dependiendo del valor del scroll vertical
function vestirBoton(vScroll) {
  if (vScroll > 250) {
    $botonContactoMovil.classList.remove('esconder');
    $botonContactoMovil.classList.remove('esconder-boton');
    $botonContactoMovil.classList.add('mostrar');
    $botonContactoMovil.classList.add('mostrar-boton');
    scrollInicial = true;
  }
  if (vScroll < 250) {
    if (scrollInicial) {
      $botonContactoMovil.classList.remove('mostrar');
      $botonContactoMovil.classList.remove('mostrar-boton');
      $botonContactoMovil.classList.add('esconder');
      $botonContactoMovil.classList.add('esconder-boton');
    }
  }
}
/*  Eventos - - - - - - - - - - */
//  Cancela clicks accidentales al botón de contacto móvil cuando no es visible
//  Si el navegador es Internet Explorer < 9
if (window.attachEvent) {
  //
  $botonContactoMovil.attachEvent('onclick', function(event){
    if (vScroll < 250) {
      event.preventDefault();
    }
  });
  //
  window.attachEvent('onscroll', function(){
    vScroll = window.scrollY;
    console.log(vScroll);
    vestirBoton(vScroll);
  });
}
//  El resto de los navegadores...
else if (window.addEventListener) {
  //
  $botonContactoMovil.addEventListener('click', function(event){
    if (vScroll < 250) {
      event.preventDefault();
    }
  });
  //
  window.addEventListener('scroll', function(){
    vScroll = window.scrollY;
    vestirBoton(vScroll);
  });
}
