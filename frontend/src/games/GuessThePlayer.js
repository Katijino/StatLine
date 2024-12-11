import React, { useState } from 'react';
import '../css/GuessThePlayer.css';
import headshot from "./img/headshot.png";
import downarrow from "./img/downarrow.png";
import uparrow from "./img/uparrow.png";

function GuessThePlayer() {
    const [input, setInput] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [TargetPlayer, SetPlayer] = useState([]);
    const [guesses, setGuesses] = useState([]); // Store the guesses
    const [started, setStarted] = useState(false); // Track whether the game has started
    const [won, setWon] = useState(false); // Track whether the player has won

    const fetchRandom = async () => {
        try {
            const response = await fetch('/api/games/GTP');
            const data = await response.json();
            console.log(data.name);
            SetPlayer(data);
            console.log("Random player fetched at:", new Date().toLocaleTimeString());
        } catch (error) {
            console.log('Error fetching player:', error);
        }
    };

    const handleInputChange = async (e) => {
        const query = e.target.value; // Get the current input value
        setInput(query); // Update the input state

        if (query.length > 0) {
            try {
                const response = await fetch(`/api/games/GTP/Specific?name=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const players = await response.json(); // Directly use the backend-provided data
                setFilteredPlayers(players); // Update the state with the backend response
            } catch (error) {
                console.error("Error fetching filtered players:", error);
                setFilteredPlayers([]); // Clear filtered players on error
            }
        } else {
            setFilteredPlayers([]); // Clear filtered players if input is empty
        }
    };

    const handlePlayerClick = async (e) => {
        if (guesses.length < 8) { // Allow only up to 8 guesses
            console.log("Target Player"+TargetPlayer);
            try {
                const query = e;
                const response = await fetch(`/api/games/GTP/player_by_name?name=${encodeURIComponent(query)}`);
                const player = await response.json();
                console.log(player);
                setGuesses((prevGuesses) => [...prevGuesses, player]);
                if (e == TargetPlayer.name) {
                    setWon(true); // Player guessed correctly
                }
            } catch (error) {
                console.log('Error fetching player:', error);
            }
            setInput(''); // Clear input after selection
        }
        setFilteredPlayers([]); // Clear suggestions after selection
    };

    const startGame = () => {
        fetchRandom(); // Fetch random player
        setStarted(true); // Show the rest of the page
    };

    const restartGame = () => {
        SetPlayer([]); // Clear the random player
        setGuesses([]); // Clear all guesses
        setWon(false); // Reset the win state
        fetchRandom(); // Fetch a new random player
    };

    return (
        <>
            {!started ? (
                <div className="start-screen">
                    <button className="start-button" onClick={startGame}>Start</button>
                </div>
            ) : (
                <>
                    <div className="bod">
                        <div className="box">
                            <img src={headshot} alt="headshot" />
                        </div>
                    </div>
                    <div className="parent-container">
                        {won ? (
                            <button className="restart-button" onClick={restartGame}>Restart</button>
                        ) : (
                            <input
                                type="text"
                                className="guess-input"
                                placeholder="Guess an NBA player"
                                value={input}
                                onChange={handleInputChange}
                            />
                        )}
                        {filteredPlayers.players && filteredPlayers.players.length > 0 && (
                            <div className="suggestions-box">
                                <ul className="suggestions-list">
                                    {filteredPlayers.players.slice(0, 10).map((player, index) => (
                                        <li key={index} onClick={() => handlePlayerClick(player)}>
                                            {player}
                                        </li>
                                    ))}
                                </ul>
                            </div>
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
                        <div className="player-detail">PPG</div>
                        <div className="player-detail">APG</div>
                        <div className="player-detail">RPG</div>
                    </div>
                    <div className="guessed-players">
                        {guesses.map((player, index) => (
                            <div
                                key={index}
                                className="player-info"
                                style={{
                                    backgroundColor: won && index == guesses.length - 1 ? 'lightgreen' : 'white'
                                }}
                            >
                                <div className="player-name-guess">{player.name}</div>
                                <div className="player-detail-guess">{player.team}</div>
                                <div className="player-detail-guess">{player.conference}</div>
                                <div className="player-detail-guess">{player.division}</div>
                                <div className="player-detail-guess">{player.position}</div>
                                <div className="player-detail-guess">{player.age}</div>
                                <div className="player-detail-guess">{player.ppg}</div>
                                <div className="player-detail-guess">{player.apg}</div>
                                <div className="player-detail-guess">{player.rpg}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default GuessThePlayer;
