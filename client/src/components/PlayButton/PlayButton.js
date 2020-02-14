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

Tone.Transport.bpm.value = 80
Tone.Transport.loop = false

class PlayButton extends React.Component {

    state = {
        playing: false,
        currentNotes: [],
        position: 0
    }

    repeat = time => {
        const chord = this.state.currentNotes[this.state.position % this.state.currentNotes.length]
        synthA.triggerAttackRelease(chord, '2n', time)
        this.setState({
            position: this.state.position + 1
        })
    }

    handleClick = () => {

        if (this.state.playing) {
            this.setState({
                playing: false,
                currentNotes: []
            })
            synthA.disconnect()
            Tone.Transport.stop()
        }

        else {
            this.setState({
                playing: true,
            })
            synthA.toMaster()
            Tone.Transport.start()
            this.props.activeChords.forEach(chord => {
                this.state.currentNotes.push(chord.trim().split(' '))
            })
            Tone.Transport.scheduleRepeat(time => {
                this.repeat(time)
            }, '2n')
            setTimeout(() => {
                Tone.Transport.stop()
                this.setState({
                    playing: false
                })
            }, 3000)
        }
    }

    render() {
        return (
            <div>
                {(this.state.playing) &&
                    <i onClick={this.handleClick} style={{fontSize: 30, marginBottom: 20}} className='pause icon'></i>
                }
                {(!this.state.playing) &&
                    <i onClick={this.handleClick} style={{fontSize: 30, marginBottom: 20}} className='play icon'></i>
                }
            </div>
        )
    }
}

export default PlayButton;