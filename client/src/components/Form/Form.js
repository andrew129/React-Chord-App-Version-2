import React from 'react';
import './style.css';

class Form extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        chord: ''
    }

    onFormSubmit = event => {
        event.preventDefault()
        this.props.onSubmit(this.state.firstName, this.state.lastName, this.state.chord)
        this.setState({
            firstName: '',
            lastName: '',
            chord: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 100}} className='ui segment chord-form'>
                <h2 class='text-center'>Add Chord</h2>
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
                        <label>Notes in Chord</label>
                        <input placeholder="Enter Notes in chord with the octave seperated by commas (ex. E5, A3)" type='text' value={this.state.chord} onChange={(e) => this.setState({ chord: e.target.value })} />
                    </div>
                    <button style={{marginBottom: 10}} className='ui purple button w-100'>Submit</button>
                </form>
                <p style={{color: 'red'}} className='text-center'>{this.props.message}</p>
            </div>
        )
    }
}

export default Form;