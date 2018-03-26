const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove({}).then((res) => {
//    console.log(res);
//});

Todo.findOneAndRemove({
    _id: '5ab940d654c473892d6a50cd'
}).then()

Todo.findByIdAndRemove('5ab940d654c473892d6a50cd').then((todo) => {
    console.log(todo);
})