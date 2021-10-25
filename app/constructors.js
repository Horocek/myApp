const isEmpity = require('./utils').isEmpity;

const statusConstructor = (status, message) => {
    return {
        success: status,
        data: message
    }
}

const userConstructor = (users) => {
    const result = [];
    if (!(isEmpity(users))) {
        users.map(({
            ID,
            NAME,
            ISACTIVE
        }) => {
            result.push({
                id: ID,
                name: NAME,
                isActive: ISACTIVE
            });
        });
        return result;
    }
    return statusConstructor(false, 'Not a user');
}

module.exports = {
    statusConstructor,
    userConstructor
};