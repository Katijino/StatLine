import React from 'react';
import './HomePage.css';
import basketballImage from './Basketball.png';
import footballImage from './Football.png';
import soccerImage from './Soccer.png';
import BasketballGames from './games/BasketballGames.js'


function HomePage() {
    return (
        <div id="pick_sport">
            <div className="sport">
                <img src={basketballImage} alt="Basketball" onClick={BasketballGames} /> {/* Added alt text for accessibility */}
            </div>
            <div className="sport" >
            <img src={footballImage} alt="Football" id = "football"/> {/* Added alt text for accessibility */}
                
            </div>
            <div className="sport">
            <img src={soccerImage} alt="Soccer" /> {/* Added alt text for accessibility */}

            </div>
        </div>
    );
}

export default HomePage;
