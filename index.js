//taskapp
//Harsh@123
const express= require('express')
const multer = require('multer')
const bodyParser=require('body-parser')
const auth = require('./src/middleware/auth')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const mime = require('mime')
const dotenv = require("dotenv")
require('./db/mongoose')

dotenv.config()
const CoOrdinator= require('./models/coordinator')
const Member = require('./models/member')
const Admin = require('./models/admin')
const Club = require('./models/club')

const app = express()
const port = process.env.port || 3000

// var clubData=[{name:"Avant",info:"jvhagsdhjcjhagskcgasjdhvjhavjfycjdahsgdckqegvkajgbkcjd",url:"/avant"},
// {name:"Avant",info:"jvhagsdhjcjhagskcgasjdhvjhavjfycjdahsgdckqegvkajgbkcjd",url:"/avant"},
// {name:"Avant",info:"jvhagsdhjcjhagskcgasjdhvjhavjfycjdahsgdckqegvkajgbkcjd",url:"/avant"},
// {name:"Avant",info:"jvhagsdhjcjhagskcgasjdhvjhavjfycjdahsgdckqegvkajgbkcjd",url:"/avant"}]
// let uploadFileName,uploadFileId


var clubData=[{name:"Avant",url:"/avant"},
{name:"Avant",url:"/avant"},
{name:"Avant",url:"/avant"},
{name:"Avant",url:"/avant"}]

var posts=["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]
// var posts=[]
var clubCoordinators=[{name:"kartik",email:"kartik@fwejkfn.com"},{name:"kartik",email:"kartik@fwejkfn.com"}]
var clubMembers=[{name:"kartik",email:"kartik@fwejkfn.com"},{name:"kartik",email:"kartik@fwejkfn.com"},{name:"kartik",email:"kartik@fwejkfn.com"},{name:"kartik",email:"kartik@fwejkfn.com"},{name:"kartik",email:"kartik@fwejkfn.com"},{name:"kartik",email:"kartik@fwejkfn.com"},{name:"kartik",email:"kartik@fwejkfn.com"},{name:"kartik",email:"kartik@fwejkfn.com"},{name:"kartik",email:"kartik@fwejkfn.com"}]
app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json()) 

let otp

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');



// fs.readFile('credentials.json', (err, content) => {
//     if (err) return console.log('Error loading client secret file:', err);
  
//     authorize(JSON.parse(content), storeFiles);
//   });
//console.log(uploadFileId)


// const SCOPES = ['https://www.googleapis.com/auth/drive'];

// const TOKEN_PATH = 'token.json';
  
//   function authorize(credentials, callback) {
//     const {client_secret, client_id, redirect_uris} = credentials.installed;
//     const oAuth2Client = new google.auth.OAuth2(
//         client_id, client_secret, redirect_uris[0]);
  
//     // Check if we have previously stored a token.
//     fs.readFile(TOKEN_PATH, (err, token) => {
//       if (err) return getAccessToken(oAuth2Client, callback);
//       oAuth2Client.setCredentials(JSON.parse(token));
//       callback(oAuth2Client);
//     });
//   }

//   function getAccessToken(oAuth2Client, callback) {
//     const authUrl = oAuth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: SCOPES,
//     });
//     console.log('Authorize this app by visiting this url:', authUrl);
//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     rl.question('Enter the code from that page here: ', (code) => {
//       rl.close();
//       oAuth2Client.getToken(code, (err, token) => {
//         if (err) return console.error('Error retrieving access token', err);
//         oAuth2Client.setCredentials(token);
  
//         fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//           if (err) return console.error(err);
//         });
//         callback(oAuth2Client);
//       });
//     });
//   }

//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/data')
//     },
//     filename: function (req, file, cb) {
//         uploadFileName=file.originalname
//         cb(null , file.originalname);   
//      }
//   })
   
// const upload = multer({ storage: storage })

//   function storeFiles(auth) {
//     fileName="C:/Users/karti/Downloads/prac2 (1)/public/data/"+uploadFileName
//     var publicurl
//     const drive = google.drive({version: 'v3', auth});
//     var fileMetadata = {
//             'name': fileName
//     };
//     var media = {
//             mimeType: mime.getType(fileName),
//             //PATH OF THE FILE FROM YOUR COMPUTER
//             body: fs.createReadStream(fileName)
//     };
//     drive.files.create({
//         resource: fileMetadata,
//         media: media,
//         fields: 'id'
//     }, function (err, file) {
//     if (err) {
//         console.error(err);
//     } else {
//         publicurl=file.data.id
//         console.log('File Id: ', file.data.id);
//     }
//     drive.permissions.create({
//         fileId: file.data.id,
//         requestBody: {
//           role: 'reader',
//           type: 'anyone',
//         }
//       });
//     const webViewLink = drive.files.get({
//         fileId: file.data.id,
//         fields: 'webViewLink'
//     }).then(response =>{
//         response.data.webViewLink
//     });
//  });
//  uploadFileId = 'https://drive.google.com/file/d/'+publicurl+'/preview'
//   }

