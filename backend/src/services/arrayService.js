// const User = require('../models/user'); // Import the User model

// const questionsAndResponsesService = {
//     async createQuestionsAndResponses(userId, data, index) {
//         const user = await User.findById(userId);
//         if (!user) throw new Error('User not found');

//         // Ensure the user can only have a maximum of 5 questionsAndResponses
//         if (user.questionsAndResponses.length >= 5) {
//             throw new Error('A maximum of 5 questionsAndResponses is allowed.');
//         }

//         // Insert data at the specified index
//         if (index < 0 || index > user.questionsAndResponses.length) {
//             throw new Error('Invalid index for questionsAndResponses.');
//         }

//         user.questionsAndResponses.splice(index, 0, data);
//         return await user.save();
//     },

//     async getQuestionsAndResponses(userId, index) {
//         const user = await User.findById(userId).populate('questionsAndResponses');
//         if (!user) throw new Error('User not found');

//         if (index < 0 || index >= user.questionsAndResponses.length) {
//             throw new Error('Invalid index for questionsAndResponses.');
//         }

//         return user.questionsAndResponses[index];
//     },

//     async updateQuestionsAndResponses(userId, index, updateData) {
//         const user = await User.findById(userId);
//         if (!user) throw new Error('User not found');

//         if (index < 0 || index >= user.questionsAndResponses.length) {
//             throw new Error('Invalid index for questionsAndResponses.');
//         }

//         const entry = user.questionsAndResponses[index];
//         Object.assign(entry, updateData);
//         return await user.save();
//     },

//     async deleteQuestionsAndResponses(userId, arrayIndex, entryIndex) {
//     const user = await User.findById(userId);
//     if (!user) throw new Error('User not found');

//     if (arrayIndex < 1 || arrayIndex > user.questionsAndResponses.length) {
//         throw new Error('Invalid question index for questionsAndResponses.');
//     }
//     const questionAndResponse = user.questionsAndResponses[arrayIndex - 1];

//     if (entryIndex < 1 || entryIndex >= questionAndResponse.entries.length) {
//         throw new Error('Invalid entry index to delete.');
//     }

//     if (entryIndex === 1) {
//         throw new Error('There must be an entry before the specified entry to delete.');
//     }
//     // Remove the specified entry and the entry before it
//     questionAndResponse.entries.splice(entryIndex - 2, 2);
//     return await user.save();
// }

// };

// module.exports = questionsAndResponsesService;
