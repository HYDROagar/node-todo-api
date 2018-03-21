const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        console.log('Unabel to connect to mongoDB server');
    }
    console.log('Connected to mongoDb server');
    const db = client.db('TodoApp');
    
//    db.collection('Todos').findOneAndUpdate({
//        _id: new ObjectID("5aaacfad54c473892d6a5074")
//    }, {
//        $set: {
//            completed: true
//        }
//    },{
//        returnOriginal: false
//    }).then((res) => {
//        console.log(res);
//    })
    
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5aaac22ab2a85b8b4a8a5863")
    },{
        $set: {
            name: 'Ben'
        },
        $inc: {
            age: +1
        }
        
    }).then((res) => {
        console.log(res);
    })
    
    //client.close();
});