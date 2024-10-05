import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BasketballGames.css';


function BasketballGames() {
    const nav = useNavigate();
    const HandleGTP = () => {
        nav('/basketball-games/guess_the_player');
    };
    const HandleHighLow = () => {
        nav('/basketball-games/higher_lower');
    };
    const HandleStat = () => {
        nav('/basketball-games/stat_of_the_day');
    };
    const HandleDataBase = () => {
        nav('/basketball-games/database');
    };

    return (
        <div id = "game_grid" >
            <div className = "game" id = "guess_the_player" onClick = {HandleGTP}>
                Guess The Player
            </div>
            <div className = "game" id = "higher_lower" onClick = {HandleHighLow}>
                Higher Lower
            </div>
            <div className = "game" id = "Stat_of_the_day" onClick={HandleStat}>
                Stat of the Day
            </div>
            <div className = "game" id = "player_database" onClick={HandleDataBase}>
                DataBase
            </div>
        </div>
    );



}

export default BasketballGames;