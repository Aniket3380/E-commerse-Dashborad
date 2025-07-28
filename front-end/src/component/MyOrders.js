import { useEffect, useState } from "react"
import "./Myorder.css"

const MyOrders = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [orders, setOrders] = useState([])

  console.log(orders)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:5000/order/${user._id}`, {

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      const data = await result.json()
      // const text=await result.text()
      // console.log(text)
      // console.log(data)
      setOrders(data)

    }
    fetchData()

  }, [user._id])


  const handleCancel=async(order_id)=>{
     const confirm=window.confirm("Are you sure you want to cancel this order?")
     if(!confirm) return;
     console.log(order_id)
      let res=await fetch(`http://localhost:5000/order/cancel/${order_id}`,{
        method:'put',
        headers:{
          'Content-Type':'application/json',
          Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      const result=await res.json()
      if(res.ok){
          setOrders((prevOrder)=>
                prevOrder.map((order)=>
                order._id===order_id ? {...order,status:'cancelled'}:order)
          )
      }
      else{
        alert(result.message || "failed to cancel the order")
      }
          
     }
     
  
  
  return (
    <div className="orders-wrapper">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders-message">You haven't placed any orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h3>Order ID: {order._id}</h3>
            <p>Placed on: {new Date(order.createdAt).toLocaleString()}</p>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx} className="order-item">
                  <img src={item.image} alt={item.name} width="60" />
                  <div className="item-details">
                    <p>{item.name || "Unknown Product"} - ₹{item.price} x {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
            {
              order.status !=="cancelled" ?
              <button
              className="cancel-btn"
              onClick={()=>handleCancel(order._id)}
              >
               Cancel Order
              </button>:
              <p className="cancelled-status">order cancelled</p>
            }
            <p className="order-total">Total: ₹{order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  )
}
export default MyOrders;