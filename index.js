const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
require('./db/mongoose')

const CoOrdinator= require('./models/coordinator')
const Member = require('./models/member')
const app = express()
const port = process.env.port || 3000

app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json()) 
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

let otp

var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "clubmanagement8@gmail.com",
      pass: "Clubmanagement@1"
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

app.post('/coordinators/login', async(req, res)=>{
    res.render("C:/Users/'Parikirt Jha'/Club-management/src2/coordinatorLogin.html")
    try{
        const coordinator = await CoOrdinator.findByCredentials(req.body.email, req.body.password)
        res.send(coordinator)
    } catch(e){
        res.status(400).send()
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

app.get('/coordinator', async (req,res)=>{
    res.render("login",{whomToLogin:"Coordinator"});
})

app.get('/member', async (req,res)=>{
    res.render("login",{whomToLogin:"Member"});
})


app.get('/signup', async(req,res)=>{
    res.render("memberSignup")
})

app.get('/admin', async (req,res)=>{
    res.render("login",{whomToLogin:"Admin"});
})




app.post('/members', async (req, res)=>{
    const member = new Member(req.body)

    try{
        await member.save()
        res.status(201).send(member)

    } catch(e){
        res.status(400).send(e)
    }
})


app.post('/member', async(req, res)=>{
    try{
        const checkedBody = req.body.checkBox;
        const email= req.body.email
        const password= req.body.password 
        console.log(`${email} and password is ${password}`)
        console.log(req)
        const member = await Member.findByCredentials(email, password)
        res.send(member)
        if(checkedBody === 'on'){
            //code for sessions
        }
    } catch(e){
        res.status(400).send("invalid details")
    }
})

app.post('/coordinator', async(req, res)=>{
    try{
        const checkedBody = req.body.checkBox;
        const email= req.body.email
        const password= req.body.password 
        console.log(`${email} and password is ${password}`)
        console.log(req)
        const member = await Member.findByCredentials(email, password)
        res.send(member)
        if(checkedBody === 'on'){
            //code for sessions
        }
    } catch(e){
        res.status(400).send("invalid details")
    }
})

app.post('/admin', async(req, res)=>{
    try{
        const checkedBody = req.body.checkBox;
        const email= req.body.email
        const password= req.body.password 
        console.log(`${email} and password is ${password}`)
        console.log(req)
        const member = await Member.findByCredentials(email, password)
        res.send(member)
        if(checkedBody === 'on'){
            //code for sessions
        }
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

app.get("/sendOtp",(req,res)=>{
    res.render("sendOtp")
})

app.post("/sendOtp",async(req,res)=>{
    const email= req.body.email
    try{
        const member = await Member.findByCredentials(email, password)
        otp=Math.floor(Math.random() * 1000000)
        const message = {
            from: 'clubmanagement8@gmail.com', // Sender address
            to: email,         // List of recipients
            subject: 'Club Management password reset', // Subject line
            text: "Your OTP is "+ otp// Plain text body
        };
        transport.sendMail(message, function(err, info) {
            if (err) {
            console.log(err)
            } else {
            console.log(info);
            }
        });
        res.render("resetPassword",{emailAddress:email})
    }
    catch(e){
        res.status(400).send("invalid details")
    }
})

app.post("/resetPassword",(req,res)=>{
    const email = req.body.email
    const otp1 = req.body.otp
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    if(otp==otp1){
        if(password===confirmPassword){
            //store in db and render homepage
        }
        else{res.status(400).send("invalid details")}
    }
    else{
        res.status(400).send("invalid details")
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

app.get('/',(req,res)=>{
    res.render("homepage",{});
})

app.post('/logged', (req,res)=>{
    console.log("logged in")
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})
