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
    selectedValue: '',
    selectedOption: null
  }

  handleInputChange = selectedOption => {
    this.setState({
      selectedOption,
    })
    console.log(this.state.selectedOption)
    this.setState({
      selectedValue: selectedOption.value
    })
    console.log(this.state.selectedValue)
    this.props.getNewChords(this.state.selectedValue)
  }

  render() {
    const {selectedOption} = this.state
    return (
      <div>
        <Select 
          value={selectedOption}
          Placeholder={this.props.placeholder}
          onChange={this.handleInputChange}
          options={chords}
          styles={customStyles}
        />
      </div>
    )
  }
}

export default Filter;

