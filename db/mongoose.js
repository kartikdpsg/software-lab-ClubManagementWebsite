const mongoose = require('mongoose')
const validator = require('validator')
const dotenv = require("dotenv")
// mongoose.connect('mongodb://127.0.0.1:27017/club-management-api',{
//     useNewUrlParser : true,
//     useCreateIndex : true
// })
dotenv.config()
mongoose.connect(process.env.DB,{
    useNewUrlParser : true,
    useCreateIndex : true
})






