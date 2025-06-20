const { PrismaClient } = require('../generated/prisma');
const { recentLimit } = require('../../constants');
const prisma = new PrismaClient();

class BoardService {

    async getBoards(categories, search) {
        const { filter, limit } = this.buildFilter(categories, search);

        const boards = await prisma.board.findMany({
            where: filter,
            include: {
                cards: true,
            },
            orderBy: { createdAt: 'desc' },
            ...(limit && { take: limit }),
        });

        return boards;
    }

    async getBoardById(id) {
        const board = await prisma.board.findUnique({
            where: { id: id },
            include: {
                cards: {
                    include: { comments: true },
                    orderBy: [
                        { isPinned: 'desc' },
                        { pinnedAt: 'desc' },
                        { createdAt: 'desc' },
                    ],
                },
            },
        });

        return board;
    }

    async createBoard(boardData) {
        const board = await prisma.board.create({
            data: {
                title: boardData.title,
                description: boardData.description,
                category: boardData.category,
                imageURL: boardData.imageURL,
                author: boardData.author || null,
            },
            include: { cards: true },
        });

        return board;
    }

    async deleteBoard(id) {
        const deletedBoard = await prisma.board.delete({
            where: { id },
        });

        return deletedBoard;
    }

    buildFilter(categories, search) {
        const filter = {};
        let isRecent = false;
        let limit = null;

        if (categories) {
            const categoryArray = categories.split(',').map(cat => cat.trim());

            isRecent = categoryArray.includes('recent');

            const validCategories = categoryArray.filter(cat =>
                cat !== 'all' && cat !== 'recent'
            );

            if (validCategories.length > 0) {
                if (validCategories.length === 1) {
                    filter.category = validCategories[0];
                } else {
                    filter.category = { in: validCategories };
                }
            }

            if (isRecent) {
                limit = recentLimit;
            }
        }

        if (search && search.trim()) {
            filter.title = {
                contains: search.trim(),
                mode: 'insensitive'
            };
        }

        return { filter, limit };
    }
}

module.exports = new BoardService();
