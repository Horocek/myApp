// app/calc.js
const sum = pathStr => {
    const normalPath = pathStr.substr(1).replace(/&/g,''); 
    const array = normalPath.split('num='); 
    return array.reduce((acc, item) => !Number.isInteger(+item) ? "Ошибка: не верные данные" : (+item + +acc)); 
}
module.exports.sum = sum