import React from 'react';
import Form from '../../Form/Form';
// import Piano from '../../Piano/Piano';
// import ChordCard from '../../ChordCard/ChordCard';
import ChordList from '../../ChordList/ChordList';

class Home extends React.Component {

    state = {
        chords: [],
        message: ''
    }

    onSearchSubmit = (firstname, lastname, chord) => {
        if (firstname && lastname && chord) {
            const bestChord = chord.split(',')
            let trimmedArr = bestChord.map(str => {
                return str.trim().replace(/C#/g, 'Db').replace(/D#/g, 'Eb').replace(/F#/g, 'Gb').replace(/G#/g, 'Ab').replace(/A#/g, 'Bb')
            })

            console.log(trimmedArr) 
            const newChord = {
                author: firstname + ' ' + lastname,
                chordName: chord,
                currentNotes: trimmedArr
            }

            console.log(newChord)
            
            this.setState({
                chords: this.state.chords.concat(newChord),
                message: ''
            })
        }
        
        else if (firstname || lastname || chord === '') {
            this.setState({
                message: 'Error Submitting: Please Fill out all Fields'
            })
        }
    }

    // convert = arr => {
    //     for (let i = 0; i < arr.length; i++) {
    //         arr[i].replace(/C#/g, 'Db')
    //         arr[i].replace(/D#/g, 'Eb')
    //         arr[i].replace(/F#/g, 'Gb')
    //         arr[i].replace(/G#/g, 'Ab')
    //         arr[i].replace(/A#/g, 'Bb')
    //     }
    //     return arr
    // }

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
                        <p class='text-center'>Discover new and interesting Chords, Create more interesting music. Click on each keyboard to hear the chord played.</p>
                        <ChordList chords={this.state.chords} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home