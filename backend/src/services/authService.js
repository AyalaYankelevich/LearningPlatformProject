const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.userExistsById = async (id) => {
    return await User.findOne({ id: id });
};

exports.userExists = async (email) => {
    return await User.findOne({ email: email });
};

exports.comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

