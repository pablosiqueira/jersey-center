import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import ImageForm from './ImageForm';
import classes from './Forms.module.css'
import { useState } from 'react';
import FormCheck from 'react-bootstrap/FormCheck';

function SelectForm(props) {
  //console.log(props.fullName)
  const [newForm, setNewForm] = useState(false)
  const showNewForm = (event) => {
    if(event.target.id === 'team-new-btn'){
      document.getElementById("countrySelect").disabled = false
      document.getElementById("country-new-btn").disabled = false
    }
    console.log('new')
    props.changeName('')
    setNewForm(!newForm)
    props.errorHandler(false)
  }
  return (
    <>
    <div className={'pt-3 border-bottom ' + classes.borderLight}> 
      {!newForm && <div>
        <FloatingLabel className='text-capitalize mb-3' controlId={"floatingSelect " + props.field} label={props.field}>
          <Form.Select className={'mb-2 text-capitalize ' + classes.selectBasic} onChange={props.changeValue} id={props.field + 'Select'} value={props.dataValue} required>
          <option value=''>Selected {props.field}</option>
          {props.dataList && props.dataList.map(item =>{
              return <option key={item.name} value={item.name} country={item.countryName} id={item.id} image={item.image} full={item.fullName ? item.fullName : ''} className='text-capitalize'>{item.name}</option>
          })}
          {!props.dataList && <option>Add new {props.field}</option>}
          </Form.Select>
        </FloatingLabel>

        <Button id={props.field + '-new-btn'} className={'mb-3 d-block mx-auto text-capitalize ' + classes.lightBtn} onClick={showNewForm}>Add new {props.field}</Button>
      </div>}

      {newForm && <div>
        <ImageForm name={props.field} imageRef={props.imageRef} onInputImage={props.onInputImage} imgUrl={props.imgUrl} errorHandler={props.errorHandler} imgError={props.imgError}/>
        <FloatingLabel className="mb-3 text-capitalize" label={props.field}>
                        <Form.Control type="text" placeholder={"Enter " + props.field} value={props.newName} onChange={props.changeValue} required/>
        </FloatingLabel>
        {props.field === 'team' && <FloatingLabel className="mb-3 text-capitalize" label={props.field + ' - Full Name (optional)'}>
                        <Form.Control type="text" placeholder={'Enter' + props.field + ' - Full Name'} value={props.fullName} onChange={props.changeFullValue} />
        </FloatingLabel>}
        {props.field === 'team' && 
        <>
          <ImageForm name='Team Background ' imageRef={props.imageRefBack} onInputImage={props.onInputImageBack} 
          imgUrl={props.imgUrlBack} errorHandler={props.errorHandlerBack} imgError={props.imgErrorBack}/>

          <div className={classes.fontWhite + ' mb-3'}>
            <Form.Label>Category</Form.Label><br/>
              {['club','national team'].map(item => {
                  return <FormCheck key={item} inline value={item} label={item} name='category' type='radio' onChange={props.categoryHandler} checked={item === props.category} />
              })}
          </div>
        </>}


        <Button className={'mb-3 d-block mx-auto text-capitalize ' + classes.lightBtn} onClick={showNewForm}>Add existing {props.field}</Button>
      </div>}
    </div>
    </>
  );
}

export default SelectForm;