import './CreateCardForm.css';
import { useState } from 'react';
import { createCard } from './kudosBoardService';
import GifSearch from './GifSearch';

function CreateCardForm({ boardId, onClose, onCardCreated }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        gifURL: '',
        author: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
        if (!formData.gifURL.trim()) {
            setError('GIF URL is required');
            return;
        }

        setLoading(true);
        try {
            const newCard = await createCard({
                title: formData.title.trim(),
                description: formData.description.trim(),
                gifURL: formData.gifURL.trim(),
                author: formData.author.trim() || null,
                boardId: boardId
            });
            onCardCreated(newCard);
        } catch (error) {
            console.error('Failed to create card:', error);
            setError('Failed to create card. Please try again.');
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

                <h2>Add New Card</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="create-card-form">
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter card title"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Message *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter your message"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Select a GIF *</label>
                        <GifSearch
                            onGifSelect={(gifUrl) => setFormData(prev => ({ ...prev, gifURL: gifUrl }))}
                            selectedGifUrl={formData.gifURL}
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
                            {loading ? 'Creating...' : 'Add Card'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCardForm;
