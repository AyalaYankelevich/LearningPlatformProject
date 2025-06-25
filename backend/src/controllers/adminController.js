const adminService = require('../services/adminService');
const authService = require('../services/authService');
const { getPromptsWithNamesByUserId } = require('../services/promptService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


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
        const newAdmin = await adminService.createAdmin({
            firstName,
            lastName,
            id,
            email,
            password: hashedPassword,
            role: 'admin'
        });

        // Generate a JWT token for the new admin
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

exports.getAllPrompts = async (req, res) => {
    try {
        const users = await adminService.getAllPrompts();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving prompts', error });
    }
};


exports.getPromptsByUser = async (req, res) => {
    try {
        const userId = req.params.id
        console.log('getPromptsByUser called with id:', req.params.id);
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const promptsWithNames = await getPromptsWithNamesByUserId(userId);
        res.status(200).json(promptsWithNames);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user prompts' });
    }
};





