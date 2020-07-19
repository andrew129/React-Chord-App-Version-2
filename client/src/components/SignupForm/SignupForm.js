import React from 'react';
import API from '../../utils/api';

export default class SignupForm extends React.Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    }

    handleSubmit = e => {
        e.preventDefault()

        const userObj = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }

        console.log(userObj)

        API.registerUser(userObj).then(function(res) {
            console.log(res)
        })

    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div class='col-md-3'></div>
                    <div style={{marginTop: 220}} class='col-md-6 col-12'>
                        <div style={{marginBottom: 40}} className='text-center'>
                            <h1 style={{marginBottom: 10, fontSize: 35}} className='ui header text-center'>Sign Up</h1>
                            <p>Start Submitting Your Chords</p>
                        </div>
                        <form onSubmit={this.handleSubmit} class="ui form">
                            <div class="field">
                                <label>First Name</label>
                                <input value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value})} placeholder="First Name" />
                            </div>
                            <div class="field">
                                <label>Last Name</label>
                                <input value={this.state.last_name} onChange={(e) => this.setState({last_name: e.target.value})} placeholder="Last Name" />
                            </div>
                            <div class="field">
                                <label>Email Address</label>
                                <input value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} placeholder="Enter Email Address" />
                            </div>
                            <div class="field">
                                <label>Password</label>
                                <input value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} placeholder="Enter Password" />
                            </div>
                            <button type="submit" class="ui basic purple button w-100">Register</button>
                            <a href='/user/login' className='nav-link'>Already have an account sign in here</a>
                        </form>
                    </div>
                    <div class='col-md-3'></div>
                </div>
            </div>
        )
    }
}