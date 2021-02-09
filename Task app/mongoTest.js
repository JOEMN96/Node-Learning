const {MongoClient,ObjectID} = require('mongodb')

const url = 'mongodb://localhost:27017';
const dbName = 'task-app';

MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology: true },(err,client)=>{
        if(err) {
          return  console.log("Unable To connect Db");
        }
        const db = client.db(dbName)
        console.log("Db connected sucessfully");
      
        db.collection('tasks').find({completed:true}).toArray((err,data)=>{
            console.log(data);
        })
})