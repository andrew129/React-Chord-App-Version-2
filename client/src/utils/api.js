import axios from 'axios';

export default {
    saveChord: function(data) {
        console.log('data coming in', data)
        return axios.post('/api/chords', data)
    },

    getChords: function() {
        return axios.get('/api/chords')
    },

    saveProgression: function(data) {
        console.log('data coming in', data)
        return axios.post('/api/progressions', data)
    },

    getProgressions: function() {
        return axios.get('/api/progressions')
    },

    getUsers: function() {
        return axios.get('/api/users')
    },

    registerUser: function(data) {
        return axios.post('/api/users/signup', data)
    },

    signInUser: function(data) {
        return axios.post('/api/users/login', data)
    },
    getUserInfo: function() {
        return axios.get('/api/users/info')
    },
    logoutUser: function() {
        return axios.get('/api/users/logout')
    },
    updateUser: function(id) {
        return axios.put('/api/users/addChord/' + id)
    },
    deleteFromUserProfile: function(id) {
        return axios.put('/api/users/removeChord/' + id)
    }
}