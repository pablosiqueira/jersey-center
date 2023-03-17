import Form from 'react-bootstrap/Form';
import classes from './List.module.css'
import Accordion from 'react-bootstrap/Accordion';

const ListFilterFormCheck = props => {
    return (
        <>
        <Accordion.Item className='bg-dark' eventKey={props.index}>
        <Accordion.Header><div className='text-capitalize'>{props.title}</div></Accordion.Header>
        <Accordion.Body className={classes.accordBody}>
        <div className={classes.checkList}>   
        {props.data.map(item => (
            <div key={item} className="text-capitalize">
            <Form.Check 
              type='checkbox'
              id={props.title + '-' + item}
              label={item}
              value={item}
              name={props.title}
              defaultChecked={props.handler.includes(item)}
              onChange = {props.update}
            />
            </div>))
        }
        </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default ListFilterFormCheck