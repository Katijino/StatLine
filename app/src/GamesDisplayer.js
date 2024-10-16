import React, { useEffect, useRef } from 'react';
import './css/GamesDisplayer.css';

function GamesDisplayer() {
  const scrollRef = useRef(null); // Reference to the scrollable container

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
        <div className="individual_game">1 v 2</div>
        <div className="individual_game">3 v 5</div>
        <div className="individual_game">4 v 6</div>
        <div className="individual_game">7 v 8</div>
        <div className="individual_game">9 v 10</div>
        <div className="individual_game">11 v 12</div>
        <div className="individual_game">13 v 14</div>
        <div className="individual_game">15 v 16</div>
        {/* Add more games if needed */}
      </div>
    </div>
  );
}

export default GamesDisplayer;
