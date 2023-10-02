const db = require('../configs/db');
const { generatePassword, generateSalt, validatePassword, generateToken } = require('../utils/index')

class UserModel {

    async createUser(name, email, password) {
        const d = new Date();
        const time = `${d.getHours()}:${d.getMinutes()}`
        const timeStamp = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${time}`;

        let salt = await generateSalt();
        let hashedPassword = await generatePassword(password, salt);

        const sql = `INSERT INTO users(name,email,password,salt,created_at) VALUES('${name}','${email}','${hashedPassword}','${salt}','${timeStamp}')`

        let [newUser] = await db.execute(sql);

        return newUser.insertId
    }

    async findUserById(id) {
        const sql = `SELECT * FROM users WHERE id = '${id}'`;

        let [[existingUser]] = await db.execute(sql);

        if (existingUser) {
            return existingUser
        }
        return
    }

    async findUserByEmail(email, password) {
        const sql = `SELECT * FROM users WHERE email = '${email}'`;

        let [[existingUser]] = await db.execute(sql);

        if (existingUser) {
            const isValidPassword = await validatePassword(password, existingUser.password, existingUser.salt);
            if (isValidPassword) {
                const token = await generateToken({ email: existingUser.email, id: existingUser.id })
                return { username: existingUser.name, token }
            }

            return
        }
        return
    }

}

module.exports = UserModel;