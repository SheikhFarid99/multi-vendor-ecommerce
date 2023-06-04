import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Shops from './pages/Shops';
import Card from './pages/Card';
import Details from './pages/Details';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shops' element={<Shops />} />
        <Route path='/card' element={<Card />} />
        <Route path='/product/details/:slug' element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
