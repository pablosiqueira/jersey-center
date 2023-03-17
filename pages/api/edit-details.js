import {MongoClient, ObjectId} from 'mongodb'

export async function editDetails(req,res){
        let inputData = req.body;
        let message
        let status
  
        const client = await MongoClient.connect(process.env.MONGODB_URI)
        const db = client.db()

        const itemCollection = db.collection('jerseys')
        
        const result = await itemCollection.updateOne({_id:new ObjectId(req.query.id)},{$set: {details: inputData}},{ upsert: true })
        if(result.writeError){
                message = result.writeError.errmsg
                status = 'error'
        }else{
                message = 'The jersey details were updated!'
                status = 'success'
        }
        console.log(result)
        client.close()
        res.status(201).json({message, status})
}

export default editDetails