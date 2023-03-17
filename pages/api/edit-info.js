import {MongoClient, ObjectId} from 'mongodb'

export async function addItem(req,res){
        let inputData = req.body;
        console.log('test')
        console.log(inputData)
        const jerseys = inputData.jerseys
        const jerseysIds = []
        jerseys.map(item => jerseysIds.push(new ObjectId(item)))

        let info = {name: inputData.name, image: inputData.image}

        if(req.query.category === 'clubs'){
                if(inputData.fullName){
                        info = {...info,fullName: inputData.fullName}
                }
                if(inputData.background){
                        console.log(inputData.background)
                        info = {...info,background: inputData.background}
                }
        }

        const field = (req.query.category === 'countries' ? 'country' : (req.query.category === 'brands' ? 'brand' : 'club'))

        const client = await MongoClient.connect(process.env.MONGODB_URI)
        const db = client.db()

        const itemCollection = db.collection(req.query.category)
        const jerseyCollection = db.collection('jerseys')

        const checkItem = await itemCollection.findOne({name: inputData.name})
        console.log(checkItem)
        let message
        let status

        if(checkItem && checkItem._id.toString() !== req.query.id){
                console.log('if')
            message='There is another item with the same name'
            status = 'error'
        }else{
                console.log('else')
                const result1 = await itemCollection.updateOne({_id:new ObjectId(req.query.id)},{$set: info})
                console.log(result1)

                let newFields = { [field + '.name'] : inputData.name, [field + '.image']: inputData.image}
                if(req.query.category === 'clubs'){
                        if(inputData.fullName){
                                newFields = {...newFields, 'club.fullName':inputData.fullName}
                        }
        
                }
                const result2 = await jerseyCollection.updateMany({_id: {$in: jerseysIds}},{$set: newFields})
                
                message='The item has been added!'
                status = 'success'
                console.log(result2)
        }
        
        
        client.close()
        res.status(201).json({message, status})
}

export default addItem