clubdet = {
             "name" : "Music",
    }
    
    const club = new Club(clubdet)
    club.save()

var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
});

app.post('/coordinators', async (req, res)=>{
    const coordinator = new CoOrdinator(req.body)

    try{
        await coordinator.save()
        res.status(201).send(coordinator)
    }catch(e){
        res.status(400).send(e)
    }
})

//sign up for admin, not used in website.
app.post('/adminsignup', async (req, res)=>{
    const admin = new Admin(req.body)

    try{
        await admin.save()
        res.status(201).send(admin)
    }catch(e){
        res.status(400).send(e)
    }
})

app.get("/adminProfile",(req,res)=>{
    res.render("adminProfile",{email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin:"Admin",name:"Kartik",clubData})
})

app.get("/changePassword",(req,res)=>{
    res.render("changePassword",{email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin:"Admin",name:"Kartik"})
})

// app.get("/clubPage",(req,res)=>{
//     res.render("clubPage",{email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin:"Admin",name:"Kartik",clubMembers,clubCoordinators})
// })

app.get("/makeAnnouncement", async (req,res)=>{
    // clubName = req.query.name
    const clubName = req.query.name
    const whomToLogin = req.query.whomToLogin
    const email=req.query.email

    if(whomToLogin==="Admin"){
        const user = await Admin.find({email : {$eq: email}})}
    else if(whomToLogin==="CoOrdinator"){
        console.log("1")
        user = await CoOrdinator.find({email : {$eq: email}})
    }
    if(whomToLogin==="Member"){
        console.log("2")
        user = await Member.find({email : {$eq: email}})
    }
    // email=req.query.email
    const clubs = await Club.find({'name':clubName})
    console.log(clubName)
    console.log(clubs)
    res.render("posts",{email:user[0].email,header:"Admin Dashboard",whomToLogin,name:user[0].name,posts:clubs[0].posts, clubs})
})

app.get("/registerCoordinator/:clubName",(req,res)=>{
    const clubName = req.params.clubName
    res.render("registerCoordinator", {email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin:"Admin",name:"Kartik", clubName})
})

app.get("/addClub", async(req, res)=>{
    res.render("addClub",{email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin:"Admin",name:"Kartik"})
})


app.get('/coordinators', async (req,res)=>{
    try{
        const coordinators = await CoOrdinator.find({})
        res.send(coordinators)
    } catch(e){
        res.status(500).send(e)
    }
})

app.get('/coordinators/:id', async (req,res)=>{
    const _id = req.params.id

    try{
        const coordinator = await CoOrdinator.findById(_id)
        if(!coordinator){
            return res.status(404).send()
        }

        res.send(coordinator)
    } catch(e){
        res.status(500).send(e)
    }
})

//coordinator login page
app.get('/coordinator', async (req,res)=>{
    res.render("login",{whomToLogin:"Coordinator"});
})

//member login page
app.get('/member', async (req,res)=>{
    res.render("login",{whomToLogin:"Member"});
})

//member sign up page
app.get('/members', async(req,res)=>{
    res.render("memberSignup")
})

//admin login page
app.get('/admin', async (req,res)=>{
    res.render("login",{whomToLogin:"Admin"});
})



//sign up for member
app.post('/members', async (req, res)=>{
    const member = new Member(req.body)

    try{
        await member.save()
        const token = await member.generateAuthToken()
        res.status(201).send({member,token})

    } catch(e){
        res.status(400).send(e)
    }
})

// app.get('/registerCoordinator/:club', async(req,res)=>{
//     var clubName = req.params.club
//     res.render("registerCoordinator", {email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin:"Admin",name:"Kartik", clubName})
// })

app.get('/registerCoordinator', async(req,res)=>{
    clubName = req.query
    const clubs = await Club.find(clubName)
    console.log(clubName)
    console.log(clubs)
    res.render("registerCoordinator", {email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin:"Admin",name:"Kartik", clubs})
    //res.send(clubName)
})


