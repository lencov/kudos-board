const boardService = require('../services/boardService');

class BoardController {

    // GET /api/boards
    async getAllBoards(req, res, next) {
        try {
            const { category } = req.query;
            const boards = await boardService.getAllBoards(category);

            res.json(boards);
        } catch (error) {
            next(error); // passes error to error handle in middleware
        }
    }

    // GET /api/boards/:id
    async getBoardById(req, res, next) {
        try {
            const { id } = req.params;
            const board = await boardService.getBoardById(id);

            if (!board) {
                return res.status(404).json({ message: 'Board not found' });
            }
            res.json(board);
        } catch (error) {
            next(error);
        }
    }

    // POST /api/boards
    async createBoard(req, res, next) {
        try {
            const board = await boardService.createBoard(req.body);

            res.status(201).json(board);
        } catch (error) {
            next(error);
        }
    }

    // DELETE /api/boards/:id
    async deleteBoard(req, res, next) {
        try {
            const { id } = req.params;
            await boardService.deleteBoard(id);

            res.json({ message: 'Board deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BoardController();
