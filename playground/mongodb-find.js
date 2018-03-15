const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        console.log('Unabel to connect to mongoDB server');
    }
    console.log('Connected to mongoDb server');
    const db = client.db('TodoApp');
    
//    db.collection('Todos').find({
//        _id: new ObjectID('5aaac72254c473892d6a5062')
//    }).toArray().then((docs) => {
//        console.log('Todos')
//        console.log(JSON.stringify(docs, undefined, 2));
//    }, (err) => {
//        console.log('Unabel to fetch todos', err);
//    })
    
//    db.collection('Todos').find().count().then((count) => {
//        console.log(`Todos count: ${count}`)
//    }, (err) => {
//        console.log('Unabel to fetch todos', err);
//    })
    
    db.collection('Users').find({name: 'Mitchell'}).toArray().then((docs) => {
        console.log('User:');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unabel to fetch todos', err);
    })
    
    
    //client.close();
});