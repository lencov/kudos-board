import './BoardDetail.css';
import { useState, useEffect } from 'react';
import { getCardsByBoardId } from './kudosBoardService';
import { fallbackImage } from './constants';

function BoardDetail({ board, onBack }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateCardForm, setShowCreateCardForm] = useState(false);

    useEffect(() => {
        const fetchCards = async () => {
            if (board?.id) {
                setLoading(true);
                try {
                    const cardResults = await getCardsByBoardId(board.id);
                    setCards(cardResults || []);
                } catch (error) {
                    console.error('Failed to fetch cards:', error);
                    setCards([]);
                }
                setLoading(false);
            }
        };

        fetchCards();
    }, [board?.id]);

    const handleCreateCard = () => {
        setShowCreateCardForm(true);
    };

    const handleCardCreated = (newCard) => {
        setCards(prevCards => [newCard, ...prevCards]);
        setShowCreateCardForm(false);
    };

    const handleCardDeleted = (deletedCardId) => {
        setCards(prevCards => prevCards.filter(card => card.id !== deletedCardId));
    };

    if (!board) {
        return <div>Board not found</div>;
    }

    return (
        <div className="BoardDetail">
            <div className="BoardDetail-header">
                <button onClick={onBack} className="back-button">
                    ← Back to Boards
                </button>

                <div className="board-info">
                    <img
                        src={board.imageURL}
                        alt={board.title}
                        className="board-image"
                        onError={(e) => {
                            e.target.src = fallbackImage;
                        }}
                    />
                    <div className="board-details">
                        <h1>{board.title}</h1>
                        <p className="board-description">{board.description}</p>
                        <div className="board-meta">
                            <span className="board-category">{board.category}</span>
                            {board.author && <span className="board-author">By: {board.author}</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="cards-section">
                <div className="cards-header">
                    <h2>Cards ({cards.length})</h2>
                    <button onClick={handleCreateCard} className="create-card-button">
                        Add New Card
                    </button>
                </div>

                {loading ? (
                    <div className="loading">Loading cards...</div>
                ) : (
                    <>
                        {cards.length === 0 ? (
                            <div className="no-cards">
                                <h3>No cards yet</h3>
                                <p>Add a card to the board</p>
                            </div>
                        ) : (
                            <div className="cards-grid">
                                {cards.map(card => (
                                    <div key={card.id} className="card-item">
                                        <div className="card-content">
                                            <h3>{card.title}</h3>
                                            <p>{card.description}</p>
                                            {card.gifURL && (
                                                <img
                                                    src={card.gifURL}
                                                    alt="Card GIF"
                                                    className="card-gif"
                                                />
                                            )}
                                            {card.author && (
                                                <p className="card-author">- {card.author}</p>
                                            )}
                                        </div>
                                        <div className="card-actions">
                                            <button className="upvote-button">
                                                👍 {card.upvotes || 0}
                                            </button>
                                            {card.isPinned && (
                                                <span className="pinned-indicator">📌</span>
                                            )}
                                            <button className="delete-card-button">
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* TODO: Add CreateCardForm component */}
            {showCreateCardForm && (
                <div className="create-card-modal">
                    <div>Create Card Form Placeholder</div>
                    <button onClick={() => setShowCreateCardForm(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default BoardDetail;
