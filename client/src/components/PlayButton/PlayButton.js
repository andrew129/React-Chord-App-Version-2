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

Tone.Transport.bpm.value = 100

class PlayButton extends React.Component {

    state = {
        playing: false,
        currentNotes: [],
        position: 0
    }

    song = time => {
        console.log(this.state.position)
        const chord = this.state.currentNotes[this.state.position]
        synthA.triggerAttackRelease(chord, '4n', time)
        synthA.toMaster()
        this.setState({
            position: this.state.position + 1
        })
        if (this.state.position === this.state.currentNotes.length + 1) {
            Tone.Transport.cancel()
            this.setState({
                position: 0,
                currentNotes: [],
                playing: false
            })
        }
    }

    handleClick = () => {
        let loop = new Tone.Loop(this.song, '1n')
        if (this.state.playing) {
            this.setState({
                position: 0,
                playing: false,
                currentNotes: [],
            })
            Tone.Transport.cancel()
            loop.stop()
        }

        else {
            this.setState({
                playing: true,
            })
            this.props.activeChords.forEach(chord => {
                this.state.currentNotes.push(chord.trim().split(' '))
            })
            Tone.Transport.start()
            loop.start()
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