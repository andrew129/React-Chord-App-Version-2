import React from 'react';
import ChordCard from '../ChordCard/ChordCard';
import './style.css'

const ChordList = props => {
    const chords = props.chords.map(chord => {
        return <ChordCard key={chord._id} id={chord._id} soundName={props.soundName} chordName={chord.chordName} author={chord.author} activeNotes={chord.currentNotes} user={props.user}/>
    })
    return (
        <div className='chord-list'>
            {chords}
        </div>
    )
}

export default ChordList;