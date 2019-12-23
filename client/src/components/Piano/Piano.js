import React from 'react';
import './style.css'
import Tone from 'tone';

class Piano extends React.Component {

    state = {
        C3: 'white',
        Db3: 'linear-gradient(#000000, #303030)',
        D3: 'white',
        Eb3: 'linear-gradient(#000000, #303030)',
        E3: 'white',
        F3: 'white',
        Gb3: 'linear-gradient(#000000, #303030)',
        G3: 'white',
        Ab3: 'linear-gradient(#000000, #303030)',
        A3: 'white',
        Bb3: 'linear-gradient(#000000, #303030)',
        B3: 'white',
        C4: 'white',
        Db4: 'linear-gradient(#000000, #303030)',
        D4: 'white',
        Eb4: 'linear-gradient(#000000, #303030)',
        E4: 'white',
        F4: 'white',
        Gb4: 'linear-gradient(#000000, #303030)',
        G4: 'white',
        Ab4: 'linear-gradient(#000000, #303030)',
        A4: 'white',
        Bb4: 'linear-gradient(#000000, #303030)',
        B4: 'white',
        C5: 'white',
        Db5: 'linear-gradient(#000000, #303030)',
        D5: 'white',
        Eb5: 'linear-gradient(#000000, #303030)',
        E5: 'white',
        F5: 'white',
        Gb5: 'linear-gradient(#000000, #303030)',
        G5: 'white',
        Ab5: 'linear-gradient(#000000, #303030)',
        A5: 'white',
        Bb5: 'linear-gradient(#000000, #303030)',
        B5: 'white'
    }

    componentDidMount() {
        this.activate()
    }

    handleClick = () => {
        const synthA = new Tone.PolySynth(8, Tone.Synth, {
            oscillator : {
              type : "sine",
              partials : [0, 1, 6, 7]
            },
          
            "envelope" : {
              "attack" : 1,
              "decay" : 0,
              "sustain" : 1,
              "release" : 4,
            },
          
            "portamento" : 0.03,
          
            "pitchShift" : {
              "pitch" : -12
            },
            
          })
        synthA.toMaster()
        synthA.triggerAttackRelease(this.props.activeNotes, "4n")
    }

    activate = () => {
        if (this.props.activeNotes.includes('C3' || 'c3')) {
            this.setState({
                C3: 'red',
            })
        }
        if (this.props.activeNotes.includes('Db3' || 'db3')) {
            this.setState({
                Db3: 'red'
            })
        }
        if (this.props.activeNotes.includes('D3' || 'd3')) {
            this.setState({
                D3: 'red'
            })
        }
        if (this.props.activeNotes.includes('Eb3' || 'eb3')) {
            this.setState({
                Eb3: 'red'
            })
        }
        if (this.props.activeNotes.includes('E3' || 'e3')) {
            this.setState({
                E3: 'red'
            })
        }
        if (this.props.activeNotes.includes('F3' || 'f3')) {
            this.setState({
                F3: 'red'
            })
        }
        if (this.props.activeNotes.includes('Db3' || 'db3')) {
            this.setState({
                Gb3: 'red'
            })
        }
        if (this.props.activeNotes.includes('G3' || 'g3')) {
            this.setState({
                G3: 'red'
            })
        }
        if (this.props.activeNotes.includes('Ab3' || 'ab3')) {
            this.setState({
                Ab3: 'red'
            })
        }
        if (this.props.activeNotes.includes('A3' || 'a3')) {
            this.setState({
                A3: 'red'
            })
        }
        if (this.props.activeNotes.includes('Bb3' || 'bb3')) {
            this.setState({
                Bb3: 'red'
            })
        }
        if (this.props.activeNotes.includes('B3' || 'b3')) {
            this.setState({
                B3: 'red'
            })
        }
        if (this.props.activeNotes.includes('C4' || 'c4')) {
            this.setState({
                C4: 'red',
            })
        }
        if (this.props.activeNotes.includes('Db4' || 'db4')) {
            this.setState({
                Db4: 'red'
            })
        }
        if (this.props.activeNotes.includes('D4' || 'd4')) {
            this.setState({
                D4: 'red'
            })
        }
        if (this.props.activeNotes.includes('Eb4' || 'eb4')) {
            this.setState({
                Eb4: 'red'
            })
        }
        if (this.props.activeNotes.includes('E4' || 'e4')) {
            this.setState({
                E4: 'red'
            })
        }
        if (this.props.activeNotes.includes('F4' || 'f4')) {
            this.setState({
                F4: 'red'
            })
        }
        if (this.props.activeNotes.includes('Db4' || 'db4')) {
            this.setState({
                Gb4: 'red'
            })
        }
        if (this.props.activeNotes.includes('G4' || 'g4')) {
            this.setState({
                G4: 'red'
            })
        }
        if (this.props.activeNotes.includes('Ab4' || 'ab4')) {
            this.setState({
                Ab4: 'red'
            })
        }
        if (this.props.activeNotes.includes('A4' || 'a4')) {
            this.setState({
                A4: 'red'
            })
        }
        if (this.props.activeNotes.includes('Bb4' || 'bb4')) {
            this.setState({
                Bb4: 'red'
            })
        }
        if (this.props.activeNotes.includes('B4' || 'b4')) {
            this.setState({
                B4: 'red'
            })
        }
        if (this.props.activeNotes.includes('C5' || 'c5')) {
            this.setState({
                C5: 'red',
            })
        }
        if (this.props.activeNotes.includes('Db5' || 'db5')) {
            this.setState({
                Db5: 'red'
            })
        }
        if (this.props.activeNotes.includes('D5' || 'd5')) {
            this.setState({
                D5: 'red'
            })
        }
        if (this.props.activeNotes.includes('Eb5' || 'eb5')) {
            this.setState({
                Eb5: 'red'
            })
        }
        if (this.props.activeNotes.includes('E5' || 'e5')) {
            this.setState({
                E5: 'red'
            })
        }
        if (this.props.activeNotes.includes('F5' || 'f5')) {
            this.setState({
                F5: 'red'
            })
        }
        if (this.props.activeNotes.includes('Gb5' || 'gb5')) {
            this.setState({
                Gb5: 'red'
            })
        }
        if (this.props.activeNotes.includes('G5' || 'g5')) {
            this.setState({
                G5: 'red'
            })
        }
        if (this.props.activeNotes.includes('Ab5' || 'ab5')) {
            this.setState({
                Ab5: 'red'
            })
        }
        if (this.props.activeNotes.includes('A5' || 'a5')) {
            this.setState({
                A5: 'red'
            })
        }
        if (this.props.activeNotes.includes('Bb5' || 'bb5')) {
            this.setState({
                Bb5: 'red'
            })
        }
        if (this.props.activeNotes.includes('B5' || 'b5')) {
            this.setState({
                B5: 'red'
            })
        }
    }

