import React from 'react';
import Form from '../../Form/Form';
import ChordList from '../../ChordList/ChordList';
import API from '../../../utils/api';
import Spinner from '../../Spinner/Spinner';
import './style.css';

class Home extends React.Component {

    state = {
        chords: [],
        message: '',
        loading: false,
        loadingMessage: ''
    }

    componentDidMount() {
        this.getChords()
    }

    onSearchSubmit = (firstname, lastname, chord) => {
        if (firstname && lastname && chord && /,\s*/.test(chord)) {
            const upperFirstName = firstname.charAt(0).toUpperCase() + firstname.slice(1) //first character to uppercase//
            const upperLastName = lastname.charAt(0).toUpperCase() + lastname.slice(1)
            const bestChord = chord.split(',')
            let trimmedArr = bestChord.map(note => {
                return note.trim().toUpperCase().replace(/C#|c#/g, 'Db').replace(/D#|d#/g, 'Eb').replace(/F#|f#/g, 'Gb').replace(/G#|g#/g, 'Ab').replace(/A#|a#/g, 'Bb')
            })

            const newChord = {
                author: upperFirstName + ' ' + upperLastName,
                chordName: chord,
                currentNotes: trimmedArr
            }

            API.saveChord(newChord)
                .then(res => {
                    console.log(res)
                    this.setState({
                        message: '',
                        loading: true,
                        loadingMessage: 'Updating Chords'
                    })
                    setTimeout(() => {
                        this.getChords()
                        this.setState({
                            loading: false
                        })
                    }, 2000)
                })
        }
        
        if (firstname || lastname || chord === '') {
            this.setState({
                message: 'Error Submitting: Please Fill out all Fields'
            })
        }
        //testing for commas between every word//
        if (firstname && lastname && chord && !/,\s*/.test(chord)) {
            this.setState({
                message: 'Error Submitting: Please Place a Comma between Every Note'
            })
        }
    }

    getChords = () => {
        API.getChords()
            .then(res => {
                console.log(res)
                this.setState({
                    chords: res.data
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    message: 'Currently Having Server Issues Try Later'
                })
            })
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-3'>
                    </div>
                    <div className='col-6'>
                        <Form
                            onSubmit={this.onSearchSubmit}
                            message={this.state.message}
                        />
                    </div>
                    <div className='col-3'>
                    </div>
                </div>
                <div className='row'>
                    <div className='row'>
                        <div className='col-*_*'>
                            {(!this.state.loading) &&
                                <div>
                                    <h2 class='text-center' style={{marginTop: 80}}>Chord Gallery</h2>
                                    <p class='text-center description'>Discover new and interesting Chords, Create more interesting music. Click on each keyboard to hear the chord played.</p>
                                    <ChordList chords={this.state.chords} />
                                </div>
                            }
                            {(this.state.loading) &&
                                <div>
                                    <Spinner />
                                    <p style={{marginTop: 10}} class='text-center'>{this.state.loadingMessage}</p>
                                </div>
                            } 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home