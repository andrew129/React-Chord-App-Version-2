import React from 'react';
import './style.css';
import Select from 'react-select';

const genres = [
    { value: 'Jazz', label: 'Jazz'},
    { value: 'Classical', label: 'Classical'},
    { value: 'Pop', label: 'Pop'},
    { value: 'R&B', label: 'R&B'},
    { value: 'Neo Soul', label: 'Neo Soul'},
]

class ProgressionForm extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        title: '',
        chordProg: '',
        selectedOption: ''
    }

    onFormSubmit = event => {
        const {value} = this.state.selectedOption
        event.preventDefault()
        this.props.onProgSubmit(this.state.firstName, this.state.lastName, this.state.title, this.state.chordProg, value)
        this.setState({
            firstName: '',
            lastName: '',
            title: '',
            chordProg: '',
            selectedOption: ''
        })
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption })
    }

    render() {
        const {selectedOption} = this.state
        return (
            <div style={{marginTop: 100}} className='ui segment progression-form'>
                <h2 className='text-center'>Add Progression</h2>
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
                        <label>Give it a good title</label>
                        <input placeholder='Enter a good title' type='text' value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                    </div>
                    <div className='field'>
                        <label>Chords (enter each note seperated by a space and each chord seperated by a comma ex. (E3 B3 G3, A3 B3 D3 A3)</label>
                        <textarea placeholder='Enter Your Progression with at least two chords' type='text' value={this.state.chordProg} onChange={(e) => this.setState({ chordProg: e.target.value })} />
                    </div>
                    <div className='field'>
                        <label>Genre of Chord Progression</label>
                        <Select 
                            value={selectedOption}
                            placeholder={"Select Genre of Progression"}
                            onChange={this.handleChange}
                            options={genres}
                        />
                    </div>
                    <button className='ui purple button w-100'>Submit</button>
                    <p style={{color: 'red'}} className='text-center'>{this.props.message}</p>
                </form>
            </div> 
        )
    }
}

export default ProgressionForm;