import React, { useState, useEffect } from 'react';
import CharactersList from './components/CharactersList';
import InfiniteScroll from 'react-infinite-scroll-component';

const apiURL = 'https://swapi.dev/api/people/?page=1';

function App() {
  const [ characters, setCharacters ] = useState([]);
  const [ nextPage, setNextPage ] = useState('');

  useEffect(() => {
    getCharacters(apiURL);
  }, [])

  const getCharacters = apiURL => {
      fetch(apiURL)
      .then(response => response.json())
      .then( data => {
        setCharacters(data.results);  
        setNextPage(data.next);
      });
  }

  const loadeCharacters = () => {
    fetch(nextPage)
    .then(response => response.json())
    .then( data => {
      data.results.map( result => {
        setCharacters( prev => [...prev, result]);  
      })
      setNextPage(data.next);
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Star Wars Catalogue</h1>
      </header>
      {
        nextPage != null &&  <InfiniteScroll
          dataLength={characters.length}
          hasMore={true}
          next={loadeCharacters}
        >  
        </InfiniteScroll>
      }
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
