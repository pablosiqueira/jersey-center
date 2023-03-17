import ImageForm from "./ImageForm"
import Form from "react-bootstrap/Form"
import { useRef, useState } from "react"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Button from "react-bootstrap/Button"
import SelectForm from "./SelectForm"
import MessageModal from "../UI/MessageModal"
import classes from './Forms.module.css'
import LoadingScreen from "../UI/LoadingScreen"

const SimpleForm = props => {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const imageRef = useRef()
    const [imageError, setImageError] = useState(false)
    const [imageUrl,setImageUrl] = useState(props.item ? props.item.image : '')
    const imageInputHandler = (event) => {
        setImageUrl(event.target.value)
        setImageError(false)
    }

    const [name, setName] = useState(props.item ? props.item.name : '')
    const nameInputHandler = (event) => {
        setName(event.target.value)
    }

    const [fullName, setFullName] = useState(props.item ? props.item.fullName : '')
    const fullNameInputHandler = (event) => {
        setFullName(event.target.value)
    }


        const [country,setCountry] = useState(props.countries ? props.item.country : '')
        const countryInputHandler = (event) => {
        console.log(event.target.value.toLowerCase())
        setCountry(event.target.value.toLowerCase())
    }

    const countryImageRef = useRef()
    const [countryImageError, setCountryImageError] = useState(false)
    const [countryImage,setCountryImage] = useState('')
    const countryImageInputHandler = (event) => {
        setCountryImage(event.target.value)
    }

    const backgroundRef = useRef()
    const [backgroundError, setBackgroundError] = useState(false)
    const [background,setBackground] = useState(props.item.background ? props.item.background : '')
    const backgroundInputHandler = (event) => {
        setBackground(event.target.value)
    }

    const [modalShow, setModalShow] = useState(false)

    async function submitForm(event) {
        event.preventDefault()
        setIsLoading(true)
        const data = {
            name: name.toLowerCase(),
            image: imageUrl,
            jerseys: props.item.jerseys
        }
        if(fullName && fullName !== ''){
            data = {...data, fullName}
        }
        if(background && background !== ''){
            data = {...data, background}
        }
        const result = await props.editData(data)
        setMessage(result.message)
        setStatus(result.status)
        setIsLoading(false)
        setModalShow(true)
    }

    return(
        <>
        <Form className={'d-block mx-auto px-3 ' + classes.formStyle} onSubmit={submitForm}>
            <ImageForm name='Image' imageRef={imageRef} onInputImage={imageInputHandler} 
            imgUrl={imageUrl} errorHandler={setImageError} imgError={imageError} />
            <FloatingLabel className="mb-3 mt-1" label='Name'>
                        <Form.Control type="text" placeholder={"Name"} value={name} onChange={nameInputHandler} required/>
            </FloatingLabel>
            {props.category === 'clubs' &&
            <>
            <FloatingLabel className="mb-3 mt-1" label='Full Name'>
                        <Form.Control  type="text" placeholder={"Full Name"} value={fullName} onChange={fullNameInputHandler}/>
            </FloatingLabel>

            <ImageForm name='Background' imageRef={backgroundRef} onInputImage={backgroundInputHandler} 
            imgUrl={background} errorHandler={setBackgroundError} imgError={backgroundError} />

            <SelectForm field={'country'} dataList={props.countries} dataValue={country} changeValue={countryInputHandler}
                    imageRef={countryImageRef} onInputImage={countryImageInputHandler}
                    imgUrl={countryImage} errorHandler={setCountryImageError} imgError={countryImageError} newName={country} changeName={setCountry}/>
            </>
            }
            <div className='d-grid mt-4'>
            {!isLoading && <Button className={'mb-2 pb-2 w-100 ' + classes.lightBtn} type='submit'>Save Changes</Button>}
            {isLoading && <LoadingScreen />}
        </div>
            <MessageModal show={modalShow} status={'success'} onHide={() => setModalShow(false)} message={props.message}/>
        </Form>
        </>
    )
}

export default SimpleForm