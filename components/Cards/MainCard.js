import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import classes from './card.module.css'
import Link from 'next/link';
import {TiEdit} from 'react-icons/ti'
import ListGroup from 'react-bootstrap/ListGroup';

const MainCard = (props) => {  
  const gradient = 'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 45.83%, rgba(0, 0, 0, 0.79) 100%)'

  return (
    <>
    {props.mode !== 'edit' && <Card className={'my-2 ' + classes.card} 
      style={
        { background: gradient + ',url(' + props.jersey.card + ')',
        backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center top',
         }}>
      <Link href={'/jerseys/' + props.jersey.id} className={classes.cardLink}>    
      <Card.Body className={classes.cardContent + ' p-0 ' + classes.cardLink}>
        <Card.Title className='mb-1'><b>{props.jersey.club}</b></Card.Title>
        <Card.Subtitle><i>{props.jersey.season} {props.jersey.order}</i></Card.Subtitle>
      </Card.Body> 
      </Link>
    </Card>}

    {props.mode === 'edit' &&
    <Card className='my-2 border border-0'>
      <Link href={'/jerseys/' + props.jersey.id}> 
        <Card.Body className={classes.cardDiv + ' rounded-top ' + classes.cardContent} style={
          { background: gradient + ',url(' + props.jersey.card + ')',
            backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center top',
          }}>
          <Card.Title className='mb-1'><b>{props.jersey.club}</b></Card.Title>
          <Card.Subtitle><i>{props.jersey.season} {props.jersey.order}</i></Card.Subtitle>
        </Card.Body>
      </Link>
      <ListGroup className={"list-group-flush " + classes.editLinks}>
        <Link href={'/dev/edit/jerseys/info/' + props.jersey.id}><ListGroup.Item>Edit Basic Info</ListGroup.Item></Link>
        <Link href={'/dev/edit/jerseys/details/' + props.jersey.id}><ListGroup.Item>Edit Details</ListGroup.Item></Link>
      </ListGroup> 
    </Card>
    }
    </>
  );
}

export default MainCard;