import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Shops from './pages/Shops';
import Card from './pages/Card';
import Details from './pages/Details';
import Register from './pages/Register';
import Login from './pages/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/shops' element={<Shops />} />
        <Route path='/card' element={<Card />} />
        <Route path='/product/details/:slug' element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
