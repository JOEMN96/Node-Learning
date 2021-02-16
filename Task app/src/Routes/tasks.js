const express = require("express");
const Task = require("../db/models/Task");
let route = new express.Router();

// Task post Route

route.post("/task", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

// GET All Tasks
route.get("/tasks", async (req, res) => {
  try {
    const data = await Task.find({});
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET Specific Task

route.get("/task/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await Task.findById(id);
    if (!data) {
      return res.status(404).send("No recods Found !");
    }
    res.send(data);
  } catch (err) {
    res.status(403).send("Unable to Find The Task");
  }
});

// Update Single Task

route.patch("/tasks/:id", async (req, res) => {
  let id = req.params.id;
  let updatableFields = ["completed", "desc"];

  let wantToUpdate = Object.keys(req.body);
  let canUpdate = wantToUpdate.every((feild) =>
    updatableFields.includes(feild)
  );

  if (!canUpdate) {
    return res.status(404).send("Unable to find proper value");
  }

  try {
    let task = await Task.findById(id);
    wantToUpdate.forEach((field) => {
      task[field] = req.body[field];
    });
    console.log(task);
    await task.save();
    // let upadtedTask = await Task.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
    if (!task) {
      res.status(404).send("help");
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});
//   delete a task
route.delete("/tasks/:id", async (req, res) => {
  try {
    let deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).send("Task not Found");
    }
    res.send(deletedTask);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = route;
