// app/userFunction.js
const users = [
    {
    name : 'Maxim',
    pass : '12345678',
    userId : 0,
    isActive : true},
    {
    name : 'Kum',
    pass : '123',
    userId : 1,
    isActive : false},
    {
    name : 'Locards',
    pass : '222',
    userId : 2,
    isActive : true},
    {
    name : 'Viktor',
    pass : '666',
    userId : 3,
    isActive : true}
]

//проверка подлнности пользователя
const isTrueUser = (userName, userPass) => {
    return (users.find(({name, pass}) => userName === name && userPass === pass)) ? true : false; 
}

//регистрация нового уникального пользователя
const Creat = (userName, userPass) => {
    if (users.find(({name}) => userName === name)) return false;
    users.push({
        name : userName,
        pass : userPass,
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
    if (users[id].pass !== oldPass) {
        return "не верный пароль";
    }
        users[id].name = userName;
        users[id].pass = newPass;
        return "пользователь изменен";
}

//удаление пользователя
const del = (pathStr, Pass) => {
    const id = pathStr.replace(/del/g,'').substr(2);
    const isRealUser = users.find(({userId, isActive}) => (userId == id && isActive == true))? true : false;
    if (isRealUser !== true) {
        return "нет такого пользователя";
    }
    if (users[id].pass !== Pass) {
        return "не верный пароль";
    }
    users[id].isActive = false;
    return "пользователь удален";
}

module.exports.isTrueUser = isTrueUser
module.exports.Creat = Creat
module.exports.getAllUsers = getAllUsers
module.exports.getUser = getUser
module.exports.edit = edit
module.exports.del = del