import DetailsHead from "./DetailsHead"
import DetailsContent from "./DetailsContent"
import DetailsReferences from "./DetailsReferences"
import MiniCarousel from "./MiniCarousel"
import classes from './DetailsPage.module.css'
import Image from "next/image"

const DetailsDisplay = props => {
    const checkNull = (array,category) => {
        let check = true
        array.map(item => {
            if((category !== 'mini' && item.text !== '') || (category === 'mini' && item !== '')){
                check = false
            }
        })
        return check
    }
    /*console.log(props.mini)
    const url = 'https://www.si.com/.image/t_share/MTg4ODgxMTI1MTI3NDk3MjQ4/imago1011329909h.jpg'
    document.getElementById('homeDiv').style.backgroundImage = ('url('+ url +')')*/
    return(
        <>
        <div className="d-flex flex-wrap justify-content-center align-items-center pt-4">
                {!checkNull(props.mini,'mini') && <MiniCarousel mini={props.mini}/>}
                <DetailsHead jersey={props.jersey} trophies={checkNull(props.trophies) ? [] : props.trophies}/>
        </div>
        <div className={classes.detailsBlock + ' d-block mx-auto pb-5 px-2'}>
            {(props.mode === 'show' && checkNull(props.content)) && 
                <img className={"d-block mx-auto " + classes.detailsImg} src={props.jersey.card} alt={props.jersey.name} layout='fill'/>
            }
            {!checkNull(props.content) && <DetailsContent content={props.content}/>}
            {!checkNull(props.references) && <DetailsReferences references={props.references}/>}
        </div>
        </> 
    )
}

export default DetailsDisplay