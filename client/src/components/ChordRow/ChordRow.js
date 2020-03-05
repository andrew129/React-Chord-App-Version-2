import React from 'react';
import Piano from '../Piano/Piano';

const ChordRow = props => {
    const chords = props.chords.map(chord => {
        return <Piano key={chord._id} activeNotes={chord} />
    })
    return (
        <div className='Chord-row'>
            {chords}
        </div>
    )
}

export default ChordRow;