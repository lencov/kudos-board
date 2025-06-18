const validCategories = require('../constants/validCategories');

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
            error: `Missing fields: ${missingFields.join(', ')}`
        });
    }

    if (!validCategories.includes(category)) {
        return res.status(400).json({
            error: `Invalid category: ${category}`,
            details: 'Must be one of: ' + validCategories.join(', ')
        });
    }

    try {
        new URL(imageURL);
    } catch {
        return res.status(400).json({
            error: `Invalid URL: ${imageURL}`
        });
    }
    next();
};

module.exports = { validateBoard };
