const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Customer = require('../models/models.customers');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configuration');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const checkAuthentication = require('../helpers/middleware/checkAuthentication');
//SIGNUP
router.post('/signup',(req,res,next)=>{
    console.log('IN HERE')
    const {password,email} = req.body;
    Customer.find({email})
    .then((found)=> {
        // console.log(found[0]+'oooooooooooooo');
        if(found[0]===undefined){
            let new_customer = new Customer({password,email});
            new_customer.save()
            .then((customer)=>res.status(200).json({new_customer,message:`New customer added`}))
            .catch((err)=>res.status(500).json({message:`Create error: ${err}`}));
        } else {
            res.status(409).json({message:`Create error`});
        }
    })
});
//SIGNIN
router.post('/signin',(req,res,next)=>{
    const {password,email} = req.body;
    Customer.find({email})
    .then((found)=>{
        if(found[0]!== undefined){
            let check = bcrypt.compareSync(password, found[0].password);
            let token =jwt.sign({email,_id: found[0]._id},JWT_SECRET,{expiresIn:'1h'})
            res.status(200).json({message:`Sign in successful`,token})
        } else {
            res.status(500).json({message:`Sign in error`});
        }
    })
})
//READ
router.get('/',(req,res,next)=>{
    Customer.find()
    .then((customers)=>res.status(200).json({customers,message:`Customer list`}))
    .catch((err)=>res.status(500).json({message:`Read error: ${err}`}));
});
//UPDATE
router.post('/:id',checkAuthentication,(req,res,next)=>{
    let query = {_id:req.params.id};
    const {password,email} =req.body;
    Customer.findOneAndUpdate(query,{password,email})
    .then((customer)=>res.status(200).json({customer,message:`customer updated`}))
    .catch((err)=>res.status(200).json({message:`Update error ${err}`}));
});
//DELETE
router.delete('/:id',checkAuthentication,(req,res,next)=>{
    let query = {_id:req.params.id};
    Customer.remove(query)
    .then((customer)=>res.status(200).json(customer))
    .catch((err)=>res.status(500).json({message:`Delete error ${err}`}))
})

module.exports = router;