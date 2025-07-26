
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
import PageNotFound from "./component/PageNotFound"



function App() {
  const[role,setRole]=useState(null)
  useEffect(() => {
    const storedRole = JSON.parse(localStorage.getItem('role'));
    setRole(storedRole);
    console.log(storedRole)
    
  },[JSON.parse(localStorage.getItem('role'))])
  
  // if(role===null)
  //   {
  //     return null
  //   }
 
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
     {role==='customer' && <Route path="/cart" element={<Cart/>}/> }
     {role==='customer' && <Route path="/orders" element={<MyOrders/>}/>}
     
      </Route>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
   
    </main>
    <FooTer/>
    </div>
   
    </BrowserRouter>
 
    </div>
  );
}

export default App;
