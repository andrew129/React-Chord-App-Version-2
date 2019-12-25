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

    onSearchSubmit = (firstname, lastname, chord, chordName) => {
        if (firstname && lastname && chord && chordName && /,\s*/.test(chord) && chord.length >= 5) {
            const upperFirstName = firstname.charAt(0).toUpperCase() + firstname.slice(1) //first character in string to uppercase//
            const upperLastName = lastname.charAt(0).toUpperCase() + lastname.slice(1)
            const bestChord = chord.split(',')
            let trimmedArr = bestChord.map(note => {
                return note.trim().toUpperCase().replace(/C#|c#/g, 'Db').replace(/D#|d#/g, 'Eb').replace(/F#|f#/g, 'Gb').replace(/G#|g#/g, 'Ab').replace(/A#|a#/g, 'Bb')
            })

            const newChord = {
                author: upperFirstName + ' ' + upperLastName,
                chordName: chordName,
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
                .catch(err => {
                    this.setState({
                        loading: false,
                        message: 'Error Unique: Chord Already Exists in Database'
                    })
                    console.log(err)
                })
        }
        
        if (firstname || lastname || chord || chordName === '') {
            this.setState({
                message: 'Error Submitting: Please Fill out all Fields'
            })
        }

        if (firstname && lastname && chord && chordName && chord.length < 5) {
            this.setState({
                message: 'Error Submitting: Notes in Chords field must be at least 5 Characters long'
            })
        }
        //testing for commas between every word//
        if (firstname && lastname && chord && chordName && !/,\s*/.test(chord)) {
            this.setState({
                message: 'Error Submitting: Please Place a Comma between Every Note(ex. A5, D5)'
            })
        }
    }

    getChords = () => {
        API.getChords()
            .then(res => {
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
            <div className='container-fluid'>
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
                    {(!this.state.loading) &&
                        <div className='col-12'>
                            <h2 className='text-center' style={{marginTop: 80}}>Chord Gallery</h2>
                            <p className='text-center description'>Discover new and interesting Chords, Create more interesting music. Click on each keyboard to hear the chord played.</p>
                            <ChordList chords={this.state.chords} />
                        </div>
                    }
                    {(this.state.loading) &&
                        <div className='col-12'>
                            <Spinner />
                            <p style={{marginTop: 10}} class='text-center'>{this.state.loadingMessage}</p>
                        </div>
                    } 
                </div>
            </div>
        )
    }
}

export default Home