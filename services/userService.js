const UserModel = require('../models/index');
const { generateToken } = require('../utils/index')

class UserService {

    constructor() {
        this.user = new UserModel();
    }

    async signUp(userInput) {
        const { name, email, password } = userInput;
        const userId = await this.user.createUser(name, email, password);
        const userObject = await this.user.findUserById(userId);

        const token = await generateToken({ email: userObject.email, id: userObject.id });

        return { username: userObject.name, token }
    }

    async login(email, password) {
        return this.user.findUserByEmail(email, password);

    }
}

module.exports = UserService;