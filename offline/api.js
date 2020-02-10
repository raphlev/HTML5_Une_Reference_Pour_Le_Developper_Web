
// Fonction d’ajout au journal
function log(txt) {
  document.getElementById('log').innerHTML += txt+"<br>";
}

window.applicationCache.onchecking = function() {
  log("Checking...");
};

window.applicationCache.onnoupdate = function() {
  log("Noupdate.");
};

window.applicationCache.ondownloading = function() {
  log("Downloading...");
};

window.applicationCache.oncached = function() {
  log("Cached !");
};

window.applicationCache.onupdateready = function() {
  log("Update ready.");
};

window.applicationCache.onobsolete = function() {
  log("Obsolete :/");
};

window.applicationCache.onerror = function() {
  log("Error.");
};

