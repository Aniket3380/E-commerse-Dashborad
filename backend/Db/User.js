const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:['admin','customer'],
        default:'customer'
    }
})

module.exports=mongoose.model('users',productSchema)