    render() {
        console.log(this.props.activeNotes)
        return (
            <div onClick={this.handleClick} style={{cursor: 'pointer'}} className="piano">
                <div style={{backgroundColor: `${this.state.C3}`}} data-note="C3" className="white-key C3-key"></div>
                <div style={{background: `${this.state.Db3}`}} data-note="Db3" className="black-key Db3-key"></div>
                <div data-note="D3" style={{backgroundColor: `${this.state.D3}`}} className="white-key D3-key"></div>
                <div data-note="Eb3" style={{background: `${this.state.Eb3}`}} className="black-key Eb3-key"></div>
                <div data-note="E3" style={{backgroundColor: `${this.state.E3}`}}  className="white-key E3-key"></div>
                <div data-note="F3" style={{backgroundColor: `${this.state.F3}`}}  className="white-key F3-key"></div>
                <div data-note="Gb3" style={{background: `${this.state.Gb3}`}} className="black-key Gb3-key"></div>
                <div data-note="G3" style={{backgroundColor: `${this.state.G3}`}} className="white-key G3-key"></div>
                <div data-note="Ab3" style={{background: `${this.state.Ab3}`}} className="black-key Ab3-key"></div>
                <div data-note="A3" style={{backgroundColor: `${this.state.A3}`}} className="white-key A3-key"></div>
                <div data-note="Bb3" style={{background: `${this.state.Bb3}`}} className="black-key Bb3-key"></div>
                <div data-note="B3" style={{backgroundColor: `${this.state.B3}`}} className="white-key B3-key"></div>
                <div data-note="C4" style={{backgroundColor: `${this.state.C4}`}} className="white-key C4-key"></div>
                <div data-note="Db4" style={{background: `${this.state.Db4}`}} className="black-key Db4-key"></div>
                <div data-note="D4" style={{backgroundColor: `${this.state.D4}`}} className="white-key D4-key"></div>
                <div data-note="Eb4" style={{background: `${this.state.Eb4}`}} className="black-key Eb4-key"></div>
                <div data-note="E4" style={{backgroundColor: `${this.state.E4}`}} className="white-key E4-key"></div>
                <div data-note="F4" style={{backgroundColor: `${this.state.F4}`}} className="white-key F4-key"></div>
                <div data-note="Gb4" style={{background: `${this.state.Gb4}`}} className="black-key Gb4-key"></div>
                <div data-note="G4" style={{backgroundColor: `${this.state.G4}`}} className="white-key G4-key"></div>
                <div data-note="Ab4" style={{background: `${this.state.Ab4}`}} className="black-key Ab4-key"></div>
                <div data-note="A4" style={{backgroundColor: `${this.state.A4}`}} className="white-key A4-key"></div>
                <div data-note="Bb4" style={{background: `${this.state.Bb4}`}} className="black-key Bb4-key"></div>
                <div data-note="B4" style={{backgroundColor: `${this.state.B4}`}} className="white-key B4-key"></div>
                <div data-note="C5" style={{backgroundColor: `${this.state.C5}`}} className="white-key C5-key"></div>
                <div data-note="Db5" style={{background: `${this.state.Db5}`}} className="black-key Db5-key"></div>
                <div data-note="D5" style={{backgroundColor: `${this.state.D5}`}} className="white-key D5-key"></div>
                <div data-note="Eb5" style={{background: `${this.state.Eb5}`}} className="black-key Eb5-key"></div>
                <div data-note="E5" style={{backgroundColor: `${this.state.E5}`}} className="white-key E5-key"></div>
                <div data-note="F5" style={{backgroundColor: `${this.state.F5}`}} className="white-key F5-key"></div>
                <div data-note="Gb5" style={{background: `${this.state.Gb5}`}} className="black-key Gb5-key"></div>
                <div data-note="G5" style={{backgroundColor: `${this.state.G5}`}} className="white-key G5-key"></div>
                <div data-note="Ab5" style={{background: `${this.state.Ab5}`}} className="black-key Ab5-key"></div>
                <div data-note="A5" style={{backgroundColor: `${this.state.A5}`}} className="white-key A5-key"></div>
                <div data-note="Bb5" style={{background: `${this.state.Bb5}`}} className="black-key Bb5-key"></div>
                <div data-note="B5" style={{backgroundColor: `${this.state.B5}`}} className="white-key B5-key"></div>
            </div>
        )
    }
}

export default Piano;