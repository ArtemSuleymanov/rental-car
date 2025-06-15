import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import CarDetails from './pages/CarDetails/CarDetails';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<CarDetails />} />
      </Routes>
    </>
  );
}

export default App