import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GamesDisplayer from './GamesDisplayer';
import GuessThePlayer from './games/GuessThePlayer'
import HigherLower from './games/HigherLower'
import StatOfTheDay from './games/StatOfTheDay'
import StatLineGuesser from './games/StatLineGuesser'
import HomePage from './HomePage';

/*
Central application that opens upon opening the webpage. loads up the HomePage 
*/
function App() {
  return (
    <Router>
      <>
          <header className= "GameDisplay">
              <GamesDisplayer/> {/* Displays the games in the top of the screen, eventually will make API call to display games */}
          </header>
          <div className="ChooseSport">
            <Routes>
              <Route path = "/" element={<HomePage />} /> {/*The homepage, what users should load up to. Not sure what is on there. */}

              <Route path = "/guess_the_player" element = {<GuessThePlayer/>}/>{/*guess the player game */}
              <Route path = "/higher_lower" element = {<HigherLower/>}/>{/*higher lower game */}
              <Route path = "/stat_of_the_day" element = {<StatOfTheDay/>}/>{/* stat of the day game*/}
              <Route path = "/Statline_guesser" element = {<StatLineGuesser/>}/>{/* stat of the day game*/}
            </Routes>
          </div>
          

      </>
    </Router>
  );
}

export default App;
