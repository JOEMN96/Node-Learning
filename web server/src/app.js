const path = require("path");
const express = require("express");

const app = express();

const publicFolder = path.join(__dirname, "../public/");

app.use(express.static(publicFolder));

app.get("/weather", (req, res) => {
  res.send({ dat: "hello", temp: 100 });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
