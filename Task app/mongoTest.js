// const {MongoClient,ObjectID} = require('mongodb')

// const url = 'mongodb://localhost:27017';
// const dbName = 'task-app';

// MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology: true },(err,client)=>{
//         if(err) {
//           return  console.log("Unable To connect Db");
//         }
//         const db = client.db(dbName)
//         console.log("Db connected sucessfully");
      
//         // db.collection('tasks').find({completed:true}).toArray((err,data)=>{
//         //     console.log(data);
//         // })
//         // db.collection('users').updateOne({_id:new ObjectID("6021d98824c0562830eede9a")},{
//         //   $inc:{
//         //     age:-1
//         //   }
//         // }).then(data => console.log("Updated")).catch(err => console.log(err))

//         // db.collection('tasks').updateMany({completed:true},{
//         //   $set:{
//         //     completed:false
//         //   }
//         // }).then(resolved => console.log('done'))
//         //   .catch(err => console.log(err))

//         // db.collection('users').deleteOne({name:"Joe"}).then(()=> console.log("done"))

// })
