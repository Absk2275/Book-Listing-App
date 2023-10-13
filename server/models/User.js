const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        require:true
    },
    location:{
        type:String, 
        required:true
    },
    email:{
        type:String, 
        require:true, 
        unique:true
    },
    password: {
        type:String,
        require:true
     },
     role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
     },
    date:{
        type:Date,
        default:Date.now
    }

})
const User = mongoose.model("user", userSchema);

module.exports = User;