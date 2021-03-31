import React, { useState, useEffect } from 'react';
import CharactersList from './components/CharactersList';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchFilters from './components/SearchFilters';
import ClipLoader from "react-spinners/ClipLoader";

const apiURL = 'https://swapi.dev/api/people/?';

function App() {
  const [ characters, setCharacters ] = useState([]);
  const [ nextPage, setNextPage ] = useState('');
  const [ searchChar, setSearchChar ] = useState('');
  const [ searchMovies, setSearchMovies ] = useState('');
  const [ more, setMore ] = useState(true);

  useEffect(() => {
    getCharacters(apiURL+'page=1');
  }, [])

  const getCharacters = apiURL => {
    setNextPage('');
    setCharacters([]);
    fetch(apiURL)
      .then(response => response.json())
      .then( data => {
        setCharacters(data.results); 
        setNextPage(data.next.replace('http', 'https'));
      })
      .catch(error => {
        console.log(error)
      });
      console.log(...characters)
  }

  const loadCharacters = () => {
    setNextPage('');
    fetch(nextPage)
    .then(response => response.json())
    .then( data => {
      data.results.map( result => {
        return setCharacters( prev => [...prev, result]);  
      })
      setNextPage(data.next.replace('http', 'https'));
    })
    .catch(error => {
      console.log(error)
    });
  }

  const loadMovies = (movieTitle) => {
    setCharacters([]);
    setNextPage('')
    setMore(false);
    fetch(`https://swapi.dev/api/films/?search=${movieTitle}`)
      .then( response => response.json())
      .then( data => {
        data.results[0].characters.map(item => {
          return fetch(item.replace('http','https'))
            .then(response => response.json())
            .then(data => {
              return setCharacters(prev => [...prev, data]);
            })
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  const handleOnSubmit = event => {
    event.preventDefault();

    if(searchChar && searchMovies){
      alert('Select only one field')
    }
    else if(searchChar){
      getCharacters(apiURL+`search=${searchChar}`);
    }
    else if(searchMovies){
      loadMovies(searchMovies);
    }
    else if(searchChar === '' || searchMovies === ''){
      getCharacters(apiURL+'page=1');
      setMore(true);
    }
  }

  const handleOnChangeName = event => {
    setSearchChar(event.target.value);
  }
  const handleOnChangeMovies = event => {
    setSearchMovies(event.target.value);
  }

  return (
    <div className="App">
      <header>
        <h1>Star Wars Catalogue</h1>
        <SearchFilters 
          onChangeName={handleOnChangeName}
          onChangeMovies={handleOnChangeMovies}
          onSubmit={handleOnSubmit}
        />
      </header>
      <section id="scroll-list">
        {
          characters.length === 0 && <ClipLoader color='white' size={100}/>
        }
        {
          (nextPage != null && characters.length > 0) && <InfiniteScroll
            dataLength={characters.length}
            hasMore={more}
            next={loadCharacters}
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
