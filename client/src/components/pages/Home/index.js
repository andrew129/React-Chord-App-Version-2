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

    onSearchSubmit = (author, chord) => {
        if (author && chord) {
            const newChord = {
                author: author,
                chordName: chord,
                currentNotes: chord.split(',')
            }
            
            this.setState({
                chords: this.state.chords.concat(newChord),
                message: ''
            })
        }
        
        else if (author || chord === '') {
            this.setState({
                message: 'Error Submitting: Please Fill out all Fields'
            })
        }
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
                        <p class='text-center'>Discover new and interesting Chords, Create more interesting music</p>
                        <ChordList chords={this.state.chords} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home