import './CreateBoardModal.css';
import { useState } from 'react';
import { createBoard } from './kudosBoardService';
import { BOARD_CATEGORIES } from './constants';
import { fallbackImage } from './constants';

function CreateBoardModal({ onClose, onBoardCreated }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        author: '',
        imageURL: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const categoryOptions = [
        { value: BOARD_CATEGORIES.CELEBRATION, label: 'Celebration' },
        { value: BOARD_CATEGORIES.THANK_YOU, label: 'Thank You' },
        { value: BOARD_CATEGORIES.INSPIRATION, label: 'Inspiration' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }
        if (!formData.description.trim()) {
            setError('Description is required');
            return;
        }
        if (!formData.category) {
            setError('Category is required');
            return;
        }
        if (!formData.imageURL.trim()) {
            setError('Image URL is required');
            return;
        }

        setLoading(true);
        try {
            const newBoard = await createBoard({
                title: formData.title.trim(),
                description: formData.description.trim(),
                category: formData.category,
                author: formData.author.trim() || null,
                imageURL: formData.imageURL.trim()
            });
            onBoardCreated(newBoard);
        } catch (error) {
            console.error('Failed to create board:', error);
            setError('Failed to create board. Please try again.');
        }
        setLoading(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    ×
                </button>

                <h2>Create New Board</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="create-board-form">
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter board title"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter board description"
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category *</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categoryOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageURL">Image URL *</label>
                        <input
                            type="url"
                            id="imageURL"
                            name="imageURL"
                            value={formData.imageURL}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="author">Author (Optional)</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            placeholder="Your name"
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cancel-button"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Board'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateBoardModal;
