const User = require('../models/user');
const Prompt = require('../models/prompt');

exports.createAdmin = async ({ firstName, lastName, id, email, password, role }) => {
    const newUser = new User({ firstName, lastName, id, email, password, role });
    return await newUser.save();
};

exports.getAllUsers = async () => {
    return await User.find();
};

exports.getUserPrompts = async (userId) => {
    return await Prompt.find({ user_id: userId }).populate('category_id sub_category_id');
};
