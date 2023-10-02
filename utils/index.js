const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { APP_SECRET_KEY } = process.env;

const generateSalt = async () => {
    return await bcrypt.genSalt()
};

const generatePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
}

const validatePassword = async (enteredPassword, actualPassword, salt) => {
    return await generatePassword(enteredPassword, salt) == actualPassword
}

const generateToken = async (payload) => {
    return await jwt.sign(payload, APP_SECRET_KEY, { expiresIn: '30d' })
}

module.exports = { generateSalt, generatePassword, validatePassword, generateToken }