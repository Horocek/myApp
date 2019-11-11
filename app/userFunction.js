// app/userFunction.js
const hashCreate = require('sha256');
const status = require('./idMSG');

const users = [
    {
        name: 'Ivan',
        pass: '4dcc57b2e6ffd0c08a79b00e996e11ad93c4b4fe4b3e9cfc86f5b04829e12b3f',//123
        userId: 0,
        isActive: true
    },
    {
        name: 'Maxim',
        pass: 'd99cc3e655c87a6ff8b68e56fd76b8121bf11287e6210129320afc37b753ad78',//12345678
        userId: 1,
        isActive: false
    },
    {
    name : 'Viktor',
    pass : '4903c3246e530ea06a536962f652e74def6fc0919e541163477d64de9cf5f941',// 666
    userId : 3,
    isActive : true}
]

//проверка подлнности пользователя
const isTrueUser = (userName, userPass) => {
    return (users.find(({ name, pass }) => userName === name && hashCreate(userPass + userName) === pass)) ?
        status.id[status.DONE] :
        status.id[status.WRONGPASS];
}

//регистрация нового уникального пользователя
const Creat = (userName, userPass) => {
    if (users.find(({ name }) => userName === name)) return false;
    users.push({
        name: userName,
        pass: hashCreate(userPass + userName),
        userId: users.length,
        isActive: true
    });
}

//возвращение всех пользователей
const getAllUsers = () => {
    let result = '';
    users.map(({ name, isActive }) => {
        if (name && isActive == true) result += `${name}<br>`
    });
    return result;
}

//возвращение одного пользователя по id
const getUser = (pathStr) => {
    const id = pathStr.replace(/users/g, '').substr(2);
    return users.find(({ userId, isActive }) => (userId == id && isActive == true)) ? [id, users[id].name] : [id, 'не найден'];
}

//редактирование пользователя
const edit = (pathStr, userName, oldPass, newPass) => {
    const id = pathStr.replace(/edit/g, '').substr(2);
    const isRealUser = users.find(({ userId, isActive }) => (userId == id && isActive == true)) ? true : false;
    if (isRealUser !== true) {
        return status.id[status.NOUSER];
    }
    if (hashCreate(oldPass + users[id].name) !== users[id].pass) {
        return status.id[status.WRONGPASS];
    }
    users[id].name = userName;
    users[id].pass = hashCreate(newPass + userName);
    return status.id[status.DONE];
}

//удаление пользователя
const del = (pathStr, Pass) => {
    const id = pathStr.replace(/del/g, '').substr(2);
    const isRealUser = users.find(({ userId, isActive }) => (userId == id && isActive == true)) ? true : false;
    if (isRealUser !== true) {
        return status.id[status.NOUSER];
    }
    if (users[id].pass !== hashCreate(Pass + users[id].name)) {
        return status.id[status.WRONGPASS];
    }
    users[id].isActive = false;
    return status.id[status.DONE];
}

//экспорт 
module.exports = { isTrueUser, Creat, getAllUsers, getUser, edit, del }