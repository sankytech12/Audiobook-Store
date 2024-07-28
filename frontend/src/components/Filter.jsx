import React from 'react';

const genres = [
    "Motivation", "Comedy", "Drama", "Horror", "Mystery", "Romance",
    "Science Fiction", "Self Help", "Thriller", "True Crime", "Young Adult",
    "Biography", "Business", "Cookbooks", "Fantasy", "History", "Religion",
    "Science", "Sports", "Travel"
];

const Filter = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="filter-container">
            <select name="genre" value={filters.genre} onChange={handleChange}>
                <option value="">Filter by genre</option>
                {genres.map((genre, index) => (
                    <option key={index} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
