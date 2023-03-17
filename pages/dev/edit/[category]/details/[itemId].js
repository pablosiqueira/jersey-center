import Head from "next/head"
import Window from "../../../../../components/Window/Window"
import { MongoClient, ObjectId } from "mongodb"
import DetailsForm from "../../../../../components/Dev/DetailsForm"


const EditDetailsPage = props => {

    async function saveDetails(enteredData){
        console.log(enteredData)
        console.log(JSON.stringify(enteredData))
        const response = await fetch('/api/edit-details?id=' + props.item.id,{
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
            <title>Edit Details</title>
        </Head>
        <Window>
            <DetailsForm item={props.item} saveDetails={saveDetails}/>
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

    const collection = db.collection('jerseys')
    
    const selectedItem = await collection.findOne({_id: new ObjectId(params.itemId)})
    let mini = []
    let trophies = []
    let content = []
    let references = []

    if(selectedItem.details){
        selectedItem.details.mini.map(item => mini.push(item))
        selectedItem.details.content.map(item => content.push({text: item.text, type: item.type}))
        selectedItem.details.references.map(item => references.push(item))
        selectedItem.details.trophies.map(item => trophies.push(item))
    }
      let  item = {
            id: selectedItem._id.toString(),
            club: selectedItem.club.name,
            clubFullName: selectedItem.club.fullName ? selectedItem.club.fullName : '',
            clubImage: selectedItem.club.image,
            brand: selectedItem.brand.name,
            brandImage: selectedItem.brand.image,
            country: selectedItem.country.name,
            countryImage: selectedItem.country.image,
            card: selectedItem.card,
            season: selectedItem.season,
            order: selectedItem.order,
            jersey: selectedItem.name,
            category: selectedItem.category,
            mini,
            trophies,
            content,
            references
        }

    client.close() 
  
    return{
        props:{
            item
        }
    }
  }

export default EditDetailsPage