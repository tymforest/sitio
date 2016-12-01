/*  Inicializando - - - - - - */
const $previa = document.getElementsByClassName('sucursal-previa')[0];
const $siguiente = document.getElementsByClassName('sucursal-siguiente')[0];
const $lista = document.getElementsByClassName('lista-de-sucursales')[0];
const $tarjetas = document.getElementsByClassName('tarjeta-sucursal');
$previa.classList.add('inactiva');
/*  Eventos de Click para las flechas de navegación - - - - - - */
var indiceActual = 0;
//  Si el navegador es Internet Explorer < 9
if (window.attachEvent) {
  $previa.attachEvent('onclick', function(){
    actualizarCarrusel(updateIndex(-1));
  });
  $siguiente.attachEvent('onclick', function(){
    actualizarCarrusel(updateIndex(1));
  });
}
//  El resto de los navegadores...
else if (window.addEventListener) {
  $previa.addEventListener('click', function(){
    actualizarCarrusel(updateIndex(-1));
  });
  $siguiente.addEventListener('click', function(){
    actualizarCarrusel(updateIndex(1));
  });
}
/* Dependiendo de que flecha fue picada se actualiza el índice activo - - - - - - */
function updateIndex(direccion) {
  var indicePrevio = indiceActual;
  //  Si el índice actual está entre el primer y penúltimo elemento de la lista...
  if ((0 < indiceActual) && (indiceActual < $tarjetas.length - 1)) {
    if (direccion == 1) { indiceActual++; }
    else { indiceActual--; }
  }
  //  Si el índice actual es el primer elemento
  else if (indiceActual == 0) {
    if (direccion == 1) { indiceActual++; }
    else { indiceActual = $tarjetas.length - 1; }
  }
  //  Si el índice es el penúltimo elemento
  else {
    if (direccion == 1) { indiceActual = 0; }
    else { indiceActual--; }
  }
  return [indicePrevio, indiceActual];
}
/* Actualiza el índice del carrusel y traslada el carrusel segun el valor del índice pasado - - - - - - */
function actualizarCarrusel(indices) {
  indiceActual = indices[1];
  primerIndice = 0;
  ultimoIndice = $tarjetas.length - 1;
  //  Translates Slider +/- 100%
  $lista.setAttribute('style', 'transform: translateX(' + (indiceActual*-394) + 'px);');
  //  If slide is first slide
  if (indiceActual == primerIndice) {
    //  Hide previous arrow
    $previa.classList.add('inactiva');
  //  If slide is last slide
} else if (indiceActual == $tarjetas.length - 3) {
    //  Hide next arrow
    $siguiente.classList.add('inactiva');
  //  Else
} else {
    //  Show previous arrow
    $previa.classList.remove('inactiva');
    //  Show next arrow
    $siguiente.classList.remove('inactiva');
  }
}
