import React from 'react';
import { Menu, Header } from 'semantic-ui-react'
import ChordList from '../../ChordList/ChordList';

export default class UserProfile extends React.Component {
    state = { activeItem: 'Saved Chords', chords: [], showChords: false }

    componentDidMount() {
        if (this.props.user) {
            this.setState({ chords: this.props.users.savedChords })
            console.log(this.state.chords)
        }
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name,  chords: this.props.user.savedChords })
    } 

    render() {
        const { activeItem } = this.state
        return (
            <div>
            {(this.props.user) &&
                <div style={{marginTop: 120}} className='container-fluid'>
                    <Header style={{borderBottom: 'solid 1px black', paddingBottom: 10}} as='h1'>Welcome To Your Profile,     {this.props.user.first_name + ' ' + this.props.user.last_name}</Header>
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
                    <ChordList profile={true} chords={this.state.chords} displayType='beginning' />
                </div>
            }
            </div>
        )
    }
}