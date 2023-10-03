const UserService = require('../services/userService');

const service = new UserService();

module.exports = async (app) => {

    // Sign up route POST
    app.post('/signup', async (req, res, next) => {
        const { email, name, password } = req.body;
        const { username, token } = await service.signUp({ email, name, password });
        res.status(201).json({
            message: `User ${name.toUpperCase()} has been created`,
            data: {
                User: username,
                token
            }
        })
    });

    // Login route POST
    app.post('/login', async (req, res, next) => {
        const { email, password } = req.body;

        const validUser = await service.login(email, password);

        if (validUser) {
            res.status(200).json({
                message: `${validUser.username} has logged in`, data: {
                    User: validUser.username,
                    token: validUser.token
                }
            })
        }
        else {
            res.status(404).json({ message: 'Something went wrong' })
        }

    })
}