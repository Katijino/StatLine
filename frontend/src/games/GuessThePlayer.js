import React, { useState } from 'react';
import '../css/GuessThePlayer.css';
import headshot from "./img/headshot.png";
import downarrow from "./img/downarrow.png";
import uparrow from "./img/uparrow.png";
import check from "./img/check.png";
import checkyellow from "./img/yellowcheck.png";

function GuessThePlayer() {
    const [input, setInput] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [TargetPlayer, SetPlayer] = useState([]);
    const [guesses, setGuesses] = useState([]); // Store the guesses
    const [started, setStarted] = useState(false); // Track whether the game has started
    const [won, setWon] = useState(false); // Track whether the player has won
    const [closeness,setClose] = useState([]);


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

    const closenum = (int2, int1) => {
        if (Math.abs(int2 - int1) <= 2) {
            return true; // int1 is 2 or less away from int2
        } else {
            return false; // int1 is more than 2 away from int2
        }
    };
    

    const close = (pos2, pos1) => {
        if (pos1 == "PG"){
            if (pos2 == "SG"){
                return true;
            }
            return false;
        }
        else if (pos1 == "SG"){
            if (pos2 == "SF" || pos2 == "PG"){
                return true;
            }
            return false;
        }
        else if (pos1 == "SF"){
            if (pos2 == "SG" ||pos2 == "PF"){
                return true;
            }
            return false;
        }
        else if (pos1 == "PF"){
            if (pos2 == "SF" || pos2 == "C"){
                return true;
            }
            return false;
        }
        else if (pos1 == "C"){
            if (pos2 == "PF"){
                return true;
            }
            return false;
        }
        return false;
    }
    const compareAttributes = (goalValue, currentValue, isNumeric = false) => {
        if (goalValue === currentValue) return 2;
        if (!isNumeric && close(goalValue,currentValue)) return 1;
        if (isNumeric && closenum(goalValue, currentValue)) return 1;
        return 0;
    };
    
    const ParseCloseness = (player) => {
        const goal = TargetPlayer;
        const current = player;
        // [team, conf, div, pos, age, ppg, apg, rpg]
        const ret = [];
        ret.push(compareAttributes(goal.team, current.team));
        ret.push(compareAttributes(goal.conference, current.conference));
        ret.push(compareAttributes(goal.division, current.division));
        ret.push(compareAttributes(goal.position, current.position));
        ret.push(compareAttributes(goal.age, current.age, true));
        ret.push(compareAttributes(goal.ppg, current.ppg, true));
        ret.push(compareAttributes(goal.apg, current.apg, true));
        ret.push(compareAttributes(goal.rpg, current.rpg, true));
        setClose((prevClose) => [...prevClose,ret]);
        console.log(closeness);


    }
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
            try {
                const query = e;
                const response = await fetch(`/api/games/GTP/player_by_name?name=${encodeURIComponent(query)}`);
                const player = await response.json();
                ParseCloseness(player);
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
        setClose([]);
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
                                    backgroundColor: won && index === guesses.length - 1 ? 'lightgreen' : 'white'
                                }}
                            >
                                <div className="player-name-guess">
                                    <span>{player.name}</span>
                                </div>
                                <div className="player-detail-guess">
                                    <span>{player.team}</span>
                                    {closeness[index][0] === 1 && <img className="closeness-check" src={check} alt="Checkmark" />}
                                </div>
                                <div className="player-detail-guess">
                                    <span>{player.conference}</span>
                                    {closeness[index][1] === 1 && <img className="closeness-check" src={check} alt="Checkmark" />}
                                </div>
                                <div className="player-detail-guess">
                                    <span>{player.division}</span>
                                    {closeness[index][2] === 1 && <img className="closeness-check" src={check} alt="Checkmark" />}
                                </div>
                                <div className="player-detail-guess">
                                    <span>{player.position}</span>
                                    {closeness[index][3] === 2 && <img className="closeness-check" src={check} alt="Checkmark" />}
                                    {closeness[index][3] === 1 && <img className="closeness-check" src={checkyellow} alt="Checkmark" />}
                                </div>
                                <div className="player-detail-guess">
                                    <span>{player.age}</span>
                                    {closeness[index][4] === 2 && <img className="closeness-check" src={check} alt="Checkmark" />}
                                    {closeness[index][4] === 1 && <img className="closeness-check" src={checkyellow} alt="Checkmark" />}
                                </div>
                                <div className="player-detail-guess">
                                    <span>{player.ppg}</span>
                                    {closeness[index][5] === 2 && <img className="closeness-check" src={check} alt="Checkmark" />}
                                    {closeness[index][5] === 1 && <img className="closeness-check" src={checkyellow} alt="Checkmark" />}
                                </div>
                                <div className="player-detail-guess">
                                    <span>{player.apg}</span>
                                    {closeness[index][6] === 2 && <img className="closeness-check" src={check} alt="Checkmark" />}
                                    {closeness[index][6] === 1 && <img className="closeness-check" src={checkyellow} alt="Checkmark" />}
                                </div>
                                <div className="player-detail-guess">
                                    <span>{player.rpg}</span>
                                    {closeness[index][7] === 2 && <img className="closeness-check" src={check} alt="Checkmark" />}
                                    {closeness[index][7] === 1 && <img className="closeness-check" src={checkyellow} alt="Checkmark" />}
                                </div>
                            </div>
                        ))}
                    </div>

                </>
            )}
        </>
    );
}

export default GuessThePlayer;
