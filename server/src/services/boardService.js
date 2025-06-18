const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class BoardService {

    // get all boards with optional category filter
    async getAllBoards(category) {
        const filter = this.buildCategoryFilter(category)

        const boards = await prisma.board.findMany({
            where: filter,
            include: {
                cards: true
            },
            orderBy: { createdAt: 'desc' }
        })

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
                        { createdAt: 'desc' }
                    ]
                },
            }
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
            author: boardData.author || null
          },
          include: { cards: true }
        });

        return board;
    }

    async deleteBoard(id) {
        const deletedBoard = await prisma.board.delete({
          where: { id }
        });

        return deletedBoard;
    }

    buildCategoryFilter(category) {
        // TODO: add filter for recent boards
        if (category !== 'all'){
            return { category: category }
        }else{
            return {}
        }
    }
}

module.exports = BoardService;
