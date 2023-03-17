import classes from './DetailsPage.module.css'
import Link from 'next/link'

const DetailsHead = props => {
    return(
        <div className="text-center mt-2 mb-4 mx-5">
            <Link href={'/clubs/' + props.jersey.clubId}><img className={"mb-2 " + classes.crest} src={props.jersey.clubImage} title={props.jersey.club}/></Link> 
            <h3 className='mb-0 text-uppercase'><b>{props.jersey.club}</b></h3>
            {props.jersey.clubFullName !== '' && <h5 className='mb-0 text-capitaize'><i>{props.jersey.clubFullName}</i></h5>}
            <h5 className="mb-2 fw-light text-capitalize">{props.jersey.season} {props.jersey.order} kit</h5>
                <div className="d-flex flex-wrap justify-content-center">
                    <Link href={'/countries/' + props.jersey.countryId}><img className={"m-1 " + classes.logo} src={props.jersey.countryImage} title={props.jersey.country}/></Link>
                    <Link href={'/brands/' + props.jersey.brandId}><img className={"m-1 " + classes.logo} src={props.jersey.brandImage} title={props.jersey.brand}/></Link>
                </div>
                {props.trophies.length > 0 && <div className={"d-flex flex-wrap my-2 justify-content-center " + classes.trophy}>
                    {props.trophies.map((item,index) => {
                        return <img key={index} className={"m-1"} src={item.url} title={item.text}/>
                    })}         
                </div>}
        </div>
    )
}
export default DetailsHead