import Carousel from "react-bootstrap/Carousel"
import classes from './DetailsPage.module.css'

const MiniCarousel = props => {
    return (
        <Carousel className="mx-5" slide={false}>
            {props.mini && props.mini.map((item,index) => {
                if(item && item !== ''){
                    return <Carousel.Item key={index}><img className={classes.carouselSize} src={item}/></Carousel.Item>
                }
            })}
        </Carousel>
    )
}

export default MiniCarousel