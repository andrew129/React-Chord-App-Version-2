import React from 'react';
import ProgressionForm from '../../ProgressionForm/ProgressionForm';
import API from '../../../utils/api';
import Spinner from '../../Spinner/Spinner';
import ProgressionList from '../../ProgressionList/ProgressionList';
import Select from 'react-select';
import './style.css';

const options = [
    { value: 'Ambient Pad', label: 'Ambient Pad' },
    { value: 'Breezy Day', label: 'Breezy Day' },
    { value: 'Damp Cave', label: 'Damp Cave' },
    { value: 'Piano', label: 'Piano' }
];

const optionsTwo = [
    { value: 'Jazz', label: 'Jazz' },
    { value: 'Classical', label: 'Classical' },
    { value: 'R&B', label: 'R&B' },
    { value: 'Neo Soul', label: 'Neo Soul' },
    { value: 'Pop', label: 'Pop' },
];


const customStyles = {
    control: (provided) => ({
        ...provided,
        marginTop: '10px',
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

class Progressions extends React.Component {

    state = {
        message: '',
        loading: false,
        loadingMessage: '',
        progressions: [],
        selectedOption: null,
        selectedValue: '',
        selectedOptionTwo: null,
        selectedValueTwo: ''
    }

    componentDidMount() {
        this.getProgressions()
    }

    onProgSubmit = (firstname, lastname, title, chordProg, genre) => {

        const chords = chordProg.split(',')
        let trimmedChords = chords.map(note => {
            return note.trim().replace(/C#|c#|DB/g, 'Db').replace(/D#|d#|Eb/g, 'Eb').replace(/F#|f#|GB/g, 'Gb').replace(/G#|g#|AB/g, 'Ab').replace(/A#|a#|BB/g, 'Bb')
        })
        const upperFirstName = firstname.charAt(0).toUpperCase() + firstname.slice(1) 
        const upperLastName = lastname.charAt(0).toUpperCase() + lastname.slice(1)

        const data = {
           author: upperFirstName + " " + upperLastName,
           title: title,
           currentChords: trimmedChords,
           genre: genre
        }

        if (firstname && lastname && title && chordProg && genre) {
            API.saveProgression(data)
                .then(res => {
                    console.log(res)
                    this.setState({
                        loading: true,
                        message: '',
                        loadingMessage: 'Please Wait While Chord Progressions are Loading'
                    })
                    setTimeout(() => {
                        this.getProgressions()
                        this.setState({
                            loading: false,
                        })
                    }, 2000)
                })
        }

        else {
            this.setState({
                message: 'Please fill out all fields'
            })
        }

    }

    getProgressions = () => {
        this.setState({
            loading: true,
            loadingMessage: 'Loading Progressions'
        })
        API.getProgressions()
            .then(res => {
                this.setState({
                    progressions: res.data,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    message: 'Currently Having Server Issues Try Later'
                })
            })
    } 

    handleChange = selectedOption => {
        this.setState({ selectedOption })
        this.setState({
            selectedValue: selectedOption.value
        })
    };

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-3'>
                    </div>
                    <div className='col-6'>
                        <ProgressionForm
                            onProgSubmit={this.onProgSubmit}
                            message={this.state.message} 
                        />
                    </div>
                    <div className='col-3'>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3'>
                        <Select 
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={optionsTwo}
                            styles={customStyles}
                            placeholder={" Filter By Genre "}
                        />
                    </div>
                    <div className='col-6 title'>
                        <h1>Chord Progressions Gallery</h1>
                        <p>Find the best Progression to use in your song.  Select your favorite sound with the sound selector on the right and click the play button to hear the chord progression.</p>
                    </div>
                    <div className='col-3'>
                        <Select 
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={options}
                            styles={customStyles}
                            placeholder={" Select Sound "}
                        />
                    </div>
                </div>
                <div className='row'>
                    {(!this.state.loading) &&
                        <div className='col-12'>
                            <ProgressionList 
                                progressions={this.state.progressions}
                                soundName={this.state.selectedValue}
                            />
                        </div>
                    }
                    {(this.state.loading) &&
                        <div className='col-12'>
                            <Spinner />
                            <p style={{marginTop: 10, marginBottom: 80}} className='text-center'>{this.state.loadingMessage}</p>
                        </div>
                    } 
                </div>
            </div>
        )
    }
}

export default Progressions;

