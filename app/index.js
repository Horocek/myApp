const userFunction = require('./userFunction');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));



//get welcome
app.get('/', (req, res) => {
    res.send('welcome!!!!!!!');
});


//get /users получение всех пользователей
app.get('/users', async (req, res) => {
    const answer = await userFunction.getAllUsers();
    res.send(answer);
});


//get /user/id получение пользователя по id
app.get('/users/*', async (req, res) => {
    const answer = await userFunction.getUser(req.path);
    res.send(answer);
});


//Post /registration регистрация  
app.post('/registration', async (req, res) => {
    const answer = await userFunction.Creat(req.body.userName, req.body.userPass);
    res.send(answer);
});


//post /edit редактирование пользователя
app.post('/edit', async (req, res) => {
    const token = req.header('Authorization');
    const answer = await userFunction.edit(req.body.userId, req.body.newName, req.body.newPass, token);
    res.send(answer);
})

//post /del удаление пользователя
app.post('/del', async (req, res) => {
    const token = req.header('Authorization');
    const answer = await userFunction.del(req.body.userId, token);
    res.send(answer);
})


//Post /login авторизация   
app.post('/login', async (req, res) => {
    const answer = await userFunction.isTrueUser(req.body.userName, req.body.userPass);
    res.send(answer);
});

app.listen(3000, () => {
    console.log('Example app listenig on port 3000!');
});