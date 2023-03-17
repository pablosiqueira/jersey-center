import classes from './DetailsPage.module.css'
import {FiExternalLink} from 'react-icons/fi'

const DetailsReferences = props => {
    console.log(props.references)
    return (
        <>
        <div className={"border-top border-white d-block mx-auto px-2 my-4 " + classes.references}>
            <p><b>References:</b></p>
            <ol>
            {props.references.map((item,index) => {
                return(<li className='my-2' key={index}>
                    <a className='text-reset' href={item.url} target='_blank' rel="noreferrer"><i>{item.text} <FiExternalLink /></i></a>
                </li>)
            })}
            </ol>
        </div>
        </>
    )
}

export default DetailsReferences