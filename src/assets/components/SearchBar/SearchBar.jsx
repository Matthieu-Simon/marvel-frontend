import { useState } from 'react';

import './SearchBar.css';

// eslint-disable-next-line react/prop-types
export default function SearchBar ({ onSearch }) {
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="searchbar-personnage">
            <input 
                type="text" 
                placeholder="Titre ou nom du héros"
                value={search}
                onChange={handleChange}
            />
        </div>
    )
}