var express = require('express')
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/',async(req,res)=>{
    var new_user = new User({
        name:req.body.name,
        email:req.body.email,
        password:User.hashPassword(req.body.password),
        creation_date: Date.now()
    });

    const users = await User.find();
    var isDuplicate = false;

    for(let user of users)
    {
        if(user.email == new_user.email)
        {
            isDuplicate = true;
        }
    }
    
    if(!isDuplicate)
    {
        let promise = new_user.save();

        promise.then((doc)=>{
            return res.status(201).json(doc);
        })

        promise.catch((err)=>{
            return res.status(501).json({message:'Error Registering'})
        })
    }
    else
    {
        res.status(501).json({message:'This email already has an account'})
    }
    

});

router.get('/',async(req,res)=>{
    const users = await User.find();
	res.send(users);
});

module.exports = router;