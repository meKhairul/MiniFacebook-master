const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();

const Post = require('../models/post');

router.post('/',(req,res)=>{
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

module.exports = router;