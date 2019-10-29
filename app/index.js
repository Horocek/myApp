const calc = require('./calc')
const express  = require('express');
const app  = express();


//массив данных
const numbersToAdd = [
    1,
    4,
    10,
    2
]



const result = calc.sum(numbersToAdd) //вызов фунции sum из модуля calc
console.log(`The result is: ${result}`)


//вывод в браузер
app.get('/', (req, res) => {
    res.send(`<h1>Hello World!</h1> ${result}`);
    
});


app.listen(3000, () => {
    console.log('Example app listenig on port 3000!');
});