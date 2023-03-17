
import { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import ItemsList from "../../../../components/List/ItemsList"
import { MongoClient } from "mongodb"

const EditListPage = props => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    return(
        <>
            <Head>
                <title>Edit {props.category}</title>
            </Head>
            {isLoading && <h5 className="text-center my-4">Loading...</h5>}
            {!isLoading && props.items && <ItemsList mode='edit' title={'Search in' + props.category} category={props.category} search={router.query.search} itemsSize={props.itemsSize} items={props.items}/>  }

        </>
    )
}

export async function getServerSideProps({params, query}){
    let category = query.category
    let order = query.order

    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db()
    const itemsCollection = db.collection(category)
    let searchTerms = {}
    
    if(query.search){
      const word = new RegExp(query.search,'i')
      searchTerms = {name: word }
    }
  
    console.log(searchTerms)
    const selectedSize = await itemsCollection.countDocuments(searchTerms)
    console.log('size: ' + selectedSize)

    let sortQuery = {_id:-1}
      if(order === 'nameasc'){
        sortQuery = {"name":1}
      }
      if(order === 'namedesc'){
        sortQuery = {"name":-1}
      }
  
    let currentPage = 1
    if(query.page){
      currentPage = query.page
    }  
    
    
    const selectedItems = await itemsCollection.find(searchTerms).sort(sortQuery).skip((currentPage - 1)*20).limit(20).toArray()
    let recievedItems = []
    selectedItems.map(item => {
      recievedItems.push({
        id: item._id.toString(),
        name: item.name,
        title: category === 'jerseys' ? item.club : item.name,
        club: category === 'jerseys' ? item.club.name : item.name,
        card: category === 'jerseys' ? item.card : item.image,
        season: category === 'jerseys' ? item.season : '',
        order: category === 'jerseys' ? item.order : '',
        country: category === 'countries' ? item.name : (category === 'brands' ? '' : item.country.name),
      })
    })
    console.log(selectedItems)
    client.close() 
    return{
        props:{
            items: recievedItems,
            itemsSize: selectedSize,
            category
        }
    }
  }

export default EditListPage