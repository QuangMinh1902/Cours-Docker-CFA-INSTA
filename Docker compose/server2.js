const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const port = 4000;
const directoryServerUrl = "http://app-server3:5000";

// Informer le serveur annuaire de son adresse
axios.post(`${directoryServerUrl}/register`, {
  serverName: "Server2",
  address: `http://app-server2:${port}`,
});

// Utilisation de bodyParser pour traiter le corps des requêtes POST
const app = express();
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  if (req.body && req.body.message === "pong") {
    console.log("pong");

    // Obtenir l'adresse du serveur 1 depuis le serveur annuaire
    const response = await axios.post(`${directoryServerUrl}/getAddress`, {
      serverName: "Server1",
    });
    const server1Url = response.data.address;

    // Attendre une demi-seconde avant d'envoyer la requête "ping" vers le serveur 1
    setTimeout(async () => {
      await axios.post("http://relay-server:6000", {
        destination: "Server1",
        message: "ping",
      });
    }, 2000);

    res.send("Request sent successfully.");
  } else {
    res.status(400).send("Bad Request");
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server 2 is running on http://0.0.0.0:${port}`);
});
