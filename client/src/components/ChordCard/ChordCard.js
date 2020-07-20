import React from 'react';
import Piano from '../Piano/Piano';
import './style.css';
import API from '../../utils/api';
// show modal after adding chord to profile
const ChordCard = props => {

    const handleClick = e => {
        API.updateUser(e.target.id).then(res => {
            console.log(res)
        })
    }

    return (
        <div style={{margin: 10}} className='chord-content ui segment'>
            <h5 style={{fontSize: 18}}>{props.chordName}</h5>
            <Piano soundName={props.soundName} activeNotes={props.activeNotes} />
            <p style={{marginTop: 6, fontWeight: 500}}>Added by: {props.author}</p>
            {(props.user) &&
                <button key={props.id} id={props.id} onClick={handleClick} className='ui purple basic button'>Save To Profile</button>
            }
            {(!props.user) &&
                <a href='/user/signup'><button className='ui purple basic button'>Save To Profile</button></a>
            }
        </div>
    )
}

export default ChordCard;