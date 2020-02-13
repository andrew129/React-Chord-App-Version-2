import React from 'react';
import ChordRow from '../ChordRow/ChordRow';
import PlayButton from '../PlayButton/PlayButton';
import './style.css';

//play button pause component

const ProgressionList = props => {
    console.log(props)
    const progressions = props.progressions.map(progression => {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: 'white', margin: 20, padding: 20}}>
                <PlayButton activeChords={progression.currentChords} />
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