const express = require ('express');
const fs = require ('fs');
const path = require('path');
const joi = require ('joi');

const filePath = path.join(__dirname, 'users.json');

let costomID = 1;

const scheme = joi.object({
        firstName : joi.string().min(1).required(),
        secondName : joi.string().min(1).required(),
        age : joi.number().min(0).max(150).required(),
        city : joi.string().min(3)

})

const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.send({ users });
});

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const user = users.find(user => user.id === Number(req.params.id));
    if(user) {
        res.send({ user});
    } else {
        res.send({ error : 'Users is not found'});
    }
    res.send({ user });
});


app.put('/users/:id', (req, res) => {
    const result = scheme.validate(req.body);
    if (result.error) {
return res.send({ error: result.error.details});
    }

    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const user = users.find(user => user.id === Number(req.params.id));

    if(user) {
        user.firstName = req.body.firstName;
        user.secondName = req.body.secondName;
        user.age = req.body.age;
        user.city = req.body.city;
        fs.writeFileSync(filePath, JSON.stringify(users));
        res.send({ user});
    } else {
        res.send({ erroe : 'User is not found'});
    }
});

app.post('/users', (req, res) => {
    const result = scheme.validate(req.body);
    if (result.error) {
return res.send({ error: result.error.details});
    }
    
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const user = {
        id: ++costomID,
        firstName : req.body.firstName,
        secondName : req.body.secondName,
        age : req.body.age,
        city : req.body.city,
    };
    users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(users));
    res.send({ user });
});


app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const userIndex = users.findIndex(user => user.id === Number(req.params.id));
    if(userIndex >= 0) {
        users.splice(userIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(users));
        res.send({ status : 'ok' });
    } else {
        res.send({ erroe : 'User is not found'});
    }
});


app.listen(3000, () => console.log("started"));