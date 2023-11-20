const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");

const port = 4000;

// Utilisation de bodyParser pour traiter le corps des requêtes POST
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  if (req.body && req.body.message === "pong") {
    console.log("pong");

    setTimeout(async () => {
      await axios.post("http://localhost:3000", {
        message: "ping",
      });
      // res.send("ping");
    }, 2000);
  } else {
    res.status(400).send("Bad Request");
  }
});

app.listen(port, () => {
  console.log(`Server 2 is running on http://localhost:${port}`);
});
