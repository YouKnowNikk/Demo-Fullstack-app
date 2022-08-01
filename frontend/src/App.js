
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/Addproduct'
import ProductsList from './ProductsList';
import Update from './Components/Update'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path="/" element={<ProductsList/>} />
          <Route path="/add" element={<AddProduct/>}/>
          <Route path="/update/:id" element={<Update/>}/>
          <Route path="/logout" element={<h1>Log out page</h1>}/>
          <Route path="/profile" element={<h1>lorem*1000</h1>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
