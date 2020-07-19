import React from 'react';
import './style.css';
import API from '../../utils/api';

class NavBar extends React.Component {

    state = {
        currentClass: 'item',
        user: null
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        API.getUserInfo().then(res => {
            if (res.data) {
                this.setState({user: res.data})
            }
            else {
                this.setState({user: null})
            }
        })
    }

    handleLogout = () => {
        API.logoutUser().then(function(res) {
            console.log(res)
        })
    }

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
                <a style={{color: 'white', textShadow: '0px 0px 1px #fff'}} className='nav-link' href='/' className='item'>Chords</a>
                <a style={{color: 'white', textShadow: '0px 0px 1px #fff'}} className='nav-link' href='/chord-progressions' className='item'>Chord Progressions</a>
                <a style={{color: 'white', textShadow: '0px 0px 1px #fff'}} className='nav-link' href='/generator' className='item'>Chord Generator</a>
                {(this.state.user) &&
                    <a style={{color: 'white', textShadow: '0px 0px 1px #fff'}} className='nav-link' href='/' className='item right'><button onClick={this.handleLogout} className='ui basic purple button inverted'>Logout</button></a>
                }
                {(!this.state.user) &&
                    <a style={{color: 'white', textShadow: '0px 0px 1px #fff'}} className='nav-link' href='/user/signup' className='item right'>Login/Register</a>
                }
            </div>
        )
    }
    
}

export default NavBar;