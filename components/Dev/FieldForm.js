import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {BsTrashFill} from 'react-icons/bs'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import classes from './Forms.module.css'

const FieldForm = props => {
    return (
        <div className={'border-bottom mb-4 mx-1'}>
            <h5 className={classes.fontWhite + ' mb-4'}>{props.title}</h5>
            {props.data.map((item,index) => {
            return( 
            <div key={index} className='mb-4'>
                <label className={classes.fontWhite + ' mb-2'}>Item #{index}</label>
            <Row>
                <Col>
                    <FloatingLabel className="mb-3 text-capitalize" controlId={props.field  + '-' + index} label={props.label}>
                        <Form.Control as="textarea" type="text" placeholder={'Enter ' + props.title} value={props.field === 'mini' ? item : item.text} onChange={props.updateField}/>
                    </FloatingLabel>
                </Col>
                {props.field === 'mini' && <Col style={{maxWidth:'fit-content'}}>
                    <Button className={classes.darkBtn} title={'Remove item #' + index} style={{height:'58px'}} onClick={() => props.deleteField(props.field,index)}><BsTrashFill /></Button>
                </Col>}
            </Row>

            {props.field === 'content' && 
            <Row>
                <Col>
                    <FloatingLabel className="mb-3 text-capitalize" controlId={'desc-' + index} label='Enter description for image or video url'>
                        <Form.Control as="textarea" type="text" placeholder={'Enter ' + props.title} value={item.desc} onChange={props.updateField}/>
                    </FloatingLabel>
                </Col>
            </Row>  
            }
            
            {props.field !== 'mini' &&
                <Row className="mb-4">
                    <Col>
                        {props.field === 'content' && <Form.Select className="mb-3" id={'type-' + index} defaultValue='image' onChange={props.updateField}>
                            <option value="image">Image Url</option>
                            <option value="text">Text</option>
                            <option value="video">Video Url</option>
                        </Form.Select>}
                        {(props.field === 'references' || props.field === 'trophies') &&
                            <FloatingLabel className="mb-3 text-capitalize" controlId={props.field + 'Url-' + index} label='Url'>
                                <Form.Control as="textarea" type="text" placeholder='Enter url' value={item.url} onChange={props.updateField} required/>
                            </FloatingLabel>
                        }
                    </Col>
                    <Col style={(props.field === 'references' || props.field === 'trophies') ? {maxWidth:'fit-content'} : {}}>
                    <Button title={'Remove item #' + index} className={classes.darkBtn + ' ' + ((props.field === 'references' || props.field === 'trophies') ? classes.textAreaHeight : '')} style={{width:'-webkit-fill-available'}} onClick={() => props.deleteField(props.field,index)}><BsTrashFill /></Button>
                </Col>
                </Row>
                }
                </div>
            )})
            }
            <Button className={classes.lightBtn +  " mb-4"}  onClick={() => props.newSlot(props.field)}>Add New Item</Button>
        </div>
    )
}

export default FieldForm