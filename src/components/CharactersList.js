import React, {useState, useEffect} from 'react';

const CharactersList = ( {name,gender,birth_year,mass,height, films} ) => {
    const [movie, setMovies] = useState([]);
    const [visible, setVisible] = useState(false);

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
        <tbody>
            <tr onClick={() => setVisible(!visible)}>
                <td>
                    {name}
                </td>
                <td>
                    {gender}
                </td>
                <td>
                    {birth_year}
                </td>
            </tr>
            <tr className={!visible ? 'info invisible ' : 'info'}>
                <td>
                    <p>Mass</p> 
                    {mass}
                </td>
                <td>
                    <p>Height </p>
                    {height}
                </td>
                <td>
                    <p>Movies Titles</p>
                    {`${movie}`}
                </td>
            </tr>
        </tbody>
    )
}

export default CharactersList;
