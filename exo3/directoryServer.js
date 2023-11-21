const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

// Utilisation de bodyParser pour traiter le corps des requêtes POST
app.use(bodyParser.json());

const serverAddresses = {};

app.post("/register", (req, res) => {
  const { serverName, address } = req.body;
  if (serverName && address) {
    serverAddresses[serverName] = address;
    console.log(`Server ${serverName} registered with address ${address}`);
    res.send(`Server ${serverName} registered successfully.`);
  } else {
    res.status(400).send("Bad Request");
  }
});

app.post("/getAddress", (req, res) => {
  const { serverName } = req.body;
  if (serverName && serverAddresses[serverName]) {
    res.send({ address: serverAddresses[serverName] });
  } else {
    res.status(404).send("Server not found in the directory.");
  }
});

app.listen(port, () => {
  console.log(`Directory Server is running on http://localhost:${port}`);
});
