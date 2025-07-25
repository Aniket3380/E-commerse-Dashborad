
import "./App.css"
import Nav from './component/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FooTer from './component/FooTer';
import SignUp from './component/SignUp';
import PrivateComponent from './component/PrivateComponent';
import Login from './component/Login';
import AddProduct from './component/AddProduct';
import Product from "./component/Product"
import UpdateProduct from "./component/UpdateProduct";
import { useEffect ,useState} from "react";
import ProductDetails from "./component/ProductDetails";
import Cart from "./component/Cart";
import MyOrders from "./component/MyOrders";



function App() {
  const[role,setRole]=useState(null)
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, [localStorage.getItem('role')])
 
  return (
    <div className='app-wrapper'>     
    <BrowserRouter>
    <div className="dynamic-bg-animated">
    <Nav/>
    <main className='main-content'>
      
    <Routes>
      <Route element={<PrivateComponent/>}>
      <Route path="/" element={<Product/>}/>
      <Route path="/product/:id" element={<ProductDetails />} />
  { role==='admin' && <Route path='/addproduct' element={<AddProduct/>}/> }
    { role==='admin' && <Route path='/update/:id' element={<UpdateProduct/>}/> }
      <Route path='/profile' element={<h1>Profile</h1>}/>
      <Route path='/' element={<h1>Logout</h1>}/>
     {role==='customer' && <Route path="/cart" element={<Cart/>}/> }
     {role==='customer' && <Route path="/orders" element={<MyOrders/>}/>}
     
      </Route>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
   
    </main>
    <FooTer/>
    </div>
   
    </BrowserRouter>
 
    </div>
  );
}

export default App;
