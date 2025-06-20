import './SearchBar.css';
import { useState } from 'react';

function SearchBar({ onSubmit, onClear }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(inputValue);
    };

    const handleClear = () => {
        setInputValue('');
        onClear();
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search boards by title..."
                className="search-input"
            />
            <button type="submit" className="search-button">
                Search
            </button>
            <button type="button" onClick={handleClear} className="clear-button">
                Clear
            </button>
        </form>
    );
}

export default SearchBar;
