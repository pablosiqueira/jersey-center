import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import ListFilter from './ListFilter';
import classes from './List.module.css'

const ListSort = props => {
    const router = useRouter()
    const sortProds = (event) => {
        event.preventDefault()
        const url = router
        console.log(router)
        console.log(event.target.value)
        router.query.order = event.target.value
        router.push(router)
    }
    return(
        <>
        <Container>
            <div className={"d-flex fex-wrap justify-content-between align-items-center mx-auto my-2 " + classes.filters}>
                <span ><i>Found {props.size} {props.category}</i></span>
                <div className='d-flex flex-wrap justify-content-center'>
                {(props.mode !== 'custom' && (props.category !== 'countries' && props.category !== 'brands')) && <ListFilter filterData={props.filterData}/>}
                <Form.Select aria-label="Sort by" style={{width:'auto'}} onChange={sortProds} className={'my-1 ' + classes.listBtn}>
                    <option value="new">Recently Added</option>
                    <option value="old">Added: Old to New</option>
                    <option value="nameasc">Name: A - Z</option>
                    <option value="namedesc">Name: Z - A</option>
                </Form.Select>
                </div>
            </div>  
        </Container>
        </>
    )
}

export default ListSort