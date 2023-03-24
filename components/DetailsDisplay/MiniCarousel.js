import Carousel from "react-bootstrap/Carousel"
import classes from './DetailsPage.module.css'
import Image from "next/image"

const MiniCarousel = props => {
    return (
        <Carousel className="mx-5" slide={false}>
            {props.mini && props.mini.map((item,index) => {
                if(item && item !== ''){
                    return <Carousel.Item key={index}><img className={classes.carouselSize} src={item} alt='jersey miniature' layout="fill"/></Carousel.Item>
                }
            })}
        </Carousel>
    )
}

export default MiniCarousel