$(window).on('load', function() {
  const $menuProductos = document.getElementById('menu-productos');
  const $enlacesMenuProductos = $menuProductos.children[0].children;
  const $contenedorMenu = document.getElementById('contenedor-menu-productos');
  const $contenedorContenido = document.getElementById('contenedor-de-contenido');
  //  Contenedor Altura
  const ca = $($contenedorContenido).outerHeight(true);
  /*  Controladores de Scroll y de Ancho de Pantalla - - - - - - - - - - - - - - - */
  var controlScroll = "default";
  var ancho = window.innerWidth;
  if (1120 < ancho)
    var desktop = true;
  else
    var desktop = false;
  /*  Interacción de Menú - - - - - - - - - - - - - - - - - - - - - - - - - */
  /*  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  for (var index = 0; index < $enlacesMenuProductos.length; index++) {
    //  Si el elemento es un título y no es el último título del menú...
    if (($enlacesMenuProductos[index].tagName.toLowerCase() === 'li') && (index < $enlacesMenuProductos.length - 1)) {
      //  Si el título de una sección es seguida por una lista de subsecciones...
      if ($enlacesMenuProductos[index + 1].tagName.toLowerCase() === 'ul') {
        //  Define la altura máxima del acordión como su altura inicial
        $enlacesMenuProductos[index + 1].style.maxHeight = $enlacesMenuProductos[index + 1].offsetHeight + "px";
        //  Si el navegador es Internet Explorer < 9
        if (window.attachEvent) {
          //  Crear acción en el acordión
          $enlacesMenuProductos[index].attachEvent('onclick', function(){
            listador(this);
            // setTimeout(actualizarAlturaMenu, 351);
          });
        }
        //  El resto de los navegadores...
        else if (window.addEventListener) {
          //  Crear acción en el acordión
          $enlacesMenuProductos[index].addEventListener('click', function(){
            listador(this);
            // setTimeout(actualizarAlturaMenu, 351);
          });
        }
        //  Cerrar todas las secciones menos la sección que corresponde a la página activa
        if ($enlacesMenuProductos[index + 1].classList != 'acordion-abierto') {
          $enlacesMenuProductos[index + 1].classList.add('acordion-cerrado');
        }
      }
    }
  }
  /*  Constantes Scroll Menú - - - - - - - - - - - - - - - */
  //  Contenedor Padding
  const cp = 65;
  //  Menú Altura
  var ma = $($contenedorMenu).outerHeight(true);
  //  Menú Altura Máxima
  var mam = ca - cp;
  //  Menú Posición Y
  const my = getOffset($contenedorMenu);
  //  Punto de fijación Menú
  const fy = 80;
  //  α = my - fy | El primer punto de quiebre de scroll: Menú Posición Y - Punto de Fijación Menú
  const alpha = my - fy;
  //  Δ = mam - ma | Diferencia de alturas entre el Contenedor de Contenido y el Menú
  var delta = mam - ma;
  //  Σ = α + Δ | El punto final de quiebre del scroll
  var sigma = alpha + delta;
  /* Area de Pruebas - - - - - - - - - - - - - - - */
  var datos = "ca: " + ca + "\n";
  datos += "cp: " + cp + "\n";
  datos += "ma: " + ma + "\n";
  datos += "mam: " + mam + "\n";
  datos += "my: " + my + "\n";
  datos += "fy: " + fy + "\n";
  datos += "alpha: " + alpha + "\n";
  datos += "delta: " + delta + "\n";
  datos += "sigma: " + sigma + "\n";
  // console.log(datos);
  /*  Inizialicaciones - - - - - - - - - - - - - - - */
  //  Actualizar la Altura Máxima Menú
  $contenedorMenu.style.maxHeight = mam + "px";
  //  Actualizar Altura Menú (se hace esto para inicializar porque el Menú de Productos está abierto por default para permitir que navegadores sin JavaScript puedan acceder a todos los enlaces.)
  actualizarAlturaMenu();
  //  Inicializando Eventos de Scroll
  if (desktop && alpha < sigma)
    if (window.attachEvent)
      window.attachEvent('onclick', eventoScroll);
    else if (window.addEventListener)
      window.addEventListener('scroll', eventoScroll);
  /*  Eventos - - - - - - - - - - - - - - - */
  //  IE 6 -> 10
  if (window.attachEvent) {
    //  Reescalar Ventana
    window.attachEvent('onresize', function(){
      ancho = window.innerWidth;
      if (ancho < 1120 && desktop) {
        desktop = false;
        if (alpha < sigma)
          window.detachEvent('onscroll', eventoScroll);
      }
      else if (1120 < ancho && !desktop) {
        desktop = true;
        if (alpha < sigma)
          window.attachEvent('onscroll', eventoScroll);
      }
    });
  }
  //  El resto de los navegadores
  else if (window.addEventListener) {
    //  Reescalar Ventana
    window.addEventListener('resize', function(){
      ancho = window.innerWidth;
      if (ancho < 1120 && desktop) {
        desktop = false;
        if (alpha < sigma)
          window.removeEventListener('scroll', eventoScroll);
      }
      else if (1120 < ancho && !desktop) {
        desktop = true;
        if (alpha < sigma)
          window.addEventListener('scroll', eventoScroll);
      }
    });
  }
  /*  Funciones - - - - - - - - - - - - - - - */
  //  Contiene la lógica que controla el posicionamiento del Menú al hacer scroll
  function eventoScroll(event) {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    var scroll = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    // console.log("Alpha: " + alpha + " | Scroll: " + scroll + " | Sigma: " + sigma);
    if (scroll < alpha) {
      if (controlScroll != "default") {
        controlScroll = "default";
        actualizarMenu(controlScroll);
      }
    }
    else if (alpha < scroll && scroll < sigma) {
      if (controlScroll != "fixed") {
        controlScroll = "fixed";
        actualizarMenu(controlScroll);
      }
      //  Menú Altura Máxima Nueva
      mamn = mam - (scroll - alpha);
      $contenedorMenu.style.maxHeight = mamn + "px";
    }
    else if (sigma < scroll) {
      if (controlScroll != "scrolled") {
        controlScroll = "scrolled";
        actualizarMenu(controlScroll);
      }
    }
  }
  //  Redefine la altura del Menú de Productos y actualiza los valores de los puntos importantes de scroll
  function actualizarAlturaMenu() {
    ma = $menuProductos.offsetHeight;
    delta = mam - ma;
    sigma = alpha + delta;
  }
  //  Actualiza los estilos del Menú segun el posicionamiento del scroll
  function actualizarMenu(controlScroll) {
    switch(controlScroll) {
      case "default":
        $contenedorMenu.style.position = "relative";
        $contenedorMenu.style.top = 0;
        $contenedorMenu.style.marginTop = 0;
        $contenedorMenu.style.width = "100%";
        break;
      case "fixed":
        $contenedorMenu.style.position = "fixed";
        $contenedorMenu.style.top = fy + "px";
        $contenedorMenu.style.marginTop = 0;
        $contenedorMenu.style.width = "179.91px";
        break;
      case "scrolled":
        $contenedorMenu.style.position = "relative";
        $contenedorMenu.style.top = 0;
        $contenedorMenu.style.marginTop = delta + "px";
        $contenedorMenu.style.width = "100%";
        break;
      default:
        console.log("ERROR -> actualizarMenu()");
    }
  }
  //  Obtiene el valor actual de la posición vertical del elemento (función obtenida de http://javascript.info/tutorial/coordinates, modifiqué las funciones para que solamente me regresaran la información que busco, en este caso el valor `top`
  function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect()
    var body = document.body
    var docElem = document.documentElement
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var clientTop = docElem.clientTop || body.clientTop || 0
    var top  = box.top +  scrollTop - clientTop
    return Math.round(top)
  }
  //  La verdad no entiendo muy bien como calcula la posicion vertical del elemento
  function getOffsetSum(elem) {
    var top = 0
    while(elem) {
      top = top + parseInt(elem.offsetTop)
      elem = elem.offsetParent
    }
    return top
  }
  //  Calcula el valor de la posicion vertical del elemento y utiliza la función adecuada según la capacidad del navegador utilizado
  function getOffset(elem) {
    if (elem.getBoundingClientRect) {
      return getOffsetRect(elem)
    } else {
      return getOffsetSum(elem)
    }
  }
});
