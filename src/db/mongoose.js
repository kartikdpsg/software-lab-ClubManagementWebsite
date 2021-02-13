const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/club-manage-api',{
    useNewUrlParser : true,
    useCreateIndex : true
})

// const Member = mongoose.model('members',{
//     name : {
//         type:String,
//         required : true,
//         trim:true
//     },
//     rollNo : {
//         type:Number,
//         required : true
//     },
//     email : {
//         type:String,
//         required : true,
//         trim: true,
//         lowercase: true,
//         unique: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password : {
//         type:String,
//         required : true,
//         minlength: 7,
//         trim: true
//     },
//     Year : {
//         type:Number,
//         required : true
//     },
//     Course : {
//         type:String,
//         required : true
//     },
//     clubs: [{
//         club: {
//             type: String
//         }
//     }]
// })

// //module.exports = Member


// const me = new Member({
//     "name":"hk",
//     "rollNo":1801073,
//     "email":"hksvk12345@gmail.com",
//     "password":"Savetigers",
//     "Year":2,
//     "Course":"Btech"
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error!', error)
// })





