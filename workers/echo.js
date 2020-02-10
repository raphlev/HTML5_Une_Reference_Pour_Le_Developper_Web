// Ce worker renvoie l'objet message reçu
self.addEventListener('message', function(e) {
  self.postMessage(e.data);
}, false);
