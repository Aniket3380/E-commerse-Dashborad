const express = require('express')
const cors = require('cors')
const app = express()
require('./Db/config')
const User = require('./Db/User')
const Product = require('./Db/Product')
const Order=require('./Db/Orders')
const jwt = require('jsonwebtoken')
const jwtkey = 'e-com'


app.use(express.json())
app.use(cors())

app.post('/register', async (req, resp) => {
    const{name,email,password}=req.body
    const role=(email==="admin@gmail.com")? 'admin' : 'customer'
    const data = new User({name,email,password,role})
    let result = await data.save()
    result = result.toObject()
    delete result.password

    jwt.sign({ result }, jwtkey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            resp.send("user not found")
        }
        resp.send({ result, acess_token: token })
    })

})
app.post('/login', async (req, resp) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    resp.send("something went wrong please try again")
                }
                resp.send({ user, acess_token: token })
            })


        }
        else {
            resp.send({ result: "user not found" })
        }
    }
    else {
        resp.send({ result: "Provide proper email and password" })
    }


})

app.post('/addproduct',verifyToken, isAdmin,async (req, resp) => {
    const result = new Product(req.body)
    const data = await result.save();
    resp.send(data)
})


app.get('/product',verifyToken, async (req, resp) => {
    const result = await Product.find()
    if (result.length > 0) {
        resp.send(result)
    }
    else {
        resp.send("invalid result")
    }


})

app.delete('/product/:id',verifyToken, async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result)
})

app.get('/product/:id', verifyToken,async (req, resp) => {
    const result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    }
    else {
        resp.send({ result: "No Record Found." })
    }

})

app.put('/product/:id', verifyToken,async (req, resp) => {
    const result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
})

app.get('/search/:key', verifyToken, async (req, resp) => {
    const result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key }  },
            // {price:{$regex:req.params.key}},
            {discription:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            // {image:{$regex:req.params.key}}
        ]
    })
    resp.send(result)
})

app.post('/order',verifyToken,async(req,resp)=>{
    const{userId,items}=req.body;
    if(!items || items.length===0){
        resp.status(400).send({messege:"cart is empty"})
    }
    try{
    const data=new Order({userId,items})
    const result=await data.save()
    resp.send(result)
    }
    catch(error){
        console.log(error)
        resp.status(500).send({messege:"failed to place the order"})
    }
    
})

app.get('/order/:id',verifyToken,async(req,resp)=>{
    try{
        const orders=await Order.find({userId:req.params.id}).populate('items.productId')
        resp.send(orders)

    }
    catch(error){
            resp.status(500).send({message:"error fetching orders"})
    }
})

function verifyToken(req, resp, next) {
    let token = req.headers['authorization']
    console.log("matched", token)
    if (token) {
        token = token.split(' ')[1]  //splitting into next line 
        jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "please provide valid result" })
            }
            else {
                next()
            }
        })

    }
    else {
        resp.status(403).send({ result: "Please add token with header" })
    }



}

function isAdmin(req,resp,next){
    let token=req.headers['authorization']
    if(token ){
        token=token.split(' ')[1]
        jwt.verify(token,jwtkey,(err,decoded)=>{
            const role=decoded.user?.role || decoded.result?.role
            if(role !=='admin'){
                resp.status(403).send("Acess denied")
            }
            next();

        })

    }
    else{
        resp.status(403).send("please provide token in headers")
    }
}


app.listen(5000)