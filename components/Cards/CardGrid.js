import MainCard from "./MainCard"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './card.module.css'
import SmallCard from "./SmallCard";

const CardGrid = (props) => {
    return(
        <>
            <div className={"mx-auto my-4 " + classes.gridDiv}>
                <Container>
                    {props.category === 'jerseys' && <Row id='cardRow' lg={4} md={3} sm={3} xs={2}>
                    {props.items.map(jersey => {
                        return <Col key={jersey.id} offset={1}><MainCard jersey={jersey} mode={props.mode} /></Col>
                    })}
                    </Row>}

                    {props.category !== 'jerseys' && <Row id='cardRow' lg={6} md={3} sm={3} xs={2}>
                    {props.items.map(item => {
                        return <Col key={item.id} offset={1}><SmallCard item={item} category={props.category} mode={props.mode}/></Col>
                    })}
                    </Row>}
                </Container>
            </div>
        </>
    )
}

export default CardGrid