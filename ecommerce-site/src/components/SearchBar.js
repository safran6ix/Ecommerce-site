import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/shop?search=${searchTerm}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
                <MagnifyingGlassIcon />
            </button>
        </form>
    );
};

export default SearchBar;