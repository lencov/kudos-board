import './CategoryFilter.css';
import { BOARD_CATEGORIES } from './constants';

function CategoryFilter({ selectedCategories, onChange }) {
    const categoryOptions = [
        { value: BOARD_CATEGORIES.ALL, label: 'All' },
        { value: BOARD_CATEGORIES.RECENT, label: 'Recent' },
        { value: BOARD_CATEGORIES.CELEBRATION, label: 'Celebration' },
        { value: BOARD_CATEGORIES.THANK_YOU, label: 'Thank You' },
        { value: BOARD_CATEGORIES.INSPIRATION, label: 'Inspiration' }
    ];

    const handleCategoryChange = (categoryValue) => {
        let newSelectedCategories;

        if (categoryValue === BOARD_CATEGORIES.ALL) {
            newSelectedCategories = [BOARD_CATEGORIES.ALL];
        } else {
            const categoriesWithoutAll = selectedCategories.filter(cat => cat !== BOARD_CATEGORIES.ALL);

            if (selectedCategories.includes(categoryValue)) {
                newSelectedCategories = categoriesWithoutAll.filter(cat => cat !== categoryValue);

                if (newSelectedCategories.length === 0) {
                    newSelectedCategories = [BOARD_CATEGORIES.ALL];
                }
            } else {
                newSelectedCategories = [...categoriesWithoutAll, categoryValue];
            }
        }

        onChange(newSelectedCategories);
    };

    return (
        <div className="category-filter">
            <h3>Filter by Category:</h3>
            <div className="category-options">
                {categoryOptions.map(option => (
                    <label key={option.value} className="category-option">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(option.value)}
                            onChange={() => handleCategoryChange(option.value)}
                        />
                        <span className="category-label">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;
