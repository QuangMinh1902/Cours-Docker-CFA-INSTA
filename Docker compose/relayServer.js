const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 6000;

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const { destination, message } = req.body;
  if (destination && message) {
    try {
      // Obtenez l'adresse du serveur de destination depuis le serveur annuaire
      const response = await axios.post(`http://app-server3:5000/getAddress`, {
        serverName: destination,
      });
      const destinationUrl = response.data.address;

      // Transmettez le message au serveur de destination
      await axios.post(destinationUrl, { message });
      res.send("Message relayed successfully.");
    } catch (error) {
      console.error("Relay error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Relay Server is running on http://0.0.0.0:${port}`);
});
