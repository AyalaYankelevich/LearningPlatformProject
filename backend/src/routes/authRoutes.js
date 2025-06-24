const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// register to the system
router.post('/register', register);

// login to the system
router.post('/login', login);

module.exports = router;

