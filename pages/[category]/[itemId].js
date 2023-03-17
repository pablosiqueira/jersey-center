import DetailsDisplay from "../../components/DetailsDisplay/DetailsDisplay"
import Window from "../../components/Window/Window"
import Head from "next/head"
import { ObjectId, MongoClient } from "mongodb"
import ItemsList from "../../components/List/ItemsList"
import { useRouter } from "next/router"
import LoadingScreen from "../../components/UI/LoadingScreen"

const ItemPage = (props) => {
    const router = useRouter()
    const capitalize = (mySentence) => {
        const words = mySentence.split(' ')
        words.map((item,index) => {return words[index] = item[0].toUpperCase() + item.substr(1)})
        return words.join(' ')
    }

    if (router.isFallback) {
        return (
        <>
        <LoadingScreen />
        </>
        )
    }

    return (
        <>
        {props.category === 'jerseys' &&
        <>
        <Head>
            <title>{capitalize(props.item.name)}</title>
            <link rel="icon" type="image/png" sizes="16x16" href={props.item.clubImage}></link>
        </Head>
         <Window>
            <DetailsDisplay mode='show' mini={props.item.mini} jersey={props.item} content={props.item.content} references={props.item.references} trophies={props.item.trophies}/>
        </Window></>}
        {props.category !== 'jerseys' && 
            <ItemsList perPage={20} category='jerseys' mode='custom' item={props.item} image={props.item.card} name={props.item.name} searchTerm={props.item.name} itemsSize={props.item.itemSize} items={props.item.jerseys}/>  
        }
        </>
    )
}

export async function getServerSideProps({params, query}){
    let category = query.category
    let id = query.itemId

    if(!ObjectId.isValid(id) || !id){
        return{
            notFound:true
        }
    }

    if(category !== 'jerseys' && category !== 'countries' && category !== 'clubs' && category !== 'brands'){
        return{
          notFound:true
        }
      }

    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db()

    const collection = db.collection(category)

    const selectedItem = await collection.findOne({_id: new ObjectId(params.itemId)})

    let item
    let jerseysIds = []
    let jerseys = []
    let mini = []
    let trophies = []
    let content = []
    let references = []
    
    if(category === 'jerseys'){
        if(selectedItem.details){
            selectedItem.details.mini.map(item => mini.push(item))
            selectedItem.details.content.map(item => content.push({text: item.text, type: item.type}))
            selectedItem.details.references.map(item => references.push(item))
            selectedItem.details.trophies.map(item => trophies.push(item))
        }
        item = {
            id: selectedItem._id.toString(),
            club: selectedItem.club.name,
            clubFullName: selectedItem.club.fullName ? selectedItem.club.fullName : '',
            clubImage: selectedItem.club.image,
            clubId: selectedItem.club.id,
            brand: selectedItem.brand.name,
            brandImage: selectedItem.brand.image,
            brandId: selectedItem.brand.id,
            country: selectedItem.country.name,
            countryImage: selectedItem.country.image,
            countryId: selectedItem.country.id,
            card: selectedItem.card,
            season: selectedItem.season,
            order: selectedItem.order,
            name: selectedItem.name,
            mini,
            trophies,
            content,
            references
        }
    }else{
        selectedItem.jerseys.map(item => jerseysIds.push(new ObjectId(item)))
        item = {
            id: selectedItem._id.toString(),
            name: selectedItem.name,
            fullName: selectedItem.fullName ? selectedItem.fullName : '',
            background: selectedItem.background ? selectedItem.background : '',
            card: category === 'jerseys' ? selectedItem.card : selectedItem.image,
            country: category === 'countries' ? selectedItem.name : (category === 'brands' ? '' : selectedItem.country.name),
        }
        const selectedJerseys = await db.collection('jerseys').find({_id: {$in: jerseysIds}}).toArray()
        selectedJerseys.map(selectedJersey  => jerseys.push({
                id: selectedJersey._id.toString(),
                club: selectedJersey.club.name,
                card: selectedJersey.card,
                season: selectedJersey.season,
                order: selectedJersey.order,
                category: selectedJersey.category,
                date: selectedJersey.date,
                name: selectedJersey.name
        }))

        if(query.order){
            switch (query.order){
                case 'nameasc':
                jerseys = jerseys.sort((x,y)=>{
                    if(x.name.toLowerCase() > y.name.toLowerCase()){
                        return 1
                    }else{
                        if(x.name.toLowerCase() < y.name.toLowerCase()){
                            return -1
                        }
                    }
                    
                    return 0
                })
                break
                case 'namedesc':
                    jerseys = jerseys.sort((x,y)=>{
                        if(x.name.toLowerCase() > y.name.toLowerCase()){
                            return -1
                        }
                        if(x.name.toLowerCase() < y.name.toLowerCase()){
                            return 1
                        }
                        return 0
                    })
                break
                case 'new':
                    jerseys = jerseys.sort((x,y)=>{
                        if(x.date > y.date){
                            return -1
                        }
                        if(x.date < y.date){
                            return 1
                        }
                        return 0
                    })
                break
                case 'old':  
                jerseys = jerseys.sort((x,y)=>{
                    if(x.date > y.date){
                        return 1
                    }
                    if(x.date < y.date){
                        return -1
                    }
                    return 0
                })
                break  
              }
        }

        let currentPage = 1
              if(query.page){
              currentPage = query.page
        }

        item = {...item,jerseys}
        item = {...item,itemSize: selectedJerseys.length}
    }
    client.close() 

    return{
        props:{
            item,
            category,
        }
    }
  }

export default ItemPage