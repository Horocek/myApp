const calc = require('./calc')
const express  = require('express');
const app  = express();


//вывод в браузер
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/num=*&num=*', (req, res) => {
    const result = calc.sum(req.path); //вызов фунции sum из модуля calc
    res.send(`<h1>вычисление суммы -> ${result}</h1>`);
});


app.listen(3000, () => {
    console.log('Example app listenig on port 3000!');
});