/*  Inicialización - - - - - - - - - - */
const $sucursales = document.getElementsByClassName('alternar-sucursal');
const anchoInicial = window.innerWidth;
const puntoDeQuiebre = 1120;
var mayorQueQuiebre = false;
var anchoActual = window.innerWidth;
if (anchoActual > puntoDeQuiebre) {
  alternar($sucursales);
  mayorQueQuiebre = true;
}
else {
  mayorQueQuiebre = false;
}
/*  Funciones - - - - - - - - - - */
//  Alternar la posición de la tarjeta de la sucursal con la del mapa
function alternar($seccion) {
  for (var i = 0; i < $seccion.length; i++) {
    $imagen = $seccion[i].children[0];
    $seccion[i].removeChild($imagen);
    $seccion[i].appendChild($imagen);
  }
}
/*  Eventos - - - - - - - - - - */
//  Si el navegador es Internet Explorer < 9
if (window.attachEvent) {
  window.attachEvent("onresize", function(){
    var anchoActual = window.innerWidth;
    if (mayorQueQuiebre) {
      if (anchoActual < puntoDeQuiebre) {
        alternar($sucursales);
        mayorQueQuiebre = false;
      }
    }
    else {
      if (anchoActual > puntoDeQuiebre) {
        alternar($sucursales);
        mayorQueQuiebre = true;
      }
    }
  });
}
//  El resto de los navegadores...
else if (window.addEventListener) {
  window.addEventListener("resize", function(){
    var anchoActual = window.innerWidth;
    if (mayorQueQuiebre) {
      if (anchoActual < puntoDeQuiebre) {
        alternar($sucursales);
        mayorQueQuiebre = false;
      }
    }
    else {
      if (anchoActual > puntoDeQuiebre) {
        alternar($sucursales);
        mayorQueQuiebre = true;
      }
    }
  });
}
