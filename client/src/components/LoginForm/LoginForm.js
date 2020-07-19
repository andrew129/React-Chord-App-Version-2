import React from 'react';
import API from '../../utils/api';

export default class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        name: ''
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        API.getUserInfo().then(res => {
            console.log(res)
            if (res.data) {
                this.setState({ name: res.data.first_name })
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        const userObj = {
            email: this.state.email,
            password: this.state.password
        }

        API.signInUser(userObj).then(res => {
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
                            <h1 style={{marginBottom: 10, fontSize: 35}} className='ui header text-center'>Sign in to your account</h1>
                        </div>
                        <form onSubmit={this.handleSubmit} class="ui form">
                            <div class="field">
                                <label>Email Address</label>
                                <input value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} placeholder="Enter Email Address" />
                            </div>
                            <div class="field">
                                <label>Password</label>
                                <input value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} placeholder="Enter Password" />
                            </div>
                            <button type="submit" class="ui basic purple button w-100">Register</button>
                            <a href='/user/signup' className='nav-link'>Don't have an account, sign up</a>
                        </form>
                    </div>
                    <div class='col-md-3'></div>
                </div>
                <p>Name: {this.state.name}</p>
            </div>
        )
    }
}