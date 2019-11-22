const id = [{
    success: false,
    msg: "нет такого пользователя"
},
{
    success: false,
    msg: "Не верный логин или пароль"
},
{
    success: true,
    msg: "успешно"
},
{
    success: false,
    msg: "логин занят"
}
]

const NOUSER = 0;
const WRONGPASS = 1;
const DONE = 2;
const BUSY = 3;

module.exports = { id, NOUSER, WRONGPASS, DONE, BUSY };

