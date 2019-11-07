// app/userFunction.js
const users = [
    {
    name : 'Haro',
    pass : '12345678'},
    {
    name : 'Kum',
    pass : 'kum'}
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
    });
}


module.exports.isTrueUser = isTrueUser
module.exports.Creat = Creat