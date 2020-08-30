import React from 'react';
import { Menu, Header } from 'semantic-ui-react'
import ChordList from '../../ChordList/ChordList';
import API from '../../../utils/api';
import Select from 'react-select';

const options = [
    { value: 'Ambient Pad', label: 'Ambient Pad' },
    { value: 'Breezy Day', label: 'Breezy Day' },
    {value: 'piano', label: 'piano' },
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        marginTop: 111,
        marginRight: '110px',
        width: '75%',
        background: '#a333c8',
        color: 'white',
        border: 'solid 2px black',
        cursor: 'pointer'
    }),
    option: (provided, state) => ({
        ...provided,
        background: state.isSelected ? 'red' : '',
        cursor: 'pointer'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white'
    })
}

export default class UserProfile extends React.Component {
    state = { activeItem: 'Saved Chords', showChords: false, chords: [], user: null, userProfileName: '', userProfileId: null }

    componentDidMount() {
        let name = this.props.match.params.name.split('-')
        let id = this.props.match.params.id

        API.getUserInfoById(id).then(res => this.setState({user: res.data, chords: res.data.savedChords}))

        this.setState({ userProfileName: `${name[0]} ${name[1]}`, userProfileId: id, showChords: true})

    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
        if (name === 'Saved Chords') {
            this.setState({ showChords: true })
        }
        if (name === 'Saved Progressions') {
            this.setState({ showChords: false })
        }
    } 

    render() {
        const { activeItem } = this.state
        return (
            <div>
                <div style={{marginTop: 120}} className='container-fluid'>
                    {(this.props.user && this.props.user._id === this.state.userProfileId) &&
                        <Header style={{borderBottom: 'solid 1px black', paddingBottom: 10}} as='h1'>Welcome To Your Profile, {this.state.userProfileName}</Header>
                    }
                    {(this.props.user && this.props.user._id !== this.state.userProfileId) &&
                        <Header style={{borderBottom: 'solid 1px black', paddingBottom: 10}} as='h1'>{this.state.userProfileName}</Header>
                    }
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
                    {(this.props.user && this.props.user._id === this.state.userProfileId) &&
                        <ChordList profile={true} match={true} chords={this.state.chords} user={this.props.user} displayType='beginning' />
                    }
                    {(this.props.user && this.props.user._id !== this.state.userProfileId) &&
                        <ChordList profile={true} match={false} chords={this.state.chords} user={this.props.user} displayType='beginning' />
                    }
                </div>
            {/* {(this.props.user && this.props.user._id !== this.state.userProfileId || !this.props.user) &&
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
                    {(this.state.showChords) &&
                        <ChordList profile={true} match={false} chords={this.state.chords} user={this.props.user} displayType='beginning' />
                    }
                </div>
            }  */}
            </div>
        )
    }
}