import React from 'react';
import './style.css';

class NavBar extends React.Component {

    // state = {
    //     currentClass: 'item'
    // }

    // toggle = () => {
    //     this.setState({
    //         currentClass: 'item active'
    //     }) 
    // }

    render() {
        return (
            <div style={{borderBottom: 'solid 2px black', borderRadius: 6 }} className="ui top fixed menu">
                <div className='item'>
                    <h4 style={{textShadow: '2px 6px 7px black, 4px -6px 7px black'}}>Chord Factory</h4>
                </div>
                <a className='nav-link' href='/' className='item'>Chords</a>
                <a className='nav-link' href='/generator' className='item'>Chord Generator</a>
                <a className='nav-link' href='/chord-progressions' className='item'>Chord Progressions</a>
            </div>
        )
    }
    
}

export default NavBar;