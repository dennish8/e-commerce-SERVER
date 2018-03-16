const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../models/models.items');

//CREATE
router.post('/',(req,res,next)=>{
    const { image,type,tower,floor,lift,bed,bath,sqm,price,quantity,totalPrice } = req.body;  
    let new_item = new Item({ image,type,tower,floor,lift,bed,bath,sqm,price,quantity,totalPrice });
    new_item.save()
    .then((item)=>res.status(200).json({new_item,message:`New item added`}))
    .catch((err)=>res.status(500).json({message:`Create error: ${err}`}));
});
//READ
router.get('/',(req,res,next)=>{
    Item.find()
    .then((items)=>res.status(200).json({items,message:`Item list`}))
    .catch((err)=>res.status(500).json({message:`Read error: ${err}`}));
});
//UPDATE
router.put('/:id',(req,res,next)=>{
    let query = {_id:req.params.id};
    const { image,type,tower,floor,lift,bed,bath,sqm,price,quantity,totalPrice } = req.body;
    Item.findOneAndUpdate(query,{ image,type,tower,floor,lift,bed,bath,sqm,price,quantity,totalPrice })
    .then((item)=>res.status(200).json({item,message:`Item updated`}))
    .catch((err)=>res.status(200).json({message:`Update error ${err}`}));
});
//DELETE
router.delete('/:id',(req,res,next)=>{
    let query = {_id:req.params.id};
    Item.remove(query)
    .then((item)=>res.status(200).json(item))
    .catch((err)=>res.status(500).json({message:`Delete error ${err}`}))
})

module.exports = router;