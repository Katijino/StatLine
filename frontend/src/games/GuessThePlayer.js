import React, { useState } from 'react';
import '../css/GuessThePlayer.css';
import headshot from "./headshot.png";

// Sample data of NBA players (this can be fetched from an API or database)
const players = [
    { firstName: 'LeBron', lastName: 'James', age: 39, team: "LAL", conference: "West", division: "Pac", position: "F", height: 81, number: 23 },
    { firstName: 'Luka', lastName: 'Doncic', age: 23, team: "DAL", conference: "West", division: "Pac", position: "F", height: 79, number: 77 },
    { firstName: 'Larry', lastName: 'Bird', age: 81, team: "CEL", conference: "East", division: "Atlantic", position: "F", height: 82, number: 33 },
    { firstName: 'Kobe', lastName: 'Bryant', age: 47, team: "LAL", conference: "West", division: "Pacific", position: "G", height: 76, number: 8 },
    { firstName: 'Kevin', lastName: 'Durant', age: 36, team: "Suns", conference: "West", division: "Pacific", position: "F", height: 83, number: 7 },
    // Add more players here
];

function GuessThePlayer() {
    const [input, setInput] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [guesses, setGuesses] = useState([]); // Store the guesses

    // Function to handle input change
    const handleInputChange = (e) => {
        const query = e.target.value;
        setInput(query);

        if (query.length > 0) {
            const suggestions = players
                .filter(player =>
                    player.firstName.toLowerCase().startsWith(query.toLowerCase()) ||
                    player.lastName.toLowerCase().startsWith(query.toLowerCase())
                )
                .sort((a, b) => {
                    if (a.firstName.toLowerCase() === b.firstName.toLowerCase()) {
                        return a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase());
                    }
                    return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
                });

            setFilteredPlayers(suggestions);
        } else {
            setFilteredPlayers([]);
        }
    };

    // Function to handle player selection
    const handlePlayerClick = (player) => {
        if (guesses.length < 8) { // Allow only up to 8 guesses
            setGuesses(prevGuesses => [...prevGuesses, player]);
            setInput(''); // Clear input after selection
        }
        setFilteredPlayers([]); // Clear suggestions after selection
    };

    return (
        <>
            <div className="bod">
                <div className="box">
                    <img src={headshot} alt="headshot" />
                </div>
            </div>
            <div className="guess-container">
                <input
                    type="text"
                    className="guess-input"
                    placeholder="Guess an NBA player"
                    value={input}
                    onChange={handleInputChange}
                    disabled={guesses.length >= 8} // Disable input after 8 guesses
                />
                {filteredPlayers.length > 0 && (
                    <ul className="suggestions-list">
                        {filteredPlayers.map((player, index) => (
                            <li key={index} onClick={() => handlePlayerClick(player)}>
                                {player.firstName} {player.lastName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Display each guessed player's details */}
            <div className="player-info">
                <div className="player-name">Name</div>
                <div className="player-detail">Team</div>
                <div className="player-detail">Conference</div>
                <div className="player-detail">Division</div>
                <div className="player-detail">Position</div>
                <div className="player-detail">Age</div>
                <div className="player-detail">Height</div>
                <div className="player-detail">Number</div>
            </div>
            <div className="guessed-players">
                {guesses.map((player, index) => (
                    <div key={index} className="player-info">
                        <div className="player-name-guess">{player.firstName} {player.lastName}</div>
                        <div className="player-detail-guess">{player.team}</div>
                        <div className="player-detail-guess">{player.conference}</div>
                        <div className="player-detail-guess">{player.division}</div>
                        <div className="player-detail-guess">{player.position}</div>
                        <div className="player-detail-guess">{player.age}</div>
                        <div className="player-detail-guess">{player.height} inches</div>
                        <div className="player-detail-guess">{player.number}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default GuessThePlayer;
