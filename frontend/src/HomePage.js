import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/HomePage.css';

function HomePage() {
    const nav = useNavigate();
    const HandleGTP = () => {
        nav('/guess_the_player');
    };
    const HandleHighLow = () => {
        nav('/higher_lower');
    };
    const HandleStat = () => {
        nav('/stat_of_the_day');
    };
    const handleStatLine = () => {
        nav('/Statline_guesser');
    };

    return (
        <div id = "game_grid" >
            <div className = "game" id = "guess_the_player" onClick = {HandleGTP}>
                Guess The Player
            </div>
            <div className = "game" id = "statline_guesser" onClick={handleStatLine}>
                Guess the Statline
            </div>
            <div className = "game" id = "higher_lower" onClick = {HandleHighLow}>
                Higher Lower
            </div>
            <div className = "game" id = "Stat_of_the_day" onClick={HandleStat}>
                Stat of the Day
            </div>
        </div>
    );



}

export default HomePage;
