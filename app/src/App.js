import React from 'react';
import HomePage from './HomePage';
import GamesDisplayer from './GamesDisplayer';

/*
Central application that opens upon opening the webpage. loads up the HomePage 
*/
function App() {
  return (
    <>
        <header className= "GameDisplay">
            <GamesDisplayer/>
        </header>
        <div className="App">
        <HomePage />
        </div>
    </>
  );
}

export default App;
