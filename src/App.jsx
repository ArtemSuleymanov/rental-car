import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CarDetails from './pages/CarDetails'
import Header from './components/Header/Header';

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