// app/userFunction.js
const hashCreate = require('sha256');
const users = [
    {
    name : 'Ivan',
    pass : '4dcc57b2e6ffd0c08a79b00e996e11ad93c4b4fe4b3e9cfc86f5b04829e12b3f',//123
    userId : 0,
    isActive : true},
    {
    name : 'Maxim',
    pass : 'd99cc3e655c87a6ff8b68e56fd76b8121bf11287e6210129320afc37b753ad78',//12345678
    userId : 1,
    isActive : false},
    {
    name : 'Dino',
    pass : '2783c028190796572f198626046a2e3284db05e2345e325c213661826974e8a8',//qwerty1
    userId : 2,
    isActive : true},
    {
    name : 'Viktor',
    pass : '4903c3246e530ea06a536962f652e74def6fc0919e541163477d64de9cf5f941',// 666
    userId : 3,
    isActive : true}
]

//проверка подлнности пользователя
const isTrueUser = (userName, userPass) => {
    return (users.find(({name, pass}) => userName === name && sha256(userPass + userName) === pass)) ? true : false; 
}

//регистрация нового уникального пользователя
const Creat = (userName, userPass) => {
    if (users.find(({name}) => userName === name)) return false;
    users.push({
        name : userName,
        pass : hashCreate(userPass + userName),
        userId : users.length,
        isActive : true
    });
}

//возвращение всех пользователей
const getAllUsers = () => {
    let result = '';
    users.map(({name, isActive}) => {
    if (name && isActive == true) result += `${name}<br>`});
    return result;
    }
   
//возвращение одного пользователя по id
const getUser = (pathStr) => {
    const id = pathStr.replace(/users/g,'').substr(2);
    return users.find(({userId, isActive}) => (userId == id && isActive == true)) ? [id, users[id].name] : [id, 'не найден'];
}

//редактирование пользователя
const edit = (pathStr, userName, oldPass, newPass) => {
    const id = pathStr.replace(/edit/g,'').substr(2);
    const isRealUser = users.find(({userId, isActive}) => (userId == id && isActive == true) )? true : false;
    if (isRealUser !== true) {
        return "нет такого пользователя";
    }
    if (hashCreate(oldPass + users[id].name) !== users[id].pass) {
        return "не верный пароль";
    }
        users[id].name = userName;
        users[id].pass = hashCreate(newPass + userName);
        return "пользователь изменен";
}

//удаление пользователя
const del = (pathStr, Pass) => {
    const id = pathStr.replace(/del/g,'').substr(2);
    const isRealUser = users.find(({userId, isActive}) => (userId == id && isActive == true))? true : false;
    if (isRealUser !== true) {
        return "нет такого пользователя";
    }
    if (users[id].pass !== hashCreate(Pass + users[id].name) ){
        return "не верный пароль";
    }
    users[id].isActive = false;
    return "пользователь удален";
}

//экспорт 
module.exports.isTrueUser = isTrueUser
module.exports.Creat = Creat
module.exports.getAllUsers = getAllUsers
module.exports.getUser = getUser
module.exports.edit = edit
module.exports.del = del