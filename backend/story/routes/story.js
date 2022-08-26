const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const Multer = require('multer');
const crypto = require('crypto')
  
  

var Minio = require('minio')

var minioClient = new Minio.Client({
    endPoint: "127.0.0.1",
    port: 9000,
    useSSL: false,
    accessKey: 'xwx6gqd2b1aCcj6I',
    secretKey: 'HIjF8mQWOtHizsq4kvK2a7Bl45zpngqs'
});

// minioClient.makeBucket('imagebucket', 'us-east-1', function(err) {
//     if (err) return console.log('Error creating bucket.', err) 
//     console.log('Bucket created successfully in "us-east-1".')
//   })

minioClient.listBuckets(function(err, buckets) {
    if (err) return console.log(err)
    console.log('buckets :', buckets)
  }) 

  var file = 'images/1.jpeg'
  minioClient.fPutObject('images', '1', file, function(e) {
    if (e) {
      return console.log(e)
    }
    console.log("Success")
  })

const Story = require('../models/story');

router.post('/',Multer({dest: "./uploads/"}).single("files"), (req,res)=>{

    const imageName = crypto.randomUUID({disableEntropyCache : true});

    minioClient.fPutObject("images", imageName, req.file.path,function(error, etag) {
        if(error) {
            return console.log(error);
        }
        else
        {
            console.log(etag);
        }
        
    });

    const story = new Story({
        username: req.body.username,
        imageName: imageName
    }) 
    story.save()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json({message:err})
    });
}); 

router.get('/',async(req,res)=>{
    const storys = await Story.find().limit(10).sort({time:-1});
    //console.log(posts);
	res.send(storys);
})

module.exports = router;