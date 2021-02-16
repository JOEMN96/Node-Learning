// Imports
const express = require("express");
const chalk = require("chalk");
// Other files
require("./db/mongoose");
// Model Schemas
const User = require("./db/models/user");
const Task = require("./db/models/Task");
// Routes
const userRoutes = require("./Routes/user");
const taskRoutes = require("./Routes/tasks");

// Express App Settings
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// adding Routes
app.use(userRoutes);
app.use(taskRoutes);

// Spining Up server
app.listen(port, () => {
  console.log(
    chalk.bgBlueBright(`Example app listening at http://localhost:${port}`)
  );
});
