import Card from 'react-bootstrap/Card';
import classes from './card.module.css'
import Link from 'next/link';


const SmallCard = (props) => {  
  return (
  <Link href={'/' + (props.mode === 'edit' ? ('dev/edit/' + props.category + '/info/simple') : props.category) + '/' + props.item.id}>
    <Card className={'my-2 ' + classes.smallCard}>
      <Card.Body className={classes.cardContent}>
        <Card.Img className='img-fluid p-1' variant="top" src={props.item.card} />
        <Card.Title as='h5' className={classes.cardTitle + ' mb-1 text-center'}>{props.item.name}</Card.Title>
      </Card.Body>
    </Card>
  </Link>
  );
}

export default SmallCard;