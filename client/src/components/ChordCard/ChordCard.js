import React, {useState, useEffect} from 'react';
import Piano from '../Piano/Piano';
import './style.css';
import API from '../../utils/api';
import DisplayModal from '../Modal/Modal';
// show modal after adding chord to profile
const ChordCard = props => {

    const [chordSaved, setChordSaved] = useState(false)

    useEffect(() => {
        if (props.user) {
            for (let i = 0; i < props.user.savedChords.length; i++) {
                if (props.user.savedChords[i]._id === props.id) {
                    setChordSaved(true)
                    break
                }
            }
        }
    }, [])


    const deleteFromProfile = e => {
        API.deleteFromUserProfile(e.target.id).then(res => {
            window.location.reload()
        })
    }

    return (
        <div style={{margin: 10}} className='chord-content ui segment'>
            <h5 style={{fontSize: 18}}>{props.chordName}</h5>
            <Piano soundName={props.soundName} activeNotes={props.activeNotes} />
            <p style={{marginTop: 6, fontWeight: 500}}>Added by: {props.author}</p>
            {(props.user && !props.profile && !chordSaved || props.profile && !props.match && props.user && !chordSaved) &&
                <DisplayModal key={props.id} id={props.id} />
            }
            {(!props.user && !props.profile && !chordSaved || props.profile && !props.match && !props.user && !chordSaved) &&
                <a href='/user/signup'><button className='ui purple basic button'>Save To Profile</button></a>
            }
            {(props.user && props.profile && props.match && !chordSaved || props.user && chordSaved && props.profile) &&
                <button key={props.id} id={props.id} className='ui red basic button' onClick={deleteFromProfile}>Remove From Profile</button>
            }
            {(props.user && chordSaved && !props.profile) &&
                <h4 style={{marginTop: 0}} class="ui purple header">
                    <i class="check purple icon"></i>
                    <div class="content">
                        Saved
                    </div>
                </h4>
            }
        </div>
    )
}

export default ChordCard;