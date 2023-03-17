import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import ListFilterFormCheck from './ListFilterFormCheck';
import Accordion from 'react-bootstrap/Accordion';
import ListFilterFormSelected from './ListFilterFormSelected';
import { useState } from 'react';

const ListFilterForm = props => {
    const router = useRouter()
    const titles = ['categories','brands','clubs','countries']
    
    const isArray = (arr) => {
        if(typeof arr === 'string'){
            return [arr]
        }else{
            if(!arr){
                return ['']
            }else{
                return arr
            }
        }
    } 

    const initialSelected = () => {
        let data = []
        const query = router.query
        titles.map(item => {
        const dataNow = isArray(query[item])
        if(dataNow.length > 0){
            dataNow.map(x => {
                if(x !== ''){
                    data.push({category: item, value: x})
                }
            })
        }
    })
        return data
    }

    const [selected, setSelected] = useState(initialSelected)

    console.log('initial selected')
    console.log(selected)

    const updateSelected = (action,category,value) => {
        if(typeof selected !== 'array'){
            setSelected(initialSelected)
        }
        let selectNow = selected
        if(action === 'add'){
            selectNow = selectNow.push({category,value})
            /*setSelected(prevState => {
                let a = prevState
                console.log('prev')
                console.log(prevState)
                return a.push({category,value})
            })*/
            
        }else{
            selectNow = selectNow.filter(x => (x.category !== category || x.value !== value))
           /* setSelected(prevState => {
                let a = prevState
                console.log('prev')
                console.log(prevState)
                return a.filter(x => (x.category !== category || x.value !== value))
            })*/
        }
        setSelected(selectNow)
    }

    const update = () => {
        let newSelected = []
        let checked = document.querySelectorAll('input[type=checkbox]:checked')
        checked = [...checked]
        console.log(checked)
        if(checked.length > 0){
            checked.map(item => {
                let category = item.id.split('-')[0]
                let value = item.id.split('-')[1]
                newSelected.push({category,value})
        })}
        setSelected(newSelected)
    }

    const submitFilter = (event) => {
        event.preventDefault()
        let terms = {
            categories: [],
            brands: [],
            clubs: [],
            countries: []
        }

        let checked = document.querySelectorAll('input[type=checkbox]:checked')
        checked = [...checked]
        if(checked.length > 0){
            //console.log(checked)
            checked.map(item => {
                //console.log(terms[item.name])
                if(terms[item.name]){
                    terms[item.name].push(item.value)
                }
            })
        }
        
        /*console.log(terms)
        console.log(router.query)
        router.query = {category: router.query.category}
        console.log(router.query)*/

        titles.map(item => {
            if(terms[item].length > 0){
                if(terms[item].length === 1 && terms[item][0] !== ''){
                    router.query = {...router.query, [item]: terms[item][0]}
                }else{
                    router.query = {...router.query, [item]: terms[item]}
                }
            }
        })
        console.log(router.query)

        router.replace(router)
    }

    return (
        <>
        <Form onSubmit={submitFilter}>
            <ListFilterFormSelected selected={selected} update={updateSelected}/>
            <Accordion className='bg-dark'>
                {titles.map((item,index) => {
                    if(props.filterData[item].length > 0){
                        return <ListFilterFormCheck update={update} handler={isArray(router.query[item])}  
                        key={index} index={index} title={item} data={props.filterData[item]} />
                    }
                })
                }
            </Accordion>      
        <Button type='submit' variant="outline-dark" className='my-4'>Filter Results</Button>
        </Form>
        </>
    )
}

export default ListFilterForm