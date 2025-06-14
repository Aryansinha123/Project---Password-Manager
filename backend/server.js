const express = require('express');
const app = express();

const dotenv = require('dotenv')
const bodyParser=require('body-parser')
dotenv.config()
const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'passop'
const cors=require('cors')

 client.connect();
 app.use(bodyParser.json())
 app.use(cors())
 //get password
 app.get('/', async(req, res) => {
    const db=client.db(dbName)
    const collection=db.collection('password')
    const findResult=await collection.find({}).toArray()
    res.json(findResult)
});

 //save password
 app.post('/', async(req, res) => {
    const password=req.body
    const db=client.db(dbName)
    const collection=db.collection('password')
    const findResult=await collection.insertOne(password)
    res.send({success:true,result:findResult})
});

 //delete password
 app.delete('/', async(req, res) => {
    const password=req.body
    const db=client.db(dbName)
    const collection=db.collection('password')
    const findResult=await collection.deleteOne(password)
    res.send({success:true,result:findResult})
});



// // Server setup
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// console.log(process.env.MONGO_URL);