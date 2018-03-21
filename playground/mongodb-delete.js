const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        console.log('Unabel to connect to mongoDB server');
    }
    console.log('Connected to mongoDb server');
    const db = client.db('TodoApp');
    
//    db.collection('Todos').deleteMany({text: 'eat lunch'}).then((res) => {
//        console.log(res);
//    })
    
//    db.collection('Todos').deleteOne({text: 'eat lunch'}).then((res) => {
//        console.log(res);
//    });
    
    db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
        console.log(res);
    })
    
    //client.close();
});