const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Names are required");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be strong (at least 8 characters, including upper/lowercase and numbers)");
    }
}

module.exports = {
    validateSignUpData
}
