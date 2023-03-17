import { useRouter } from "next/router"
import { MongoClient } from "mongodb";
import ItemsList from "../../components/List/ItemsList";

const AllPage = (props) => {
    const router = useRouter();
    const category = router.query.category;
    const searchTerm = router.query.search

    return (
        <>
        <ItemsList perPage={(category === 'jerseys') ? 20 : 24} filterData={props.filterData} category={category} search={searchTerm} itemsSize={props.itemsSize} items={props.items} mode='basic'/>  
        </>
    )
}

export async function getServerSideProps({params, query}){
    console.log(query)
    let category = query.category
    let order = query.order

    if(category !== 'jerseys' && category !== 'countries' && category !== 'clubs' && category !== 'brands'){
      return{
        notFound:true
      }
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db()
    const itemsCollection = db.collection(query.category)
    
    

    let searchTerms = {}
    
    if(query.search){
      const word = new RegExp(query.search,'i')
      searchTerms = {name: word}
    }

    if(category === 'jerseys' || category === 'clubs'){
      if(query.categories){
        let categoriesData = (typeof query.categories === 'string' ? query.categories : {"$in": query.categories})
        searchTerms = {...searchTerms, category: categoriesData}
      }
      if(query.countries){
        let countriesData = (typeof query.countries === 'string' ? query.countries : {"$in": query.countries})
        searchTerms = {...searchTerms, 'country.name': countriesData}
      }
    }

    if(category === 'jerseys'){
      if(query.brands){
        let brandsData = (typeof query.brands === 'string' ? query.brands : {"$in": query.brands})
        searchTerms = {...searchTerms, 'brand.name': brandsData}
      }
      if(query.clubs){
        let clubsData = (typeof query.clubs === 'string' ? query.clubs : {"$in": query.clubs})
        searchTerms = {...searchTerms, 'club.name': clubsData}
      }
    }

    let sortQuery = {_id:-1}
    switch (order){
      case 'nameasc':
        if(category === 'jerseys'){
          sortQuery = {"club":1, "season":1}
        }else{
          sortQuery = {"name":1}
        }
      break
      case 'namedesc':
        if(category === 'jerseys'){
          sortQuery = {"club":-1, "season":1}
        }else{
          sortQuery = {"name":-1}
        }
      break
      case 'new':
        sortQuery = {_id:-1}
      break
      case 'old':  
        sortQuery = {_id:1}
      break  
    }

    let currentPage = 1
    if(query.page){
    currentPage = query.page
    }

    const selectedSize = await itemsCollection.countDocuments(searchTerms)
    console.log('size: ' + selectedSize)

    const itemsPerPage = (category === 'jerseys') ? 20 : 24
    console.log('category: ' + category)
    const selectedItems = await itemsCollection.find(searchTerms).sort(sortQuery).skip((currentPage - 1)*itemsPerPage).limit(itemsPerPage).toArray()
    
    let recievedItems = []
    selectedItems.map(item => {
      recievedItems.push({
                  id: item._id.toString(),
                  name: item.name,
                  title: category === 'jerseys' ? item.club : item.name,
                  club: category === 'jerseys' ? item.club.name : (category === 'clubs' ? item.name : ''),
                  card: category === 'jerseys' ? item.card : item.image,
                  season: category === 'jerseys' ? item.season : '',
                  order: category === 'jerseys' ? item.order : '',
                  country: category === 'countries' ? item.name : (category === 'brands' ? '' : item.country.name),
                  brand: category === 'jerseys' ? item.brand.name : '',
                  category: (category === 'jerseys' || category === 'clubs') ? item.category : ''
      })
    })

    let recievedcountries = []
    let recievedBrands = []
    let recievedClubs = []
    
    
    if(category === 'jerseys' || category === 'clubs'){
      const selectedcountries = await db.collection('countries').find().sort({name:1}).toArray()
      selectedcountries.map(selectedCountry => {recievedcountries.push(selectedCountry.name)})
      recievedcountries = [... new Set(recievedcountries)]

      if(category === 'jerseys'){
        const selectedBrands = await db.collection('brands').find().sort({name:1}).toArray()
        const selectedClubs = await db.collection('clubs').find().sort({name:1}).toArray()

        selectedBrands.map(selectedBrand => recievedBrands.push(selectedBrand.name))
        selectedClubs.map(selectedClub => recievedClubs.push(selectedClub.name))

        recievedBrands = [... new Set(recievedBrands)]
        recievedClubs = [... new Set(recievedClubs)]
      }

    }
      
    client.close() 
  
    return{
        props:{
            items: recievedItems,
            itemsSize: selectedSize,
            filterData: {
              categories: ['club','national team'],
              brands: recievedBrands,
              clubs: recievedClubs,
              countries: recievedcountries,
            }
        }
    }
  }

export default AllPage