var ws = require("nodejs-websocket");

var server = ws.createServer(function(conn) {

    console.log("Nouvelle connexion");

    // Réception d'un message texte
    conn.on("text", function(str) {
      console.log("Texte reçu : " + str);
      if (str == "hello") conn.sendText("Bonjour !");
      if (str == "date") conn.sendText(new Date().toString());
      if (str == "bye") conn.close();
    });

    // Fermeture de connexion
    conn.on("close", function(code, reason) {
        console.log("Connexion fermée");
    });

    // En cas d'erreur
    conn.on("error", function(err) {
      console.log(err);
    });

}).listen(8001); // On écoute sur le port 8001