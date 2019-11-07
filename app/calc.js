// app/calc.js
const sum = pathStr => {
    const normalPath = pathStr.substr(1).replace(/&/g,''); //парс урл адреса
    const array = normalPath.split('num='); //сбор массива чисел
    return array.reduce((acc, item) => !Number.isInteger(+item) ? "Ошибка: не верные данные" : (+item + +acc)); //вычисление суммы
}
module.exports.sum = sum