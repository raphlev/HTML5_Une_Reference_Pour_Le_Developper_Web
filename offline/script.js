var statut = document.getElementById('statut');

// Détection initiale
if(navigator.onLine) {
  // Mode connecté
  statut.innerHTML = 'connecté';
  statut.className = 'online';
} else {
  // Mode déconnecté
  statut.innerHTML = 'déconnecté';
  statut.className = 'offline';
}

// Enregistrement des événements
if(window.addEventListener) {
  // Pour les navigateurs supportant addEventListener
  window.addEventListener("online",estOnline,false);
  window.addEventListener("offline",estOffline,false);
} else {
  // Pour les autres
  document.body.ononline = estOnline;
  document.body.onoffline = estOffline;
}

function estOnline() {
  // Le navigateur est connecté
  statut.innerHTML = 'passé en mode connecté';
  statut.className = 'online';
}

function estOffline() {
  // Le navigateur est déconnecté
  statut.innerHTML = 'passé en mode déconnecté';
  statut.className = 'offline';
}