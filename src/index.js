const express= require('express')
require('./db/mongoose')
const memberRouter = require('./routers/member')
const coordinatorRouter = require('./routers/coordinator')

const app = express()
const port = process.env.port || 3000

app.use(express.json())
app.use(memberRouter)
app.use(coordinatorRouter)


app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})

// const bcrypt= require('bcryptjs')

// const myFunction = async()=>{
//     const password = 'Red1234'
//     const hashedPassword = await bcrypt.hash(password, 8)


// }

// myFunction()