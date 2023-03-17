import Head from "next/head"
import AddForm from "../../components/Dev/AddForm"
import Window from "../../components/Window/Window"
import { MongoClient } from "mongodb"

const AddPage = props => {

    async function addItemHandler(enteredData){
        console.log(enteredData)
        console.log(JSON.stringify(enteredData))
        const response = await fetch('/api/add',{
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    }

    return (
    <>
        <Head>
            <title>Add Jersey</title>
        </Head>
        <Window>
        <h1 className='text-center my-4' style={{color:'#CCAD8F'}}>Add Jersey</h1>
        <AddForm onAddItem={addItemHandler} mode='add' modalMessage='The jersey has been added!' countries={props.countries} brands={props.brands} clubs={props.clubs}/>
        </Window>
        
    </>
    )
}

export async function getServerSideProps({params, query}){
    console.log(query)
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db()
    const countriesCollection = db.collection('countries')
    const brandsCollection = db.collection('brands')
    const clubsCollection = db.collection('clubs')

    const selectedClubs = await clubsCollection.find().sort({name:1}).toArray()
    let recievedClubs = []
    selectedClubs.map(selectedClubs => {
      recievedClubs.push({
                  id: selectedClubs._id.toString(),
                  name: selectedClubs.name,
                  fullName: selectedClubs.fullName ? selectedClubs.fullName : '',
                  countryName: selectedClubs.country.name,
                  countryId: selectedClubs.country.id,
                  image: selectedClubs.image
      })
    })
    console.log(recievedClubs)
  
    const selectedcountries = await countriesCollection.find().sort({name:1}).toArray()
    let recievedcountries = []
    selectedcountries.map(selectedCountry => {
      recievedcountries.push({
                  id: selectedCountry._id.toString(),
                  name: selectedCountry.name,
                  image: selectedCountry.image,
      })
    })
    console.log(recievedcountries)

    const selectedBrands = await brandsCollection.find().sort({name:1}).toArray()
    let recievedBrands = []
    selectedBrands.map(selectedBrand => {
        recievedBrands.push({
                  id: selectedBrand._id.toString(),
                  name: selectedBrand.name,
                  image: selectedBrand.image,
      })
    })

    console.log(recievedcountries)
    console.log(recievedBrands)


    client.close() 
  
    return{
        props:{
            countries: recievedcountries,
            brands: recievedBrands,
            clubs: recievedClubs
        }
    }
  }

export default AddPage