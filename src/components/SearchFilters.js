import React from 'react';

function SearchFilters( { onChange, onSubmit }) {

    return (
        <form onSubmit={onSubmit}>
            <input className="input"
                type="text"
                placeholder="Select movies..."
            />
            <input 
                className="input"
                type="text"
                placeholder="Select character name..."
                onChange={onChange}
            />
            <input className="submit"
                type="submit"
                value="search"
            />
      </form>
    )
}

export default SearchFilters;
