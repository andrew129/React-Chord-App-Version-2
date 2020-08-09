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

  return (
    <>
      <Button basic color='purple' onClick={() => setFirstOpen(true)}>Save Chord To Profile</Button>

      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        size='tiny'
        className='modal'
      >
        <Modal.Header>Save Chord to Profile??</Modal.Header>
        <Modal.Actions>
          <Button color='red' onClick={() => setFirstOpen(false)}>
            Nope

            <Icon name='x' />
          </Button>
          <Button color='green' onClick={e => saveChordToProfile(props.id)}>
            Yes
            <Icon name='check' />
          </Button>
        </Modal.Actions>

        <Modal
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
          size='tiny'
        >
          <Modal.Header>Chord Successfully saved to Profile</Modal.Header>
          <Modal.Content>
            <Icon name='check' />
          </Modal.Content>
          <Modal.Actions>
            <Button
              icon='x'
              onClick={() => setSecondOpen(false)}
            />
          </Modal.Actions>
        </Modal>
      </Modal>
    </>
  )
}

export default DisplayModal
  