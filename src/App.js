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
        <form>
          <input className="input"
            type="text"
            placeholder="Select movies..."
          />
          <input className="input"
            type="text"
            placeholder="Select character name..."
          />
          <input className="submit"
            type="submit"
            value="search"
          />
        </form>
      </header>
      <section id="scroll-list">
        {
          nextPage != null &&  <InfiniteScroll
            dataLength={characters.length}
            hasMore={true}
            next={loadeCharacters}
            scrollableTarget="scroll-list"
          >
          </InfiniteScroll>
        }
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Birth Year</th>
            </tr>
          </thead>
          {characters.length > 0 && characters.map( character => (
            <CharactersList 
              key={character.name} 
              {...character}
            />
          ))}
        </table>
      </section>
    </div>
  );
}

export default App;
