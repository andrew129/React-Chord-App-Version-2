import React from 'react';
import './style.css';
import API from '../../utils/api';
import { Dropdown } from 'semantic-ui-react';
import { Search } from 'semantic-ui-react';

class NavBar extends React.Component {

    state = {
        currentClass: 'item',
        isOpen: false,
        currentURL: '',
        userSearched: '',
        users: [],
        typing: false
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        API.getUsers().then(res => this.setState({users: res.data}))
    }

    handleLogout = () => {
        API.logoutUser().then(function(res) {
            console.log(res)
        })
    }

    handleClick = (e) => {
        console.log(e.target)
    }

    filterSearches = e => {
        // add callback to use the updated state immediately
        this.setState({userSearched: e.target.value, typing: true}, () => {
            if (this.state.userSearched === '') {
                this.getUsers()
                this.setState({typing: false})
            }
            const filteredUsers = this.state.users.filter(user => user.first_name.slice(0, this.state.userSearched.length).toLowerCase() === this.state.userSearched.toLowerCase())
            this.setState({users: filteredUsers})
            console.log(this.state.users)
        })
        // onclick find user by id send to profile
    }

    render() {
        return (
            <React.Fragment>
            <div style={{borderBottom: 'solid 2px black', borderRadius: 6}} className="ui top fixed menu borderless">
                <div className='header item'>
                    <a className='nav-link hover' style={{padding: 5}} href='/'><h4 className='chord-fact' style={{textShadow: '2px 6px 7px black, 4px -6px 7px black', color: 'black'}}>Chord Factory</h4></a>
                </div>
                <a style={{color: 'white', textShadow: '0px 0px 1px #fff'}} className='nav-link' href='/' className={`item`}>Chords</a>
                <a style={{color: 'white', textShadow: '0px 0px 1px #fff'}} className='nav-link' href='/chord-progressions' className='item'>Chord Progressions</a>
                <a style={{color: 'white', textShadow: '0px 0px 1px #fff'}} className='nav-link' href='/generator' className='item'>Chord Generator</a>
                <div style={{width: '25%'}} class="ui right aligned category search item">
                    <div onChange={this.filterSearches} value={this.state.userSearched} style={{border: 'solid white 1px', padding: '10px', color: 'white'}} class="ui transparent icon input circular">
                        <input class="prompt" type="text" placeholder="Search Users..." />
                        <i style={{marginRight: 10, borderRadius: '100% !important'}} class="search link icon"></i>
                    </div>
                </div>
                {(this.props.user) &&
                    <div className='item right' style={{padding: 0}}>
                        <Dropdown pointing style={{color: 'white', padding: 0}} className='link item' text={this.props.user.first_name + ' ' + this.props.user.last_name}>
                            <Dropdown.Menu>
                                <Dropdown.Item className='link' text='My Profile' href={'/user/profile/' + this.props.user.first_name + '-' + this.props.user.last_name + '/' + this.props.user._id} />
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
            <div className='item right' style={{position: 'relative'}}>
            <Search
                onSearchChange={this.filterSearches}
                results={this.state.users}
                value={this.state.userSearched}
                type='text'
            />
            {(this.state.typing) &&
                <div class="results">
                    {(this.state.users.length === 0) && 
                        <h5 class='ui header'>No Results to Show</h5>
                    }
                    {(this.state.users.length > 0 && this.state.userSearched !== '') &&
                        <React.Fragment>
                            {this.state.users.map((user, index) => (
                                <a href={`/user/profile/${user.first_name}-${user.last_name}/${user._id}`}><button className={`ui basic ${index === this.state.users.length - 1 ? '' : 'mb-3'} button w-100 ${index % 2 === 0 ? 'purple' : 'red'}`}>{user.first_name}</button></a>
                            ))}
                        </React.Fragment>
                    }
                </div>
            }
            </div>
            </ React.Fragment >
        )
    }
    
}

export default NavBar;