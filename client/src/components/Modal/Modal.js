import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'
import './style.css'
import API from '../../utils/api';

function DisplayModal(props) {
  const [firstOpen, setFirstOpen] = React.useState(false)
  const [secondOpen, setSecondOpen] = React.useState(false)

  const saveChordToProfile = id => {
    API.updateUser(id)
    setSecondOpen(true)
  }

  const closeModal = () => {
    setSecondOpen(false)
    setFirstOpen(false)
    window.location.reload()
  }

  return (
    <React.Fragment>
      <Button basic color='purple' onClick={() => setFirstOpen(true)}>Save Chord To Profile</Button>

      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        size='tiny'
        className='modal'
      >
        <Modal.Header style={{display: 'flex', justifyContent: 'center'}}>Save Chord to Profile??</Modal.Header>
        <Modal.Actions style={{display: 'flex', justifyContent: 'center'}}>
          <Button color='red' onClick={() => setFirstOpen(false)}>
            Nope
            <Icon className='ml-2' name='x' />
          </Button>
          <Button color='green' onClick={e => saveChordToProfile(props.id)}>
            Yes
            <Icon className='ml-2' name='check' />
          </Button>
        </Modal.Actions>

        <Modal
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
          size='tiny'
        >
          <Modal.Header style={{display: 'flex', justifyContent: 'center'}}>Success</Modal.Header>
          <Modal.Content style={{display: 'flex', justifyContent: 'center'}}>
            <Icon name='check' />
            Chord Successfully saved to Profile
          </Modal.Content>
          <Modal.Actions style={{display: 'flex', justifyContent: 'center'}}>
            <Button
              icon='x'
              className='w-33'
              onClick={closeModal}
            />
            <Button className='w-33'>Go To Profile</Button>
          </Modal.Actions>
        </Modal>
      </Modal>
    <React.Fragment/>
  )
}

export default DisplayModal
  