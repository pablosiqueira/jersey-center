import classes from './DetailsPage.module.css'
import Image from 'react-bootstrap/Image'

const DetailsContent = props => {
    return (
        <>
            {props.content.map((item,index) => {
                switch (item.type){
                    case 'image':
                     return  <Image key={index} alt={item.desc} className={classes.detailsImg + ' d-block mx-auto my-4'} src={item.text}/>
                    case 'text':
                     return  <p key={index} className="my-4">{item.text}</p>
                    case 'video':
                     return <div key={index} className={'ratio ratio-16x9 ' + classes.video}>
                     <iframe
                         src={item.text}
                         title={item.desc}
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                         allowFullScreen
                     />
                    </div>      
                }
            })}
        </>
    )
}

export default DetailsContent