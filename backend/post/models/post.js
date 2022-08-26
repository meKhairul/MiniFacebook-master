const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    username : {
        type: String,
        required : true
    },
    description : {
        type :String,
        required : true
    },
    time : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Post',PostSchema);