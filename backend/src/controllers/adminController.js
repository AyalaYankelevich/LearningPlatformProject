const adminService = require('../services/adminService');
const authService = require('../services/authService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.createAdmin = async (req, res) => {
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

        // Create the new admin
        const newAdmin = await authService.createAdmin({
            firstName,
            lastName,
            id,
            email,
            password: hashedPassword,
            role: 'admin'
        });

        // Optionally, generate a JWT token for the new admin
        const token = jwt.sign({ id: newAdmin.id, email: newAdmin.email, role: newAdmin.role }, config.jwtSecret, {
            expiresIn: config.jwtExpiration,
        });

        res.status(201).send({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await adminService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

exports.getUserPrompts = async (req, res) => {
    const userId = req.params.id;
    try {
        const prompts = await adminService.getUserPrompts(userId);
        res.status(200).json(prompts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving prompts', error });
    }
};



