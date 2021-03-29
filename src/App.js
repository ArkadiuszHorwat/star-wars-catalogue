import React, { useState, useEffect } from 'react';
import CharactersList from './components/CharactersList';

const peopleAPI = "https://swapi.dev/api/people/?page=1";//count:1-83, pages:9
//pages: 1-8: results[0-9], page: 9: results[0-1]

function App() {
  const [ characters, setCharacters ] = useState([]);

  useEffect(() => {
    getCharacters(peopleAPI);
  }, [])

  const getCharacters = apiURL => {
    fetch(apiURL)
      .then(response => response.json())
      .then( data => {
        setCharacters(data.results);
      });
  }

  console.log(characters)
  return (
    <div className="App">
      <header>
        <h1>Star Wars Catalogue</h1>
      </header>
      <ul>
        {characters.length > 0 && characters.map( character => (
          <CharactersList 
            key={character.name} 
            {...character}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
