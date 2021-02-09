const mongoDb = require('mongodb')

const MongoClient = mongoDb.MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'task-app';

MongoClient.connect(url,{useNewUrlParser:true},(err,client)=>{
        if(err) {
          return  console.log("Unable To connect Db");
        }
        console.log("Db connected sucessfully");
        // dataBase
        const db = client.db(dbName);
        // db.collection('users').insertMany([{
        //     name:'sajin',
        //     age:23
        // },{
        //     name:"milton",
        //     age:24
        // }],(err,sucess)=>{
        //     if(err) {
        //         return console.log("error");
        //     }
        //     console.log(sucess.ops);
        // })
        db.collection('tasks').insertMany([{
            description:'buy milk',
            completed:false
        },{
            description:'go for run',
            completed:true
        },{
            description:'cal nijo',
            completed:true
        }],(err,sucess)=>{
            if(err) {
                return console.log("err dude");
            }
            console.log(sucess.ops);
        })
})