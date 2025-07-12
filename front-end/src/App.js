
import './App.css';
import Nav from './component/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FooTer from './component/FooTer';
import SignUp from './component/SignUp';
import PrivateComponent from './component/PrivateComponent';
import Login from './component/Login';
import AddProduct from './component/AddProduct';
import Product from "./component/Product"


function App() {
  return (
    <div className='app-wrapper'>
    <BrowserRouter>
    <Nav/>
    <main className='main-content'>
    <Routes>
      <Route element={<PrivateComponent/>}>
      <Route path="/" element={<Product/>}/>
      <Route path='/addproduct' element={<AddProduct/>}/>
      <Route path='/update' element={<h1>Update Product</h1>}/>
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
