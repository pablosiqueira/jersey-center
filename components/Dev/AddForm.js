import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState,useRef } from 'react';
import ImageForm from './ImageForm';
import MessageModal from '../UI/MessageModal';
import classes from './Forms.module.css'
import SelectForm from './SelectForm';
import FormCheck from 'react-bootstrap/FormCheck';
import LoadingScreen from '../UI/LoadingScreen';
import MainCard from '../Cards/MainCard'

const AddForm = props => {
    const [message,setMessage] = useState('')
    const [status,setStatus] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [newItem,setNewItem] = useState()


    const [clubsList,setClubsList] = useState(props.clubs)
    const [countriesList,setCountriesList] = useState(props.countries)
    const [brandsList,setBrandsList] = useState(props.brands)

    const cardRef = useRef()
    const [cardError, setCardError] = useState(false)
    const [card,setCard] = useState(props.item ? props.item.card : '')
    const cardInputHandler = (event) => {
        setCard(event.target.value)
        setCardError(false)
    }

    const [season,setSeason] = useState(props.item ? props.item.season : '')
    const seasonInputHandler = (event) => {
        setSeason(event.target.value)
    }

    const [order,setOrder] = useState(props.item ? props.item.order : 'home')
    const orderHandler = (event) => {
        setOrder(event.target.value)
    }

    const [category,setCategory] = useState(props.item ? props.item.category : 'club')
    const categoryHandler = (event) => {
        setCategory(event.target.value)
    }

    const [country,setCountry] = useState(props.item ? props.item.country : '')
    const countryInputHandler = (event) => {
        console.log(event.target.value.toLowerCase())
        setCountry(event.target.value.toLowerCase())
    }

    const countryImageRef = useRef()
    const [countryImageError, setCountryImageError] = useState(false)
    const [countryImage,setCountryImage] = useState('')
    const countryImageInputHandler = (event) => {
        setCountryImage(event.target.value)
        setCountryImageError(false)
    }


    const [club,setClub] = useState(props.item ? props.item.club : '')
    const clubInputHandler = (event) => {
        setClub(event.target.value)
        console.log(event.target.value)
        if(event.target.value !== '' && document.getElementById("teamSelect")){
            //console.log('not null')
            var e = document.getElementById("teamSelect");
            //console.log(e.options[e.selectedIndex].attributes.country.value)
            setCountry(e.options[e.selectedIndex].attributes.country.value)
            document.getElementById("countrySelect").disabled = true
            document.getElementById("country-new-btn").disabled = true
        }
    }
    const [clubFullName,setClubFullName] = useState(props.item ? props.item.clubFullName : '')
    const clubFullNameInputHandler = (event) => {
        setClubFullName(event.target.value)
        /*if(event.target.value !== '' && document.getElementById("teamSelect")){
            console.log('not null')
            var e = document.getElementById("teamSelect");
            console.log(e.options[e.selectedIndex].attributes.country.value)
            setCountry(e.options[e.selectedIndex].attributes.country.value)
        }*/
    }
    const clubImageRef = useRef()
    const [clubImageError, setClubImageError] = useState(false)
    const [clubImage,setClubImage] = useState('')
    const clubImageInputHandler = (event) => {
        setClubImage(event.target.value)
        setClubImageError(false)
    }

    const clubBackgroundRef = useRef()
    const [clubBackgroundError, setClubBackgroundError] = useState(false)
    const [clubBackground,setClubBackground] = useState('')
    const clubBackgroundInputHandler = (event) => {
        setClubBackground(event.target.value)
        setClubBackgroundError(false)
    }

    
    const [brand,setBrand] = useState(props.item ? props.item.brand : '')
    const brandInputHandler = (event) => {
        setBrand(event.target.value.toLowerCase())
    }

    const brandRef = useRef()
    const [brandImageError, setBrandImageError] = useState(false)
    const [brandImage,setBrandImage] = useState('')
    const brandImageInputHandler = (event) => {
        setBrandImage(event.target.value)
        setBrandImageError(false)
    }

    console.log('order = ' + order)
    console.log('category = ' + category)

    const [modalShow, setModalShow] = useState(false);

    const clearInputs = () => {
        setClub('')
        setClubImage('')
        setClubFullName('')
        setBrand('')
        setBrandImage('')
        setCard('')
        setOrder('home')
        setCategory('club')
        setCountry('')
        setCountryImage('')
        setSeason('')
    }

    const getExtraField = (category,field) =>{
        var e = document.getElementById(category);
        console.log(e.options[e.selectedIndex].attributes[field].value)
        return e.options[e.selectedIndex].attributes[field].value    
    }

    async function addItem(enteredData,collection,url){
        console.log(enteredData)
        console.log(JSON.stringify(enteredData))
        const response = await fetch('/api/' + url +'?collection=' + collection,{
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        if(data.status === 'error'){
            setMessage(data.message)
            setStatus('error')
        }else{
            setMessage(props.modalMessage)
            setStatus('success')
        }
        return data
    }

    const sortArray = (arr) => {
        let newArr = [...arr]
        newArr = newArr.sort((x,y)=>{
            if(x.name.toLowerCase() > y.name.toLowerCase()){
                return 1
            }else{
                if(x.name.toLowerCase() < y.name.toLowerCase()){
                    return -1
                }
            }
            return 0
        })
        return newArr
    }

    const submitForm = async (event) => {
        event.preventDefault()
        let clubId
        let clubImg
        let clubFull
        let countryId
        let countryImg
        let brandId
        let brandImg
        setIsLoading(true)
        if(cardError || clubImageError || countryImageError || brandImageError){
            [cardError, clubImageError, countryImageError, brandImageError].map(item=>{
                if(item){
                    item.current.focus()
                }
            })
        }else{
            const date = new Date()
            //const date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()

            if(countryImage && countryImage !== ''){
                //create country
                let countryData
                countryData = {
                    name: country,
                    image: countryImage,
                    jerseys:[]
                }
                
                console.log('add country')
                let countryResp = await addItem(countryData,'countries','add')
                console.log(countryResp)
                if(countryResp.status === 'error'){
                    setMessage(prevState => 'Country Name -' + prevState)
                    setIsLoading(false)
                    setModalShow(true)
                    return
                }
                countryId = countryResp.newId
                countryImg = countryImage

                setCountriesList(prevState => {
                    let newList = [...prevState,
                        {
                            id: countryId,
                            image: countryImage,
                            name: country.toLowerCase()
                        }
                    ]
                    return sortArray(newList)
                })

            }else{
                countryId = getExtraField('countrySelect','id')
                countryImg = getExtraField('countrySelect','image')
            }

            if(clubImage && clubImage !== ''){
                //create club
                let clubData
                clubData = {
                    name: club.toLowerCase(),
                    fullName: clubFullName,
                    country:{
                        name: country,
                        id: countryId
                    },
                    image: clubImage,
                    background: clubBackground,
                    category,
                    jerseys: []
                }
                console.log('add club')
                let clubResp = await addItem(clubData,'clubs','add')
                console.log(clubResp)
                if(clubResp.status === 'error'){
                    setMessage(prevState => 'Club Name -' + prevState)
                    setIsLoading(false)
                    setModalShow(true)
                    return
                }
                clubId = clubResp.newId
                clubImg = clubImage
                clubFull = clubFullName

                setClubsList(prevState => {
                    let newList = [...prevState,
                        {
                            countryId,
                            countryName: country,
                            fullName: clubFullName,
                            id: clubId,
                            image: clubImage,
                            name: club.toLowerCase()   
                        }
                    ]
                    return sortArray(newList)
                })

            }else{
                console.log('club data')
                clubId = getExtraField('teamSelect','id')
                clubImg = getExtraField('teamSelect','image')
                clubFull = getExtraField('teamSelect','full')
            }

            if(brandImage && brandImage !== ''){
                let brandData
                brandData = {
                    name: brand.toLowerCase(),
                    image: brandImage,
                    jerseys: []
                }
                console.log('add brand')
                let brandResp = await addItem(brandData,'brands','add')
                console.log(brandResp)
                if(brandResp.status === 'error'){
                    setMessage(prevState => 'Brand Name -' + prevState)
                    setIsLoading(false)
                    setModalShow(true)
                    return
                }
                brandId = brandResp.newId
                brandImg = brandImage

                setBrandsList(prevState => {
                    let newList = [...prevState,
                        {
                            id: brandId,
                            image: brandImage,
                            name: brand.toLowerCase()
                        }
                    ]
                    return sortArray(newList)
                })

            }else{
                brandId = getExtraField('brandSelect','id')
                brandImg = getExtraField('brandSelect','image')
            }

            let data = {
                    club: {name: club.toLowerCase(), fullName: clubFull ,id: clubId, image: clubImg},
                    season,
                    order,
                    brand : {name: brand.toLowerCase(), id: brandId, image: brandImg},
                    country: {name: country.toLowerCase(), id: countryId, image: countryImg},
                    card,
                    date,
                    category,
                    name: club + ' ' + season + ' ' + order
            }
            //console.log(props)
            console.log('add data')
            console.log(data)
            let url
            if(props.mode === 'add'){
                url = 'add'
                console.log('add jersey')
                const addResult = await addItem(data,'jerseys',url)
                if(addResult.status === 'error'){
                    setIsLoading(false)
                    setModalShow(true)
                    return
                }
                   setNewItem({
                    id: addResult.newId,
                    club,
                    season,
                    order,
                    card
                   }) 
                   clearInputs()
                   event.target.reset()

            }else if(props.mode === 'edit'){
                url = 'edit-jersey-info'
                data = {...data,id: props.item.id}
                console.log(data)
                await props.onAddItem(data)
                setMessage(props.modalMessage)
                setStatus('success')
            }

            setIsLoading(false)
  
            setModalShow(true)
            setTimeout(()=>{
                setModalShow(false)
                if(props.mode === 'add'){
                    //Router.reload()
                }           
            }, 3000)
            
        }
        
    }

    return(
    <Form className={'d-block mx-auto px-3 my-2 ' + classes.formStyle} onSubmit={submitForm}>
                    {(props.mode==='add' || props.item.jersey) && 
                    <>
                    <ImageForm name='Card' imageRef={cardRef} onInputImage={cardInputHandler} imgUrl={card} errorHandler={setCardError} imgError={cardError} />
                    
                    <FloatingLabel className="mb-3" controlId="season" label='Season'>
                        <Form.Control type="text" placeholder="Enter season" value={season} onChange={seasonInputHandler} required/>
                    </FloatingLabel>

                    <div className={classes.fontWhite + ' mb-3'}>
                        {['home','away','third','fourth','trainning','special','goalkeeper'].map(item => {
                            return <FormCheck key={item} className={classes.customCheck} inline value={item} label={item} name='order' type='radio' onChange={orderHandler} checked={item === order} />
                        })}
                    </div>
                    </>}

                    {(props.mode==='add' || props.item.brand) && <SelectForm field={'brand'} dataValue={brand} changeValue={brandInputHandler}
                    dataList={brandsList} imageRef={brandRef} onInputImage={brandImageInputHandler} 
                    imgUrl={brandImage} errorHandler={setBrandImageError} imgError={brandImageError} newName={brand} changeName={setBrand}/>}

                    {(props.mode==='add' || props.item.club) && <SelectForm field={'team'} dataValue={club} changeValue={clubInputHandler} 
                    dataList={clubsList} imageRef={clubImageRef} onInputImage={clubImageInputHandler}
                    imgUrl={clubImage} errorHandler={setClubImageError} imgError={clubImageError} newName={club} changeName={setClub}
                    fullName={clubFullName} changeFullValue={clubFullNameInputHandler}
                    imageBackRef={clubBackgroundRef} onInputImageBack={clubBackgroundInputHandler}
                    imgUrlBack={clubBackground} errorHandlerBack={setClubBackgroundError} imgErrorBack={clubBackgroundError} 
                    categoryHandler={categoryHandler} category={category}
                    />}

                    {(props.mode==='add' || props.item.country) && <SelectForm field={'country'} dataList={countriesList} dataValue={country} changeValue={countryInputHandler}
                    imageRef={countryImageRef} onInputImage={countryImageInputHandler}
                    imgUrl={countryImage} errorHandler={setCountryImageError} imgError={countryImageError} 
                    newName={country} changeName={setCountry}/>}

        <MessageModal show={modalShow} onHide={() => setModalShow(false)} message={message} status={status}/>
        <div className='d-grid'>
            {!isLoading && <Button variant="light" type="submit" className={'my-4 ' + classes.lightBtn}>Submit</Button>}
            {isLoading && <LoadingScreen />}
        </div>
        {(newItem && !isLoading) && <div className='d-block mx-auto text-center'>
            <h3 className={classes.fontWhite}>Last Added</h3>            
            <div className='mx-auto' style={{maxWidth:'fit-content'}}><MainCard jersey={newItem} mode='edit'/></div>
        </div>}
    </Form>
    )
}

export default AddForm