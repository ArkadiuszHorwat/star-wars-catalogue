import React, {useState, useEffect} from 'react';

const CharactersList = ( {name,gender,birth_year,mass,height, films} ) => {
    const [movie, setMovies] = useState([]);

    useEffect(() => {
        setMovies([]);

        films.map(film => {
        fetch(film)
            .then( response => response.json())
            .then( data => {
                setMovies(prev => [...prev, data.title]);
            });
        });
    },[]);

    return (
        <>
        <li>
            <p>Name: {name}</p>
            <p>Gender: {gender}</p>
            <p>Birth Year: {birth_year}</p>
        </li>
        <div>
            <p>Mass: {mass}</p>
            <p>Height: {height}</p>
            <p>Movies Titles: {`${movie}`}</p>
        </div>
        </>
    )
}

export default CharactersList;
