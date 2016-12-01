//  Difumina el elemento cuando el documento ha sido cargado completamente
document.addEventListener('DOMContentLoaded', function(){
  const $elementos = document.getElementsByClassName('difuminar');
  for (var i = 0; i < $elementos.length; i++) {
    $elementos[i].classList.add('difuminando');
  }
});
