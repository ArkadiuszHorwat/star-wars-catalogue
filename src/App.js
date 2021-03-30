import React, { useState, useEffect } from 'react';
import CharactersList from './components/CharactersList';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchFilters from './components/SearchFilters';

const apiURL = 'https://swapi.dev/api/people/?';

function App() {
  const [ characters, setCharacters ] = useState([]);
  const [ nextPage, setNextPage ] = useState('');
  const [ searchChar, setSearchChar ] = useState('');

  useEffect(() => {
    setCharacters([]);
    getCharacters(apiURL+'page=1');
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

  const handleOnSubmit = event => {
    event.preventDefault();

    if(searchChar){
      getCharacters(apiURL+`search=${searchChar}`);
      setSearchChar('');
    }
    else if(searchChar == ''){
      getCharacters(apiURL+'page=1');
    }
  }

  const handleOnChange = event => {
    setSearchChar(event.target.value);
  }

  return (
    <div className="App">
      <header>
        <h1>Star Wars Catalogue</h1>
        <SearchFilters 
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
        />
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
