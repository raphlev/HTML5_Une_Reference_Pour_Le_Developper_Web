var gamepads,gamepad;

var sourcil1 = document.getElementById('sourcil1');
var sourcil2 = document.getElementById('sourcil2');

var oeil1 = document.getElementById('oeil1');
var oeil2 = document.getElementById('oeil2');

var blanc1 = document.getElementById('blanc1');
var blanc2 = document.getElementById('blanc2');

// Boucle d'animation
function loop() {

  var oeil1_x,oeil1_y,oeil2_x,oeil2_y;

  // Itération sur tous les gamepads connectés
  gamepads = navigator.getGamepads();
  for (var playerIndex = 0; playerIndex < gamepads.length; playerIndex++) {
    gamepad = gamepads[playerIndex];

    if (gamepad) {

      // Calcul du décalage de la position
      oeil1_x = 50 * gamepad.axes[0];
      oeil1_y = 70 * gamepad.axes[1];
      oeil2_x = 50 * gamepad.axes[2];
      oeil2_y = 70 * gamepad.axes[3];

      // Déplacement des pupilles
      oeil1.setAttribute('transform','translate('+oeil1_x+','+oeil1_y+')');
      oeil2.setAttribute('transform','translate('+oeil2_x+','+oeil2_y+')');

      // Froncements de sourcils
      if (gamepad.buttons[4].pressed) {
        sourcil1.style.transform = 'rotate(20deg)';
      } else {
        sourcil1.style.transform = '';
      }
      if (gamepad.buttons[5].pressed) {
        sourcil2.style.transform = 'rotate(-20deg) translate(0,50px)';
      } else {
        sourcil2.style.transform = '';
      }

      // Agrandissements
      if (gamepad.buttons[0].pressed) {
        blanc1.style.transform='scale(1.1,1.1)';
        blanc2.style.transform='scale(1.1,1.1)';
      } else {
        blanc1.style.transform = 'scale(1,1)';
        blanc2.style.transform = 'scale(1,1)';
      }

    }
  }

  window.requestAnimationFrame(loop);

}

loop();