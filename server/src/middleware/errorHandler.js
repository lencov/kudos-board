const errorHandler = (err, req, res, next) => {
    console.error('Error: ', {
        message: err.message,
        url: req.url,
        method: req.method,
    });

    // Handle Prisma error codes
    if (err.code) {
        switch (err.code) {
        case 'P2025':
            return res.status(404).json({
                error: 'Resource not found',
                details: 'The requested board does not exist',
            });
        case 'P2002':
            return res.status(409).json({
                error: 'Resource already exists',
                details: 'A board with this title already exists',
            });
        default:
            return res.status(500).json({
                error: 'Database error',
                details: 'An unexpected database error occurred',
            });
        }
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Invalid request',
            details: err.message,
        });
    }

    res.status(500).json({
        error: 'Internal server error',
        details: 'unexpected error occurred',
    });

};

module.exports = errorHandler;
