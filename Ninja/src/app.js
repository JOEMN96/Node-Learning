const { static } = require("express");
const express = require("express");
const { dirname } = require("path");
const path = require("path");

const app = express();

// serving static assets
let publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

app.set("view engine", "ejs");
app.set("views", "public/views");

// Routes

app.get("/", (req, res) => {
  const blogs = [
    { title: "hello", content: "hey" },
    { title: "hello2", content: "hey2" },
  ];
  res.render("index", { title: "Home", blogs });
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

app.listen(3000, () => {
  console.log("server is running on localhost 3000");
});
