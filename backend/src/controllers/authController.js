const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const authService = require('../services/authService');
const userService = require('../services/userService');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authService.userExists(email);
        if (!user) {
            return res.status(404).send({ message: 'User does not exist' });
        }

        const isMatch = await authService.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Incorrect email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, config.jwtSecret, {
            expiresIn: config.jwtExpiration,
        });

        // Send back the token and the user's role
        res.status(200).send({ token, role: user.role });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
};


exports.register = async (req, res) => {
    const { firstName, lastName, id, email, password } = req.body;

    try {
        // Check if the user already exists by id
        const existingUserById = await authService.userExistsById(id);
        if (existingUserById) {
            return res.status(400).send({ message: 'User with this ID already exists' });
        }

        // Check if the user already exists
        const existingUser = await authService.userExists(email);
        if (existingUser) {
            return res.status(400).send({ message: 'User with this email already exists' });
        }

        // Hash the password before creating the user
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user data
        const newUserData = {
            firstName,
            lastName,
            id,
            email,
            password: hashedPassword
        };

        // Create the new user
        const newUser = await userService.createUser(newUserData);

        // Generate a JWT token for the new user
        const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, config.jwtSecret, {
            expiresIn: config.jwtExpiration,
        });

        res.status(201).send({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
};
