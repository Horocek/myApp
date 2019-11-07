// app/userFunction.js
const isTrueUser = (userName, userPass, userPull) => {
    return (userPull.find(({name, pass}) => userName === name && userPass === pass)) ? true : false; 
}
module.exports.isTrueUser = isTrueUser