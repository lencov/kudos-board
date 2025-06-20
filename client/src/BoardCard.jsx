import './BoardCard.css';
import { fallbackImage } from './constants';

function BoardCard({
    board,
    onClick,
    onDelete
}) {
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(board.id);
    };

    return (
        <div className='BoardCard' onClick={() => onClick(board)}>
            <img
                className='BoardCard-img'
                src={board.imageURL}
                alt={board.title}
                onError={(e) => {
                    e.target.src = fallbackImage;
                }}
            />
            <div className='BoardCard-content'>
                <h3 className='BoardTitle'>{board.title}</h3>
                <p className='BoardDescription'>{board.description}</p>
                <div className='BoardCard-footer'>
                    <span className='BoardCategory' data-category={board.category}>{board.category}</span>
                    {board.author && <span className='BoardAuthor'>By: {board.author}</span>}
                </div>
            </div>
            <div className='BoardCard-actions'>
                <button
                    className='delete-button'
                    onClick={handleDeleteClick}
                    title="Delete board"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}

export default BoardCard;
