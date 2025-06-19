// const questionsAndResponsesService = require('../services/arrayService');

// const arrayController = {

//     async createQuestionsAndResponses(req, res) {
//         try {
//             const questionsAndResponses = await questionsAndResponsesService.createQuestionsAndResponses(req.user.id, req.body);
//             res.status(201).json(questionsAndResponses);
//         } catch (error) {
//             res.status(400).json({ message: error.message });
//         }
//     },

//     async getQuestionsAndResponses(req, res) {
//         try {
//             const questionsAndResponses = await questionsAndResponsesService.getQuestionsAndResponses(req.user.id);
//             res.json(questionsAndResponses);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     },

//     async updateQuestionsAndResponses(req, res) {
//         try {
//             const questionsAndResponses = await questionsAndResponsesService.updateQuestionsAndResponses(req.user.id, req.params.entryId, req.body);
//             res.json(questionsAndResponses);
//         } catch (error) {
//             res.status(400).json({ message: error.message });
//         }
//     },

//     async deleteQuestionsAndResponses(req, res) {
//         try {
//             await questionsAndResponsesService.deleteQuestionsAndResponses(req.user.id, req.params.entryId);
//             res.status(204).send();
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }
// };

// module.exports = arrayController;