app.post('/registerCoordinator/:club', async(req,res)=>{
    //const clubName = req.query
    const name = req.params.club
    
    email = req.body.email
    coname = req.body.name
    rollNo = req.body.rollNo
    currYear = req.body.Year
    Course = req.body.Course

   
    // console.log(email+coname+rollNo)

    try{
        const club = await Club.findOneAndUpdate(
             { name },
             { $push: { 'coordinators' : { name : coname, rollNo, email } } },
             { new : true }
        )

         if(!club){
             return res.status(404).send('not found')
         }

         const coordinator = await CoOrdinator.findOneAndUpdate(
            { 'name' : coname},
            { $push: { 'leader_clubs' : { club : name } } },
            { new : true }
        )

        console.log(coordinator)
        console.log(coname+rollNo+email+currYear+Course+coname)

        if(!coordinator){
           /* console.log("haha")
            const newcoordinator = await CoOrdinator.insertOne(
                { 'name' : coname,
                  rollNo,
                  email,
                  'Year':currYear,
                  Course,
                  'password':coname,
                  'leader_clubs':[{'club':name}]
                }
             )
             res.send(newcoordinator)*/

             coordinatordet =  { 
                 'name' : coname,
                  rollNo,
                  email,
                 'Year':currYear,
                  Course,
                 'password':'abcdefgh',
                 'leader_clubs':[{'club':name}]
             }
         

            const newcood = new CoOrdinator(coordinatordet)
            newcood.save()
          }

        res.send(club)
    } catch(e){
        res.status(500).send()
    }
})

//login member backend
// app.post('/member', async(req, res)=>{    
//     try{
//         const member = await Member.findByCredentials(req.body.email, req.body.password)
//         const token = await member.generateAuthToken()
//         //res.send({member, token})

//         const clubData = await Club.find({})
//         //res.render("clubPage",{email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin,name:"Kartik",clubMembers,clubCoordinators, clubData})
//         res.render("adminProfile",{email:member.email,header:"CoOrdinator Dashboard",whomToLogin:"member",name:coordinator.name,clubData})
//         //res.send(member)
//     } catch(e){
//         res.status(400).send("invalid details")
//     }
// })

//admin login backend
app.post('/admin', async(req, res)=>{    
    try{
        const email= req.body.email
        const password= req.body.password 
        const admin = await Admin.findByCredentials(email, password)
        const token = await admin.generateAuthToken()
        //res.send({admin,token})
        //res.render("adminProfile",{email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin:"Admin",name:"Kartik",clubData})

        const clubData = await Club.find({})
        res.render("adminProfile",{email:admin.email,header:"Admin Dashboard",whomToLogin:"Admin",name:admin.name,clubData})
    } catch(e){
        res.status(400).send("invalid details")
    }
})

app.post('/admin', async(req, res)=>{    
    try{
        const email= req.body.email
        const password= req.body.password 
        const admin = await Admin.findByCredentials(email, password)
        const token = await admin.generateAuthToken()
        //res.send({admin,token})
        //res.render("adminProfile",{email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin:"Admin",name:"Kartik",clubData})

        const clubData = await Club.find({})
        res.render("adminProfile",{email:admin.email,header:"Admin Dashboard",whomToLogin:"Admin",name:admin.name,clubData})
    } catch(e){
        res.status(400).send("invalid details")
    }
})

//login coodinator backend
app.post('/coordinator', async(req, res)=>{
    try{
        const coordinator = await CoOrdinator.findByCredentials(req.body.email, req.body.password)
        const token = await coordinator.generateAuthToken()

        //coordinator = await Club.find({email:req.body.email})
        //res.send({coordinator, token})
        //const club = leader_clubs['club']
        //console.log(club)
        //console.log(coordinator)
        //clubs = coordinator[leader_clubs['club']]
        const clubData = await Club.find({})
        //res.render("clubPage",{email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin,name:"Kartik",clubMembers,clubCoordinators, clubData})
        res.render("adminProfile",{email:coordinator.email,header:"CoOrdinator Dashboard",whomToLogin:"CoOrdinator",name:coordinator.name,clubData})
         //res.send(coordinator)
    } catch(e){
        res.status(400).send("invalid details")
    }
})

