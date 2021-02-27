const express = require("express");
const router = express.Router();
const { Blog } = require("../models/blog");

router.get("/newBlog", (req, res) => {
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

router.get("/allBLogs", (req, res) => {
  Blog.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

router.get("/singleBlog", (req, res) => {
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
router.get("/", (req, res) => {
  Blog.find({})
    .sort({ createdAt: -1 })
    .then((data) => {
      res.render("index", { title: "Home", blogs: data });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// get single Blog

router.get("/blog/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((resp) => {
      res.render("singlePage", { title: "Blog", blog: resp });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// delete a blog

router.delete("/blog/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

router.post("/createNewBlog", (req, res) => {
  const blogInstance = new Blog(req.body);
  blogInstance.save().then((_) => {
    res.redirect("/").send();
  });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

router.get("/blogs", (req, res) => {
  res.render("blogs", { title: "Blogs" });
});

router.get("/createblog", (req, res) => {
  res.render("createblog", { title: "CreateBlog" });
});

router.get("/*", (req, res) => {
  res.status(404).render("404", { title: "404" });
});

module.exports = router;
