import Head from 'next/head'
import classes from '../styles/Home.module.css'
import CardGrid from '../components/Cards/CardGrid'
import { MongoClient } from 'mongodb'
import ActionsList from '../components/List/ActionsList'

const Home = (props) => {
  return (
    <>
      <Head>
        <title>Jersey Database</title>
        <link rel="icon" type="icon" sizes="16x16" href='/favicon.ico'></link>
      </Head>
      <div className={classes.homet + ' pt-4'}>
          <CardGrid items={props.jerseys} category='jerseys' mode='home' jerseysSize={props.jerseysSize} countrySize={props.countrySize}/>
        <ActionsList />
      </div>
    </>
  )
}

export async function getServerSideProps({params, query}){
  console.log(query)
  const client = await MongoClient.connect(process.env.MONGODB_URI)
  const db = client.db()
  const jerseysCollection = db.collection('jerseys')
  const selectedSize = await jerseysCollection.countDocuments()
  const selectedCountries = await jerseysCollection.distinct('country.id')
  console.log('size: ' + selectedSize)
  console.log('countries: ' + selectedCountries.length)

  const selectedjerseys = await jerseysCollection.find().sort({_id:-1}).limit(12).toArray()
  let recievedjerseys = []
  selectedjerseys.map(selectedJersey => {
    recievedjerseys.push({
                id: selectedJersey._id.toString(),
                club: selectedJersey.club.name,
                card: selectedJersey.card,
                season: selectedJersey.season,
                order: selectedJersey.order,
    })
  })
  console.log(selectedjerseys)
  client.close() 

  return{
      props:{
          jerseys: recievedjerseys,
          jerseysSize: selectedSize,
          countrySize: selectedCountries.length
      }
  }
}





export default Home
