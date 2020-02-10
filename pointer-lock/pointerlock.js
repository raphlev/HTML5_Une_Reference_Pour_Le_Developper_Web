var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

// Coordonnées du pointeur
var x = canvas.width/2,
  y = canvas.height/2;
var i = 0; // Itérations

// Styles du tracé et couleur aléatoire
ctx.lineWidth = 10;
ctx.strokeStyle = 'hsl('+360*Math.random()+', 50%, 50%)';

// Nouveau chemin
ctx.beginPath();
ctx.moveTo(x, y);

// Fonction de dessin
function dessin() {
  ctx.lineTo(x, y);
  ctx.stroke();
  requestAnimationFrame(dessin);
}
dessin();

// Mise à jour de la position du pointeur
function position(e) {
  i++;
  // Tous les 10 "déplacements" on change la couleur
  if(i%10===0) {
    ctx.strokeStyle = 'hsl('+360*Math.random()+', 90%, 50%)';
    // Et on recommence un nouveau chemin
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  // Delta de déplacement
  x += e.movementX;
  y += e.movementY;
  // Limites de la surface : on revient à l'opposé
  if (x > canvas.width) {
    x = 0;
    ctx.moveTo(x, y);
  }
  if (y > canvas.height) {
    y = 0;
    ctx.moveTo(x, y);
  }
  if (x < 0) {
    x = canvas.width;
    ctx.moveTo(x, y);
  }
  if (y < 0) {
    y = canvas.height;
    ctx.moveTo(x, y);
  }
}

// Changement de l'état de la capture
document.addEventListener('pointerlockchange', lockChange, false);
function lockChange() {
  if (document.pointerLockElement === canvas) {
    document.addEventListener("mousemove", position, false);
  } else {
    document.removeEventListener("mousemove", position, false);
  }
}

// Capture du pointeur
canvas.onclick = function() {
  canvas.requestPointerLock();
};
