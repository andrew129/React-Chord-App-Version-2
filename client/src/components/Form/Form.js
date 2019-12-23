import React from 'react';
import './style.css';

class Form extends React.Component {
    state = {
        name: '',
        chord: ''
    }

    onFormSubmit = event => {
        event.preventDefault()
        this.props.onSubmit(this.state.name, this.state.chord)
        this.setState({
            name: '',
            chord: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 100}} className='ui segment chord-form'>
                <h2 class='text-center'>Add Chord</h2>
                <form onSubmit={this.onFormSubmit} className='ui form'>
                    <div className='field'>
                        <label>Name</label>
                        <input placeholder='Enter Name' type='text' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className='field'>
                        <label>Notes in Chord</label>
                        <input placeholder="Enter Notes in chord with octave (ex. E5, A3)" type='text' value={this.state.chord} onChange={(e) => this.setState({ chord: e.target.value })} />
                    </div>
                    <button style={{marginBottom: 10}} className='ui purple button w-100'>Submit</button>
                </form>
                <p style={{color: 'red'}} className='text-center'>{this.props.message}</p>
            </div>
        )
    }
}

export default Form;