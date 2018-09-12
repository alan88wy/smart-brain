import React from 'react';
import Tilt from 'react-tilt';
import "./Logo.css";
import brain from './brain.png'

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br4" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img alt='logo' src={brain} width="120" height="120"></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;
