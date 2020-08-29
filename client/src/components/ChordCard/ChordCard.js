import React from 'react';
import Piano from '../Piano/Piano';
import './style.css';
import API from '../../utils/api';
import DisplayModal from '../Modal/Modal';
// show modal after adding chord to profile
const ChordCard = props => {

    console.log(props.match)
    console.log(props.user)

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
            {(props.user && !props.profile || props.profile && !props.match && props.user) &&
                <DisplayModal key={props.id} id={props.id} />
            }
            {(!props.user && !props.profile || props.profile && !props.match && !props.user) &&
                <a href='/user/signup'><button className='ui purple basic button'>Save To Profile</button></a>
            }
            {(props.profile && props.match) &&
                <button key={props.id} id={props.id} className='ui red basic button' onClick={deleteFromProfile}>Remove From Profile</button>
            }
            {/* {(!props.user) &&
                <a href='/user/signup'><button className='ui purple basic button'>Save To Profile</button></a>
            } */}
            {/* {(props.profile && !props.match && props.user) &&
            <React.Fragment>
                <h1>Hello</h1>
                <DisplayModal key={props.id} id={props.id} />
            </React.Fragment>  
            } */}
        </div>
    )
}

export default ChordCard;