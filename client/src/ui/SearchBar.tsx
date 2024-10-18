import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void; // Function to handle search
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder="Search..." }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        onSearch(value); // Trigger the search function on each keystroke
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="border-0 rounded text-slate-200 outline-none bg-slate-900 px-2 py-1 mb-2 w-full focus:border-yellow-200 text-sm"
            />
        </div>
    );
};

export default SearchBar;
