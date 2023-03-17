import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import {FiFilter} from 'react-icons/fi'
import ListFilterForm from './ListFilterForm';
import classes from './List.module.css'
import {IoClose} from 'react-icons/io5'

const ListFilter = props => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
        <Button variant="outline-light" onClick={handleShow} className={"mx-2 my-1 " + classes.listBtn}>
        Filters <FiFilter />
        </Button>

      <Offcanvas show={show} onHide={handleClose} className={classes.filterOffCanvas}>
        <Offcanvas.Header >
          <Offcanvas.Title>Filters</Offcanvas.Title>
          <Button variant="link" className={classes.btnOff} onClick={handleClose}><IoClose size='1.5rem' color='white'/></Button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListFilterForm onFiltered={handleClose} filterData={props.filterData}/>
        </Offcanvas.Body>
      </Offcanvas>
        </>
    )
}

export default ListFilter