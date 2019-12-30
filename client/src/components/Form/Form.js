import React from 'react';
import './style.css';
import Select from 'react-select';

const chords = [
    { value: 'Major', label: 'Major'},
    {value: 'Minor', label: 'Minor'},
    {value: 'Dominant', label: 'Dominant'},
    {value: 'Diminished', label: 'Diminished'},
    {value: 'Augmented', label: 'Augmented'},
    {value: 'Suspended', label: 'Suspended'}
]

class Form extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        chord: '',
        chordName: '',
        selectedOption: ''
    }

    onFormSubmit = event => {
        const {value} = this.state.selectedOption
        console.log(value)
        event.preventDefault()
        this.props.onSubmit(this.state.firstName, this.state.lastName, this.state.chord, this.state.chordName, value)
        this.setState({
            firstName: '',
            lastName: '',
            chord: '',
            chordName: '',
            selectedOption: ''
        })
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption })
    }

    render() {
        const {selectedOption} = this.state
        return (
            <div style={{marginTop: 100}} className='ui segment chord-form'>
                <h2 className='text-center'>Add Chord</h2>
                <form onSubmit={this.onFormSubmit} className='ui form'>
                    <div className='field'>
                        <label>First Name</label>
                        <input placeholder='Enter Your First Name' type='text' value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
                    </div>
                    <div className='field'>
                        <label>Last Name</label>
                        <input placeholder='Enter Your Last Name' type='text' value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
                    </div>
                    <div className='field'>
                        <label>Name of Chord</label>
                        <input placeholder='Enter Chord Name' type='text' value={this.state.chordName} onChange={(e) => this.setState({ chordName: e.target.value })} />
                    </div>
                    <div className='field'>
                        <label>Notes in Chord (ex. A#5, E5, C3)</label>
                        <input placeholder="Enter Notes in chord with the octave seperated by commas (ex. E5, A3)" type='text' value={this.state.chord} onChange={(e) => this.setState({ chord: e.target.value })} />
                    </div>
                    <div className='field'>
                        <label>Type of Chord</label>
                        <Select 
                            value={selectedOption}
                            placeholder={"Select Type of Chord"}
                            onChange={this.handleChange}
                            options={chords}
                        />
                    </div>
                    <button style={{marginBottom: 10}} className='ui purple button w-100'>Submit</button>
                </form>
                <p style={{color: 'red'}} className='text-center'>{this.props.message}</p>
            </div>
        )
    }
}

export default Form;