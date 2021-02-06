const path = require("path");
const express = require("express");
const hbs = require("hbs");

const { getGeoCode, getWeatherData } = require("./function");

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
    title: "Weather App",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({ error: "Location query required" });
  }

  let data = getGeoCode(req.query.location, (req, data = {}) => {
    getWeatherData(data.lattitude, data.longitude, (err, data) => {
      if (err) {
        return res.send({ error: "Error from API" });
      }
      return res.send(data);
    });
  });
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
