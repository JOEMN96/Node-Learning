const { static } = require("express");
const express = require("express");
const { dirname } = require("path");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes/route");

const app = express();

// serving static assets
let publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);
app.set("view engine", "ejs");
app.set("views", "public/views");

// Db ln

const dbUrl =
  "mongodb+srv://admin:admin1234@ninjablog.ukuro.mongodb.net/NinjaBlog?retryWrites=true&w=majority";

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected To DB");
    app.listen(3000, () => {
      console.log("server is running on localhost 3000");
    });
  })
  .catch((err) => console.log(err));

app.use(routes);
