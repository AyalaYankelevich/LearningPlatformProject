const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register); // No authentication needed for registration
router.post('/login', login); // No authentication needed for login

module.exports = router;

