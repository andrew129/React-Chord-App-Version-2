import React from 'react';
import ChordCard from '../ChordCard/ChordCard';
import './style.css'

const ChordList = props => {
    const chords = props.chords.map(chord => {
        return <ChordCard soundName={props.soundName} key={chord._id} chordName={chord.chordName} author={chord.author} activeNotes={chord.currentNotes}/>
    })
    return (
        <div className='chord-list'>
            {chords}
        </div>
    )
}

export default ChordList;