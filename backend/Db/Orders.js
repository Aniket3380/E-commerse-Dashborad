const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
    userId: { type: String, required: true }, // Who placed the order
  items: [
    {
      productId: { type: String, required: true },
      name: String,
      price: Number,
      discription: String,
      company: String,
      image: String,
      quantity: { type: Number, default: 1 },
    },
  ],
  createdAt: { type: Date, default: Date.now }
})

module.exports=mongoose.model('orders',orderSchema)