import Pagination from 'react-bootstrap/Pagination';
import { useRouter } from 'next/router';
import { useState } from 'react';
import classes from './List.module.css'
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';

const ListPagination = props => {
    const router = useRouter()
    
    const perPage = (props.perPage !== undefined) ? +props.perPage : 20

    const getPage = () => {
        if(!router.query.page){
            return 1
        }else{
            return router.query.page
        }
    }

    const [active, setActive] = useState(()=>{
        getPage()
    })

    let items = [];

    let numOfPages = parseInt((props.total/perPage))
        if(props.total%perPage > 0){
            numOfPages++
        }

    let lastLimit
    if(active === numOfPages){
        lastLimit = props.total
    }else{
        lastLimit = (perPage*(active-1) + 1) + (perPage - 1)
    }
    /*
    if(numOfPages < 20){
        console.log('here 3')
        lastLimit = props.total
    }*/

    useEffect(()=>{
        let thisPage = getPage()
        setActive(thisPage)
    },[router])


    for (let number = 1; number <= numOfPages; number++) {
    items.push(  
    <Pagination.Item className={
        ((+number === +active || (+number < +active + 5 && +number > +active) || (number+5 > numOfPages)) ? 
        ' ' : 'd-none ') + (+number === +active ? classes.backRed : classes.textDark )}
        key={number} active={+number === +active} onClick={() => changePage(number)}>
      {number}
    </Pagination.Item>,
    );

    }

    const changePage = (number) => {
        setActive(number)
        router.query.page = number
        router.push(router)
    }


    return (
        <>
        <Container>
            <div className={"d-flex fex-wrap justify-content-between align-items-center mx-auto mb-4 " + classes.filters}>
            <span>{20*(active-1) + 1} - {lastLimit} of {props.total} {props.category}</span>
              
            <Pagination className={classes.textDark}>
                <Pagination.First onClick={() => changePage(1)}/>    
                <Pagination.Prev onClick={() => changePage(parseFloat(active) - parseFloat(1))}/>
                {items}
                <Pagination.Next onClick={() => changePage(parseFloat(active) + parseFloat(1))}/>
                <Pagination.Last onClick={() => changePage(numOfPages)}/>
            </Pagination>
            </div>
        </Container>
        </>
    )
}

export default ListPagination