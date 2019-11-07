const calc = require('./calc')
const userFunction = require('./userFunction')
const express  = require('express');
const bodyParser = require('body-parser')
const app  = express();
app.use(bodyParser.urlencoded({ extended: false }));

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

// Post /sum сложение двух чисел
app.post('/sum', (req, res) => {
    const result = +req.body.num1 + +req.body.num2;
    res.send(`вычисление суммы -> ${result}`);
});


//Post /registration регистрация  
app.post('/registration', (req, res) => {
    result = userFunction.Creat(req.body.userName, req.body.userPass) == false ? `Пользователь ${req.body.userName} сущевствует` : 'Регистрация успешна'
    res.send(result);
});

//Post /login авторизация   
app.post('/login', (req, res) => {
    const result = userFunction.isTrueUser(req.body.userName, req.body.userPass);
    res.send(`авторизация ${result}`);
});

app.listen(3000, () => {
    console.log('Example app listenig on port 3000!');
});