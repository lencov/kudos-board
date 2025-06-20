import './BoardList.css';
import BoardCard from './BoardCard';

function BoardList({ boards, onBoardClick, onBoardDelete }) {
    if (!boards || boards.length === 0) {
        return (
            <div className="BoardList-empty">
                <h3>No boards found</h3>
                <p>Create your first board to get started</p>
            </div>
        );
    }

    return (
        <div className="BoardList">
            <div className="BoardList-header">
                <h2>Boards ({boards.length})</h2>
            </div>
            <div className="BoardList-grid">
                {boards.map(board => (
                    <BoardCard
                        key={board.id}
                        board={board}
                        onClick={onBoardClick}
                        onDelete={onBoardDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default BoardList;
