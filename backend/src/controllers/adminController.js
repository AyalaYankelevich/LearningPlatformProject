const adminService = require('../services/adminService');

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
