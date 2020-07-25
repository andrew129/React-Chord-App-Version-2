import React from 'react';
import './style.css';
import API from '../../utils/api';
import { Dropdown } from 'semantic-ui-react'


class NavBar extends React.Component {

    state = {
        currentClass: 'item',
        isOpen: false
    }

    // toggleOpen = () => {
    //     this.setState({ isOpen: !this.state.isOpen })
    // }

    handleLogout = () => {
        API.logoutUser().then(function(res) {
            console.log(res)
        })
    }

    render() {
        return (
            <div style={{borderBottom: 'solid 2px black', borderRadius: 6 }} className="ui top fixed menu borderless">
                <div className='header item'>
                    <a className='nav-link hover' style={{padding: 5}} href='/'><h4 className='chord-fact' style={{textShadow: '2px 6px 7px black, 4px -6px 7px black', color: 'black'}}>Chord Factory</h4></a>
                </div>
                <a style={{color: 'white', textShadow: '0px 0px 1px #fff'}} className='nav-link' href='/' className='item'>Chords</a>
                <a style={{color: 'white', textShadow: '0px 0px 1px #fff'}} className='nav-link' href='/chord-progressions' className='item'>Chord Progressions</a>
                <a style={{color: 'white', textShadow: '0px 0px 1px #fff'}} className='nav-link' href='/generator' className='item'>Chord Generator</a>
                {(this.props.user) &&
                    <div className='item right' style={{padding: 0}}>
                        <Dropdown style={{color: 'white', padding: 0}} className='link item' text={this.props.user.first_name + ' ' + this.props.user.last_name}>
                            <Dropdown.Menu>
                                <Dropdown.Item className='link' text='My Profile' href={'user/profile/' + this.props.user.first_name + '-' + this.props.user.last_name} />
                            </Dropdown.Menu>
                        </Dropdown>
                        <a style={{color: 'white', textShadow: '0px 0px 1px #fff'}} className='nav-link' href='/' className='item right'><button onClick={this.handleLogout} className='ui basic purple button inverted'>Logout</button></a>
                    </div>
                }
                {(!this.props.user) &&
                    <div className='item right' style={{padding: 0}}>
                        <a style={{textShadow: '0px 0px 1px #fff', padding: 0}} className='nav-link' href='/user/login' className='item right'><button className='ui purple basic inverted button'>Login</button></a>
                        <a style={{ textShadow: '0px 0px 1px #fff', padding: 10}} className='nav-link' href='/user/signup' className='item right'><button className='ui purple basic inverted button'>Register</button></a>
                    </div>
                }
            </div>
        )
    }
    
}

export default NavBar;