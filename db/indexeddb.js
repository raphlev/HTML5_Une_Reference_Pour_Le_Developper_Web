
// Gestion des événements au clic pour la démo
document.getElementById('tout').onclick = tout_db;
document.getElementById('insere').onclick = insertion_db;
document.getElementById('vide').onclick = vide_db;
document.getElementById('get').onclick = get_db;
document.getElementById('filtre1').onclick = filtre1_db;
document.getElementById('filtre2').onclick = filtre2_db;

// Fonction d’ajout au journal sur la page
function log(txt) {
  document.getElementById('log').innerHTML += txt+"<br>";
}

// Fonction d’affichage brut résultat
function affiche(ville) {
  document.getElementById('log').innerHTML +=
  '<table><th>'+ville.desc+'</th>'+
  '<td>'+ville.lat+'</td>'+
  '<td>'+ville.lng+'</td>'+
  '<td>'+ville.alt+'m</td></table>';
}

// Initialisation de l'interface
if(!window.indexedDB) {
  alert("Votre navigateur ne supporte pas IndexedDB");
}

// Variables générales
var db;
var version = 1;

if(window.indexedDB) {

  // Ouverture de la base
  var requeteOpen = window.indexedDB.open("BaseGeo",version);

  // Mise à jour nécessaire ?
  requeteOpen.onupgradeneeded = function(e) {

    log("Upgrade...");
    db = e.target.result;

    // Effacement du catalogue s'il existe
    if(db.objectStoreNames.contains("geo"))
    try {
      db.deleteObjectStore("geo");
    } catch(exception) {
      log("Erreur lors de la réinitialisation");
    }

    // Création du catalogue
    log("Création nouveau catalogue...");
    var objStore = db.createObjectStore("geo",{keyPath:"id"},true);

    // Création d'un index
    log("Création index...");
    objStore.createIndex("alt", "alt", { unique: false });

    log("Changement de version OK");

  };

  // Succès de l'ouverture
  requeteOpen.onsuccess = function(e) {

    // Référence à la base
    db = e.target.result;

    log("Base '"+db.name+"' ouverte");
    log("Version : "+db.version);
    log("Catalogues : "+db.objectStoreNames.length);

    db.onerror = function(e){
      log("Erreur DB (voir console)");
      // Affichage dans la console
      console.log(e);
    };

  };

  // Erreur ouverture
  requeteOpen.onerror = function(e){
    log("Erreur ouverture DB (voir console)");
    // Affichage dans la console
    console.log(e.target.error);
  };

}

// Insertion de données
function insertion_db() {

  log("Insertion de 3 objets...");

  // Nouvelle transaction
  var transaction = db.transaction(["geo"],IDBTransaction.READ_WRITE);

  transaction.oncomplete = function(e) {
    log("Insertion complète");
  };
  transaction.onerror = function(e) {
    log("Erreur lors de l'insertion");
  };

  // Récupération du catalogue d’objets
  var objStore = transaction.objectStore("geo");

  // Objets à insérer
  var ville1 = {
    id:1,
    lat:48.58177,
    lng:7.750555,
    alt:142,
    desc:"Strasbourg"
  };
  var ville2 = {
    id:2,
    lat:48.458807,
    lng:-5.088043,
    alt:19,
    desc:"Ouessant"
  };
  var ville3 = {
    id:3,
    lat:49.0525,
    lng:7.425833,
    alt:249,
    desc:"Bitche"
  };

  // Affichage pour information
  affiche(ville1);
  affiche(ville2);
  affiche(ville3);

  // Ajout au catalogue
  objStore.put(ville1);
  objStore.put(ville2);
  objStore.put(ville3);

}

// Affiche tout le contenu
function tout_db() {

  log("Affichage du contenu du catalogue");

  // Nouvelle transaction
  var transaction = db.transaction(["geo"]);
  var objStore = transaction.objectStore("geo");

  // Ouverture d'un curseur
  var requeteCur = objStore.openCursor();
  requeteCur.onsuccess = function(e) {
    var cursor = e.target.result;
    if(cursor) {
      affiche(cursor.value);
      // Continue jusqu'à l'enregistrement suivant
      cursor.continue();
    }
  };

  requeteCur.onfailure = db.onerror;

}

// Sélectionner par clé
function get_db() {

  // Valeur d'après l'élément input
  var dbid = document.getElementById("dbid").value;
  if(dbid===undefined || dbid==='') {
    log("Veuillez indiquer un id");
  } else {

    dbid = parseInt(dbid); // Conversion en entier
    log('id='+dbid);

    // Nouvelle transaction
    var transaction = db.transaction(["geo"]);

    // Utilisation de get() sur le catalogue
    var requete = transaction.objectStore("geo").get(dbid);

    // En cas de succès
    requete.onsuccess = function(e) {
      if(requete.result) affiche(requete.result);
    };
    requete.onerror = db.onerror;

  }

}

// Sélectionner par index et valeur
function filtre1_db() {

  // Valeur d'altitude d'après le formulaire
  var altitude = parseInt(document.getElementById('alt').value);
  log('alt='+altitude);

  var transaction = db.transaction(["geo"]);
  var objStore = transaction.objectStore("geo");

  // Index "alt" du catalogue d'objets
  var indexAlt = objStore.index("alt");

  // Application à l'index
  indexAlt.get(altitude).onsuccess = function(e) {
    if(e.target.result) affiche(e.target.result);
  };

}

// Sélectionner par limite
function filtre2_db() {

  // Valeur d'après le formulaire
  var altitude = parseInt(document.getElementById('minalt').value);

  // Utilisation de l'index
  var indexAlt = db.transaction(["geo"]).objectStore("geo").index("alt");

  // Création d'un objet IDBKeyRange avec limite basse
  var limite = IDBKeyRange.lowerBound(altitude);

  // Application au curseur
  indexAlt.openCursor(limite).onsuccess = function(e) {
    var cursor = e.target.result;
    if(cursor) {
      log('alt>'+altitude);
      affiche(cursor.value);
      cursor.continue();
    }
  };

}

// Effacer le contenu de l'Object Store
function vide_db() {
  log("Suppression du contenu...");
  var transaction = db.transaction(["geo"],IDBTransaction.READ_WRITE);
  transaction.objectStore("geo").clear();
}
