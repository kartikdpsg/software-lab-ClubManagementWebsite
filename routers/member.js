const express = require('express')
const Member= require('../models/member')
const router = new express.Router()

router.post('/members', async (req, res)=>{
    const member = new Member(req.body)

    try{
        await member.save()
        res.status(201).send(member)

    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/members/login', (req,res)=>{
    res.render('memberLogin')
})

router.post('/members/login', async(req, res)=>{
    
    try{
        const member = await Member.findByCredentials(req.body.email, req.body.password)
        res.send(member)
    } catch(e){
        res.status(400).send()
    }
})

router.get('/members', async (req,res)=>{
    
    try{
        const members = await Member.find({})
        res.send(members)
    } catch(e){
        res.status(500).send(e)
    }
})


router.get('/members/:id', async (req,res)=>{
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

module.exports = router