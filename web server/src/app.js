const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

const publicFolder = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views/");
const partialsPath = path.join(__dirname, "../templates/components");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicFolder));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

app.get("/weather", (req, res) => {
  res.render("weather", { weather: "hello", title: "weather" });
});

app.get("/help", (req, res) => {
  res.render("help", { test: "help joe", title: "help" });
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
