import React from 'react';
import ChordRow from '../ChordRow/ChordRow';
import PlayButton from '../PlayButton/PlayButton';
import './style.css';


const ProgressionList = props => {
    const progressions = props.progressions.map(progression => {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: 'white', margin: 20, padding: 20, borderRadius: 10, boxShadow: '0px 0px 15px 2px rgba(89,86,89,1)'}}>
                <PlayButton activeChords={progression.currentChords} soundName={props.soundName} />
                <h3>{progression.title}</h3>
                <p>Added By: <strong>{progression.author}</strong></p>
                <ChordRow chords={progression.currentChords} />
                <p>Genre: {progression.genre}</p>
            </div>
        ) 
    })

    return (
        <div className='progression-list'>
            {progressions}
        </div>
    )
}

export default ProgressionList;