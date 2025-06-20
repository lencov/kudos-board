export const sortCards = (cards) => {
    return cards.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        if (a.isPinned && b.isPinned) {
            const aPinnedAt = new Date(a.pinnedAt || 0);
            const bPinnedAt = new Date(b.pinnedAt || 0);
            return bPinnedAt - aPinnedAt;
        }
        const aCreatedAt = new Date(a.createdAt || 0);
        const bCreatedAt = new Date(b.createdAt || 0);
        return bCreatedAt - aCreatedAt;
    });
};