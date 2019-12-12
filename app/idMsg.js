const answerConstructor = (status, message) => {
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

module.exports = { answerConstructor };

