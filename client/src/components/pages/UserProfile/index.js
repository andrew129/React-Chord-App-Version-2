import React from 'react';
import { Menu, Header } from 'semantic-ui-react'
import ChordList from '../../ChordList/ChordList';
import API from '../../../utils/api';


export default class UserProfile extends React.Component {
    state = { activeItem: 'Saved Chords', chords: [], showChords: false, user: null, userProfileName: '', userProfileId: null }

    componentDidMount() {
        let name = this.props.match.params.name.split('-')
        let id = this.props.match.params.id

        API.getUserInfoById(id).then(res => this.setState({user: res.data, chords: res.data.savedChords}))

        this.setState({ userProfileName: `${name[0]} ${name[1]}`, userProfileId: this.props.match.params.id})

    }

    handleItemClick = (e, { name }) => {
        // curretuserprofile.savedChords
        this.setState({ activeItem: name})
    } 
    // render profile when clicked on the dropdown buttons
    render() {
        const { activeItem } = this.state
        return (
            <div>
            {(this.props.user && this.props.user._id === this.state.userProfileId) &&
                <div style={{marginTop: 120}} className='container-fluid'>
                    <Header style={{borderBottom: 'solid 1px black', paddingBottom: 10}} as='h1'>Welcome To Your Profile, {this.state.userProfileName}</Header>
                    <Menu style={{marginTop: 30}} pointing>
                        <Menu.Item
                            name='Saved Chords'
                            active={activeItem === 'Saved Chords'}
                            onClick={this.handleItemClick}
                            color='purple'
                            style={{fontSize: 15}}
                        />
                        <Menu.Item
                            name='Saved Progressions'
                            active={activeItem === 'Saved Progressions'}
                            onClick={this.handleItemClick}
                            color='purple'
                        />
                    </Menu>
                    <ChordList profile={true} match={true} chords={this.state.chords} user={this.props.user} displayType='beginning' />
                </div>
            }
            {(this.props.user && this.props.user._id !== this.state.userProfileId || !this.props.user) &&
                <div style={{marginTop: 120}} className='container-fluid'>
                    <Header style={{borderBottom: 'solid 1px black', paddingBottom: 10}} as='h1'>{this.state.userProfileName}</Header>
                    <Menu style={{marginTop: 30}} pointing>
                        <Menu.Item
                            name='Saved Chords'
                            active={activeItem === 'Saved Chords'}
                            onClick={this.handleItemClick}
                            color='purple'
                            style={{fontSize: 15}}
                        />
                        <Menu.Item
                            name='Saved Progressions'
                            active={activeItem === 'Saved Progressions'}
                            onClick={this.handleItemClick}
                            color='purple'
                        />
                    </Menu>
                    <ChordList profile={true} match={false} chords={this.state.chords} user={this.props.user} displayType='beginning' />
                </div>
            }
            </div>
        )
    }
}