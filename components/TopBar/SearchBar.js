import InputGroup  from 'react-bootstrap/InputGroup';
import Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {GoSearch} from 'react-icons/go'
import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    const getTermHandler = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            searchAction()
        }
    }

    const searchAction = () => {
        event.preventDefault()
        if(props.mode === 'nav'){
           router.push('/'+ props.category + '?search=' + searchTerm)
        }else{
            router.query.search = searchTerm
            router.push(router)
        }
    }

    return(
        <Form>
            <InputGroup className='justify-content-center'>
                    <Form.Control
                    placeholder={"Search " + props.category}
                    aria-label={"Search " + props.category}
                    style={{maxWidth: '500px'}}
                    type="text"
                    value={searchTerm}
                    onChange={getTermHandler}
                    onKeyPress={handleKeyPress}
                    />
                    <Button variant="outline-secondary" onClick={searchAction}>
                        <GoSearch color='white' size='1.5rem'/>
                    </Button>
            </InputGroup>
        </Form>
    )
}

export default SearchBar