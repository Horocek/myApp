const calc = require('./calc')
const express  = require('express');
const app  = express();


//вывод в браузер
app.get('/', (req, res) => {
<<<<<<< HEAD
    res.send('<h1>Hello World!</h1> ' + result);
});

app.get('/num=*&num=*', (req, res) => {
    const result = calc.sum(req.path); //вызов фунции sum из модуля calc
    res.send(`<h1>sum = ${result}</h1>`);
=======
    res.send(`<h1>Hello World!</h1> ${result}`);
    
>>>>>>> 1ddff24659d0fdf84b68ab9a841a575abff2bf59
});


app.listen(3000, () => {
    console.log('Example app listenig on port 3000!');
});