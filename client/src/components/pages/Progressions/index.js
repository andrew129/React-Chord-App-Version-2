import React from 'react';
import ProgressionForm from '../../ProgressionForm/ProgressionForm';
import API from '../../../utils/api';
import Spinner from '../../Spinner/Spinner';
import ProgressionList from '../../ProgressionList/ProgressionList';
import './style.css';

class Progressions extends React.Component {

    state = {
        message: '',
        loading: false,
        loadingMessage: '',
        progressions: []
    }

    componentDidMount() {
        this.getProgressions()
    }

    onProgSubmit = (firstname, lastname, title, chordProg, genre) => {

        const upperFirstName = firstname.charAt(0).toUpperCase() + firstname.slice(1) 
        const upperLastName = lastname.charAt(0).toUpperCase() + lastname.slice(1)

        const data = {
           author: upperFirstName + " " + upperLastName,
           title: title,
           currentChords: chordProg.split(','),
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
                    </div>
                    <div className='col-6 title'>
                        <h1>Chord Progressions Gallery</h1>
                        <p>Find the best Progression to use in your song</p>
                    </div>
                    <div className='col-3'>
                    </div>
                </div>
                <div className='row'>
                    {(!this.state.loading) &&
                        <div className='col-12'>
                            <ProgressionList 
                                progressions={this.state.progressions}
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

