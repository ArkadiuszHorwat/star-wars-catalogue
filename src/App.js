import React, { useState, useEffect } from 'react';

const API = "https://swapi.dev/api/people/";

function App() {
  const [ characters, setCharacters ] = useState([]);

  useEffect(() => {
    getCharacters(API);
    console.log(characters);
  }, [])

  const getCharacters = apiURL => {
    fetch(apiURL)
      .then(response => response.json())
      .then( data => {
        setCharacters(data.results)
      });
  }

  return (
    <div className="App">
      <header>
        <h1>Star Wars Catalogue</h1>
      </header>
    </div>
  );
}

export default App;
