const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

class CardService {

    // get all cards with optional boardId filter
    async getAllCards(boardId) {
        const filter = this.buildBoardFilter(boardId);

        const cards = await prisma.card.findMany({
            where: filter,
            include: {
                board: true,
                comments: true,
            },
            orderBy: [
                { isPinned: 'desc' },
                { pinnedAt: 'desc' },
                { createdAt: 'desc' },
            ],
        });

        return cards;
    }

    async getCardById(id) {
        const card = await prisma.card.findUnique({
            where: { id: id },
            include: {
                board: true,
                comments: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });

        return card;
    }

    async createCard(cardData) {
        const card = await prisma.card.create({
            data: {
                title: cardData.title,
                description: cardData.description,
                gifURL: cardData.gifURL,
                owner: cardData.owner || null,
                boardId: cardData.boardId,
            },
            include: {
                board: true,
                comments: true,
            },
        });

        return card;
    }

    async updateCard(id, cardData) {
        const card = await prisma.card.update({
            where: { id },
            data: {
                title: cardData.title,
                description: cardData.description,
                gifURL: cardData.gifURL,
                owner: cardData.owner,
                isPinned: cardData.isPinned,
                pinnedAt: cardData.isPinned ? new Date() : null,
            },
            include: {
                board: true,
                comments: true,
            },
        });

        return card;
    }

    async likeCard(id) {
        const card = await prisma.card.update({
            where: { id },
            data: {
                likeCount: {
                    increment: 1,
                },
            },
            include: {
                board: true,
                comments: true,
            },
        });

        return card;
    }

    async pinCard(id) {
        const currentCard = await prisma.card.findUnique({
            where: { id },
        });

        if (!currentCard) {
            return null;
        }

        const card = await prisma.card.update({
            where: { id },
            data: {
                isPinned: !currentCard.isPinned,
                pinnedAt: !currentCard.isPinned ? new Date() : null,
            },
            include: {
                board: true,
                comments: true,
            },
        });

        return card;
    }

    async deleteCard(id) {
        const deletedCard = await prisma.card.delete({
            where: { id },
        });

        return deletedCard;
    }

    buildBoardFilter(boardId) {
        if (boardId) {
            return { boardId: boardId };
        } else {
            return {};
        }
    }
}

module.exports = new CardService();
