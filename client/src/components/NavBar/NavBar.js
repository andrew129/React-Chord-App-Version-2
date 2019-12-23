import React from 'react';
import './style.css';

const NavBar = () => {
    return (
        <div style={{borderBottom: 'solid 2px black', borderRadius: 6 }} className="ui top purple three inverted fixed menu">
            <div className='item'>
            </div>
            <a href='/' className="item">Home</a>
            <a href='/' className="item">Chord Generator</a>
        </div>
    )
}

export default NavBar;