import './GifSearch.css';
import { useState, useEffect } from 'react';
import { searchGifs, getTrendingGifs } from './giphyService';

function GifSearch({ onGifSelect, selectedGifUrl }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [gifs, setGifs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        loadTrendingGifs();
    }, []);

    const loadTrendingGifs = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await getTrendingGifs(8);
            setGifs(response.data || []);
        } catch (err) {
            setError('Failed to load trending GIFs');
            console.error('Error loading trending GIFs:', err);
        }
        setLoading(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSearch();
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            loadTrendingGifs();
            setHasSearched(false);
            return;
        }

        setLoading(true);
        setError('');
        setHasSearched(true);
        try {
            const response = await searchGifs(searchQuery.trim(), 8);
            setGifs(response.data || []);
            if (response.data.length === 0) {
                setError('No GIFs found for your search');
            }
        } catch (err) {
            setError('Failed to search GIFs');
            console.error('Error searching GIFs:', err);
        }
        setLoading(false);
    };

    const handleSearchClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSearch();
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setHasSearched(false);
        loadTrendingGifs();
    };

    const handleGifClick = (gif) => {
        const gifUrl = gif.images.original.url;
        onGifSelect(gifUrl);
    };

    return (
        <div className="gif-search">
            <div className="gif-search-header">
                <form onSubmit={handleFormSubmit} className="gif-search-form">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for GIFs..."
                        className="gif-search-input"
                    />
                    <button type="button" onClick={handleSearchClick} className="gif-search-button">
                        Search
                    </button>
                    {hasSearched && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className="gif-clear-button"
                        >
                            Show Trending
                        </button>
                    )}
                </form>
            </div>

            {selectedGifUrl && (
                <div className="selected-gif-preview">
                    <h4>Selected GIF:</h4>
                    <img
                        src={selectedGifUrl}
                        alt="Selected GIF"
                        className="selected-gif-image"
                    />
                </div>
            )}

            <div className="gif-results">
                {loading ? (
                    <div className="gif-loading">
                        <p>Loading GIFs...</p>
                    </div>
                ) : error ? (
                    <div className="gif-error">
                        <p>{error}</p>
                        <button onClick={loadTrendingGifs} className="retry-button">
                            Load Trending GIFs
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="gif-results-header">
                            <h4>
                                {hasSearched
                                    ? `Search Results for "${searchQuery}"`
                                    : 'Trending GIFs'
                                }
                            </h4>
                        </div>
                        <div className="gif-grid">
                            {gifs.map((gif) => (
                                <div
                                    key={gif.id}
                                    className={`gif-item ${selectedGifUrl === gif.images.original.url ? 'selected' : ''}`}
                                    onClick={() => handleGifClick(gif)}
                                >
                                    <img
                                        src={gif.images.fixed_height_small.url}
                                        alt={gif.title || 'GIF'}
                                        className="gif-thumbnail"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                        {gifs.length === 0 && !loading && (
                            <div className="no-gifs">
                                <p>No GIFs available</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default GifSearch;
