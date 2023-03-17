import Modal from 'react-bootstrap/Modal';
import {FiCheckCircle} from 'react-icons/fi'
import {BiErrorCircle} from 'react-icons/bi'
import classes from './UI.module.css'

const MessageModal = (props) => {
  return (
    
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={'text-center ' + classes.modalBack}
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body >
        {props.status === 'success' && <FiCheckCircle  size='4rem'/>}
        {props.status === 'error' && <BiErrorCircle  size='4rem'/>}
        <h5 className='mt-2'>{props.message}</h5>
      </Modal.Body>
    </Modal>
  );
}

export default MessageModal