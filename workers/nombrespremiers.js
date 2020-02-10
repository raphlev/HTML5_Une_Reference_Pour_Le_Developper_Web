// On débute à partir de 1
var n = 1;
// Compteur des nombres trouvés
var nombres_trouves = 0;
// Valeur limite
var limite = 100000;
// Démarrage du compteur de temps
var time_start = (new Date()).getTime();

postMessage("Début");

// Boucle de calcul incrémental
recherche: while(true) {
  n += 1;
  for (var i = 2; i <= Math.sqrt(n); i += 1) {
    // Si le nombre n’est pas premier, on continue la recherche
    if (n % i === 0) continue recherche;
  }
  // Sinon, un nombre premier est trouvé
  // et se voit communiqué à la page
  postMessage(n);
  nombres_trouves++;
  // Si on a atteint la limite, on arrête
  if (n >= limite) break;
}

// Fin
var time_end = (new Date()).getTime();
var time_total = time_end-time_start;
postMessage("Fin, nombres trouvés : "+nombres_trouves+" en "+time_total+" millisecondes");
