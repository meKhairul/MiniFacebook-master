const express = require('express');
var User = require('./models/user');
const app = express()
const bodyParser = require('body-parser');
const port = 3000

var usersRouter = require('./routes/users');
const postRoute = require('./routes/posts');

const mongoose = require('mongoose')

const mongoDB = 'mongodb://localhost/MiniFacebook';
mongoose.connect(mongoDB, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    ,()=>
    {
        console.log('Database connected')
    }
);

const cors = require('cors');
app.use(cors({
    origin:"http://loaclhost/4200"
}));

app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/posts',postRoute);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Khairul is josh')

});

// app.post('/register',(req,res)=>{
//     var user = new User({
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password,
//         creation_date: Date.now()
//     });
//     let promise = user.save();

//     promise.then((doc)=>{
//         return res.status(201).json(doc);
//     })

//     promise.catch((err)=>{
//         return res.status(501).json({message:'Error Registering'})
//     })

// });


app.listen(port,
    console.log("Server listen in port " + port)
)

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {};
