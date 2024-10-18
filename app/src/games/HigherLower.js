import React, { useState } from 'react';
import '../css/HigherLower.css';
import headshot from "./headshot.png"; // Use for the player images

function HigherLower() {
    // State to track the correct player and feedback
    const [feedback, setFeedback] = useState("");
    const [player1Stat] = useState(28.9); // Example stat for Player 1 (e.g., points per game)
    const [player2Stat] = useState(26.7); // Example stat for Player 2

    const handleGuess = (player) => {
        // Determine which player has the higher stat
        if (player === 1 && player1Stat > player2Stat) {
            setFeedback("Correct! Lebron has a higher stat.");
        } else if (player === 2 && player2Stat > player1Stat) {
            setFeedback("Correct! KD has a higher stat.");
        } else {
            setFeedback("Wrong guess! Try again.");
        }
    };

    return (
        <div className="container">
            {/* Player 1 Box */}
            <div className="playerbox">
                <img src={headshot} alt="Lebron" className="player-image" />
                <div className="player-name">Lebron</div>
                <button className="guess-button" onClick={() => handleGuess(1)}>Guess Lebron</button>
            </div>

            {/* VS Text */}
            <div className="vs-text">VS</div>

            {/* Player 2 Box */}
            <div className="playerbox">
                <img src={headshot} alt="KD" className="player-image" />
                <div className="player-name">KD</div>
                <button className="guess-button" onClick={() => handleGuess(2)}>Guess KD</button>
            </div>

            {/* Feedback Section */}
            <div className="feedback">
                {feedback}
            </div>
        </div>
    );
}

export default HigherLower;
