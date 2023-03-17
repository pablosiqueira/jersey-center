import {MongoClient, ObjectId} from 'mongodb'

export async function addItem(req,res){
        console.log('adding')
        let inputData = req.body;
        //console.log(inputData)
        const client = await MongoClient.connect(process.env.MONGODB_URI)
        const db = client.db()

        const itemCollection = db.collection(req.query.collection)
        
        const checkItem = await itemCollection.findOne({name: inputData.name})
        //console.log(checkItem)
        let message
        let status
        let newId
        if(checkItem){
            message='There is another item with the same name'
            status = 'error'
            newId = ''
        }else{
            console.log('add 1')
            const result = await itemCollection.insertOne(inputData)
            console.log(result)
            if(!result.insertedId){
                message='Error adding item, try again later.'
                status='error'
            }else{
                message='The item was created with success'
                status='sucess'
                newId = result.insertedId.toString()
                console.log(newId)
                if(req.query.collection === 'jerseys'){
                    console.log('if')
                    const clubResult = await db.collection('clubs').updateOne({_id: new ObjectId(inputData.club.id)}, {$push: {jerseys: newId}})
                    console.log('update 1')
                    //console.log(clubResult)
                    const countryResult = await db.collection('countries').updateOne({_id: new ObjectId(inputData.country.id)}, {$push: {jerseys: newId}})
                    console.log('update 2')
                    //console.log(countryResult)
                    const brandResult = await db.collection('brands').updateOne({_id: new ObjectId(inputData.brand.id)}, {$push: {jerseys: newId}})
                    console.log('update 3')
                    //console.log(brandResult)
                }
            }
            //console.log(result)
        }

            client.close()
            res.status(201).json({message, status, newId})
           
}

export default addItem