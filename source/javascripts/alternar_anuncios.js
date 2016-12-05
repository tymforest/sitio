/*  Inicialización - - - - - - - - - - */
const $anuncios = document.getElementsByClassName('alternar-anuncio');
const anchoInicial = window.innerWidth;
const puntoDeQuiebre = 600;
var mayorQueQuiebre = false;
var anchoActual = window.innerWidth;
if (anchoActual > puntoDeQuiebre) {
  alternar($anuncios);
  mayorQueQuiebre = true;
}
/*  Funciones - - - - - - - - - - */
//  Alternar la posición del primer elemento del anuncio con el último elemento del anuncio
function alternar($anuncios) {
  for (var $anuncio = 0; $anuncio < $anuncios.length; $anuncio++) {
    $alternar = $anuncios[$anuncio].children[0];
    $espacio = $anuncios[$anuncio].children[1];
    $anuncios[$anuncio].removeChild($alternar);
    $anuncios[$anuncio].removeChild($espacio);
    $anuncios[$anuncio].appendChild($espacio);
    $anuncios[$anuncio].appendChild($alternar);
  }
}
//  Si el navegador es Internet Explorer < 9
if (window.attachEvent) {
  window.attachEvent("onresize", function(){
    var anchoActual = window.innerWidth;
    if (mayorQueQuiebre) {
      if (anchoActual < puntoDeQuiebre) {
        alternar($anuncios);
        mayorQueQuiebre = false;
      }
    }
    else {
      if (anchoActual > puntoDeQuiebre) {
        alternar($anuncios);
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
        alternar($anuncios);
        mayorQueQuiebre = false;
      }
    }
    else {
      if (anchoActual > puntoDeQuiebre) {
        alternar($anuncios);
        mayorQueQuiebre = true;
      }
    }
  });
}
