import classes from './List.module.css'
//import Image from 'react-bootstrap/Image'
import Image from 'next/image'
//props.category === 'brands' ? 'border rounded p-1 mb-2' : "mb-2"
//<img className={'rounded-circle p-2 ' + classes.coverImg} src={props.image}/>
/*<div className='rounded-circle mx-auto' style={{height:'100px', width:'100px', backgroundColor:'white'}}>
<img className={'' + classes.coverImg} src={props.image}/>
</div>*/
const CustomCover = props => {
    return(
        <>
        <div className={classes.cover + ' text-capitalize py-2'} style={(props.background !== '') ?  {backgroundImage:'url('+ props.background + ')'} : {}}>
            <Image className={"mb-2 mt-4"} src={props.image} width='100' height='100' alt={props.name}/>
            <h3 className="mb-1"><b>{props.name}</b></h3>
            {props.fullName !== '' && <h5 className="mb-4"><i>{props.fullName}</i></h5>}
        </div>    
        </>
    )
}

export default CustomCover