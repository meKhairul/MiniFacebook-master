const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    creation_date:{
        type:Date,
        default:Date.now
    },

});

UserSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

UserSchema.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword,this.password);
}

module.exports = mongoose.model('User',UserSchema);