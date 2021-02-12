const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/task-app', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));








