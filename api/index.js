const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { corsMiddleware } = require('./middleware/corsMiddleware');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(corsMiddleware);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
    
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

// Default route for undefined endpoints
// Default route for undefined endpoints
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

module.exports = app;

