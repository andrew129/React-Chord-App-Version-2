import React from 'react';
import Piano from '../Piano/Piano';
import './style.css';

const ChordCard = props => {
    return (
        <div style={{margin: 10}} className='chord-content ui segment'>
            <h5>Chord Notes: {props.chordName}</h5>
            <Piano activeNotes={props.activeNotes} />
            <p style={{marginTop: 6}}>Added by: {props.author}</p>
        </div>
    )
}

export default ChordCard;