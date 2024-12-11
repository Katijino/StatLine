import React, { useState } from 'react';
import '../css/GuessThePlayer.css';
import headshot from "./headshot.png";

function GuessThePlayer() {
    const [input, setInput] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [TargetPlayer,SetPlayer] = useState([]);
    const [guesses, setGuesses] = useState([]); // Store the guesses
    const fetchSpecific = async (query) => {
        try {
            const response = await fetch(`/api/games/GTP/Specific?name=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFilteredPlayers(data);
            console.log("Data fetched at:", new Date().toLocaleTimeString());
        } catch (error) {
            console.log('Error fetching player list:', error);
        }
    };
    
    const fetchRandom = async () =>{
        try{
            const response = await fetch('/api/games/GTP');
            const data = response.json;
            SetPlayer(data);
            console.log("data fetched at:",new Date().toLocaleTimeString());
        }catch(error){
            console.log('Error fetched player:',error);
        }
    }
    const handInputChange(e) => {
        const query = e.target.value;
        setInput(query);
        if (query.length >0) {
            fetchSpecific(query);

        }
    }
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
                <div className="player-detail">PPG</div>
                <div className="player-detail">APG</div>
                <div className="player-detail">RPG</div>
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
                        <div className="player-detail-guess">{player.ppg} pts</div>
                        <div className="player-detail-guess">{player.apg}asts</div>
                        <div className="player-detail-guess">{player.rpg}rbs</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default GuessThePlayer;
