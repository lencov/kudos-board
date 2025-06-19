const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const { validateCard } = require('../middleware/validators');

// GET /api/cards - Get all cards (optionally filtered by boardId)
router.get('/', cardController.getAllCards);

// GET /api/cards/:id - Get card by id
router.get('/:id', cardController.getCardById);

// POST /api/cards - Create new card
router.post('/', validateCard, cardController.createCard);

// PUT /api/cards/:id - Update card
router.put('/:id', validateCard, cardController.updateCard);

// PUT /api/cards/:id/like - increment like count of the card
router.put('/:id/like', cardController.likeCard);

// PUT /api/cards/:id/pin - Toggle pin status of a card
router.put('/:id/pin', cardController.pinCard);

// DELETE /api/cards/:id - Delete card
router.delete('/:id', cardController.deleteCard);

module.exports = router;