app.post('/member', async(req, res)=>{
    try{
        const member = await Member.findByCredentials(req.body.email, req.body.password)
        const token = await member.generateAuthToken()
        
        //coordinator = await Club.find({email:req.body.email})
        //res.send({coordinator, token})
        //const club = leader_clubs['club']
        //console.log(club)
        //console.log(coordinator)
        //clubs = coordinator[leader_clubs['club']]
        console.log(member)
        console.log(member.email)
        const clubData = await Club.find({})
        //res.render("clubPage",{email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin,name:"Kartik",clubMembers,clubCoordinators, clubData})
        res.render("adminProfile",{email:member.email,header:"Member Dashboard",whomToLogin:"Member",name:member.name,clubData, member})
         //res.send(member)
    } catch(e){
        res.status(400).send("invalid details")
    }
})

app.get('/members', async (req,res)=>{
    
    try{
        const members = await Member.find({})
        res.send(members)
    } catch(e){
        res.status(500).send(e)
    }
})


app.get('/members/:id', async (req,res)=>{
    const _id = req.params.id

    try{
        const member = await Member.findById(_id)
        if(!member){
            return res.status(404).send()
        }

        res.send(member)
    } catch(e){
        res.status(500).send()
    }
})

// clubdet = {
//          "name" : "Music",
//          "members":[
//              {"name":"Scot",
//               "rollNo":1801802,
//               "email":"dontknow@gmail.com"},
//               {
//                 "name":"Why",
//                 "rollNo":1801338,
//                 "email":"haha@gmail.com"
//               }
//          ],
//          "coordinators":[
//              {
//                 "name":"Rahul",
//                 "rollNo":1801392,
//                 "email":"12qw@gmail.com"
//              }
//          ]
// }

// const club = new Club(clubdet)
// club.save()

app.get('/clubdis', async (req,res)=>{
    const clubName = req.query.name
    const whomToLogin = req.query.whomToLogin
    const email=req.query.email

    console.log(whomToLogin)
    console.log(clubName)
    console.log(email)

    try{
        console.log("2")
        if(whomToLogin==="Admin"){
        user = await Admin.find({email : {$eq: email}})
        }
        else if(whomToLogin==="CoOrdinator"){
            console.log("1")
            user = await CoOrdinator.find({email : {$eq: email}})
        }
        if(whomToLogin==="Member"){
            console.log("2")
            user = await Member.find({email : {$eq: email}})
        }
        console.log(user)
         const clubs = await Club.find({'name':clubName})
        if(!clubs){
            return res.status(404).send()
        }

        console.log(user[0].name)
        console.log(clubs)
        clubMembers = clubs[0].members
        clubCoordinators = clubs[0].coordinators

        //console.log(user[0].club.length)

        res.render("clubPage",{email:user[0].email,header:"Admin Dashboard",whomToLogin,name:user[0].name,clubMembers,clubCoordinators, clubs})
    } catch(e){
        res.status(500).send(e)
    }
})

// app.get('/clubdis', async (req,res)=>{
//     var clubName = req.query
//     //console.log(clubName)
//     try{
//         const clubs = await Club.find(clubName)
//         if(!clubs){
//             return res.status(404).send()
//         }
//         clubMembers = clubs[0].members
//         clubCoordinators = clubs[0].coordinators
//         console.log(clubs)
//        // name = req.query
        
//          //res.render("clubPage",{email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin:"Admin",name:"Kartik",clubMembers,clubCoordinators})
//         res.render("clubPage",{email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin:"CoOrdinator",name:"Kartik",clubMembers,clubCoordinators, clubs})
//         //res.send(clubs[0].members)
//         //res.send(clubs)
//     } catch(e){
//         res.status(500).send(e)
//     }
// })

// app.get("/clubPage",(req,res)=>{
//     // console.log(clubMembers)
//     // console.log(clubCoordinators)
//     res.render("clubPage",{email:"kartik@gmail.com",header:"Admin Dashboard",whomToLogin:"Admin",name:"Kartik",clubMembers,clubCoordinators})
// })


app.get("/sendOtp",(req,res)=>{
    res.render("sendOtp")
})

var emailSetPass
app.post("/sendOtp",async(req,res)=>{
    emailSetPass = req.body.email
    try{
        const member = await Member.findByEmail(emailSetPass)
        otp=Math.floor(Math.random() * 1000000)
        const message = {
            from: 'clubmanagement8@gmail.com', // Sender address
            to: emailSetPass,         // List of recipients
            subject: 'Club Management password reset', // Subject line
            text: "Your OTP is "+ otp// Plain text body
        };
        transport.sendMail(message, function(err, info) {
            if (err) {
            console.log(err)
            //console.log("haha")
            } else {
            console.log(info);
            }
        });
        res.render("resetPassword",{emailAddress:emailSetPass})
    }
    catch(e){
        res.status(400).send("invalid details")
    }
})

