
import "./App.css"
import Nav from './component/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FooTer from './component/FooTer';
import SignUp from './component/SignUp';
import PrivateComponent from './component/PrivateComponent';
import Login from './component/Login';
import AddProduct from './component/AddProduct';
import Product from "./component/Product"
import bgImage from "./images/demo.jpg"
import UpdateProduct from "./component/UpdateProduct";



function App() {
  return (
    <div className='app-wrapper'>
       <div
  className="background-img"
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -1,
    opacity: 0.12,
    pointerEvents: 'none',
  }}
></div>
     
    <BrowserRouter>
 
    <Nav/>
    <main className='main-content'>
    <Routes>
      <Route element={<PrivateComponent/>}>
      <Route path="/" element={<Product/>}/>
      <Route path='/addproduct' element={<AddProduct/>}/>
      <Route path='/update/:id' element={<UpdateProduct/>}/>
      <Route path='/profile' element={<h1>Profile</h1>}/>
      <Route path='/' element={<h1>Logout</h1>}/>
     
      </Route>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </main>
    <FooTer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
