const userService = require('../services/userService');
const bcrypt = require('bcrypt');

// Create user
exports.createUser = async (req, res) => {
    try {
        const existingUser = await userService.userExists(req.body.id);
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        // Hash the password before creating the user
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUserData = { 
            ...req.body, 
            password: hashedPassword,
        };

        const user = await userService.createUser(newUserData);
        const response = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        res.status(201).send(response);
    } catch (error) {
        if (error.message === 'User with this ID already exists') {
            return res.status(400).send({ message: error.message });
        }
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        const response = users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const response = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userService.updateUserById(userId, req.body);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const response = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

// Delete a user by custom ID
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userService.deleteUserById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};



