import {IoCloseSharp} from 'react-icons/io5'
import classes from './List.module.css'

const ListFilterFormSelected = props => {
    //console.log(props.selected)
    const uncheck = (category,value) => {
        document.getElementById(category + '-' + value).checked = false
        props.update('remove',category,value)
    }

    //const data = ['adidas','club']
    return (
        <>
        <div className='mb-2 d-flex flex-wrap'>
        {props.selected.length > 0 && props.selected.map((item,index) => {
            return <span className={'rounded-pill m-2 py-1 px-2 ' + classes.selectedItem} key={index}>{item.value} <a onClick={() => uncheck(item.category,item.value)}><IoCloseSharp size='1rem'/></a></span>
        })}
        </div>
        </>
    )
}

export default ListFilterFormSelected