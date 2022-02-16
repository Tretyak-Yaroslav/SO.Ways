// start cursore star
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var RADIUS = 10;
var RADIUS_SCALE = 1;
var RADIUS_SCALE_MIN = 1;
var RADIUS_SCALE_MAX = 1.5;
var QUANTITY = 1;
var canvas;
var context;
var particles;

var mouseX = SCREEN_WIDTH * 0.5;
var mouseY = SCREEN_HEIGHT * 0.5;
var mouseIsDown = false;

function init() {
  canvas = document.getElementById("cursore");

  if (canvas && canvas.getContext) {
    context = canvas.getContext("2d");
    window.addEventListener("mousemove", documentMouseMoveHandler, false);
    window.addEventListener("mousedown", documentMouseDownHandler, false);
    window.addEventListener("mouseup", documentMouseUpHandler, false);
    document.addEventListener(
      "touchstart",
      documentTouchStartHandler,
      false
    );
    document.addEventListener("touchmove", documentTouchMoveHandler, false);
    window.addEventListener("resize", windowResizeHandler, false);
    createParticles();
    windowResizeHandler();
    setInterval(loop, 1000 / 60);
  }
}

function createParticles() {
  particles = [];

  for (var i = 0; i < QUANTITY; i++) {
    var particle = {
      size: 1,
      position: { x: mouseX, y: mouseY },
      offset: { x: 0, y: 0 },
      shift: { x: mouseX, y: mouseY },
      speed: 0.05 + Math.random() * 0.04,
      targetSize: 1,
      fillColor: "#FFFFFF",
      orbit: RADIUS * 0.5 + RADIUS * 0.5 * Math.random(),
    };

    particles.push(particle);
  }
}

function documentMouseMoveHandler(event) {
  mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * 0.5;
  mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * 0.5;
}

function documentMouseDownHandler(event) {
  mouseIsDown = true;
}

function documentMouseUpHandler(event) {
  mouseIsDown = false;
}

function documentTouchStartHandler(event) {
  if (event.touches.length == 1) {
    event.preventDefault();

    mouseX =
      event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * 0.5;
    mouseY =
      event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * 0.5;
  }
}

function documentTouchMoveHandler(event) {
  if (event.touches.length == 1) {
    event.preventDefault();

    mouseX =
      event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * 0.5;
    mouseY =
      event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * 0.5;
  }
}

function windowResizeHandler() {
  SCREEN_WIDTH = window.innerWidth;
  SCREEN_HEIGHT = window.innerHeight;

  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
}

function loop() {
  if (mouseIsDown) {
    RADIUS_SCALE += (RADIUS_SCALE_MAX - RADIUS_SCALE) * 0.02;
  } else {
    RADIUS_SCALE -= (RADIUS_SCALE - RADIUS_SCALE_MIN) * 0.02;
  }

  RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX);

  context.fillStyle = "rgb(31,35,41,0.6)";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  for (i = 0, len = particles.length; i < len; i++) {
    var particle = particles[i];
    var lp = { x: particle.position.x, y: particle.position.y };
    particle.shift.x += (mouseX - particle.shift.x) * particle.speed;
    particle.shift.y += (mouseY - particle.shift.y) * particle.speed;
    particle.position.x =
      particle.shift.x +
      Math.cos(i + particle.offset.x) * (particle.orbit * RADIUS_SCALE);
    particle.position.y =
      particle.shift.y +
      Math.sin(i + particle.offset.y) * (particle.orbit * RADIUS_SCALE);
    particle.position.x = Math.max(
      Math.min(particle.position.x, SCREEN_WIDTH),
      0
    );
    particle.position.y = Math.max(
      Math.min(particle.position.y, SCREEN_HEIGHT),
      0
    );

    particle.size += (particle.targetSize - particle.size) * 0.05;

    if (Math.round(particle.size) == Math.round(particle.targetSize)) {
      particle.targetSize = 1 + Math.random() * 10;
    }

    context.beginPath();
    context.fillStyle = particle.fillColor;
    context.strokeStyle = particle.fillColor;
    context.lineWidth = particle.size;
    context.moveTo(lp.x, lp.y);
    context.lineTo(particle.position.x, particle.position.y);
    context.stroke();
    context.arc(
      particle.position.x,
      particle.position.y,
      particle.size / 2,
      0,
      Math.PI * 2,
      true
    );
    context.fill();
  }
}

window.onload = init;
// end cursore star

// start animation
function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
       change.target.classList.add('element-show');
      }
    });
  }
  
  let options = {
    threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element-animation');
  
  for (let elm of elements) {
    observer.observe(elm);
  }
// end animation


// start banner slider
$('.banner-slider').slick({
  variableWidth: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  slide: 'div',
  arrows: false,
  dots: false,
});

$('.banner-slider').click(function next() {
  $('.banner-slider').slick('slickNext');
})
//end banner slider

// start person slider
$('.person-slider').slick({
  slide: 'div',
  prevArrow: '.prev',
  nextArrow: '.next',
  dots: true,
  dotsClass: 'slick-dots person-dots',

});
$('.person-slider').click(function next() {
  $('.person-slider').slick('slickNext');
})
//Scroll top Top


$(window).scroll(function(){
  if ($(this).scrollTop() > 900) {
    $('.scroll-up').fadeIn();
  } else {
    $('.scroll-up').fadeOut();
  }
});
$('.scroll-up').on('click',function(){
  $('html, body').animate({ scrollTop: 0 }, 600);
  return false;
});

