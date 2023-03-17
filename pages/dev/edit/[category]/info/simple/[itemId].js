import Head from "next/head"
import SimpleForm from "../../../../../../components/Dev/SimpleForm"
import Window from "../../../../../../components/Window/Window"
import { MongoClient, ObjectId } from "mongodb"

const EditSimpleInfoPage = props => {

    async function editItemHandler(enteredData){
        console.log(enteredData)
        console.log(JSON.stringify(enteredData))
        const response = await fetch('/api/edit-info?id=' + props.item.id + '&category=' + props.category,{
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
            <title>Edit</title>
        </Head>
        <Window>
        <h1 className='text-center my-4'>Edit</h1>
        <SimpleForm category={props.category} mode='edit' item={props.item} message='The Item has been edited' countries={props.countries} editData={editItemHandler}/>
        </Window>
        
    </>
    )
}

export async function getServerSideProps({params, query}){
    const category = params.category

    if(!params.itemId || !ObjectId.isValid(params.itemId) || category === 'jerseys'){
        return{
            notFound:true
        }
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db()

    const collection = db.collection(category)

    const selectedItem = await collection.findOne({_id: new ObjectId(params.itemId)})
    let jerseys = []
    selectedItem.jerseys.map(item => jerseys.push(item))

      let  item = {
        id: selectedItem._id.toString(),
        name: selectedItem.name,
        fullName: selectedItem.fullName ? selectedItem.fullName : '',
        image: selectedItem.image,
        background: selectedItem.background ? selectedItem.background : '',
        country: category === 'clubs' ? selectedItem.country.name : '',
        countryId: category === 'clubs' ? selectedItem.country.id : '',
        jerseys
        }

    let recievedcountries = []

    if (category === 'clubs'){
        const selectedcountries = await db.collection('countries').find().sort({name:1}).toArray()
        
        selectedcountries.map(selectedCountry => {
          recievedcountries.push({
                      id: selectedCountry._id.toString(),
                      name: selectedCountry.name,
                      image: selectedCountry.image
          })
        })
    }    
    
    console.log(recievedcountries)


    client.close() 
  
    return{
        props:{
            countries: recievedcountries,
            item,
            category
        }
    }
  }

export default EditSimpleInfoPage