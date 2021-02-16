const express = require("express");
// Schema
const User = require("../db/models/user");

let route = new express.Router();

// create new user

route.post("/user", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
});

// GET users

route.get("/users", async (req, res) => {
  try {
    let data = await User.find({});
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET Unique user
route.get("/users/:id", async (req, res) => {
  let _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(404).send("No user Found");
  }
});

// UPDATE A Unique User ---> PATCH (UPDATE In CRUD)

route.patch("/users/:id", async (req, res) => {
  let needsUpdate = Object.keys(req.body);
  let validUpdates = ["name", "password", "email", "age"];

  let canUpdate = needsUpdate.every((update) => validUpdates.includes(update));

  if (!canUpdate) {
    return res.status(404).send("Proper Updation field Required");
  }

  try {
    let user = await User.findById(req.params.id);

    needsUpdate.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();
    // let updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send("server Error");
  }
});
//   Delete a user
route.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.send(404).send();
    }
    res.send(deletedUser);
  } catch (_) {
    res.status(400).send("bad Req");
  }
});

//  Login a User

route.post("/users/login", async (req, res) => {
  try {
    const user = await Users.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (e) {
    res.status(400).send("login failed");
  }
});

module.exports = route;
