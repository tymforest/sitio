/*  Inicialización - - - - - - - - - - */
const $menuPrincipal = document.getElementsByClassName('principal')[0];
const $abrirMenu = document.getElementById('abrir-menu');
const $cerrarMenu = document.getElementById('cerrar-menu');
const $menu = document.getElementById('menu');
const $cubiertaMenu = document.getElementById('cubierta-menu');
const $botonDeContactoMovil = document.getElementById('contacto-movil');
var vScroll = window.scrollY;
/*  Eventos - - - - - - - - - - */
//  Si el navegador es Internet Explorer < 9
if (window.attachEvent) {
  //  Crea un evento de scroll vertical
  window.attachEvent('onscroll', function(){
    vScroll = window.scrollY;
  });
  //  Crea evento de click en botón de abrir menú
  $abrirMenu.attachEvent('onclick', function(){
    cubrir();
    alternarMenu();
    alternarScroll();
    esconderBotonDeContacto();
  });
  //  Crea evento de click en botón de cerrar menú
  $cerrarMenu.attachEvent('onclick', function(){
    cubrir();
    alternarMenu();
    alternarScroll();
    mostrarBotonDeContacto();
  });
  //  Crea evento de click en cubierta
  $cubiertaMenu.attachEvent('onclick', function(){
    cubrir();
    alternarMenu();
    alternarScroll();
    mostrarBotonDeContacto();
  });
}
//  El resto de los navegadores...
else if (window.addEventListener) {
  //  Crea un evento de scroll vertical
  window.addEventListener('scroll', function(){
    vScroll = window.scrollY;
  });
  //  Crea evento de click en botón de abrir menú
  $abrirMenu.addEventListener('click', function(){
    cubrir();
    alternarMenu();
    alternarScroll();
    esconderBotonDeContacto();
  });
  //  Crea evento de click en botón de cerrar menú
  $cerrarMenu.addEventListener('click', function(){
    cubrir();
    alternarMenu();
    alternarScroll();
    mostrarBotonDeContacto();
  });
  //  Crea evento de click en cubierta
  $cubiertaMenu.addEventListener('click', function(){
    cubrir();
    alternarMenu();
    alternarScroll();
    mostrarBotonDeContacto();
  });
}
//  Alterna la visibilidad de la cubierta del menú
function cubrir() {
  $cubiertaMenu.classList.toggle('cubierta-puesta');
}
//  Alterna la posición del menú móvil
function alternarMenu() {
  $menu.classList.toggle('menu-visible');
}
//  Alterna el permiso de hacer scroll en la página
function alternarScroll() {
  document.body.classList.toggle('cancelar-scroll');
  $cubiertaMenu.addEventListener('touchmove', function(e){
    e.preventDefault();
    e.bubbles = false;
  }, false);
  $menu.addEventListener('touchmove', function(e){
    e.bubbles = false;
  }, false);
}
/*  Tomando referencia a todos los elementos del menú interactivo */
const $enlacesDeMenu = $menu.children[1].children;
//  Navega atravez del menú interactivo y crea una acción de click en cada acordión
for (var index = 0; index < $enlacesDeMenu.length; index++) {
  //  Si el elemento es un título y no es el último título del menú...
  if (($enlacesDeMenu[index].tagName.toLowerCase() === 'li') && (index < $enlacesDeMenu.length - 1)) {
    //  Si el título de una sección es seguida por una lista de subsecciones...
    if ($enlacesDeMenu[index + 1].tagName.toLowerCase() === 'ul') {
      //  Define la altura máxima del acordión como su altura inicial
      $enlacesDeMenu[index + 1].style.maxHeight = $enlacesDeMenu[index + 1].offsetHeight + "px";
      //  Crear acción en el acordión
      $enlacesDeMenu[index].addEventListener('click', function(){
        listador(this);
      });
      //  Cerrar todas las secciones
      $enlacesDeMenu[index + 1].classList.add('acordion-cerrado');
    }
  }
}
//  Agrega todos los estilos al picarle a un acordión
function listador($encabezado) {
  const $lista = $encabezado.nextElementSibling;
  //  Animar ícono de '+' de la lista seleccionada
  const $icono = $encabezado.children[1].getElementsByClassName('cerrar-acordion')[0];
  $icono.classList.toggle('girar');
  //  Abrir o cerrar la lista seleccionada
  $lista.classList.toggle('acordion-cerrado');
  $lista.classList.toggle('acordion-abierto');
}
//  Agrega y quita los estilos necesarios para esconder el Botón Móvil
function esconderBotonDeContacto() {
  if (vScroll > 250) {
    $botonDeContactoMovil.classList.remove('mostrar');
    $botonDeContactoMovil.classList.remove('mostrar-boton');
    $botonDeContactoMovil.classList.add('esconder');
    $botonDeContactoMovil.classList.add('esconder-boton');
  }
}
//  Agrega y quita los estilos necesarios para mostrar el Botón Móvil
function mostrarBotonDeContacto() {
  if (vScroll > 250) {
    $botonDeContactoMovil.classList.remove('esconder');
    $botonDeContactoMovil.classList.remove('esconder-boton');
    $botonDeContactoMovil.classList.add('delatar');
    $botonDeContactoMovil.classList.add('mostrar');
    $botonDeContactoMovil.classList.add('mostrar-boton');
    setTimeout(function(){
      $botonDeContactoMovil.classList.remove('delatar');
    }, 400);
  }
}
