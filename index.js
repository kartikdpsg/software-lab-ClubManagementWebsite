const express= require('express')
const bodyParser=require('body-parser')
const auth = require('./src/middleware/auth')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
require('./db/mongoose')

const dotenv = require("dotenv")
dotenv.config()
// console.log(process.env.PASSWORD) 
const CoOrdinator= require('./models/coordinator')
const Member = require('./models/member')
const Admin = require('./models/admin')
const app = express()
const port = process.env.port || 3000

app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json()) 

let otp

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

//login member backend
app.post('/member', async(req, res)=>{    
    try{
        const member = await Member.findByCredentials(req.body.email, req.body.password)
        const token = await member.generateAuthToken()
        res.send({member, token})
        //res.send(member)
    } catch(e){
        res.status(400).send("invalid details")
    }
})

//admin login backend
app.post('/admin', async(req, res)=>{    
    try{
        const email= req.body.email
        const password= req.body.password 
        const admin = await Admin.findByCredentials(email, password)
        const token = await admin.generateAuthToken()
        res.send({admin,token})
    } catch(e){
        res.status(400).send("invalid details")
    }
})

//login coodinator backend
app.post('/coordinator', async(req, res)=>{
    //res.render("C:/Users/'Parikirt Jha'/Club-management/src2/coordinatorLogin.html")
    try{
        const coordinator = await CoOrdinator.findByCredentials(req.body.email, req.body.password)
        const token = await coordinator.generateAuthToken()
        res.send({coordinator, token})
        // res.send(coordinator)
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

app.delete('/member/:id', async(req,res)=>{
    try{
        const member = await Member.findByIdAndDelete(req.params.id)

        if(!member){
            return res.status(404).send('not found')
        }

        res.send(member)
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

