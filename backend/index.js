const express = require('express')
const cors = require('cors')
const app = express()
require('./Db/config')
const User = require('./Db/User')
const Product = require('./Db/Product')
const jwt = require('jsonwebtoken')
const jwtkey = 'e-com'

app.use(express.json())
app.use(cors())

app.post('/register', async (req, resp) => {
    const data = new User(req.body)
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

app.post('/addproduct',verifyToken, async (req, resp) => {
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
            { name: { $regex: req.params.key } }
        ]
    })
    resp.send(result)
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

app.listen(5000)