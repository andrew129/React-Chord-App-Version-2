import React from 'react';
import './style.css'

class Piano extends React.Component {

    state = {
        active: false
    }

    handleClick = event => {
        const theOne = event.target.getAttribute('Db3')
        console.log(theOne)
        this.setState({
            active: true
        })
    }

    render() {
        console.log(this.props.activeNotes)
        const activeColorWhite = this.state.active ? 'black' : 'white'
        return (
            <div style={{cursor: 'pointer'}} class="piano">
                <div onClick={this.handleClick} style={{backgroundColor: `${activeColorWhite}`}} data-note="C3" class="white-key C3-key"></div>
                <div data-note="Db3" class="black-key Db3-key"></div>
                <div data-note="D3" class="white-key D3-key"></div>
                <div data-note="Eb3" class="black-key Eb3-key"></div>
                <div data-note="E3"  class="white-key E3-key"></div>
                <div data-note="F3"  class="white-key F3-key"></div>
                <div data-note="Gb3" class="black-key Gb3-key"></div>
                <div data-note="G3" class="white-key G3-key"></div>
                <div data-note="Ab3" class="black-key Ab3-key"></div>
                <div data-note="A3" class="white-key A3-key"></div>
                <div data-note="Bb3" class="black-key Bb3-key"></div>
                <div data-note="B3" class="white-key B3-key"></div>
                <div data-note="C4" class="white-key C4-key"></div>
                <div data-note="Db4" class="black-key Db4-key"></div>
                <div data-note="D4" class="white-key D4-key"></div>
                <div data-note="Eb4" class="black-key Eb4-key"></div>
                <div data-note="E4" class="white-key E4-key"></div>
                <div data-note="F4" class="white-key F4-key"></div>
                <div data-note="Gb4" class="black-key Gb4-key"></div>
                <div data-note="G4" class="white-key G4-key"></div>
                <div data-note="Ab4" class="black-key Ab4-key"></div>
                <div data-note="A4" class="white-key A4-key"></div>
                <div data-note="Bb4" class="black-key Bb4-key"></div>
                <div data-note="B4" class="white-key B4-key"></div>
                <div data-note="C5" class="white-key C5-key"></div>
                <div data-note="Db5" class="black-key Db5-key"></div>
                <div data-note="D5" class="white-key D5-key"></div>
                <div data-note="Eb5" class="black-key Eb5-key"></div>
                <div data-note="E5" class="white-key E5-key"></div>
                <div data-note="F5" class="white-key F5-key"></div>
                <div data-note="Gb5" class="black-key Gb5-key"></div>
                <div data-note="G5" class="white-key G5-key"></div>
                <div data-note="Ab5" class="black-key Ab5-key"></div>
                <div data-note="A5" class="white-key A5-key"></div>
                <div data-note="Bb5" class="black-key Bb5-key"></div>
                <div data-note="B5" class="white-key B5-key"></div>
            </div>
        )
    }
}

export default Piano;