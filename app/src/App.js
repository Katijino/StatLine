import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChooseSport from './ChooseSport';
import GamesDisplayer from './GamesDisplayer';
import BasketballGames from './games/BasketballGames'
import FootballGames from './games/FootballGames'
import PremGames from './games/PremGames'
import GuessThePlayer from './games/Basketball/GuessThePlayer'
import HigherLower from './games/Basketball/HigherLower'
import StatOfTheDay from './games/Basketball/StatOfTheDay'
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
            <ChooseSport />{/* The screen that will always be there, with the basketball/football/soccer ball icon for selecting type.*/}
            <Routes>
              <Route path = "/" element={<HomePage />} /> {/*The homepage, what users should load up to. Not sure what is on there. */}

              <Route path = "/basketball-games" element = {<BasketballGames/>}/>{/* all of the basketball games, shows all games */}
              {/*below items are accessed through the /basketball-games extension */}
              <Route path = "/basketball-games/guess_the_player" element = {<GuessThePlayer/>}/>{/*guess the player game */}
              <Route path = "/basketball-games/higher_lower" element = {<HigherLower/>}/>{/*higher lower game */}
              <Route path = "/basketball-games/stat_of_the_day" element = {<StatOfTheDay/>}/>{/* stat of the day game*/}

              <Route path = "/football-games" element = {<FootballGames/>}/>


              <Route path = "/prem-games" element = {<PremGames/>}/>


              
            </Routes>
          </div>
          

      </>
    </Router>
  );
}

export default App;
