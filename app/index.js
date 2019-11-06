const calc = require('./calc')
const express  = require('express');
const bodyParser = require('body-parser')
const app  = express();
app.use(bodyParser.urlencoded({ extended: false }));

let users = [
    {
    name : 'Haro',
    pass : '12345678'},
    {
    name : 'Kum',
    pass : 'kum'}
]
let accUser = users.length; //кол-во пользователей

app.get('/num=*&num=*', (req, res) => {
    const result = calc.sum(req.path); 
    res.send(`<h1>вычисление суммы -> ${result}</h1>`);
});


// Post /sum сложение двух чисел
app.post('/sum', (req, res) => {
    const result = +req.body.num1 + +req.body.num2;
    res.send(`вычисление суммы -> ${result}`);
});

//Post /registration регистрация  
app.post('/registration', (req, res) => {
    users.push({
        name : req.body.userName,
        pass : req.body.userPass,});
    res.send('Регистрация успешна');
});

//Post /login авторизация   
app.post('/login', (req, res) => {
    const result = (users.find(({name, pass}) => req.body.userName === name && req.body.userPass === pass)) ? 'успешная': 'не верная пара'; 
    res.send(`авторизация ${result}`);
});

app.listen(3000, () => {
    console.log('Example app listenig on port 3000!');
});