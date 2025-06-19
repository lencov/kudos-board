const commentService = require('../services/commentService');

class CommentController {

    // GET /api/comments
    async getAllComments(req, res, next) {
        try {
            const { cardId } = req.query;
            const comments = await commentService.getAllComments(cardId);

            res.json(comments);
        } catch (error) {
            next(error);
        }
    }

    // GET /api/comments/:id
    async getCommentById(req, res, next) {
        try {
            const { id } = req.params;
            const comment = await commentService.getCommentById(id);

            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.json(comment);
        } catch (error) {
            next(error);
        }
    }

    // POST /api/comments
    async createComment(req, res, next) {
        try {
            const comment = await commentService.createComment(req.body);

            res.status(201).json(comment);
        } catch (error) {
            next(error);
        }
    }

    // PUT /api/comments/:id
    async updateComment(req, res, next) {
        try {
            const { id } = req.params;
            const comment = await commentService.updateComment(id, req.body);

            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.json(comment);
        } catch (error) {
            next(error);
        }
    }

    // DELETE /api/comments/:id
    async deleteComment(req, res, next) {
        try {
            const { id } = req.params;
            await commentService.deleteComment(id);

            res.json({ message: 'Comment deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CommentController();
