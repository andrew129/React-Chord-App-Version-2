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
            <div style={{borderBottom: 'solid 2px black', borderRadius: 6 }} className="ui top fixed menu borderless">
                <div className='header item'>
                    <a className='nav-link hover' style={{padding: 5}} href='/'><h4 className='chord-fact' style={{textShadow: '2px 6px 7px black, 4px -6px 7px black', color: 'black'}}>Chord Factory</h4></a>
                </div>
                <a style={{color: 'white', textShadow: '0px 0px 0px #fff'}} className='nav-link' href='/' className='item'>Chords</a>
                <a style={{color: 'white', textShadow: '0px 0px 0px #fff'}} className='nav-link' href='/chord-progressions' className='item'>Chord Progressions</a>
                <a style={{color: 'white', textShadow: '0px 0px 0px #fff'}} className='nav-link' href='/generator' className='item'>Chord Generator</a>
            </div>
        )
    }
    
}

export default NavBar;