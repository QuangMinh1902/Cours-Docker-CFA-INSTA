const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const directoryServerUrl = "http://localhost:5000";
let server2Url;

// Informer le serveur annuaire de son adresse
axios.post(`${directoryServerUrl}/register`, {
  serverName: "Server1",
  address: `http://localhost:${port}`,
});

app.get("/", async (req, res) => {
  // Obtenir l'adresse du serveur 2 depuis le serveur annuaire
  const response = await axios.post(`${directoryServerUrl}/getAddress`, {
    serverName: "Server2",
  });
   server2Url = response.data.address;
  console.log(server2Url);

  // Envoi de la requête "pong" vers le serveur 2
  try {
    await axios.post(`${server2Url}`, { message: "pong" });
  } catch (error) {
    console.error(
      "Error status:",
      error.response ? error.response.status : "N/A"
    );
    console.error("Error message:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  // Vérification de la présence de la propriété 'message' dans le corps de la requête
  if (req.body && req.body.message === "ping") {
    console.log("ping");
    setTimeout(async () => {
      await axios.post(`${server2Url}`, {
        message: "pong",
      });
    }, 2000);
  } else {
    res.status(400).send("Bad Request");
  }
});

app.listen(port, () => {
  console.log(`Server 1 is running on http://localhost:${port}`);
});
