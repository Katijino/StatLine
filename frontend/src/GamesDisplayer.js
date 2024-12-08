import React, { useEffect, useRef, useState } from 'react';
import './css/GamesDisplayer.css';

function GamesDisplayer() {
  const [games, setGames] = useState([]); // State to hold the games data
  const scrollRef = useRef(null); // Reference to the scrollable container

  // Fetch data from the backend
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

  // Auto-scroll logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        // Scroll the container by a fixed number of pixels (e.g., 250px)
        scrollContainer.scrollBy({ left: 410, behavior: 'smooth' });

        // If reached the end, scroll back to the beginning
        if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 2000); // Adjust the interval time to your needs (e.g., every 2 seconds)

    // Clean up the interval when the component is unmounted
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="games-container" ref={scrollRef}> {/* Attach the ref */}
      <div className="games-grid">
        {games.length > 0 ? (
          games.map((game, index) => (
            <div key={index} className="individual_game">
              <p>{game.team1_abbr} vs {game.team2_abbr}</p>
              <p>Time: {game.game_time || 'TBD'}</p>
              <p>Status: {game.status || 'Unknown'}</p>
              <a href={game.game_link} target="_blank" rel="noopener noreferrer">
                View Details
              </a>
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
