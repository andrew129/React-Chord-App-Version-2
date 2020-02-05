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
    }
}