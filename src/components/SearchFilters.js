import React from 'react';

function SearchFilters( { onChangeName, onChangeMovies, onSubmit }) {

    return (
        <form onSubmit={onSubmit}>
            <input className="input"
                type="text"
                placeholder="Select movies..."
                onChange={onChangeMovies}
            />
            <input 
                className="input"
                type="text"
                placeholder="Select character name..."
                onChange={onChangeName}
            />
            <input className="submit"
                type="submit"
                value="search"
            />
      </form>
    )
}

export default SearchFilters;
