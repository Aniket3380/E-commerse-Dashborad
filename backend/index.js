const express=require('express')
const cors=require('cors')
const app=express()
require('./Db/config')
const User=require('./Db/User')
const Product =require('./Db/Product')

app.use(express.json())
app.use(cors())

app.post('/register',async(req,resp)=>{
    const data=new User(req.body)
    let result=await data.save()
    result=result.toObject()
    delete result.password
    resp.send(result)

})
app.post('/login',async(req,resp)=>{
    if(req.body.email && req.body.password)
    {
        let user=await User.findOne(req.body).select("-password")
        if(user){
            resp.send(user)
        }
        else{
            resp.send({result:"user not found"})
        }
    }
    else{
        resp.send({result:"Provide proper email and password"})
    }
   

})

app.post('/addproduct',async(req,resp)=>{
     const result=new Product(req.body)
     const data=await result.save();
     resp.send(data)
})


app.get('/product',async(req,resp)=>{
    const result=await Product.find()
    if(result.length>0)
    {
    resp.send(result)
    console.log(result)
    }
    else
    {
        resp.send("invalid result")
    }
    

})

app.delete('/product/:id',async(req,resp)=>{
    const result=await Product.deleteOne({_id:req.params.id})
    resp.send(result)
})
app.listen(5000)