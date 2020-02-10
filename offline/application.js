
// Forcer un rafraîchissement ?
window.applicationCache.onupdateready = function() {
  if(window.applicationCache.status==window.applicationCache.UPDATEREADY) {
    window.applicationCache.swapCache();
    if(confirm("Une nouvelle version de l\'application est disponible, voulez-vous la charger ?")) {
      window.location.reload();
    }
  }
};

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
  
  alert("Vous êtes en ligne, on peut envoyer !");
  var msg = localStorage.getItem("msg");
  document.getElementById('msg').value = msg;
  // formulaire.submit();
}

function estOffline() {
  // Le navigateur est déconnecté
  statut.innerHTML = 'passé en mode déconnecté';
  statut.className = 'offline';
}

var formulaire = document.getElementById('formulaire');

// Application
formulaire.onsubmit = function(e) {
  var msg = document.getElementById('msg').value;
  if(navigator.onLine) {
    localStorage.setItem("msg",msg);
  } else {
    alert("Vous êtes déconnecté mais je mémorise...");
    e.preventDefault();
  }
};

