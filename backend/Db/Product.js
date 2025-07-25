const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    discription:String,
    company:String,
    image:String,


})

module.exports=mongoose.model('products',productSchema)