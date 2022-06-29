var express = require('express')
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/',(req,res)=>{
    var user = new User({
        name:req.body.name,
        email:req.body.email,
        password:User.hashPassword(req.body.password),
        creation_date: Date.now()
    });
    let promise = user.save();

    promise.then((doc)=>{
        return res.status(201).json(doc);
    })

    promise.catch((err)=>{
        return res.status(501).json({message:'Error Registering'})
    })

});

module.exports = router;