app.post("/resetPassword", async (req,res)=>{
    const email = emailSetPass
    const otp1 = req.body.otp
    console.log(email + otp1)
    const password = req.body.password
    //console.log(password)
    const member = await Member.findByEmail(email)
    
    const confirmPassword = req.body.confirmPassword
    if(otp==otp1){
        if(password===confirmPassword){
            const password= await bcrypt.hash(req.body.password, 8)
            console.log(member)         
            member.password=password
            const filter = { email}
            const update = { password};

            // `doc` is the document _after_ `update` was applied because of
            // `returnOriginal: false`
            let doc = await Member.findOneAndUpdate(filter, update, {
                returnOriginal: false
            });
            res.render('homepage')
            //store in db and render homepage
        }
        else{res.status(400).send("invalid details")}
    }
    else{
        res.status(400).send("invalid details")
    }
})

async function changePassword(req, res, who, email) {
    const currentPassword = req.body.currentPassword
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    
    console.log(who + email)
    const admin = await $('#who').findByEmail(email)

    currentPassword= await bcrypt.hash(req.body.currentPassword, 8)

    if(admin.password===currentPassword){   
    if(password===confirmPassword){
        const password= await bcrypt.hash(req.body.password, 8)
        console.log(admin)         
        admin.password=password
        const filter = { email}
        const update = { password};

        let doc = await who.findOneAndUpdate(filter, update, {
            returnOriginal: false
        });
        res.status(400).send("successful")
    }

    else{res.status(400).send("invalid details")}
}
}

app.post("/changePassword/:who/:email", async (req,res)=>{
    const email = req.params.email
    const who = req.params.who
    //console.log(email + who)
    changePassword(req, res, who, email)
})


app.post('/deleteMember/:name/:email', async(req,res)=>{
    const name = req.params.name
    const email = req.params.email
    console.log(name + " " + email)
    // console.log(name)
    // console.log(email)
    try{
        //const club = await Club.findOne({name})
        const club = await Club.findOneAndUpdate(
             { name },
             { $pull: { 'members' : { email } } },
             { new : true }
        )

        const member = await Member.findOneAndUpdate(
            {email},
            {$pull : {'clubs' : {club : name} }}
        )

        if(!club){
            return res.status(404).send('not found')
        }

        res.send(club)
    } catch(e){
        res.status(500).send()
    }
})

app.post('/deleteCoordinator/:name/:email', async(req,res)=>{
    const name = req.params.name
    const email = req.params.email
    console.log(name + " " + email)
    // console.log(name)
    // console.log(email)
    try{
        //const club = await Club.findOne({name})
        const club = await Club.findOneAndUpdate(
             { name },
             { $pull: { 'coordinators' : { email } } },
             { new : true }
        )

        const coordinator = await CoOrdinator.findOneAndUpdate(
            {email},
            {$pull : {'leader_clubs' : {club : name} }}
        )

        if(!club){
            return res.status(404).send('not found')
        }

        res.send(club)
    } catch(e){
        res.status(500).send()
    }
})

app.delete('/coordinator/:id', async(req,res)=>{
    try{
        const coordinator = await CoOrdinator.findByIdAndDelete(req.params.id)

        if(!coordinator){
            return res.status(404).send('not found')
        }

        res.send(coordinator)
    } catch(e){
        res.status(500).send()
    }
})


// const upload = multer({
//     dest:'public/data',
// })

// const upload = multer.diskStorage({   
//     destination: function(req, file, cb) { 
//        cb(null, 'public/data/');    
//     }, 
//     filename: function (req, file, cb) { 
//        cb(null , file.originalname);   
//     }
//  })

 //upload = multer({storage:storage})

//  const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/data')
//     },
//     filename: function (req, file, cb) { 
//         cb(null , file.originalname);   
//      }
//   })
   
// const upload = multer({ storage: storage })

let uploadFileName,uploadFileId


const SCOPES = ['https://www.googleapis.com/auth/drive'];

const TOKEN_PATH = 'token.json';
  
  function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
  
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
        });
        callback(oAuth2Client);
      });
    });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/data')
    },
    filename: function (req, file, cb) {
        uploadFileName=file.originalname
        cb(null , file.originalname);   
     }
  })
   
const upload = multer({ storage: storage })
var uploadName, headingUpload, bodyUpload, postUpload, createdUpload

