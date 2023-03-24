import { MongoClient } from 'mongodb'
import Home from '../components/Home/Home'

const HomePage = (props) => {
  return (
    <>
      <Home jerseys={props.jerseys} jerseysSize={props.jerseysSize} countrySize={props.countrySize}/>
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





export default HomePage
