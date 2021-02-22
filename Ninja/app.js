const express = require("express");
const { dirname } = require("path");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
  res.status(200);
});

app.get("/*", (req, res) => {
  res.status(404).send("404");
});

app.listen(3000, () => {
  console.log("server is running on localhost 3000");
});

// app.use("/", express.static(path.join(__dirname, "./views/")));
