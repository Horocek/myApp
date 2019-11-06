// app/calc.js
const sum = pathStr => {
    let array = [];
    pathStr = pathStr.substr(1).replace(/&/g,'');
    array = pathStr.split('num=');
    return array.reduce((acc, item) => {
        if (!Number.isInteger(+item)) return "Ошибка: не верные данные";
        return +item + +acc;
    });
}
module.exports.sum = sum