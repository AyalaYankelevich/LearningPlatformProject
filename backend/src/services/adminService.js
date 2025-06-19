const User = require('../models/userModel');
const Prompt = require('../models/promptModel');

exports.getAllUsers = async () => {
    return await User.find();
};

exports.getUserPrompts = async (userId) => {
    return await Prompt.find({ user_id: userId }).populate('category_id sub_category_id');
};
