const User = require('../models/user');
const Prompt = require('../models/prompt');

exports.createAdmin = async ({ firstName, lastName, id, email, password, role }) => {
    const newUser = new User({ firstName, lastName, id, email, password, role });
    return await newUser.save();
};

exports.getAllUsers = async () => {
    return await User.find();
};

exports.getAllPrompts = async () => {
    return await Prompt.find();
};


exports.getUserPrompts = async (userId) => {
    return await Prompt.find({ user_id: userId }).populate('category_id sub_category_id');
};

exports.getFilteredPromptsService = async ({ userId, categoryId }) => {
  const filter = {};
  if (userId) filter.user_id = userId;
  if (categoryId) filter.category_id = categoryId;

  return Prompt.find(filter)
    .populate('user_id', 'name')
    .populate('category_id', 'name')
    .populate('sub_category_id', 'name');
}