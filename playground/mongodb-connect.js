//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        console.log('Unabel to connect to mongoDB server');
    }
    console.log('Connected to mongoDb server');
    const db = client.db('TodoApp');
    
    /*
    db.collection('Todos').insertOne({
        text: 'Somthing to do',
        completed: false
    }, (err, res) => {
        if(err){
            return console.log('Unabel to insert todo', err);
        }
        
        console.log(JSON.stringify(res.ops, undefined, 2));
    })
    */
//    db.collection('Users').insertOne({
//        name: 'Mitchell',
//        age: 19,
//        location: 'LaCrosse'
//    }, (err, res) => {
//        if(err){
//            console.log('Unabel to insert User');
//        }
//        
//        console.log(JSON.stringify(res.ops[0]._id.getTimestamp()));
//    })
    
    
    client.close();
});