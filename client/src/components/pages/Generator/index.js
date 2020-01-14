import React from 'react';
import Chord from '../../ChordCard/ChordCard';
// import API from '../../../utils/api';
import Spinner from '../../Spinner/Spinner';
import Select from 'react-select';
import './style.css';

const options = [
    { value: 'Ambient Pad', label: 'Ambient Pad' },
    { value: 'Breezy Day', label: 'Breezy Day' },
];


const customStyles = {
    control: (provided) => ({
        ...provided,
        marginTop: 111,
        marginRight: '110px',
        width: '75%',
        background: '#a333c8',
        color: 'white',
        border: 'solid 2px black',
        cursor: 'pointer'
    }),
    option: (provided, state) => ({
        ...provided,
        background: state.isSelected ? 'red' : '',
        cursor: 'pointer'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white'
    })
  }

class Generator extends React.Component {
    state = {
        showChord: false,
        author: '',
        chordName: '',
        activeNotes: '',
        loading: false,
        possibleNotes: ['C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4', 'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5'],
        selectedValue: '',
        selectedOption: null
    }

    handleClick = () => {
        this.setState({
            loading: true,
            showChord: false
        })

        const selectedNotes = this.selectNotes(this.state.possibleNotes)
        
        setTimeout(() => {
            this.setState({
                loading: false,
                showChord: true,
                activeNotes: selectedNotes,
                author: 'Andrew Stiles',
                chordName: 'Unknown'
            })
        }, 1000)

        // API.getChords()
        //     .then(res => {
        //         console.log(res.data[Math.floor(res.data.length * Math.random())])
        //         const randomChord = res.data[Math.floor(res.data.length * Math.random())]
        //         setTimeout(() => {
        //             this.setState({
        //                 author: randomChord.author,
        //                 chordName: randomChord.chordName,
        //                 activeNotes: randomChord.currentNotes,
        //                 showChord: true,
        //                 loading: false
        //             })
        //         }, 1000)
        //     })
        //     .catch(err => {
        //         console.log(err)
    }

    selectNotes = arr => {
        const min = 3
        const max = 9
        const selectedNotes = []
        for (let i = 0; i < Math.random() * (+max - +min) + +min; i++) {
            const randomNote = arr[Math.floor(arr.length * Math.random())]
            selectedNotes.push(randomNote)
        }
        return selectedNotes
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption })
        this.setState({
            selectedValue: selectedOption.value
        })
    };

    render() {
        return (
            <div class='container'>
                <div class='row'>
                    <div class='col-3'>
                    </div>
                    <div style={{marginTop: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} className='col-6 generator ui segment'>
                        <h2>Magic Button</h2>
                        <h5>Click the Magic Button to reveal a randomly generated Chord, use it wisely. Warning, Since this is random some of the chords will sound horrible.  Once again use the selector to choose the sound.</h5>
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
                                soundName={this.state.selectedValue}
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
                        <Select 
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={options}
                            styles={customStyles}
                            placeholder={" Select Sound "}
                        />
                    </div>
                </div>
            </div>
        )
    }

}

export default Generator;