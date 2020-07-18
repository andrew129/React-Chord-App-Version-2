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

const synthB = new Tone.PolySynth(8, Tone.Synth, {

    oscillator: {
      type : 'sine',
      modulationType : "sine",
      modulationIndex: 3,
      frequency : 440,
      harmonicity : 3.4,
    },
    
    portamento: 0.1,
  
    envelope: {
      attack: 0.001,
      decay: 0.5,
      sustain: 0.1,
      release: 0.1   
    },
  
    pitchShift: {
      pitch: -12
    },
})

const synthC = new Tone.PolySynth(6, Tone.Synth, {
    portamento : 0.2,
  
    oscillator: {
      type: "fatcustom",
      partials: [0.2,1,0,0.5,0.1],
      spread: 40,
      count: 3
    },
  
    envelope: {
      attack: 0.001,
      decay: 1.6,
      sustain: 0,
      release: 1.6
    }
})

Tone.Transport.bpm.value = 100

class PlayButton extends React.Component {

    state = {
        playing: false,
        currentNotes: [],
        position: 0,
    }

    playChords = time => {
        console.log(time)
        console.log(this.state.currentNotes)
        const chord = this.state.currentNotes[this.state.position]
        this.setState({
            position: this.state.position + 1
        })
        if (this.props.soundName === 'Ambient Pad') {
            synthA.toMaster()
            synthB.disconnect()
            synthA.triggerAttackRelease(chord, '4n', time)
        }
        else if (this.props.soundName === 'Breezy Day') {
            synthB.toMaster()
            synthA.disconnect()
            synthB.triggerAttackRelease(chord, '4n', time)
        }
        else if (this.props.soundName === 'Damp Cave') {
            synthC.toMaster()
            synthA.disconnect()
            synthB.disconnect()
            synthC.triggerAttackRelease(chord, '4n', time)
        }
        else if (this.props.soundName === 'Piano') {
            synthC.disconnect()
            synthB.disconnect()
            synthA.disconnect()
            chord.forEach(note => {
                const player = new Tone.Player({
                    "url": `../../../sounds/${note}.wav`,
                    "autostart": true,
                    "loop": false,
                    "loopEnd": time
                })
                player.toMaster()
            })
        }
        if (this.state.position === this.state.currentNotes.length) {
            Tone.Transport.cancel()
            this.setState({
                position: 0,
                currentNotes: [],
                playing: false
            })
        }
    }

    handleClick = () => {
        let loop = new Tone.Loop(this.playChords, '1n')
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