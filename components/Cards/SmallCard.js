import Card from 'react-bootstrap/Card';
import classes from './card.module.css'
import Link from 'next/link';
import Image from 'next/image';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
//placeholder='blur' blurDataURL='/place.png'

const SmallCard = (props) => {  
  const [isLoading, setIsLoading] = useState(true)
  return (
  <Link className='text-decoration-none'
  href={'/' + (props.mode === 'edit' ? ('dev/edit/' + props.category + '/info/simple') : props.category) + '/' + props.item.id}>
    <Card className={'my-2 ' + classes.smallCard}>
      <Card.Body className={classes.cardContent}>
        <Image className='img-fluid p-1 mb-2' width='200'
        onLoadingComplete = {()=>setIsLoading(false)} 
        height='200' src={props.item.card} alt={props.item.name} />

        {isLoading && <Spinner animation="border" role="status" className='d-block mx-auto m-2'>
        <span className="visually-hidden">Loading...</span>
        </Spinner>}

        <Card.Title as='h5' className={classes.cardTitle + ' mb-1 text-center'}>{props.item.name}</Card.Title>
      </Card.Body>
    </Card>
  </Link>
  );
}

export default SmallCard;