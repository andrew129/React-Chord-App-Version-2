import React from 'react';
import Tone from 'tone';

const synthA = new Tone.PolySynth(9, Tone.Synth, {
    oscillator : {
      type : "sine",
      partials : [3, 5, 6, 7]
    },
  
    "envelope" : {
      "attack" : 1,
      "decay" : 0,
      "sustain" : 1,
      "release" : 4,
    },
  
    "portamento" : 0.03,
  
    "pitchShift" : {
      "pitch" : -24
    },  
})

Tone.Transport.bpm.value = 90

class PlayButton extends React.Component {

    state = {
        playing: false,
        currentNotes: [],
        position: 0
    }

    repeat = time => {
        const chord = this.state.currentNotes[this.state.position]
        synthA.triggerAttackRelease(chord, '1n', time)
        if (this.state.position > this.state.currentNotes.length) {
            Tone.Transport.pause()
            synthA.disconnect()
            this.setState({
                position: 0,
                playing: false,
                currentNotes: []
            })
        }
        else {
            this.setState({
                position: this.state.position + 1,
                playing: true
            })
        }
    }

    handleClick = () => {
        console.log(this.state.currentNotes)
        if (this.state.playing) {
            this.setState({
                position: 0,
                playing: false,
                currentNotes: [],
            })
            Tone.Transport.pause()
        }

        else {
            this.setState({
                playing: true,
            })
            synthA.toMaster()
            this.props.activeChords.forEach(chord => {
                this.state.currentNotes.push(chord.trim().split(' '))
            })
            Tone.Transport.start()
            Tone.Transport.scheduleRepeat(time => {
                this.repeat(time)
            }, '1n')
        }
    }

    render() {
        return (
            <div>
                {(this.state.playing) &&
                    <i onClick={this.handleClick} style={{fontSize: 30, marginBottom: 10}} className='pause icon'></i>
                }
                {(!this.state.playing) &&
                    <i onClick={this.handleClick} style={{fontSize: 30, marginBottom: 20}} className='play icon'></i>
                }
            </div>
        )
    }
}

export default PlayButton;