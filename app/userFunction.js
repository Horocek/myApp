// app/userFunction.js
const hashCreate = require('sha256');
const status = require('./idMSG');
const mysql = require("mysql2/promise");

const getConnect = async () => {
    return await mysql.createConnection({
        host: "localhost",
        port: 3307,
        user: "root",
        database: "appDB",
        password: ""
    });
}

const userAdded = "INSERT INTO user(id, name, passwordHash) VALUES(?, ?, ?)";

<<<<<<< HEAD
=======
const users = [
    {
        name: 'Ivan',
        pass: '4dcc57b2e6ffd0c08a79b00e996e11ad93c4b4fe4b3e9cfc86f5b04829e12b3f',// 123
        userId: 0,
        isActive: true
    },
    {
        name: 'Maxim',
        pass: 'd99cc3e655c87a6ff8b68e56fd76b8121bf11287e6210129320afc37b753ad78',// 12345678
        userId: 1,
        isActive: false
    },
    {
        name: 'Dino',
        pass: '2783c028190796572f198626046a2e3284db05e2345e325c213661826974e8a8',// qwerty1
        userId: 2,
        isActive: true
    },
    {
        name: 'Viktor',
        pass: '4903c3246e530ea06a536962f652e74def6fc0919e541163477d64de9cf5f941',// 666
        userId: 3,
        isActive: true
    }
]
>>>>>>> 840f531b2cbc2120675a64bf2e799f9713db9451
//проверка подлнности пользователя
const isTrueUser = async (userName, userPass) => {
    const connection = await getConnect();
    try {
        const [row, field] = await connection.query(`SELECT passwordHash FROM user WHERE name='${userName}'`);
        const pass = row[0].passwordHash;
        return (pass === hashCreate(userPass + userName)) ? status.id[status.DONE] : status.id[status.WRONGPASS];
    }
    catch (err) {
        return status.id[status.WRONGPASS];
    }

}

//регистрация нового уникального пользователя
const Creat = async (userName, userPass) => {
    const connection = await getConnect();
    const [row, field] = await connection.query(`SELECT MAX(id) as maxId FROM user`);
    const lastId = row[0].maxId + 1;
    const user = [lastId, userName, hashCreate(userPass + userName)];
    try {
        await connection.query(userAdded, user);
        return status.id[status.DONE];
    } catch (err) {
        return status.id[status.BUSY];
    }
}

//возвращение всех пользователей
const getAllUsers = async () => {
    let result = '';
    const connection = await getConnect();
    const [rows, fields] = await connection.query('SELECT id, name, isActive FROM user');
    rows.map(({ id, name, isActive }) => (name && isActive == 1) ? result += `${id} | ${name}<br>` : result += '');
    return result;
}

//возвращение одного пользователя по id
const getUser = async (pathStr) => {
    const id = pathStr.replace(/users/g, '').substr(2);
    const connection = await getConnect();
    try {
        const [row, field] = await connection.query(`SELECT id, name, isActive,  FROM user WHERE id=${id}`);
        if (row[0].isActive == 0) return 'Нет такого пользователя';
        result = `${row[0].id} | ${row[0].name}`;
    } catch (err) {
        result = 'Нет такого пользователя';
    }
    return result;
}

//редактирование пользователя
const edit = async (pathStr, userName, oldPass, newPass) => {
    const id = pathStr.replace(/edit/g, '').substr(2);
    const connection = await getConnect();
    try {
        const [rows, fields] = await connection.query(`SELECT id, name, isActive, passwordHash FROM user WHERE id=${id}`);
        const isRealUser = rows[0].isActive == 1 ? true : false;
        if (isRealUser !== true) {
            return status.id[status.NOUSER];
        }
        if (hashCreate(oldPass + rows[0].name) !== rows[0].passwordHash) {
            return status.id[status.WRONGPASS];
        }
        await connection.query(`UPDATE user SET name='${userName}', passwordHash='${hashCreate(newPass + userName)}' WHERE id=${id}`);
        return status.id[status.DONE];
    } catch (err) {
        return status.id[status.NOUSER];
    }
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