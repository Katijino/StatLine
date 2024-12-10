import React, { useEffect, useRef, useState } from 'react';
import './css/GamesDisplayer.css';

function GamesDisplayer() {
  const [games, setGames] = useState([]); // State to hold the games data
  const scrollRef = useRef(null); // Reference to the scrollable container

  // Fetch data from the backend
  const resetGames = async () => {
    try {
      const response = await fetch('/api/header/reset_games');
    }
    catch(error) {
      console.error('Error resetting games:',error);
    }
  };
  const fetchGames = async () => {
    try {
      const response = await fetch('/api/header'); // Replace with your API URL
      const data = await response.json();
      setGames(data); // Update state with the fetched data
      console.log("Data fetched at:", new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  // Fetch data based on schedule
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Fetch at 12:01 AM
      if (hours === 0 && minutes === 1) {
        resetGames();
        fetchGames();
      }

      // Fetch every minute from noon to midnight
      if (hours >= 12 && hours < 24) {
        fetchGames();
      }
    }, 60000); // Check every minute

    // Initial fetch when the component mounts
    fetchGames();

    // Clean up interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="games-container" ref={scrollRef}>
      <div className="games-grid">
        {games.length > 0 ? (
          games.map((game, index) => (
            <div key={index} className="game-item">
              {/* Row 1: Game time or finished status */}
              <div className="game-time">
                <p>{game.game_time_or_finished}</p>
              </div>
              
              {/* Row 2: Team 1 - Logo, name, and score */}
              <div className="team-row">
                <img className="team-logo" src={game.team1_logo} alt={`${game.team1_abbr} logo`} />
                <p className="team-name">{game.team1_abbr}</p>
                <p className="team-score">{game.team1_record_or_score}</p>
              </div>
              
              {/* Row 3: Team 2 - Logo, name, and score */}
              <div className="team-row">
                <img className="team-logo" src={game.team2_logo} alt={`${game.team2_abbr} logo`} />
                <p className="team-name">{game.team2_abbr}</p>
                <p className="team-score">{game.team2_record_or_score}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading games...</p> // Show a loading message while data is being fetched
        )}
      </div>
    </div>
  );
}

export default GamesDisplayer;
