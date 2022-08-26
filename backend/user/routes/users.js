var express = require('express')
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const authorization = require('../routes/authorization');
//const verify = require('../routes/verifyToken');

require('dotenv').config();
//console.log(process.env.SECRET_TOKEN)

router.post('/register',async(req,res)=>{
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

// router.post('/login',async(req,res)=>{

//     const user = await User.findOne({email:req.body.email});

//     //console.log(user.password + " " + user.email);

//     if(!user)
//     {
//         return res.status(400).send({message : 'Email or password incorrect'})
//     }

//     const isValidPassword = await bcrypt.compareSync(req.body.password,user.password);

//     if(!isValidPassword)
//     {
//         return res.status(400).send({message : 'Invalid password'})
//     }

//     const token = jwt.sign({_id : user._id},process.env.SECRET_TOKEN)

//     res.header('auth-token',token).send(token);
    
//     res.send('Logged In');

// })

// router.put('/logout',(req,res)=>{
    
    
    
//     jwt.sign(req.header('auth-token'), "", 
//     { expiresIn: 1 } , 
//     (logout, err) => 
//     {
//         if (logout) 
//         {
//             res.send({msg : 'You have been Logged Out' });
//         } 
//         else 
//         {
//             res.send({msg:'Error'});
//         }});
// });

router.post("/login", async(req, res) => {
    const user = await User.findOne({email:req.body.email});
    if(!user)
    {
         return res.status(201).send(false)
     }

     const isValidPassword = await bcrypt.compareSync(req.body.password,user.password);

    if(!isValidPassword) 
    {
        return res.status(201).send(false)
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(token); 
  });

  
  router.get("/logout", authorization, (req, res) => {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀"});
  });
  

router.get('/',async(req,res)=>{
    const users = await User.find();
	res.send(users);
});  

router.post('/loggedin',async(req,res)=>{

    const token = req.body.token; 
    //console.log(token)
    const data = jwt.verify(token, process.env.SECRET_TOKEN);
    //console.log(data)

    const logged_user = await User.findOne({_id:data._id});
    res.send(logged_user);
});  
  
module.exports = router;