import { useEffect, useState } from "react"

const MyOrders=()=>{
    const user=JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem("token");
    const[orders,setOrders]=useState([])
    console.log(orders)

    useEffect(()=>{
        const fetchData=async()=>{
        const result=await fetch(`http://localhost:5000/order/${user._id}`,{
            
            headers:{
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`}
        })
         const data=await result.json()
        // const text=await result.text()
        // console.log(text)
        // console.log(data)
        setOrders(data)

    }
    fetchData()

    },[user._id])
    return(
        <div className="orders-wrapper">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h3>Order ID: {order._id}</h3>
            <p>Placed on: {new Date(order.createdAt).toLocaleString()}</p>
            <ul>
              {order.items.map((item, idx) => (
                <>
                <li key={idx}>
                  {item.name || "Unknown Product"} - ₹{item.price} x {item.quantity}
                </li>
                <li>
                Total: ₹{order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                </li>
                <li>
                <img src={item.image} alt={item.name} width="60" />
                </li>
                </>
            
              ))}
            </ul>
            <hr />
          </div>
        ))
      )}
    </div>
    )
}
export default MyOrders;