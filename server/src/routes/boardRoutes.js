const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const { validateBoard } = require('../middleware/validators');

// GET /api/boards - Get all boards
router.get('/', boardController.getBoards);

// GET /api/boards/:id - Get board by id
router.get('/:id', boardController.getBoardById);

// POST /api/boards - Create new board
router.post('/', validateBoard, boardController.createBoard);

// DELETE /api/boards/:id - Delete board
router.delete('/:id', boardController.deleteBoard);

module.exports = router;
