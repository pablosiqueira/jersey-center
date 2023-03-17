import Head from "next/head"
import AddForm from "../../../../../components/Dev/AddForm"
import Window from "../../../../../components/Window/Window"
import { MongoClient, ObjectId } from "mongodb"

const EditBasicInfoPage = props => {

    async function addItemHandler(enteredData){
        console.log(enteredData)
        console.log(JSON.stringify(enteredData))
        const response = await fetch('/api/edit-jersey-info?id=' + props.item.id,{
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
            <title>Edit Jersey</title>
        </Head>
        <Window>
        <h1 className='text-center my-4 pt-4'>Edit Jersey</h1>
        <AddForm onAddItem={addItemHandler} mode='edit' jersey={props.jersey} modalMessage='The Jersey has been edited' countries={props.countries} brands={props.brands} clubs={props.clubs} item={props.item}/>
        </Window>
        
    </>
    )
}

export async function getServerSideProps({params, query}){
    if(!params.itemId || !ObjectId.isValid(params.itemId)){
        return{
            notFound:true
        }
    }
    console.log(query)
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db()

    const countriesCollection = db.collection('countries')
    const brandsCollection = db.collection('brands')
    const clubsCollection = db.collection('clubs')

    const collection = db.collection('jerseys')

    const selectedItem = await collection.findOne({_id: new ObjectId(params.itemId)})
    
      let  item = {
            id: selectedItem._id.toString(),
            club: selectedItem.club.name,
            clubFullName: selectedItem.club.fullName ? selectedItem.club.fullName : '',
            brand: selectedItem.brand.name,
            country: selectedItem.country.name,
            card: selectedItem.card,
            season: selectedItem.season,
            order: selectedItem.order,
            jersey: selectedItem.name,
            category: selectedItem.category
        }

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
                  image: selectedCountry.image
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
            clubs: recievedClubs,
            item
        }
    }
  }

export default EditBasicInfoPage