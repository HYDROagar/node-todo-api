const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, populateUsers, users} = require('./seed/seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        var text = 'Test todo text';
        
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
        })
            .end((err, res) => {
                if(err){
                   return done(err);
                }
            
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
        })
    });
    it('Should not create todo with invalid body data', (done) =>{
        request(app).post('/todos').send({})
         .expect(400)
         .end((err, res) => {
            if(err){
                return done(err);
            }
            
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        })
    })
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app).get('/todos')
         .expect(200)
         .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
         .end(done);
    })
});

describe('GET /todos/:id', () => {
    it('Should return todo doc', (done) => {
        request(app).get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done);
    });
    
    it('Should return 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();
        request(app).get(`/todos/${new ObjectID()}`).expect(404).end(done);
    });
    it('Should return 404 for non-object ids', (done) => {
        request(app).get('/todos/1234abcd').expect(404).end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('Should remove a todo', (done) => {
        var hexID = todos[1]._id.toHexString();
        
        request(app).delete(`/todos/${hexID}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexID);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            
            Todo.findById(hexID).then((todo) => {
                expect(todo).toNotExist();
                done();
            }).catch((e) => done(e));
        })
    }); 
});

describe('PATCH /todos/:id', () => {
    it('Should update the todo', (done) => {
        var hexID = todos[0]._id.toHexString();
        var text = 'this should be the new text';
        
        request(app).patch(`/todos/${hexID}`).send({
            completed: true,
            text
        }).expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
    });
    
    it('Should clear completedAt when todo is not completed', (done) => {
        var hexID = todos[1]._id.toHexString();
        var text = 'this should be the new text!!!';
        
        request(app).patch(`/todos/${hexID}`).send({
            completed: false,
            text
        }).expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
    });
});

describe('POST / users/login', () => {
    it('Should login user and return auth token', (done) => {
        request(app).post('/users/login')
        .send({
            email: users[1].email,
            password: users[1].password
        })
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toExist();
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            
            User.findById(users[1]._id).then((user) => {
                expect(user.tokens[0]).toInclude({
                    access: 'auth',
                    token: res.headers['x-auth']
                });
                done();
            }).catch((e) => done(e));
        })
    });
    
    it('Should reject invalid login', (done) => {
        
    })
})









