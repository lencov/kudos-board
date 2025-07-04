const express = require('express');
const cors = require('cors');
require('dotenv').config();

const errorHandler = require('./middleware/errorHandler');

const boardRoutes = require('./routes/boardRoutes');
const cardRoutes = require('./routes/cardRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_, res) => {
    res.json({ status: 'OK', message: 'Kudos Board API running' });
});

app.use('/api/boards', boardRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/comments', commentRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
