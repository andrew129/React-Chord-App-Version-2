import React from 'react';
import Piano from '../Piano/Piano';
import './style.css';
import API from '../../utils/api';
// show modal after adding chord to profile
const ChordCard = props => {
    console.log(props)

    const handleClick = e => {
        API.updateUser(e.target.id).then(res => {
            console.log(res)
        })
    }

    const deleteFromProfile = e => {
        console.log(e.target.id)
        API.deleteFromUserProfile(e.target.id).then(res => {
            console.log(res)
            window.location.reload()
        })
    }

    return (
        <div style={{margin: 10}} className='chord-content ui segment'>
            <h5 style={{fontSize: 18}}>{props.chordName}</h5>
            <Piano soundName={props.soundName} activeNotes={props.activeNotes} />
            <p style={{marginTop: 6, fontWeight: 500}}>Added by: {props.author}</p>
            {(props.user && !props.profile) &&
                <button key={props.id} id={props.id} onClick={handleClick} className='ui purple basic button'>Save To Profile</button>
            }
            {(!props.user && !props.profile) &&
                <a href='/user/signup'><button className='ui purple basic button'>Save To Profile</button></a>
            }
            {(props.profile) &&
                <button key={props.id} id={props.id} className='ui red basic button' onClick={deleteFromProfile}>Remove From Profile</button>
            }
        </div>
    )
}

export default ChordCard;