const hashCreate = require('sha256');
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

const loginUser = async (userName, userPass) => {
    const connection = await getConnect();
    try {
        const [row, field] = await connection.query(selectUserByName, userName);
        const pass = row[0].PASSWORDHASH;
        return (pass === hashCreate(userPass + userName)) ? pass : false;
    }
    catch (err) {
        return false;
    }
}






module.exports = { loginUser };