import React from 'react';
import ChordCard from '../ChordCard/ChordCard';
import './style.css'

const ChordList = props => {
    console.log(props)
    const chords = props.chords.map(chord => {
        return <ChordCard 
                    match={props.match} 
                    key={chord._id} 
                    profile={props.profile} 
                    id={chord._id} chords={props.chords} 
                    soundName={props.soundName} 
                    chordName={chord.chordName} 
                    author={chord.author} 
                    activeNotes={chord.currentNotes} 
                    user={props.user}
                />
    })
    return (
        <div className={props.displayType === "beginning" ?  "chord-list-start": "chord-list"}>
            {chords}
        </div>
    )
}

export default ChordList;