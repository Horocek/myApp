const isEmpity = require('./utils').isEmpity;

const statusConstructor = (status, message) => {
    const success = (status !== false) ? true : false;
    const result = (success == true) ? {
        success: success,
        data: message
    } :
        {
            success: success,
            data: message
        };
    return result;
}

const userConstructor = (users) => {
    const result = [{}];
    let i = 0;
    if (!(isEmpity(users))) {
        users.map(({ NAME, ISACTIVE }) => {
            result[i] = { name: NAME, isActive: ISACTIVE }
            i++;
        });
        return result;
    }
    return statusConstructor(false, 'Not a user');
}

module.exports = { statusConstructor, userConstructor };

