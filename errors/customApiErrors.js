class customAPIErrors extends Error {
    constructor(message,statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createCustomError = (message,statusCode) => {
    return new customAPIErrors(message,statusCode);
};

module.exports = {
    customAPIErrors,
    createCustomError
};