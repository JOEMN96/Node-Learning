const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/task-app', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));








