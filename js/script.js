
/*----------carousel-----------*/

$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);


/*
  This JS is from the following project:
  https://github.com/bushblade/Full-Screen-Touch-Slider
*/

const slider = document.querySelector('.slider-container'),
  slides = Array.from(document.querySelectorAll('.slide'))

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img')
  slideImage.addEventListener('dragstart', (e) => e.preventDefault())

  // Touch events
  slide.addEventListener('touchstart', touchStart(index))
  slide.addEventListener('touchend', touchEnd)
  slide.addEventListener('touchmove', touchMove)

  // Mouse events
  slide.addEventListener('mousedown', touchStart(index))
  slide.addEventListener('mouseup', touchEnd)
  slide.addEventListener('mouseleave', touchEnd)
  slide.addEventListener('mousemove', touchMove)
})

// Disable context menu
window.oncontextmenu = function (event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

function touchStart(index) {
  return function (event) {
    currentIndex = index
    startPos = getPositionX(event)
    isDragging = true

    // https://css-tricks.com/using-requestanimationframe/
    animationID = requestAnimationFrame(animation)
    slider.classList.add('grabbing')
  }
}

function touchEnd() {
  isDragging = false
  cancelAnimationFrame(animationID)

  const movedBy = currentTranslate - prevTranslate

  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1

  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1

  setPositionByIndex()

  slider.classList.remove('grabbing')
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event)
    currentTranslate = prevTranslate + currentPosition - startPos
  }
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function animation() {
  setSliderPosition()
  if (isDragging) requestAnimationFrame(animation)
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
}





/* ----------- formulario ----------- */
function mostrarFeedback(){
  var fondoPopupFeedback = document.getElementById("contenedor-feedback");
  var seccionFormulario = document.getElementById("seccion-formulario");


  fondoPopupFeedback.classList.add("mostrar");
  console.log("voy a mostrar el feedback");
}


function recolectarDatos() {
  
  // Nombre + email
  var inputNombre = document.getElementById("nombre-user");
  var nombre = inputNombre.value;

  // PASO 3: obtenemos los lugares del html donde nos interesa MOSTRAR los datos que ingresó el usuario
  var spanNombre = document.getElementById("nombre-usuario");

  
  // PASO 4: ponemos las variables que obtuvimos en el paso 2, en los elementos html que obtuvimos en el paso 3
  spanNombre.innerText = nombre;
  //console.log("nombre");
 console.log("tengo todos los datos");
}

function resetearFormulario() {
  var inputNombre = document.getElementById("nombre-user");
  inputNombre.value = "";
  console.log("voy a resetear el formulario");
}

function enviarFormulario() {
  recolectarDatos();
  mostrarFeedback();
  resetearFormulario();
  console.log("voy a enviar el formulario");

}

function cerrarFeedback() {
  var seccionFormulario = document.getElementById("seccion-formulario");
  var fondoPopupFeedback = document.getElementById("contenedor-feedback");

  fondoPopupFeedback.classList.remove("mostrar");
  console.log("voy a cerrar el feedback y volver a mostrar el formulario");
}


