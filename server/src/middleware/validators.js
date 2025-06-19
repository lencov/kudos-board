const { validCategories } = require('../../constants');

const validateBoard = (req, res, next) => {
    const { title, description, category, imageURL } = req.body;

    const missingFields = [];
    if (!title) {
        missingFields.push('title');
    }
    if (!description) {
        missingFields.push('description');
    }
    if (!category) {
        missingFields.push('category');
    }
    if (!imageURL) {
        missingFields.push('imageURL');
    }

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: `Missing fields: ${missingFields.join(', ')}`,
        });
    }

    if (!validCategories.includes(category)) {
        return res.status(400).json({
            error: `Invalid category: ${category}`,
            details: 'Must be one of: ' + validCategories.join(', '),
        });
    }

    try {
        new URL(imageURL);
    } catch {
        return res.status(400).json({
            error: `Invalid URL: ${imageURL}`,
        });
    }
    next();
};

const validateCard = (req, res, next) => {
    const { title, description, gifURL, boardId } = req.body;

    const missingFields = [];
    if (!title) {
        missingFields.push('title');
    }
    if (!description) {
        missingFields.push('description');
    }
    if (!gifURL) {
        missingFields.push('gifURL');
    }
    if (!boardId) {
        missingFields.push('boardId');
    }

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: `Missing fields: ${missingFields.join(', ')}`,
        });
    }

    try {
        new URL(gifURL);
    } catch {
        return res.status(400).json({
            error: `Invalid URL: ${gifURL}`,
        });
    }

    next();
};

const validateComment = (req, res, next) => {
    const { message, cardId } = req.body;

    const missingFields = [];
    if (!message) {
        missingFields.push('message');
    }
    if (!cardId) {
        missingFields.push('cardId');
    }

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: `Missing fields: ${missingFields.join(', ')}`,
        });
    }

    if (message.trim().length === 0) {
        return res.status(400).json({
            error: 'Message cannot be empty',
        });
    }

    if (message.length > 1000) {
        return res.status(400).json({
            error: 'Message cannot exceed 1000 characters',
        });
    }

    next();
};

module.exports = { validateBoard, validateCard, validateComment };
