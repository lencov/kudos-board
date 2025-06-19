const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

class CommentService {

    // get all comments with optional cardId filter
    async getAllComments(cardId) {
        const filter = this.buildCardFilter(cardId);

        const comments = await prisma.comment.findMany({
            where: filter,
            include: {
                card: {
                    include: {
                        board: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return comments;
    }

    async getCommentById(id) {
        const comment = await prisma.comment.findUnique({
            where: { id: id },
            include: {
                card: {
                    include: {
                        board: true,
                    },
                },
            },
        });

        return comment;
    }

    async createComment(commentData) {
        const comment = await prisma.comment.create({
            data: {
                message: commentData.message,
                author: commentData.author || null,
                cardId: commentData.cardId,
            },
            include: {
                card: {
                    include: {
                        board: true,
                    },
                },
            },
        });

        return comment;
    }

    async updateComment(id, commentData) {
        const comment = await prisma.comment.update({
            where: { id },
            data: {
                message: commentData.message,
                author: commentData.author,
            },
            include: {
                card: {
                    include: {
                        board: true,
                    },
                },
            },
        });

        return comment;
    }

    async deleteComment(id) {
        const deletedComment = await prisma.comment.delete({
            where: { id },
        });

        return deletedComment;
    }

    buildCardFilter(cardId) {
        if (cardId) {
            return { cardId: cardId };
        } else {
            return {};
        }
    }
}

module.exports = new CommentService();
