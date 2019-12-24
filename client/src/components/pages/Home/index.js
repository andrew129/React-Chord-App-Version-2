import React from 'react';
import Form from '../../Form/Form';
import ChordList from '../../ChordList/ChordList';
import API from '../../../utils/api';
import './style.css';

class Home extends React.Component {

    state = {
        chords: [],
        message: ''
    }

    componentDidMount() {
        this.getChords()
    }

    onSearchSubmit = (firstname, lastname, chord) => {
        if (firstname && lastname && chord) {
            const bestChord = chord.split(',')
            let trimmedArr = bestChord.map(str => {
                return str.trim().toUpperCase().replace(/C#|c#/g, 'Db').replace(/D#|d#/g, 'Eb').replace(/F#|f#/g, 'Gb').replace(/G#|g#/g, 'Ab').replace(/A#|a#/g, 'Bb')
            })

            const newChord = {
                author: firstname + ' ' + lastname,
                chordName: chord,
                currentNotes: trimmedArr
            }

            API.saveChord(newChord)
                .then(res => {
                    console.log(res)
                    this.setState({
                        message: ''
                    })
                })
        }
        
        else if (firstname || lastname || chord === '') {
            this.setState({
                message: 'Error Submitting: Please Fill out all Fields'
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
                    <div className='col-12'>
                        <h2 class='text-center' style={{marginTop: 80}}>Chord Gallery</h2>
                        <p class='text-center description'>Discover new and interesting Chords, Create more interesting music. Click on each keyboard to hear the chord played.</p>
                        <ChordList chords={this.state.chords} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home