const cardService = require('../services/cardService');

class CardController {

    // GET /api/cards
    async getAllCards(req, res, next) {
        try {
            const { boardId } = req.query;
            const cards = await cardService.getAllCards(boardId);

            res.json(cards);
        } catch (error) {
            next(error);
        }
    }

    // GET /api/cards/:id
    async getCardById(req, res, next) {
        try {
            const { id } = req.params;
            const card = await cardService.getCardById(id);

            if (!card) {
                return res.status(404).json({ message: 'Card not found' });
            }
            res.json(card);
        } catch (error) {
            next(error);
        }
    }

    // POST /api/cards
    async createCard(req, res, next) {
        try {
            const card = await cardService.createCard(req.body);

            res.status(201).json(card);
        } catch (error) {
            next(error);
        }
    }

    // PUT /api/cards/:id
    async updateCard(req, res, next) {
        try {
            const { id } = req.params;
            const card = await cardService.updateCard(id, req.body);

            if (!card) {
                return res.status(404).json({ message: 'Card not found' });
            }
            res.json(card);
        } catch (error) {
            next(error);
        }
    }

    // PUT /api/cards/:id/like
    async likeCard(req, res, next) {
        try {
            const { id } = req.params;
            const card = await cardService.likeCard(id);

            if (!card) {
                return res.status(404).json({ message: 'Card not found' });
            }
            res.json(card);
        } catch (error) {
            next(error);
        }
    }

    // PUT /api/cards/:id/pin
    async pinCard(req, res, next) {
        try {
            const { id } = req.params;
            const card = await cardService.pinCard(id);

            if (!card) {
                return res.status(404).json({ message: 'Card not found' });
            }
            res.json(card);
        } catch (error) {
            next(error);
        }
    }

    // DELETE /api/cards/:id
    async deleteCard(req, res, next) {
        try {
            const { id } = req.params;
            await cardService.deleteCard(id);

            res.json({ message: 'Card deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CardController();
