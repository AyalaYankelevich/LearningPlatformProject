const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/index');
const connectToDatabase = require('./config/db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authenticateJWT = require('./middleware/authMiddleware');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase();

// Protect routes with JWT authentication
app.use('/api/protected', authenticateJWT, (req, res) => {
    res.send('This is a protected route');
});

app.use('/api', routes);

const PORT = process.env.PORT || 5059;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
