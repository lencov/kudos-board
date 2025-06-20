import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './SearchBar'
import CategoryFilter from './CategoryFilter'
import BoardList from './BoardList'
import BoardDetail from './BoardDetail'
import { getAllBoards, getBoardsByCategory, searchBoards, deleteBoard } from './kudosBoardService'
import { BOARD_CATEGORIES, VIEW_TYPES } from './constants'

const App = () => {
    const [boards, setBoards] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([BOARD_CATEGORIES.ALL]);
    const [currentView, setCurrentView] = useState(VIEW_TYPES.HOME);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBoards = async () => {
            setLoading(true);
            let boardResults = [];

            if (searchQuery.trim()) {
                const categories = selectedCategories.includes(BOARD_CATEGORIES.ALL)
                    ? null
                    : selectedCategories;
                boardResults = await searchBoards(searchQuery, categories);
            } else if (selectedCategories.includes(BOARD_CATEGORIES.ALL)) {
                boardResults = await getAllBoards();
            } else {
                boardResults = await getBoardsByCategory(selectedCategories);
            }

            setBoards(boardResults || []);
            setLoading(false);
        };

        fetchBoards();
    }, [searchQuery, selectedCategories]);

    const handleSearchSubmit = (query) => {
        setSearchQuery(query);
        setCurrentView(VIEW_TYPES.HOME);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const handleCategoryChange = (categories) => {
        setSelectedCategories(categories);
        setCurrentView(VIEW_TYPES.HOME);
    };

    const handleBoardClick = (board) => {
        setSelectedBoard(board);
        setCurrentView(VIEW_TYPES.BOARD_DETAILS);
    };

    const handleBackToHome = () => {
        setSelectedBoard(null);
        setCurrentView(VIEW_TYPES.HOME);
    };

    const handleCreateBoard = () => {
        setShowCreateBoardModal(true);
    };

    const handleBoardCreated = (newBoard) => {
        setBoards(prevBoards => [newBoard, ...prevBoards]);
        setShowCreateBoardModal(false);
    };

    const handleBoardDeleted = async (deletedBoardId) => {
        try {
            await deleteBoard(deletedBoardId);
            setBoards(prevBoards => prevBoards.filter(board => board.id !== deletedBoardId));
        } catch (error) {
            console.error('Failed to delete board:', error);
            // TODO: Add proper error handling/notification
        }
    };

    return (
        <div className="App">
            <header>
                <h1>Kudos Board</h1>
                {currentView === VIEW_TYPES.HOME && (
                    <>
                        <SearchBar onSubmit={handleSearchSubmit} onClear={handleClearSearch} />
                        <CategoryFilter
                            selectedCategories={selectedCategories}
                            onChange={handleCategoryChange}
                        />
                        <button onClick={handleCreateBoard}>Create New Board</button>
                    </>
                )}
            </header>

            <main>
                {currentView === VIEW_TYPES.HOME && (
                    <>
                        {loading ? (
                            <div>Loading boards...</div>
                        ) : (
                            <BoardList
                                boards={boards}
                                onBoardClick={handleBoardClick}
                                onBoardDelete={handleBoardDeleted}
                            />
                        )}
                    </>
                )}

                {currentView === VIEW_TYPES.BOARD_DETAILS && selectedBoard && (
                    <BoardDetail
                        board={selectedBoard}
                        onBack={handleBackToHome}
                    />
                )}

                {/* TODO: Add CreateBoardModal component */}
                {showCreateBoardModal && (
                    <div>Create Board Modal Placeholder</div>
                )}
            </main>

            <footer>
                <p>&copy; 2024 Kudos Board</p>
            </footer>
        </div>
    );
};

export default App;