async function storeDatabase(name, heading, body, post, created, fileId ){
    const club = await Club.findOneAndUpdate(
        { name },
        { $push: { 'posts' : { heading, body, post, created, fileId} } },
        { new : true },
   )

   if(!club){
    return res.status(404).send('not found')
   }
}

  async function storeFiles(auth) {
    fileName="C:/Users/karti/Downloads/prac/public/data/"+uploadFileName
    var publicurl
    const drive = google.drive({version: 'v3', auth});
    var fileMetadata = {
            'name': fileName
    };
    var media = {
            mimeType: mime.getType(fileName),
            //PATH OF THE FILE FROM YOUR COMPUTER
            body: fs.createReadStream(fileName)
    };
    await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, file) {
    if (err) {
        console.error(err);
    } else {
        publicurl=file.data.id
        console.log(publicurl)
        console.log('File Id: ', file.data.id);

        storeDatabase(uploadName, headingUpload, bodyUpload, postUpload, createdUpload, file.data.id)
        // uploadFileId = 'https://drive.google.com/file/d/'+publicurl+'/preview'
        // console.log(uploadFileId)

    }
    drive.permissions.create({
        fileId: file.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        }
      });
    const webViewLink = drive.files.get({
        fileId: file.data.id,
        fields: 'webViewLink'
    }).then(async response =>{
        await response.data.webViewLink
    });
 });
 uploadFileId = 'https://drive.google.com/file/d/'+publicurl+'/preview'
 console.log(uploadFileId)
  }



app.post('/upload/:name', upload.single('upload'), async (req,res)=>{
    uploadName = req.params.name
    //console.log(name)
    try{
        postUpload = req.file.buffer
        headingUpload = req.body.announcementHeading
        bodyUpload = req.body.makeAnnouncement
        createdUpload = new Date()

        fs.readFile('credentials.json', async (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
          
            await authorize(JSON.parse(content), storeFiles);
          });
    

          console.log(uploadFileId)

    //      fileId= uploadFileId

    //      console.log(fileId)

    //     console.log(post)
    //     const created = new Date()
    //     console.log(created)

    //     const club = await Club.findOneAndUpdate(
    //         { name },
    //         { $push: { 'posts' : { heading, body, post, created, fileId} } },
    //         { new : true },
    //    )

       

    //    if(!club){
    //     return res.status(404).send('not found')
    //    }


         res.send(200)
     } catch(e){
         res.status(500).send(e)
     }
})

app.post('/enroll/:name/:email', async(req,res)=>{
    name = req.params.name
    email = req.params.email

    try{
    //member = await Member.find(email)
    member = await Member.find({email : {$eq: email}})
    console.log(member)
    console.log(member[0].rollNo)
    rollNo = member[0].rollNo
    mename = member[0].name

    const club = await Club.findOneAndUpdate(
        { name },
        { $push: { 'members' : { name : mename, rollNo, email } } },
        { new : true }
   )

    member = await Member.findOneAndUpdate(
    { email },
    { $push: { 'clubs' : { club : name } } },
    { new : true }
    )

    res.send(200)
    }catch(e){
        res.status(500).send(e)
    }

})

app.post('/leave/:name/:email', async(req,res)=>{
    name = req.params.name
    email = req.params.email

    try{
    member = await Member.find({email : {$eq: email}})
    console.log(member)
    console.log(member[0].rollNo)
    rollNo = member[0].rollNo
    mename = member[0].name


    const club = await Club.findOneAndUpdate(
        { name },
        { $pull: { 'members' : { email } } },
        { new : true }
    )


    member = await Member.findOneAndUpdate(
    { email },
    { $pull: { 'clubs' : { club : name } } },
    { new : true }
    )

    res.send(200)
    }catch(e){
        res.status(500).send(e)
    }
})


app.get('/upload/:name', async(req,res)=>{
    res.render('homepage')
})

    // const clubs = await Club.find({name})
    // //console.log(clubs)
    // //req.club.posts = req.file.buffer
    // //await req.club.save
    // res.send()
// },(error, req, res, next)=>{
//     res.status(400).send({error:error.message})
// })

app.get('/',(req,res)=>{
    res.render("homepage",{});
})

app.post('/logged', (req,res)=>{
    console.log("logged in")
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})


const jwt = require('jsonwebtoken')

const myFunction= async ()=>{
    const token = jwt.sign({_id:'abc123'}, 'clubmanagement')
    console.log(token)

    const data = jwt.verify(token, 'clubmanagement')
    console.log(data)
}

myFunction()

