const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    phonenumber:{
        required:true,
        type:String    
    },
    password:{
        required:true,
        type:String
    },
    address:{
        required:true,
        type:String    
    }
})

const users = mongoose.model('users',userSchema)

module.exports=users