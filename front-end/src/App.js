import './App.css';
import Navbar from './component/Navbar';
import '../src/assets/main.css'



import { BrowserRouter ,Routes , Route } from 'react-router-dom';

import Footer from './component/footer';
import SignUp from './component/auth';
import Privatecomponent from './component/private_comp';
import Login from './component/login';
import AddProduct from './component/addProduct';
import ProductList from './component/productList';
import UpdateProduct from './component/updateProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={< Privatecomponent />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/logout" element={<h1>Logout Component</h1>} />
          <Route path="/profile" element={<h1>Profile Component</h1>} />
          </Route>
       
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
         
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}


export default App;
