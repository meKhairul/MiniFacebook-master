const express = require('express');
var User = require('./models/user');
const app = express()
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const port = 3003;

const usersRouter = require('./routes/users');
//const postRoute = require('./routes/posts');
//const storyRoute = require('./routes/story');

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
    origin:"http://localhost:4200"
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.use('/users', usersRouter);
//app.use('/posts',postRoute);
//app.use('/story',storyRoute);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });


app.get('/', (req, res) => {
    res.send('Khairul is josh')

});

app.listen(port,
    console.log("Server listen in port " + port)
)

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {};
