const mongoose = require('mongoose')

const StorySchema = mongoose.Schema({
    username : {
        type: String,
        required : true
    },
    imageName : {
        type :String,
        required : true
    },
    time : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Story',StorySchema);