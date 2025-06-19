const User = require('../models/user');

exports.userExists = async (id) => {
    return await User.findOne({ id: id });
};

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

exports.getAllUsers = async () => {
    return await User.find();
};

exports.getUserById = async (userId) => {
    return await User.findOne({ id: userId });
};

exports.updateUserById = async (userId, updateData) => {
    updateData.updatedAt = Date.now();
    return await User.findOneAndUpdate({ id: userId }, updateData, { new: true });
};

exports.deleteUserById = async (userId) => {
    return await User.findOneAndDelete({ id: userId });
};
    
// return await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
