// app/userFunction.js
const hashCreate = require('sha256');
const status = require('./idMsg');
const mysql = require("mysql2/promise");

const getConnect = async () => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        database: process.env.DB,
        password: process.env.DB_PASS
    });
}


const userAdded = "INSERT INTO user(ID, NAME, PASSWORDHASH) VALUES(?, ?, ?)";
const selectUserById = "SELECT * FROM user WHERE ID=?";
const selectUserByName = "SELECT * FROM user WHERE NAME=?";
//const userEdit = "UPDATE user SET name=?, passwordHash=? WHERE id=?";


//проверка подлнности пользоваателя
const isTrueUser = async (userName, userPass) => {
    const connection = await getConnect();
    try {
        const [row, field] = await connection.query(selectUserByName, userName);
        const pass = row[0].PASSWORDHASH;
        return (pass === hashCreate(userPass + userName)) ? status.id[status.DONE] : status.id[status.WRONGPASS];
    }
    catch (err) {
        return status.id[status.WRONGPASS];
    }

}

//регистрация нового уникального пользователя
const Creat = async (userName, userPass) => {
    const connection = await getConnect();
    const [row, field] = await connection.query(`SELECT MAX(ID) as maxId FROM user`);
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
    const [rows, fields] = await connection.query('SELECT ID, NAME, ISACTIVE FROM user');
    rows.map(({ ID, NAME, ISACTIVE}) => (NAME && ISACTIVE == 1) ? result += `${ID} | ${NAME}<br>` : result += '');
    return result;
}

//возвращение одного пользователя по id
const getUser = async (pathStr) => {
    const id = pathStr.replace(/users/g, '').substr(2);
    const connection = await getConnect();
    try {
        const [row, field] = await connection.query(selectUserById, id);
        if (row[0].ISACTIVE == 0) return 'Нет такого пользователя';
        result = `${row[0].ID} | ${row[0].NAME}`;
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
        const [rows, fields] = await connection.query(selectUserById, id);
        const isRealUser = rows[0].ISACTIVE == 1 ? true : false;
        if (isRealUser !== true) {
            return status.id[status.NOUSER];
        }
        if (hashCreate(oldPass + rows[0].NAME) !== rows[0].PASSWORDHASH) {
            return status.id[status.WRONGPASS];
        }
        await connection.query(`UPDATE user SET NAME='${userName}', PASSWORDHASH='${hashCreate(newPass + userName)}' WHERE ID=${id}`);
        return status.id[status.DONE];
    } catch (err) {
        return status.id[status.NOUSER];
    }
}

//удаление пользователя
const del = async (pathStr, pass) => {
    const id = pathStr.replace(/del/g, '').substr(2);
    const connection = await getConnect();
    try {
        const [rows, fields] = await connection.query(selectUserById, id);
        const isRealUser = rows[0].ISACTIVE == 1 ? true : false;
        if (isRealUser !== true) {
            return status.id[status.NOUSER];
        }
        if (hashCreate(pass + rows[0].NAME) !== rows[0].PASSWORDHASH) {
            return status.id[status.WRONGPASS];
        }
        await connection.query(`UPDATE user SET ISACTIVE=0 WHERE ID=${id}`);
        return status.id[status.DONE];
    } catch (err) {
        return status.id[status.NOUSER];
    }
}

//экспорт 
module.exports = { isTrueUser, Creat, getAllUsers, getUser, edit, del }