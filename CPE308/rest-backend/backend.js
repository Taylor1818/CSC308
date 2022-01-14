const express = require('express');
const { del } = require('express/lib/application');
const res = require('express/lib/response');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let newList = users.users_list;

    if (name != undefined){
        newList = findUserByName(newList, name);
    }
    if( job != undefined){
        newList = findUserByJob(newList, job);
    }
    res.send( {users_list: newList} );
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        deleteUser(result);
        res.status(204).end();
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    if(userToAdd.id == null){
        userToAdd.id = generateId();
    }
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

function addUser(user){
    users['users_list'].push(user);
}

function deleteUser(user){
    for(let i = 0; i < users['users_list'].length; i++){
        if(user == users['users_list'][i]){
            users['users_list'].splice(i, 1);
        }
    }
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

function generateId(){

    var id = "";
    var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    for( var i = 0; i < 7; i++){
        id += str.charAt(Math.floor(Math.random()* str.length));
    }

    return id;
}


const findUserByName = (list, name) => { 
    return list.filter( (user) => user['name'] === name); 
}

const findUserByJob = (list, job) => { 
    return list.filter( (user) => user['job'] === job); 
}

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }