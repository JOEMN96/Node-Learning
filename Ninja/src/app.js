const { static } = require("express");
const express = require("express");
const { dirname } = require("path");
const path = require("path");
const mongoose = require("mongoose");
const { Blog } = require("./models/blog");

const app = express();

// serving static assets
let publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

app.set("view engine", "ejs");
app.set("views", "public/views");

// Db ln

const dbUrl =
  "mongodb+srv://admin:admin1234@ninjablog.ukuro.mongodb.net/NinjaBlog?retryWrites=true&w=majority";

// Routes
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected To DB");
    app.listen(3000, () => {
      console.log("server is running on localhost 3000");
    });
  })
  .catch((err) => console.log(err));

// CRUD
app.get("/newBlog", (req, res) => {
  const blogInstance = new Blog({
    title: "Blog 1",
    snippet: "snippet 1",
    content: "Content 1",
  });
  blogInstance
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get("/allBLogs", (req, res) => {
  Blog.find({})
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

app.get("/singleBlog", (req, res) => {
  Blog.findById("60367a7cfa9cd2129afa4ddd")
    .then((data) => {
      if (!data) {
        res.status(404).send("No Blogs With that ID is Found");
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// Normal Routes
app.get("/", (req, res) => {
  Blog.find({})
    .sort({ createdAt: -1 })
    .then((data) => {
      console.log(data);
      res.render("index", { title: "Home", blogs: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs", (req, res) => {
  res.render("blogs", { title: "Blogs" });
});

app.get("/createblog", (req, res) => {
  res.render("createblog", { title: "CreateBlog" });
});

app.get("/*", (req, res) => {
  res.status(404).render("404", { title: "404" });
});
