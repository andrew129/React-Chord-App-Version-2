import React from 'react';
import Select from 'react-select';

const chords = [
  { value: 'All', label: 'All'},
  { value: 'Major', label: 'Major'},
  {value: 'Minor', label: 'Minor'},
  {value: 'Dominant', label: 'Dominant'},
  {value: 'Diminished', label: 'Diminished'},
  {value: 'Augmented', label: 'Augmented'},
  {value: 'Suspended', label: 'Suspended'}
]

const customStyles = {
  control: (provided) => ({
      ...provided,
      marginTop: 111,
      width: '75%',
      background: '#a333c8',
      color: 'white',
      border: 'solid 2px black',
      marginLeft: 60,
      cursor: 'pointer'
  }),
  option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? 'red' : '',
      cursor: 'pointer'
  }),
  singleValue: (provided) => ({
      ...provided,
      color: 'white',
      cursor: 'pointer'
  })
}

class Filter extends React.Component {
  state = {
    selectedChordType: '',
    selectedChord: ''
  }

  handleChange = selectedChord => {
    this.setState({
      selectedChord,
    })
    console.log(this.state.selectedChord)
    this.setState({
      selectedChordType: selectedChord.value
    })
    console.log(this.state.selectedChordType)
    this.props.getNewChords(selectedChord.value)
  }

  render() {
    const {selectedChord} = this.state
    return (
      <div>
        <Select 
          value={selectedChord}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          options={chords}
          styles={customStyles}
        />
      </div>
    )
  }
}

export default Filter;

