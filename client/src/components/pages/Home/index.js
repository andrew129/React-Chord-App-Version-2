import React from 'react';
import Form from '../../Form/Form';
import ChordList from '../../ChordList/ChordList';
import API from '../../../utils/api';
import Spinner from '../../Spinner/Spinner';
import Pagination from '../../Pagination/Pagination';
import Filter from '../../Filter/Filter';
import Select from 'react-select';
import './style.css'

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

class Home extends React.Component {

    state = {
        chords: [],
        message: '',
        loading: false,
        loadingMessage: '',
        chordsPerPage: 36,
        currentPage: 1,
        currentColor: '',
        selectedOption: null,
        selectedValue: '',
        selectedChordType: '',
        selectedChord: null
    }

    componentDidMount() {
        this.getChords()
    }

    onSearchSubmit = (firstname, lastname, chord, chordName, chordType) => {
        this.setState({ message: '' })
        if (firstname && lastname && chord && chordName && chordType && /,\s*/.test(chord) && /(.*[3-6]){2}/i.test(chord) && chord.length >= 5) {
            const upperFirstName = firstname.charAt(0).toUpperCase() + firstname.slice(1) //first character in string to uppercase//
            const upperLastName = lastname.charAt(0).toUpperCase() + lastname.slice(1)
            const bestChord = chord.split(',')
            let trimmedArr = bestChord.map(note => {
                return note.trim().replace(/C#|c#|DB/g, 'Db').replace(/D#|d#|Eb/g, 'Eb').replace(/F#|f#|GB/g, 'Gb').replace(/G#|g#|AB/g, 'Ab').replace(/A#|a#|BB/g, 'Bb')
            })

            const newChord = {
                author: upperFirstName + ' ' + upperLastName,
                chordName: chordName,
                currentNotes: trimmedArr,
                type: chordType
            }

            API.saveChord(newChord)
                .then(res => {
                    console.log(res)
                    this.setState({
                        message: '',
                        loading: true,
                        loadingMessage: 'Updating Chords'
                    })
                    setTimeout(() => {
                        this.getChords()
                        this.setState({
                            loading: false
                        })
                    }, 2000)
                })
                // .catch(err => {
                //     this.setState({
                //         loading: false,
                //         message: 'Error Unique: Chord Already Exists in Database'
                //     })
                //     console.log(err)
                // })
        }
        
        else if (firstname || lastname || chord || chordName || chordType === '') {
            this.setState({
                message: 'Error Submitting: Please Fill out all Fields'
            })
        }

        else if (firstname && lastname && chord && chordName && chordType && chord.length < 5) {
            this.setState({
                message: 'Error Submitting: Notes in Chords field must be at least 5 Characters long'
            })
        }
        //testing for commas between every word//
        else if (firstname && lastname && chord && chordName && chordType && !/,\s*/.test(chord)) {
            this.setState({
                message: 'Error Submitting: Please Place a Comma between Every Note(ex. A5, D5)'
            })
        }

        else if (firstname && lastname && chord && chordName && chordType && chord.length >= 5 && !/(.*[3-6]){2}/i.test(chord)) {
            this.setState({
                message: 'Error Submitting: There must be at least two numbers and they must be between 3 and 6 (ex. A#5, D#3...)'
            })
        }

    }

    getChords = () => {
        this.setState({
            loading: true,
            loadingMessage: 'Loading Chords'
        })
        API.getChords()
            .then(res => {
                const randomChords = this.randomize(res.data)
                this.setState({
                    chords: randomChords,
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

    paginate = (pageNumber) => {
        this.setState({
            currentPage: pageNumber,
        })
    }

    randomize = arr => {
        let newArray = arr;
        for (let i = newArray.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption })
        this.setState({
            selectedValue: selectedOption.value
        })
    };

    getNewChords = chordType => {
        console.log(chordType)
        this.setState({
            loading: true,
            chords: []
        })
        API.getChords()
            .then(res => {
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                }, 1000)
                if (chordType === 'All') {
                    this.setState({
                        chords: res.data
                    })
                }
                else {
                    const currentChords = res.data.filter(chord => chord.type === chordType)
                    this.setState({
                        chords: currentChords
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const indexOfLast = this.state.currentPage * this.state.chordsPerPage
        const indexOfFirst = indexOfLast - this.state.chordsPerPage
        const currentChords = this.state.chords.slice(indexOfFirst, indexOfLast)
        const {selectedOption} = this.state
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-3'>
                    </div>
                    <div className='col-6'>
                        <Form
                            onSubmit={this.onSearchSubmit}
                            message={this.state.message}
                        />
                    </div>
                    <div className='col-3'>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-2'>
                        <Filter
                            getNewChords={this.getNewChords}
                            placeholder={" Select Type "}
                        />
                    </div>
                    <div className='col-8'>
                        <h2 className='text-center' style={{marginTop: 80}}>Chord Gallery</h2>
                        <p className='text-center description'>Discover new and interesting Chords, Create more interesting music. Select a sound with the selector on the right and click on each keyboard to hear the chord played.  To filter by chord type click the box on the left.</p>
                    </div>
                    <div className='col-2'>
                        <Select 
                            value={selectedOption}
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
                            <ChordList soundName={this.state.selectedValue} chords={currentChords} />
                        </div>
                    }
                    {(this.state.loading) &&
                        <div className='col-12'>
                            <Spinner />
                            <p style={{marginTop: 10}} className='text-center'>{this.state.loadingMessage}</p>
                        </div>
                    } 
                </div>
                <div className='row'>
                    <div className='col-2'>               
                    </div>
                    <div className='col-8'>
                        <Pagination
                            totalChords={this.state.chords.length}
                            chordsPerPage={this.state.chordsPerPage}
                            paginate={this.paginate}
                            currentColor={this.state.currentColor}
                        />
                    </div>
                    <div className='col-2'>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home