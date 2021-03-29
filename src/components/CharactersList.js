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
                })
        })
    },[])

    return (
        <>
        <li>
            <p>{name}</p>
            <p>{gender}</p>
            <p>{birth_year}</p>
        </li>
        <div>
            <p>{mass}</p>
            <p>{height}</p>
            <p>{movie}</p>
        </div>
        </>
    )
}

export default CharactersList;
