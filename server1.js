const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.get("/", async (req, res) => {
  try {
    // Envoi de la requête POST vers le deuxième serveur avec la donnée "pong"
    await axios.post("http://localhost:4000", {
      message: "pong",
    });

    
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
      await axios.post("http://localhost:4000", {
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
