import axios from 'axios';

export default {
    saveChord: function(data) {
        console.log('data coming in', data)
        return axios.post('/api/chords', data)
    },

    getChords: function() {
        return axios.get('/api/chords')
    },

    getChordsByType: function(type) {
        return axios.get('/api/chords' + type)
    }
}