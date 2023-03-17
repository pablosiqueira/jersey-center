import {MongoClient, ObjectId} from 'mongodb'

export async function addItem(req,res){
        let inputData = req.body;

        console.log(inputData)

        const client = await MongoClient.connect(process.env.MONGODB_URI)
        const db = client.db()

        const jerseyCollection = db.collection('jerseys')
        
        const result = await jerseyCollection.updateOne({_id:new ObjectId(req.query.id)},{$set: inputData})

        console.log(result)
        client.close()
        res.status(201).json({message: 'inserted!'})
}

export default addItem