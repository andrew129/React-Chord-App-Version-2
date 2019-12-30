import React from 'react';
import './style.css';

const NavBar = () => {
    return (
        <div style={{borderBottom: 'solid 2px black', borderRadius: 6 }} className="ui top purple three inverted fixed menu">
            <div className='item'>
                <h4 style={{textShadow: '2px 6px 7px black, 4px -6px 7px black'}}>Chord Factory</h4>
            </div>
            <a href='/' className="item">Chords</a>
            <a href='/generator' className="item">Chord Generator</a>
        </div>
    )
}

export default NavBar;