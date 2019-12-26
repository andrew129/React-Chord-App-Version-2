import React from 'react';
import Chord from '../../ChordCard/ChordCard';
import API from '../../../utils/api';
import Spinner from '../../Spinner/Spinner';
import './style.css';

class Generator extends React.Component {
    state = {
        showChord: false,
        author: '',
        chordName: '',
        activeNotes: '',
        loading: false
    }

    handleClick = () => {
        this.setState({
            loading: true,
            showChord: false
        })

        API.getChords()
            .then(res => {
                console.log(res.data[Math.floor(res.data.length * Math.random())])
                const randomChord = res.data[Math.floor(res.data.length * Math.random())]
                setTimeout(() => {
                    this.setState({
                        author: randomChord.author,
                        chordName: randomChord.chordName,
                        activeNotes: randomChord.currentNotes,
                        showChord: true,
                        loading: false
                    })
                }, 1000)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div class='container'>
                <div class='row'>
                    <div class='col-3'>
                    </div>
                    <div style={{marginTop: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} className='col-6 generator ui segment'>
                        <h2>Magic Button</h2>
                        <h5>Click the Magic Button to reveal a random Chord, use it wisely</h5>
                        <button onClick={this.handleClick} style={{marginBottom: 10, marginTop: 10}} className='ui purple button w-50'>Magic Button</button>
                    </div>
                    <div class='col-3'>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-3'>
                    </div>
                    {(this.state.showChord) &&
                        <div style={{marginTop: 30}} class='col-6'>
                            <Chord 
                                author={this.state.author}
                                chordName={this.state.chordName}
                                activeNotes={this.state.activeNotes}
                            />
                        </div>
                    }
                    {(this.state.loading && !this.state.showChord) &&
                        <div style={{marginTop: 30}} class='col-6'>
                            <Spinner />
                            <p style={{marginTop: 10}} class='text-center'>Generating Chord</p>
                        </div>
                    }
                    <div class='col-3'>
                    </div>
                </div>
            </div>
        )
    }

}

export default Generator;