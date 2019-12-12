// app/userFunction.js
const hashCreate = require('sha256');
const status = require('./idMsg');
const mysql = require("mysql2/promise");
const auth = require('./auth');

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

const editUserById = async (userId, newName, newPass) => {
    const connection = await getConnect();
    await connection.query(`UPDATE user SET NAME='${newName}', PASSWORDHASH='${hashCreate(newPass + newName)}' WHERE ID=${userId}`);
}

const delUserById = async userId => {
    const connection = await getConnect();
    await connection.query(`UPDATE user SET ISACTIVE=0 WHERE ID=${userId}`)

}

//проверка подлнности пользоваателя
const isTrueUser = async (userName, userPass) => {
    const resultLogin = await auth.loginUser(userName, userPass);
    const message = (resultLogin == false) ? 'not autorized' : resultLogin;
    const answer = status.answerConstructor(resultLogin, message);
    return answer;

}

//регистрация нового уникального пользователя
const Creat = async (userName, userPass) => {
    const connection = await getConnect();
    const [row, field] = await connection.query(`SELECT MAX(ID) as maxId FROM user`);
    const lastId = row[0].maxId + 1;
    const user = [lastId, userName, hashCreate(userPass + userName)];
    try {
        await connection.query(userAdded, user);
        return status.answerConstructor(true, 'Successful registration');
    } catch (err) {
        return status.answerConstructor(false, 'Login busy');
    }
}

//возвращение всех пользователей
const getAllUsers = async () => {
    let result = '';
    const connection = await getConnect();
    const [rows, fields] = await connection.query('SELECT ID, NAME, ISACTIVE FROM user');
    rows.map(({ ID, NAME, ISACTIVE }) => (NAME && ISACTIVE == 1) ? result += `${ID} | ${NAME}<br>` : result += '');
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
const edit = async (userId, newName, newPass, token) => {
    try {
        if (!(await auth.authToken(token, userId))) {
            return status.answerConstructor(false, 'Not autorized');
        }
        await editUserById(userId, newName, newPass);
        return status.answerConstructor(true, 'User edited');
    } catch (err) {
        return status.answerConstructor(false, 'catch error');
    }
}

//удаление пользователя
const del = async (userId, token) => {
    try {
        if (!(await auth.authToken(token, userId))) {
            return status.answerConstructor(false, 'Not autorized');
        }
        await delUserById(userId);
        return status.answerConstructor(true, 'User deleted');
    } catch (err) {
        return status.answerConstructor(false, 'catch error');
    }
}

//экспорт 
module.exports = { isTrueUser, Creat, getAllUsers, getUser, edit, del }