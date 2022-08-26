const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();

const Post = require('../models/post');

const verify = require('../routes/verifyToken');
const User = require('../models/user');
const verifyToken = require('../routes/verifyToken');

router.post('/status',verifyToken,(req,res)=>{
    const post = new Post({
        username: req.body.username,
        description: req.body.description
    })
    post.save()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json({message:err})
    });
});

router.get('/',async(req,res)=>{

    const posts = await Post.find().limit(10).sort({time:-1});
    //console.log(posts);
	res.send(posts);
     
});


module.exports = router;