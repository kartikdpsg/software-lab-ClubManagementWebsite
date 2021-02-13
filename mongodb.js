const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'club-member'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) =>{
    if(error){
        return console.log('ksjdh')
    }

    console.log('connected')
})

