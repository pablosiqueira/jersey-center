import { useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classes from './Forms.module.css'
import FieldForm from "./FieldForm";
import DetailsDisplay from "../DetailsDisplay/DetailsDisplay";
import MessageModal from "../UI/MessageModal";
import LoadingScreen from '../UI/LoadingScreen'

const DetailsForm = props => {

    const [modalShow,setModalShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({msg:'',status:''})

    const [mini,setMini] = useState(props.item.mini.length > 0 ? props.item.mini : [''])
    const [trophies,setTrophies] = useState(props.item.trophies.length > 0 ? props.item.trophies : [{text:'',url:''}])
    const [content,setContent] = useState(props.item.content.length > 0 ? props.item.content : [{text:'',type:'',desc:''}])
    const [references,setReferences] = useState(props.item.references.length > 0 ? props.item.references : [{text:'',url:''}])
        
    // /dev/edit-jersey/details/63dbc6ac88a376ed4ec0eed0

    const deleteField = (field,id) => {
        let data
        switch(field){
            case 'mini': 
                data = [...mini]
                data = data.filter((item,index) => index !== +id)
                setMini(data)
                break;
            case 'trophies': 
                data = [...trophies]
                data = data.filter((item,index) => index !== +id)
                setTrophies(data)
                break;
            case 'content':
                data = [...content]
                data = data.filter((item,index) => index !== +id)
                setContent(data)
                break;
            case 'references':
                data = [...references]
                data = data.filter((item,index) => index !== +id)
                setReferences(data)
                break;    
        }
    }

    const newSlot = (field) => {
        console.log('new ' + field)
        switch(field){
            case 'mini': 
                setMini(prevState => {return [...prevState,'']})
                break;
            case 'trophies': 
                setTrophies(prevState => {return [...prevState,{text:'',url:''}]})
                break;
            case 'content':
                setContent(prevState => {return [...prevState,{text:'',type:'',desc:''}]})
                break;
            case 'references':
                setReferences(prevState => {return [...prevState,{text:'',url:''}]})
                break;    
        }
    }

    const updateField = (event) => {
        const [field,index] = event.target.id.split('-')
        let data
        switch(field){
            case 'mini': 
                data = [...mini]
                data[index] = event.target.value
                setMini(data)
                break;
            case('content'):
            case('type'):
            case('desc'):    
                data = [...content]
                let textType = document.getElementById('type-' + index).value
                let textContent = document.getElementById('content-' + index).value
                let desc = document.getElementById('desc-' + index).value
                data[index] = {text: textContent, type: textType, desc}
                setContent(data)
                break;
            case 'references':
                data = [...references]
                let url = document.getElementById('referencesUrl-' + index).value
                data[index] = {text: event.target.value, url}
                setReferences(data)
                break;
            case 'trophies':
                data = [...trophies]
                let content = document.getElementById('trophiesUrl-' + index).value
                data[index] = {text: event.target.value, url: content}
                setTrophies(data)
                break;
            case 'referencesUrl':
                data = [...references]
                let text = document.getElementById('references-' + index).value
                data[index] = {text, url: event.target.value}
                setReferences(data)
                break;      
            case 'trophiesUrl':
                data = [...trophies]
                let tr = document.getElementById('trophies-' + index).value
                data[index] = {text: tr, url: event.target.value}
                setTrophies(data)
                break; 
        } 
    }

    async function saveChanges(event) {
        event.preventDefault()
        let details = {mini, content, references, trophies}
        setIsLoading(true)
        const result = await props.saveDetails(details)
        setMessage({msg: result.message, status: result.status})
        setIsLoading(false)
        setModalShow(true)
    }

    return(
        <>
            <h1 className="text-center py-4 text-capitalize">{props.item.jersey}</h1>
            <Form className={classes.formDetails + ' d-block mx-auto text-center'} onSubmit={saveChanges}>
                <FieldForm key='mini' label='Miniature Image Url' data={mini} title='Miniature Jersey' field='mini' newSlot={newSlot} updateField={updateField} deleteField={deleteField}/>
                <FieldForm key='trophie' label='Trophy Name' data={trophies} title='Trophies' field='trophies' newSlot={newSlot} updateField={updateField} deleteField={deleteField}/>
                <FieldForm key='content' label='Image/Video Url or Text' data={content} title='Page Content' field='content' newSlot={newSlot} updateField={updateField} deleteField={deleteField}/>
                <FieldForm key='ref' label='Reference Title' data={references} title='References' field='references' newSlot={newSlot} updateField={updateField} deleteField={deleteField}/>
                {!isLoading && <div className="mx-1"><Button type="submit" className={classes.lightBtn} style={{width:'100%'}}>Save Changes</Button></div>}
                {isLoading && <LoadingScreen />}
            </Form>

            <MessageModal status={message.status} show={modalShow} onHide={() => setModalShow(false)} message={message.msg}/>
            <h1 className="text-center mt-5">Preview</h1>
            <DetailsDisplay mini={mini} jersey={props.item} content={content} references={references} trophies={trophies}/>
        </>
    )
}

export default DetailsForm