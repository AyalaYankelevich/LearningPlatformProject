// index.js
const express = require('express');
const authRoutes = require('./authRoutes'); // Import auth routes
const userRoutes = require('./userRoutes');
const topicRoutes = require('./topicRoutes');
const subTopicRoutes = require('./subTopicRoutes');
const gptRoute = require('./gptRoutes');
const recipeRoutes = require('./recipeRoutes');
const promptRoutes = require('./promptRoutes');

const router = express.Router();

// >>> ADD THIS SIMPLE TEST ENDPOINT <<<
router.get('/hello', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});

// Auth routes
router.use('/auth', authRoutes); // Use the auth routes under /auth

// Gpt route
router.use('/gpt', gptRoute);

// User routes
router.use('/users', userRoutes);

// Topic routes
router.use('/topics', topicRoutes);

// Sub_Topic routes
router.use('/sub_topics', subTopicRoutes);

// Recipe routes
router.use('/recipe', recipeRoutes);

// Prompt routes
router.use('/prompt', promptRoutes);

module.exports = router;
