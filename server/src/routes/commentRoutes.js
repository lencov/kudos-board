const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { validateComment } = require('../middleware/validators');

// GET /api/comments - Get all comments (optionally filtered by cardId)
router.get('/', commentController.getAllComments);

// GET /api/comments/:id - Get comment by id
router.get('/:id', commentController.getCommentById);

// POST /api/comments - Create new comment
router.post('/', validateComment, commentController.createComment);

// PUT /api/comments/:id - Update comment
router.put('/:id', validateComment, commentController.updateComment);

// DELETE /api/comments/:id - Delete comment
router.delete('/:id', commentController.deleteComment);

module.exports = router;
