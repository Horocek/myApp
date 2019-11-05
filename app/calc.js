// app/calc.js
const sum = pathStr => {
    let array = [];
    pathStr = pathStr.substr(1).replace(/&/g,'');
    array = pathStr.split('num=');
    return array.reduce((acc, item) => +acc + +item);
}
module.exports.sum = sum