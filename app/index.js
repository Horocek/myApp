const calc = require('./calc');
const userFunction = require('./userFunction');
const express  = require('express');
const bodyParser = require('body-parser');
const app  = express();
app.use(bodyParser.urlencoded({ extended: false }));


//get welcome
app.get('/', (req, res) => {
    res.send('welcome!!!!!!!');
});

//get /num=*&num=* сложение массива чисел
app.get('/num=*&num=*', (req, res) => {
    const result = calc.sum(req.path); 
    res.send(`<h1>вычисление суммы -> ${result}</h1>`);
});


//get /users получение всех пользователей
app.get('/users', (req, res) => {
    const result = userFunction.getAllUsers();
    res.send(`<h1>список пользователей: <br>${result}</h1>`);
});


//get /user/id получение пользователя по id
app.get('/users/*', (req, res) => {
    const result = userFunction.getUser(req.path);
    res.send(`<h1>id = ${result[0]} <br> пользователь - ${result[1]}</h1>`);
});


// Post /sum сложение двух чисел
app.post('/sum', (req, res) => {
    const result = +req.body.num1 + +req.body.num2;
    res.send(`вычисление суммы -> ${result}`);
});


//Post /registration регистрация  
app.post('/registration', (req, res) => {
    result = userFunction.Creat(req.body.userName, req.body.userPass) == false ? `логин ${req.body.userName} занят` : 'успех';
    res.send(result);
});


//post /edit/* редактирование пользователя
app.post('/edit/*', (req, res) => {
    res.send(userFunction.edit(req.path, req.body.newName, req.body.oldPass, req.body.newPass));
})

//post /del/* удаление пользователя
app.post('/del/*', (req, res) => {
    res.send(userFunction.del(req.path, req.body.userPass));
})


//Post /login авторизация   
app.post('/login', (req, res) => {
    res.send(userFunction.isTrueUser(req.body.userName, req.body.userPass));
});

app.listen(3000, () => {
    console.log('Example app listenig on port 3000!');
});