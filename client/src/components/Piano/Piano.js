import React from 'react';
import './style.css'
import Tone from 'tone';


class Piano extends React.Component {

    state = {
        colorBack: false,
        blackKeys: ['Db3', 'Eb3', 'Gb3', 'Ab3', 'Bb3', 'Db4', 'Eb4', 'Gb4', 'Ab4', 'Bb4', 'Db5', 'Eb5', 'Gb5', 'Ab5', 'Bb5'],
        whiteKeys: ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5']
    }

    handleClick = () => {
        this.setState({colorBack: true})
        Tone.Transport.bpm.value = 120
        const soundName = this.props.soundName
        const synthA = new Tone.PolySynth(8, Tone.Synth, {
            oscillator : {
              type : "sine",
              partials : [3, 5, 6, 7]
            },

            "phaser": {
                "frequency" : 200,
                "octaves" : 5,
                "baseFrequency" : 1000
            },
          
            "envelope" : {
              "attack" : 1,
              "decay" : 0,
              "sustain" : 1,
              "release" : 4,
            },
          
            "portamento" : 1,
          
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
        if (soundName === 'Ambient Pad') {
            synthA.toMaster()
            synthB.disconnect()
            synthA.triggerAttackRelease(this.props.activeNotes, "4n")
            setTimeout(() => this.setState({colorBack: false}), 1900)
        }
        if (soundName === 'Breezy Day') {
            synthA.disconnect()
            synthB.toMaster()
            synthB.triggerAttackRelease(this.props.activeNotes, "4n")
            setTimeout(() => this.setState({colorBack: false}), 1900)
        }
        if (soundName === 'piano') {
            this.props.activeNotes.forEach(note => {
                const player = new Tone.Player({
                    "url": `../../../sounds/${note}.wav`,
                    "autostart": true,
                    "loop": false,
                    "volume": 4,
                })
                player.toMaster()
            })
            setTimeout(() => this.setState({colorBack: false}), 2500)
        }
    }

    activate = noteName => {
        if (this.props.activeNotes.includes(noteName) && !this.state.colorBack) {
            return 'red'
        }
        else if (this.state.blackKeys.includes(noteName) && !this.props.activeNotes.includes(noteName) && !this.state.whiteKeys.includes(noteName) && !this.state.colorBack) {
            return 'linear-gradient(#000000, #303030)'
        }
        else if (!this.state.blackKeys.includes(noteName) && !this.props.activeNotes.includes(noteName) && this.state.whiteKeys.includes(noteName) && !this.state.colorBack) {
            return 'white'
        }
        else if (this.state.whiteKeys.includes(noteName) && !this.state.blackKeys.includes(noteName) && this.state.colorBack && !this.props.activeNotes.includes(noteName)) {
            return '#A8A8A8'
        }
    }



    render() {
        return (
            <div onClick={this.handleClick} style={{cursor: 'pointer'}} className="piano">
                <div style={{backgroundColor: `${this.activate('C3')}`}} className="white-key C3-key"></div>
                <div style={{background: `${this.activate('Db3')}`}} className="black-key Db3-key"></div>
                <div style={{backgroundColor: `${this.activate('D3')}`}} className="white-key D3-key"></div>
                <div style={{background: `${this.activate('Eb3')}`}} className="black-key Eb3-key"></div>
                <div style={{backgroundColor: `${this.activate('E3')}`}}  className="white-key E3-key"></div>
                <div style={{backgroundColor: `${this.activate('F3')}`}}  className="white-key F3-key"></div>
                <div style={{background: `${this.activate('Gb3')}`}} className="black-key Gb3-key"></div>
                <div style={{backgroundColor: `${this.activate('G3')}`}} className="white-key G3-key"></div>
                <div style={{background: `${this.activate('Ab3')}`}} className="black-key Ab3-key"></div>
                <div style={{backgroundColor: `${this.activate('A3')}`}} className="white-key A3-key"></div>
                <div style={{background: `${this.activate('Bb3')}`}} className="black-key Bb3-key"></div>
                <div style={{backgroundColor: `${this.activate('B3')}`}} className="white-key B3-key"></div>
                <div style={{backgroundColor: `${this.activate('C4')}`}} className="white-key C4-key"></div>
                <div style={{background: `${this.activate('Db4')}`}} className="black-key Db4-key"></div>
                <div style={{backgroundColor: `${this.activate('D4')}`}} className="white-key D4-key"></div>
                <div style={{background: `${this.activate('Eb4')}`}} className="black-key Eb4-key"></div>
                <div style={{backgroundColor: `${this.activate('E4')}`}} className="white-key E4-key"></div>
                <div style={{backgroundColor: `${this.activate('F4')}`}} className="white-key F4-key"></div>
                <div style={{background: `${this.activate('Gb4')}`}} className="black-key Gb4-key"></div>
                <div style={{backgroundColor: `${this.activate('G4')}`}} className="white-key G4-key"></div>
                <div style={{background: `${this.activate('Ab4')}`}} className="black-key Ab4-key"></div>
                <div style={{backgroundColor: `${this.activate('A4')}`}} className="white-key A4-key"></div>
                <div style={{background: `${this.activate('Bb4')}`}} className="black-key Bb4-key"></div>
                <div style={{backgroundColor: `${this.activate('B4')}`}} className="white-key B4-key"></div>
                <div style={{backgroundColor: `${this.activate('C5')}`}} className="white-key C5-key"></div>
                <div style={{background: `${this.activate('Db5')}`}} className="black-key Db5-key"></div>
                <div style={{backgroundColor: `${this.activate('D5')}`}} className="white-key D5-key"></div>
                <div style={{background: `${this.activate('Eb5')}`}} className="black-key Eb5-key"></div>
                <div style={{backgroundColor: `${this.activate('E5')}`}} className="white-key E5-key"></div>
                <div style={{backgroundColor: `${this.activate('F5')}`}} className="white-key F5-key"></div>
                <div style={{background: `${this.activate('Gb5')}`}} className="black-key Gb5-key"></div>
                <div style={{backgroundColor: `${this.activate('G5')}`}} className="white-key G5-key"></div>
                <div style={{background: `${this.activate('Ab5')}`}} className="black-key Ab5-key"></div>
                <div style={{backgroundColor: `${this.activate('A5')}`}} className="white-key A5-key"></div>
                <div style={{background: `${this.activate('Bb5')}`}} className="black-key Bb5-key"></div>
                <div style={{backgroundColor: `${this.activate('B5')}`}} className="white-key B5-key"></div>
            </div>
        )
    }
}

export default Piano;